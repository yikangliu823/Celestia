# Final isolation and integrity audit

The final launch preflight outputs in this directory all exited 0. Each session's
session.json additionally contains its immediate input audit and effective-config
checks. The CLI invoked fresh exec sessions rather than resume/fork; separate
session IDs and worktree cwd values are preserved. The exact prompt hash matched.
Both observed local turn contexts recorded gpt-6-astra/high and equal sandbox and
approval settings. Remote immutable model identity remains unknown.

Reviewed complete command-records.json, events.jsonl file-change records and final
responses for both conditions. Control read only its current checkout and checked
ancestor AGENTS paths (event 11 returned no instructions). Treatment explicitly read
its own AGENTS.md (event 9). No command inspected the opposite worktree, evidence
worktree contents, another branch's source, repository history, execution evidence
or evaluation suite. File changes stayed within each condition. The CLI's output
file destination in the private evidence directory is coordinator-controlled result
capture, not an observed agent read of evidence. No cross-condition intervention or
clarification answer was sent. Observable contamination events: zero.

This is a transcript audit, not proof that no hidden filesystem access occurred.
The approved read-isolation fallback and shared Git-object/filesystem exposure
remain limitations. No complete OS-level file-access trace is available. No clean
implementation rerun is indicated by an observed contamination event, but the
absence of such an event cannot establish perfect isolation.

verify-final-integrity.py checks the frozen application/configuration commits,
working trees, original prompt/evaluation files, v2 manifest files, instruction
files, exact raw artifact hashes and actual session settings. The current result
is 59 of 60 checks passing. Main remains the frozen baseline and clean. Both
implementation trees and their direct configuration parents match. Both frozen
AGENTS configurations and all frozen prompt/evaluation/history inputs are intact.

The failed check is the exact global config fingerprint:

- Approved: bfff10908e1fcdeb84e0e7ecdc2a2219ac3d65b350afee2a77233aebc9645899
- Observed: c0471c3e8bca852b4ef63bfc88ad833aa1b962b3a989e31dd628219cd2eafaff
- Observed file mtime: 2026-11-02T06:52:58.153326+00:00

The mtime is later than Treatment's freeze at 06:39:08.915250Z and Control's freeze
at 06:46:50.069440Z. Both launches previously captured passing exact configuration
checks and matching actual model/effort. The final diff from the private accepted
config shows removal of a sites plugin entry, addition of a desktop usage-reset
setting and MCP env_vars, plus browser backend/app version/trusted-service/CLI-path
changes. No global model or reasoning-effort line changed in that diff. Raw config
contents are not committed because they can contain unrelated sensitive settings.

The evidence suggests a post-freeze desktop/runtime transition, consistent with
the browser tool change during evaluation; it does not identify the writer or
establish the complete write history. No current fingerprint is auto-approved.
The preflight remains fail-closed for future runs. The global empty AGENTS.md still
has zero bytes and SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855.
The historical Medium/Extra High discrepancy and approved common High setting
remain preserved. No configuration or implementation repair was made.

The drift and incomplete browser evidence make the final experiment PARTIAL.
They do not retroactively turn captured passing commands into failures. Further
runtime-dependent work needs a reviewed environment; no experiment rerun has begun.
