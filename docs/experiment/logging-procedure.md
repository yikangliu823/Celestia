# Execution and evidence capture procedure

## Before approval

Do not run `run-condition.py --approved`. Both result trees are templates. The
script is prepared, not executed. Its help, syntax, and argument guard may be
checked without a model request. This preparation conversation is not an
experimental transcript.

## Once explicit owner approval is given

1. Run verify-isolation.py and the prompt-input diagnostic again with the frozen
   settings. Confirm model alias, CLI/config hashes, runtime, prompt, treatment,
   and case-suite hashes. Any drift stops the run.
2. Follow preparation/order.json. Use a new CLI exec session in the selected
   worktree; never resume or fork. Only the exact implementation-prompt.md bytes
   go to stdin. Do not attach protocol, treatment snapshot, or evaluator files.
3. Launch the frozen wrapper with the condition and `--approved`. It records actual
   UTC start/end times, process duration, arguments, prompt hash, and exit code
   outside the implementation worktree. It captures raw CLI JSONL stdout, stderr,
   and the final response in a new attempt directory; it never overwrites one.
4. Do not provide coaching. If intervention is unavoidable, record exact text or
   action, actual time, reason, and whether the attempt remains comparable. Never
   reconstruct missing events or backfill timestamps.
5. The CLI JSONL stream is original client output, not a hand-written transcript.
   Record its originating command, session/thread ID if emitted, and SHA-256. It
   may omit internal context or truncate tool output; label those limits. If a
   desktop session is used instead, that is a protocol deviation: preserve its
   accessible session reference and actual terminal outputs, identify any export
   mechanism, and never label a reconstructed summary verbatim.
6. Review raw outputs for credentials or real personal data before publication.
   The task uses synthetic data only. Keep unreviewed raw exports in ignored
   private storage; publish sanitized derivatives with redactions documented,
   hashes of safe originals when appropriate, and no credential material.
7. Populate execution-log.md chronologically from the raw stream: inspections,
   files read/created/modified, commands, errors, test outcomes, debugging edits,
   and final checks. Cite event offsets. If an event is not observable, say so.
8. Capture the implementation diff from its configuration commit using
   `git diff --binary <configuration-commit>` plus an explicit untracked-file
   inventory. If untracked source is to be included in the patch, stage the intended
   files after review and preserve both staged and unstaged diffs. Never omit
   untracked files silently. Do not place evidence in implementation branches.
9. Fill metrics.json only from recorded evidence. Keep missing values null.
   Separate agent tests, evaluator tests, and preparation checks.
10. After both implementations, run the independent evaluation procedure and fill
    comparison.md and reflection.md with evidence-linked observations, clearly
    separated from hypotheses. Preserve failures and interrupted attempts.

## Metadata required per execution

Condition, branch/path, baseline SHA, configuration SHA, final tree/commit if any,
CLI/model identifiers and available settings, actual session start/end, exact
prompt/hash, detected instructions, source session reference, interventions, and
command outcomes. Never claim a file was loaded based only on its existence;
use rendered-input output or actual read events and name the evidence type.
