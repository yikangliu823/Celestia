#!/usr/bin/env python3
"""Read-only checks against the approved inputs and frozen implementation commits."""
from pathlib import Path
import datetime
import hashlib
import json
import subprocess

ROOT = Path(__file__).resolve().parents[2]
REPO = ROOT.parents[1]
APPROVED = "f6757bb0e00c6f7aeb2bb23f47f5c64b641d6164"
SETTINGS = json.loads((ROOT / "amendments/v2/runtime-settings.json").read_text())
checks = []


def git(path, *args):
    return subprocess.check_output(["git", "-C", str(path), *args])


def sha(data):
    return hashlib.sha256(data).hexdigest()


def check(name, actual, expected):
    checks.append({"check": name, "passed": actual == expected,
                   "actual": actual, "expected": expected})


check("Evidence branch", git(REPO, "branch", "--show-current").decode().strip(),
      "codex/experiment-protocol")
main = REPO.parent / "Celestia"
check("Main remains baseline", git(main, "rev-parse", "HEAD").decode().strip(), SETTINGS["baseline"])
check("Main branch", git(main, "branch", "--show-current").decode().strip(), "main")
check("Main clean", git(main, "status", "--porcelain").decode(), "")
manifest = json.loads((ROOT / "amendments/v2/manifest.json").read_text())
for path, expected in manifest["filesSha256"].items():
    check("Frozen " + path, sha((ROOT / path).read_bytes()), expected)
for path in ["protocol.md", "implementation-prompt.md", "evaluation-plan.md",
             "logging-procedure.md", "evaluation/cases.json", "amendments/v2/README.md"]:
    check("Approved " + path, sha((ROOT / path).read_bytes()),
          sha(git(REPO, "show", f"{APPROVED}:docs/experiment/{path}")))
check("Global config fingerprint", sha(Path("/Users/richardlau/.codex/config.toml").read_bytes()),
      SETTINGS["userConfigSha256"])
for path, expected in manifest["acceptedGlobalInstructionFiles"].items():
    check("Global instruction fingerprint", sha(Path(path).read_bytes()), expected)
    check("Global instruction zero bytes", Path(path).stat().st_size, 0)
commands = []
contexts = []
for condition, setting in SETTINGS["conditions"].items():
    wt = Path(setting["worktree"])
    freeze = json.loads((ROOT / condition / "evidence/freeze.json").read_text())
    session = json.loads((ROOT / condition / "evidence/session.json").read_text())
    check(condition + " branch", git(wt, "branch", "--show-current").decode().strip(), setting["branch"])
    check(condition + " frozen HEAD", git(wt, "rev-parse", "HEAD").decode().strip(), freeze["implementationCommit"])
    check(condition + " frozen tree", git(wt, "rev-parse", "HEAD^{tree}").decode().strip(), freeze["implementationTree"])
    check(condition + " clean", git(wt, "status", "--porcelain").decode(), "")
    check(condition + " direct configuration parent", git(wt, "rev-parse", "HEAD^").decode().strip(), setting["configurationCommit"])
    check(condition + " baseline ancestor", git(wt, "merge-base", SETTINGS["baseline"], "HEAD").decode().strip(), SETTINGS["baseline"])
    check(condition + " saved patch", sha((ROOT / condition / "git-diff.patch").read_bytes()), freeze["patchSha256"])
    check(condition + " dependency/config files unchanged", git(wt, "diff", setting["configurationCommit"], "HEAD", "--", "package.json", "package-lock.json", "next.config.ts", "tsconfig.json", "eslint.config.mjs").decode(), "")
    if condition == "treatment":
        check("Treatment AGENTS unchanged", sha((wt / "AGENTS.md").read_bytes()),
              sha(git(wt, "show", setting["configurationCommit"] + ":AGENTS.md")))
    else:
        check("Control AGENTS absent", (wt / "AGENTS.md").exists(), False)
    check(condition + " exact prompt", session["promptSha256"], sha((ROOT / "implementation-prompt.md").read_bytes()))
    for path, expected in session["artifactsSha256"].items():
        artifact = ROOT / "implementation-prompt.md" if path == "implementation-prompt.md" else ROOT / condition / "evidence" / path
        check(condition + " raw artifact " + path, sha(artifact.read_bytes()), expected)
    command = list(session["command"])
    command[command.index("--output-last-message") + 1] = "<condition-output>"
    commands.append(command)
    record = json.loads((ROOT / condition / "evidence/observed-session-settings.json").read_text())["records"][0]
    context = {k: record[k] for k in ["model", "effort", "approval_policy", "sandbox_policy"]}
    contexts.append(context)
    check(condition + " observed model", record["model"], "gpt-6-astra")
    check(condition + " observed effort", record["effort"], "high")
check("Identical runtime arguments except output location", commands[0], commands[1])
check("Identical observed runtime settings", contexts[0], contexts[1])
c, t = SETTINGS["conditions"].values()
check("Same starting application tree", git(REPO, "diff", c["configurationCommit"], t["configurationCommit"], "--", ".", ":(exclude)AGENTS.md").decode(), "")
result = {"checkedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
          "passed": all(x["passed"] for x in checks), "checks": checks}
print(json.dumps(result, indent=2))
raise SystemExit(0 if result["passed"] else 1)
