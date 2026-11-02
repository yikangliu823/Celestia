#!/usr/bin/env python3
"""Render and compare startup input without making a model inference."""
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[2]
VERSION = Path(__file__).resolve().parent


def audit():
    settings = json.loads((VERSION / "runtime-settings.json").read_text())
    destination = ROOT / "private" / ("input-audit-" + datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ"))
    destination.mkdir(mode=0o700)
    prompt = (ROOT / "implementation-prompt.md").read_text()
    expected = (ROOT / "preparation/treatment-agents.md").read_text().strip()
    normalized = {}
    report = {"startedAt": datetime.now(timezone.utc).isoformat(), "modelInferenceMade": False, "conditions": {}}
    environment = dict(os.environ)
    for key in list(environment):
        if key.startswith("CODEX_") and key != "CODEX_HOME":
            del environment[key]
    for name, value in settings["conditions"].items():
        command = [settings["codexBinary"]]
        for option in settings["configOverrides"]:
            command += ["-c", option]
        command += ["debug", "prompt-input", prompt]
        result = subprocess.run(command, cwd=value["worktree"], env=environment, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        (destination / (name + ".json")).write_text(result.stdout)
        (destination / (name + ".stderr.txt")).write_text(result.stderr)
        assert result.returncode == 0, name + " prompt diagnostic failed; inspect private evidence"
        data = json.loads(result.stdout)
        messages = []
        treatment_blocks = 0
        for item in data:
            text = "\n".join(c.get("text", "") for c in item.get("content", []))
            text = text.replace(value["worktree"], "<WORKTREE>")
            if "# AGENTS.md instructions" in text:
                assert name == "treatment" and expected in text, "Unexpected project instructions"
                assert text.startswith("# AGENTS.md instructions")
                treatment_blocks += 1
                text = text[text.index("<environment_context>"):]
            assert "# Celestia Engineering Rules" not in text
            messages.append({"role": item.get("role"), "text": text})
        assert treatment_blocks == (1 if name == "treatment" else 0)
        normalized[name] = messages
        report["conditions"][name] = {"exitCode": result.returncode, "rawSha256": hashlib.sha256(result.stdout.encode()).hexdigest(), "treatmentInstructionBlocks": treatment_blocks}
    assert normalized["control"] == normalized["treatment"], "Unexpected role/text differences"
    report["normalizedRoleTextEqual"] = True
    report["endedAt"] = datetime.now(timezone.utc).isoformat()
    report["privateEvidenceDirectory"] = str(destination)
    (destination / "summary.json").write_text(json.dumps(report, indent=2) + "\n")
    return report


if __name__ == "__main__":
    print(json.dumps(audit(), indent=2))
