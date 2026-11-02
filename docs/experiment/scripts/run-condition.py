#!/usr/bin/env python3
"""Launch a frozen experiment only after explicit owner approval."""
import argparse
from datetime import datetime, timezone
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import subprocess
import time

ROOT = Path(__file__).resolve().parents[1]


def now():
    return datetime.now(timezone.utc).isoformat()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("condition", choices=["control", "treatment"])
    parser.add_argument("--approved", action="store_true", help="Acknowledge explicit owner approval to execute the experiment")
    args = parser.parse_args()
    if not args.approved:
        parser.error("No model request made. Explicit owner approval and --approved are required.")
    spec = importlib.util.spec_from_file_location("isolation", ROOT / "scripts/verify-isolation.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    module.verify(args.condition)
    audit_spec = importlib.util.spec_from_file_location("input_audit", ROOT / "scripts/audit-inputs.py")
    audit_module = importlib.util.module_from_spec(audit_spec)
    audit_spec.loader.exec_module(audit_module)
    input_audit = audit_module.audit()
    settings = json.loads((ROOT / "runtime-settings.json").read_text())
    condition = settings["conditions"][args.condition]
    order = json.loads((ROOT / "preparation/order.json").read_text())["plannedOrder"]
    completed = list((ROOT / "private").glob("*-execution-*/session.json"))
    if any(json.loads(p.read_text())["condition"] == args.condition for p in completed):
        parser.error("An attempt already exists; preserve it and obtain a revised restart protocol.")
    if args.condition == order[1]:
        first = [json.loads(p.read_text()) for p in completed if json.loads(p.read_text())["condition"] == order[0]]
        if len(first) != 1 or first[0].get("exitCode") != 0:
            parser.error("The preregistered first condition has not completed successfully; review before proceeding.")
    elif completed:
        parser.error("Unexpected prior attempts; review the preregistered order.")
    destination = ROOT / "private" / (args.condition + "-execution-" + datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ"))
    destination.mkdir(mode=0o700)
    prompt = (ROOT / "implementation-prompt.md").read_bytes()
    command = [settings["codexBinary"], "--strict-config"]
    for value in settings["configOverrides"]:
        command += ["-c", value]
    command += ["exec", "--json", "--color", "never", "--output-last-message", str(destination / "final-response.txt"), "-"]
    environment = dict(os.environ)
    for key in list(environment):
        if key.startswith("CODEX_") and key != "CODEX_HOME":
            del environment[key]
    metadata = {"condition": args.condition, **condition, "baseline": settings["baseline"], "inputAudit": input_audit, "modelRequested": settings["model"], "modelObserved": None, "modelSnapshot": None, "reasoningEffortRequested": settings["reasoningEffort"], "startedAt": now(), "endedAt": None, "exitCode": None, "sessionId": None, "command": command, "promptSha256": hashlib.sha256(prompt).hexdigest(), "source": "Raw stdout/stderr from this codex exec process; not a reconstructed transcript"}
    (destination / "session.json").write_text(json.dumps(metadata, indent=2) + "\n")
    (destination / "implementation-prompt.md").write_bytes(prompt)
    print("Evidence directory:", destination, flush=True)
    started = time.monotonic()
    try:
        with (destination / "events.jsonl").open("wb") as out, (destination / "stderr.txt").open("wb") as err:
            result = subprocess.run(command, input=prompt, cwd=condition["worktree"], env=environment, stdout=out, stderr=err)
        metadata["exitCode"] = result.returncode
    finally:
        metadata["endedAt"] = now()
        metadata["durationSeconds"] = time.monotonic() - started
        metadata["artifactsSha256"] = {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in destination.iterdir() if p.is_file() and p.name != "session.json"}
        (destination / "session.json").write_text(json.dumps(metadata, indent=2) + "\n")
    raise SystemExit(metadata["exitCode"])


if __name__ == "__main__":
    main()
