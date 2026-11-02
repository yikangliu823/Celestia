# Celestia Issue #3 experiment preparation

Status: prepared; neither implementation condition has run. Owner approval is
required before running the frozen prompt. No conclusions are available.

This evidence worktree is `/Users/richardlau/Development/Celestia-experiment-evidence`,
on `codex/experiment-protocol`. It holds preparation records separately from both
implementation worktrees and is not merged into main. The source baseline is
`03573c23532fa94715844284b8e16a6bf864c9a6` (merged PR #15).

## Reading order

1. [Protocol](protocol.md): design, controls, limitations, and stopping rules.
2. [Environment](environment.md): audited settings and instruction sources.
3. [Implementation prompt](implementation-prompt.md): exact text for both runs.
4. [Evaluation plan](evaluation-plan.md): frozen tests and scoring rules.
5. [Preparation manifest](preparation/manifest.json): hashes and commit identities.
6. [Isolation comparison](preparation/isolation.json): machine-checked differences.

The treatment file is preserved in [its original frozen snapshot](preparation/treatment-agents.md).
Issue requirements are preserved in [the GitHub snapshot](preparation/issue-3.json).
The main checkout and both condition branches contain no evidence templates.

## Reproduction

Use `python3 docs/experiment/scripts/verify-isolation.py` from this evidence
worktree to recheck frozen branches and hashes before execution. Read
[the logging procedure](logging-procedure.md) before starting a new CLI session.
`python3 docs/experiment/scripts/audit-inputs.py` rerenders and compares startup
messages without an inference. The execution wrapper runs this audit itself too.
`run-condition.py --help` only displays usage. Running a condition additionally
requires `--approved`, which is an operator acknowledgement of explicit owner
approval; do not supply it during preparation.

`preparation/` records commands actually run to prepare the baseline and worktrees.
These are not experimental outcomes. `control/` and `treatment/` contain templates
only: null metrics, empty patches, and `NOT RUN` markers. An empty patch is not a
claim of no implementation changes. `private/` is ignored and holds raw diagnostic
output locally; review exports for sensitive content before sharing any evidence.

Do not read the other condition's implementation or results during a run. Do not
merge these documentation files into the two implementation branches. Freeze files
listed in `preparation/manifest.json` before either run; any necessary change means
both conditions need a new versioned protocol and neither old result is comparable
under the new protocol.
