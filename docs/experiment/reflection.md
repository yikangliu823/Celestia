# Experiment reflection

Both independent sessions completed without coaching and left scoped, buildable
implementations. The experiment is PARTIAL because independent browser evidence
is incomplete and the current global configuration no longer matches the approved
fingerprint. No implementation output was changed to improve the comparison.

The common prompt, repository documents and frozen baseline made the task concrete
in both conditions. Treatment additionally loaded repository instructions; it did
not receive the independent evaluation suite or the other implementation. This
design tests the incremental effect of those instructions in an already guided
workflow, not instructions versus no task guidance.

The instruction document is actionable about separation, validation, privacy,
verification and scope. Treatment narrowed unknown values without unchecked casts
after fixing one type error. Control used typed internal inputs and performed an
extra dependency audit. Both disclosed missing calculation requirements and avoided
inventing a backend or chart-ready contract. These observations do not establish
which details were caused by AGENTS.md. The common requirements plausibly explain
much of the convergence; stochastic generation and run order are alternatives.

What worked: strict preflight checks, exact prompt bytes, distinct fresh session
IDs, matching observed runtime settings, timestamped raw verification outputs,
frozen implementation commits before evaluation, and preservation of failed
commands. Explicit ambiguity rules prevented scoring unspecified calendar/location
and DST policies as product failures. Separating test process counts from fixture
counts avoided rewarding test organization as if it were quality.

What did not work: worktrees did not provide strict read isolation; the approved
fallback could audit observable access but not every filesystem read. Browser tools
became unreliable during evaluation and could not establish a controlled fresh
context or complete keyboard, layout and runtime privacy checks. Early observations
had to be recovered from tool records after a reset. One missing-field batch remained
ambiguous, and its failed reproduction must remain visible. The global desktop
configuration changed after the run freezes according to its recorded mtime;
the exact writer and complete write history are unknown. The final guard correctly
rejected the new bytes instead of silently accepting them.

The initial wrong-directory server command and a final metadata-inspection attempt
using unavailable Python tomllib were coordinator setup errors, not implementation
defects. They did not alter either implementation. They are recorded separately.

For a future approved study, first verify a stable browser integration and capture
each observation durably as it happens. Freeze browser/runtime versions and metadata,
use fresh contexts, and establish a reliable network/storage inspection capability.
Use process-level read isolation where supported. More paired runs, randomized order,
blinded review and a defined calculation contract would reduce major confounders.
These are future-design proposals; this run's criteria, prompt and outputs remain
unchanged. Do not retrofit stronger requirements into these scores.

Immediate remaining work is evaluation of the frozen commits, not implementation
repair: reproduce Control F03, then complete each UNVERIFIED check in both conditions
under documented equivalent browser conditions. Review the new configuration drift
before any further execution that depends on the old guard. No rerun, merge or
Issue #3 completion claim is authorized by this report.
