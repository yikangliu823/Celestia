# Execution isolation probes

Before either implementation, symmetric outer macOS sandbox policies were tested.
They blocked reads of the opposite worktree, evaluation evidence directory, and
main checkout files. Own-worktree Git status remained available. However, the
frozen Codex workspace sandbox could not start inside them:
`sandbox-exec: sandbox_apply: Operation not permitted` (exit 71, both conditions).
Raw commands and outputs are in `sandbox-probes.json`. The `.sb` files are tested
proposals, not active execution policies. These probes made no inference request.

The owner permits transcript auditing when strict read isolation is unavailable.
The proposed fallback was the original frozen runner and settings, with fresh
sessions, exact prompt bytes, and live command review. Shared Git history,
filesystem reads and opaque/internal tool activity would remain limitations;
a transcript audit cannot establish complete isolation. No fallback implementation
was launched: the subsequent frozen configuration verification failed instead.

Two preliminary help probes returned nonzero without inference: `sandbox-exec -h`
printed usage (64); `codex sandbox macos --help` tried to execute the literal
command `macos` (71). Correct CLI syntax was then used for the recorded probes.
These are orchestrator setup failures, not implementation test failures.

The original run wrapper's no-approval guard was invoked again; it exited 2 with
`No model request made. Explicit owner approval and --approved are required.`
This was a guard test, not a denied owner authorization or implementation attempt.
The frozen implementation runner, settings, and prompt have not been modified.
