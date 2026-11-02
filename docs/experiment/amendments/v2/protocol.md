# Celestia experiment protocol 2.0: common High reasoning

This is a pre-execution amendment authorized by the owner's configuration-drift
resolution request. Neither condition has started. Version 1 remains preserved
byte-for-byte in the original protocol, runtime settings, preparation reports,
manifest, scripts, and blocked execution report. Version 2 changes the common
reasoning effort from `medium` to `high` and accepts the newly audited global
configuration fingerprint. It does not change the implementation task or scoring.
The amendment timestamp is recorded in `manifest.json`.

## Historical findings and decision

The original global-config audit and frozen CLI overrides recorded
`gpt-6-astra` with `medium`. Local preparation-task context records independently
show `xhigh` at 05:22:33 and 05:39:20 UTC, then `high` at 05:50:49 UTC on
2026-11-02. Thus the owner's Extra High to High history is verified for the
preparation task, while the never-executed experimental CLI configuration was
Medium. The earlier report did not adequately distinguish these settings. No
experimental inference occurred under any effort setting.

Current global `config.toml` still has model `gpt-6-astra` and effort `medium`.
Its new hash is not explained by an observed Medium-to-High or Extra-High-to-High
change in that file. Comparing the historical complete section inventory with
the current file proves that an unrelated trusted-project table was added. The
old file was not fully archived; other changed values or formatting cannot be
exhaustively reconstructed. No unverified historical value is substituted for
that missing evidence. The exact source of every changed byte remains unknown.

The owner now chooses High for both conditions. The new accepted environment is
fully audited in its current state, rather than assumed equivalent to the old
file. Full resolved configuration equality, explicit setting origins and startup
instruction equality are verified. No unresolved current material difference
between the two conditions was detected. Historical uncertainty remains a stated
limitation, not a claim that every old setting was unchanged.

The renewed isolation check also found a zero-byte global `~/.codex/AGENTS.md`,
modified at 2026-11-02T05:56:10.368855+00:00. The original check rejected its
presence. Its empty contents add no instructions; actual startup-input comparison
passes. Version 2 accepts only this exact empty file, fingerprints it, and rejects
any content change. The global file is not edited. The initial failure is retained
in `preflight-initial-failure.json`. This is a nonsemantic instruction-file change,
not an exception permitting global project guidance.

## Common effective configuration

Use only this directory's `runtime-settings.json` and `run-condition.py` for a
future authorized run. The original scripts remain historical version 1 and
correctly reject the new global fingerprint. The version 2 scripts preserve the
original procedures, with versioned configuration/manifest paths and an added
read-only effective-configuration gate before any future inference.

Both sessions explicitly specify `model="gpt-6-astra"` and
`model_reasoning_effort="high"`. All other CLI overrides are unchanged: workspace
write sandbox, network enabled for baseline tooling, approval never, web search
disabled, plugins/apps/MCP integrations and the same auxiliary features disabled.
The actual CLI `config/read` response confirms the model and effort originate in
`sessionFlags`, not the user's global defaults. Both full resolved configuration
objects and managed requirements match. The bundled catalog supports this exact
model identifier and High. This verifies client configuration, not service
availability or the remote weights that a future inference will use.

The user's global configuration is not changed. The original common prompt,
24-case evaluation plan, scoring clarifications, baseline/configuration commits,
Treatment AGENTS.md, execution order and no-coaching policy remain unchanged.
The only intended between-condition difference remains repository-level AGENTS.md.
Necessary path, branch, commit and cache differences retain their original limits.

## Fingerprint and renewal policy

Original global file SHA-256:
`24edc21f3f5c8ba44bc9697e92923601f5bd68325e787c25cf4a5984f1ecbd11`.

New accepted global file SHA-256:
`bfff10908e1fcdeb84e0e7ecdc2a2219ac3d65b350afee2a77233aebc9645899`.

Both fingerprints and semantic evidence are preserved. The accepted full-file
fingerprint remains a fail-closed check. No future byte change is automatically
accepted, including a change in a globally overridden key. The new manifest also
checks amended scripts/settings, unchanged historical frozen inputs, CLI binary,
shared instructions and rules. Changed relevant settings require renewed
verification in both worktrees before any run.

A byte change is not automatically a material runtime change. Classify it using
the retained private accepted snapshot, resolved values and origins, per-key
value hashes, instructions and tool-policy observations. Formatting/comments with
identical parsed semantics are nonsemantic. Desktop-only preferences or trust
entries outside the experimental paths can be irrelevant to CLI execution, but
must be verified as such. Changes to model, effort, providers, service tier,
permissions, tools, integrations, instructions, environment, relevant trust or
managed layers are potentially material. Unknown changes fail closed. Even a
verified harmless change needs a documented new fingerprint and repeat preflight;
material changes require a new owner-authorized common amendment. Do not erase
prior failures or rewrite earlier evidence.

## Isolation and authorization

Read isolation remains limited by shared Git objects and filesystem access. The
previous nested sandbox probes failed to compose with Codex's approved sandbox;
this amendment does not silently change permissions or claim strict read
isolation. Use the already authorized transcript-audit fallback in a future run,
stop on cross-condition access, and preserve the original evidence. No other
condition's source, transcript, scoring information or output may be passed in.

Readiness is established with no-inference diagnostics only: existing isolation
checks under the versioned inputs, startup prompt comparison, strict config/read
queries, model catalog inspection, read-only Git/dependency checks and the runner's
no-approval guard. No `thread/start`, `turn/start`, or `codex exec` is used here.
Fresh explicit owner authorization is required before either condition starts.

## Evidence and references

- `history-audit.json`: historical global audit and preparation-task effort records.
- `configuration-fingerprints.json`: original and accepted digests and limitations.
- `effective-config.json`: actual resolved values, origins and equality assertions.
- `input-audit.json`: exact Treatment block and normalized startup-input equality.
- `worktree-verification.json`: raw read-only Git and dependency outputs.
- `preflight-results.json`: actual verifier and guard results.
- `manifest.json`: protocol version, timestamp, protocol SHA-256 and input hashes.

The installed CLI's help and generated app-server schema were consulted.
Official [configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)
and [developer diagnostics](https://learn.chatgpt.com/docs/developer-commands)
provide context; the recorded local outputs establish the tested behavior.
