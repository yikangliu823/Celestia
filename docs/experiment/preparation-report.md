# Preparation report

## Repository

PR #15 is merged. Local and remote main match
`03573c23532fa94715844284b8e16a6bf864c9a6`, with a clean main worktree. The scaffold
tree still matches the reviewed implementation commit. Main was not edited.

The required five commands passed on main and in both new worktrees. All actual
outputs, timestamps, and exit codes are in `preparation/baseline-checks.json` and
`preparation/worktree-checks.json`. Each test run passed the one baseline smoke
test; none tested a birth-input form. Dependency warnings remain documented.

Initial sandbox smoke-test runs failed on tsx Unix socket permissions, including
an attempted socket-only allowance. The common final settings enable shell network
access without changing application code or dependencies. Final sandbox results
are recorded separately in `preparation/final-sandbox-checks.json`; all failures
are retained in `preparation/sandbox-checks.json`.

## Worktrees and commits

| Condition | Branch | Configuration commit |
| --- | --- | --- |
| Control | experiment/no-agent-instructions | 85cdbb0c597a6f00f9feac3bf4cb9620f139fb46 |
| Treatment | experiment/with-agent-instructions | 96d1af2fb056066376eccc3e66f66a500c70df71 |

Control: `/Users/richardlau/Development/Celestia-experiment-control`.
Treatment: `/Users/richardlau/Development/Celestia-experiment-treatment`.
Evidence: `/Users/richardlau/Development/Celestia-experiment-evidence`, branch
`codex/experiment-protocol`. All preparation branches are local; no extra PR or
remote branch was created for this preparation.

Both configuration commits have the exact main baseline as their sole parent.
Their only tracked difference is AGENTS.md; application source, manifests,
lockfile, tests, and resolved dependency trees match. Separate node_modules
directories are installed. Regenerable preparation build artifacts were removed
symmetrically. Neither condition contains Issue #3 implementation.

## Frozen materials and evidence

- `protocol.md`, `environment.md`, and `runtime-settings.json`: design and settings.
- `implementation-prompt.md`: exact shared prompt, not executed.
- `preparation/treatment-agents.md`: complete frozen treatment instructions.
- `evaluation-plan.md` and `evaluation/cases.json`: 24 independent manual cases and
  common review procedure; no automated independent coverage is claimed.
- `logging-procedure.md` and `scripts/run-condition.py`: actual-event logging and
  approval-gated launch wrapper; never invoked with approval during preparation.
- `scripts/verify-isolation.py` and `scripts/audit-inputs.py`: no-inference checks.
- `preparation/manifest.json`, `isolation.json`, and `configuration-diff.patch`:
  hashes, complete tracked inventories, and the exact difference.
- `control/`, `treatment/`, `comparison.md`, and `reflection.md`: unfilled result
  templates. Null values and empty patches are placeholders, not results.

No parent/global project instruction files were detected. Actual rendered inputs
contain the treatment instructions only in Treatment; other role/text content
matches after path/instruction normalization. Generic skills and system context
remain common. The diagnostic is startup evidence, not a completed model run.

## Readiness and limitations

Preparation is ready for owner review. Both worktrees are ready for a scoped
implementation comparison after explicit approval and fresh preflight checks.
The CLI launcher itself has not been exercised against the model; its syntax,
approval guard, source-state checks, prompt-input diagnostic, and the baseline
package commands in the common sandbox were checked.
Unexpected execution-time permission or service errors must be recorded, not
silently worked around in one condition.

Unresolved product ambiguities include the absent calculation interface and exact
date, location/timezone, extra-input, and submission rules. They block a complete
product-correctness verdict, not preparation. Cases without an oracle are marked
not scorable. A manual suite requires a consistent evaluator/browser setup.

Other residual confounders: shared Git history/read access, generic instructions,
host/npm caches, model stochasticity and alias changes, execution order, and
service latency. The implementation prompt forbids cross-condition/history reads;
the environment does not make those reads technically impossible. No claim of
complete confounder removal or a generalizable causal effect is made.

No condition was executed, no result or conclusion was fabricated, and Issue #3
remains open. Wait for explicit approval before starting.
