#!/usr/bin/env python3
"""Read resolved CLI configuration and requirements without starting a model session."""
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import select
import subprocess
import time

VERSION = Path(__file__).resolve().parent
ROOT = VERSION.parents[1]


def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, separators=(",", ":")).encode()).hexdigest()


def audit():
    settings = json.loads((VERSION / "runtime-settings.json").read_text())
    output = ROOT / "private" / ("effective-config-v2-" + datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ"))
    output.mkdir(mode=0o700)
    environment = {k: v for k, v in os.environ.items() if not k.startswith("CODEX_") or k == "CODEX_HOME"}
    configurations = {}
    requirements = {}
    report = {"recordedAt": datetime.now(timezone.utc).isoformat(), "modelInferenceMade": False, "sessionsStarted": 0, "privateEvidenceDirectory": str(output), "conditions": {}}
    keys = ["model", "model_provider", "model_reasoning_effort", "approval_policy", "approvals_reviewer", "sandbox_mode", "sandbox_workspace_write", "web_search", "features", "project_doc_fallback_filenames", "instructions", "developer_instructions", "model_instructions_file", "default_permissions", "profile", "service_tier", "tools"]
    for name, condition in settings["conditions"].items():
        command = [settings["codexBinary"]]
        for value in settings["configOverrides"]:
            command += ["-c", value]
        command += ["app-server", "--strict-config", "--stdio"]
        transcript = []
        with (output / (name + ".stderr.txt")).open("w") as stderr:
            process = subprocess.Popen(command, cwd=condition["worktree"], env=environment, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=stderr, text=True, bufsize=1)
            def call(identifier, method, params):
                request = {"id": identifier, "method": method, "params": params}
                transcript.append({"direction": "request", "message": request})
                process.stdin.write(json.dumps(request) + "\n")
                process.stdin.flush()
                deadline = time.monotonic() + 30
                while time.monotonic() < deadline:
                    if not select.select([process.stdout], [], [], 1)[0]:
                        continue
                    line = process.stdout.readline()
                    if not line:
                        raise RuntimeError("App server ended: " + str(process.poll()))
                    response = json.loads(line)
                    transcript.append({"direction": "response", "message": response})
                    if response.get("id") == identifier:
                        assert "error" not in response, response
                        return response["result"]
                raise TimeoutError(method)
            try:
                call(1, "initialize", {"clientInfo": {"name": "celestia-readiness-audit", "version": "2"}, "capabilities": {"experimentalApi": True}})
                process.stdin.write(json.dumps({"method": "initialized"}) + "\n")
                process.stdin.flush()
                resolved = call(2, "config/read", {"includeLayers": True, "cwd": condition["worktree"]})
                required = call(3, "configRequirements/read", {})
                config = resolved["config"]
                configurations[name] = config
                requirements[name] = required
                assert config["model"] == "gpt-6-astra"
                assert config["model_reasoning_effort"] == "high"
                assert config["approval_policy"] == "never"
                assert config["sandbox_mode"] == "workspace-write"
                assert config["sandbox_workspace_write"]["network_access"] is True
                assert config["web_search"] == "disabled"
                for flag in ["plugins", "apps", "memories", "multi_agent", "hooks", "shell_snapshot"]:
                    assert config["features"][flag] is False, flag
                for server in ["node_repl", "computer-use"]:
                    assert config["mcp_servers"][server]["enabled"] is False, server
                for key in ["model", "model_reasoning_effort"]:
                    assert resolved["origins"][key]["name"]["type"] == "sessionFlags"
                report["conditions"][name] = {"command": command, "cwd": condition["worktree"], "resolved": {k: config.get(k) for k in keys}, "modelAndEffortOrigins": {k: resolved["origins"][k] for k in ["model", "model_reasoning_effort"]}, "fullResolvedConfigSha256": digest(config), "topLevelValueSha256": {k: digest(v) for k, v in config.items()}, "requirements": required, "disabledMcpServers": [k for k, v in config["mcp_servers"].items() if v.get("enabled") is False]}
            finally:
                (output / (name + ".json")).write_text(json.dumps(transcript, indent=2) + "\n")
                process.terminate()
                process.wait(timeout=10)
    assert configurations["control"] == configurations["treatment"], "Resolved configurations differ"
    assert requirements["control"] == requirements["treatment"], "Requirements differ"
    report["fullResolvedConfigurationsEqual"] = True
    report["requirementsEqual"] = True
    report["rawEvidenceSha256"] = {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in output.iterdir() if p.is_file()}
    (output / "summary.json").write_text(json.dumps(report, indent=2) + "\n")
    return report


if __name__ == "__main__":
    print(json.dumps(audit(), indent=2))
