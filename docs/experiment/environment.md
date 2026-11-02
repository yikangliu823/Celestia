# Environment and instruction audit

## Observed baseline

PR #15 is merged at `03573c23532fa94715844284b8e16a6bf864c9a6`. Local and remote
main match. `preparation/baseline-checks.json` preserves actual command arguments,
start/end times, exit codes, and outputs for npm ci, typecheck, lint, test, and build.
All five passed. Worktree preparation results are recorded separately in
`preparation/worktree-checks.json`; they do not count as experimental test runs.

Dependencies are exactly the baseline versions: Next 16.4.3, React/React DOM 19.3.1,
TypeScript 5.9.3, ESLint 9.39.5, eslint-config-next 16.4.3, tsx 4.23.15,
@types/node 26.6.6, and @types/react / @types/react-dom 19.3.0.
No package or application code changes were made. npm ci again reported 16 moderate
development lint dependency findings, unsupported ESLint 9.39.5, and esbuild/fsevents
install-script notices. These are retained risks, not silently fixed. The previous
main verification reported zero production audit findings; this preparation's
required check run is separate evidence and does not assert a new production audit.

## Sandbox preparation failures and correction

The initial network-disabled workspace sandbox ran installation, type checking,
linting, and build successfully, but `npm test` failed in both conditions with
`listen EPERM` on tsx's temporary Unix socket. A named profile allowing only that
socket directory also failed. Application code and dependencies were not changed.
Both conditions now use the same network-enabled workspace sandbox; native web
search and integrations remain disabled. The initial settings and socket attempt
are preserved separately from the final runtime-settings.json.

`preparation/sandbox-checks.json` retains failures and corrections, including two
diagnostic CLI syntax mistakes. `preparation/final-sandbox-checks.json` records the
final five-command rerun in each condition. These are scaffold preparation checks,
not implementation outcomes. Network access is a remaining shared confounder.

## Model and runtime

`runtime-settings.json` records explicit future settings. The default config
observed `gpt-6-astra` and medium reasoning; the bundled CLI model catalog lists
that alias and supports medium. This is not evidence of a dated server model
snapshot or a completed model request. No execution has occurred. Sampling seed,
temperature, actual service tier, model build ID, and runtime effective metadata
remain unavailable until observed (and may remain unavailable afterward).

Use the exact CLI binary/version and Node/npm versions in `preparation/runtime.json`.
The preparation desktop session had broader tools and filesystem permissions;
those are not the planned execution permissions. The frozen wrapper uses common
CLI overrides and does not resume this conversation. It removes inherited
CODEX_* desktop session variables except the existing CODEX_HOME location, without
changing global configuration or assigning a new HOME/CODEX_HOME.

## Audited sources

Checked `/`, `/Users`, `/Users/richardlau`, and `/Users/richardlau/Development` for
AGENTS.md, AGENTS.override.md, CLAUDE.md, and parent `.codex/config.toml` files.
No instruction files were found. The user-level config is present at
`/Users/richardlau/.codex/config.toml`; its SHA-256 is frozen in runtime-settings.json.
No global AGENTS.md or AGENTS.override.md exists there. No files were found at
`/etc/codex/requirements.toml`, `/etc/codex/config.toml`, or
`/Library/Managed Preferences/com.openai.codex.plist`. These checks do not prove
there is no server-side or other managed policy.

The global `rules/default.rules` file exists; its digest was recorded and it has
no Celestia, birth-input, or experiment-condition text. User `agents` and `hooks`
directories were absent. Global rules and inspected generic skill files are
fingerprinted in the manifest and checked for drift. `codex login status` reported
"Logged in using ChatGPT"; no credentials were read or copied. This confirms local
login state, not future model service availability.

The user config supplies model settings, trusted projects, plugin/MCP setup, and
an environment setting for a browser tool, but no custom instruction string,
instruction-file override, or fallback filename list was detected. Only nonsecret
configuration facts and a file digest are recorded; credentials and unrelated
project paths are excluded. Project `.codex` and `.agents` directories were absent.
The user skill directory contains ip-as-logo; system skills were inspected for
Celestia/birth-input text and none matched. This is a bounded content check, not
a claim about every installed plugin. Disabled integrations are not part of the
planned task tools; the prompt diagnostic is the stronger startup check.

## Rendered-input check (no implementation run)

`codex debug prompt-input` rendered the frozen prompt from each worktree, using
the planned model, reasoning, and configuration overrides. Both exited 0. The
first attempt with `--strict-config` failed because this debug command does not
support that flag; the failure is retained in preparation records and local raw
stderr. The corrected diagnostic omitted that flag. Future exec uses its supported
strict-config option.

Control has no Celestia project instruction block. Treatment includes its exact
frozen AGENTS.md. The other role/text messages match after replacing each worktree
path with `<WORKTREE>` and removing only the treatment block. Random internal
message metadata differs and is excluded from the semantic comparison. The shared
prompt bytes match. Generic skills (including ip-as-logo) remain in both inputs
even with host skill discovery disabled; do not describe Control as having no
system or generic instructions. This diagnostic does not make a model inference
or run the implementation prompt.

Raw diagnostic exports are kept in ignored `private/`; their hashes and derived
findings are in preparation records. These are client-rendered input artifacts,
not transcripts of experimental executions. Actual future startup must be checked
again, especially if the CLI, config, plugins, or skills change.

## Remaining environmental differences

The worktree path, branch name, configuration commit, `.git` pointer, generated
file timestamps, and npm/build cache locality necessarily differ. The only tracked
file difference is AGENTS.md. Git object storage and filesystem reads are shared;
permission enforcement limits writes to each worktree but does not hide sibling
worktrees or historical instructions. The common prompt forbids reading them;
a transcript audit is required. Do not claim complete environmental isolation.

## Official references

[Instruction discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md),
[configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference),
and [prompt-input diagnostic](https://learn.chatgpt.com/docs/developer-commands)
were consulted. The installed CLI help and actual diagnostic output determine
which capabilities were verified for version 0.153.4.
