# Issue #1 scaffold verification

Scope: [Issue #1](https://github.com/yikangliu823/Celestia/issues/1).
Baseline commit: `c7e0ce5323f65f4dc0157b748edce60b36be97bf`.
Environment: macOS, Node.js `26.11.0`, npm `11.20.0`.
Branch: `feature/issue-1-app-scaffold`.

## Dependency installation

Both `npm install` and a subsequent lockfile-based `npm ci` exited 0.
Actual installation output excerpts:

```text
$ npm install
added 348 packages, and audited 349 packages in 36s
16 moderate severity vulnerabilities

$ npm ci
npm warn deprecated eslint@9.39.5: This version is no longer supported. Please see https://eslint.org/version-support for other options.
added 349 packages, and audited 350 packages in 6s
16 moderate severity vulnerabilities
```

npm also warned that install scripts for `esbuild@0.28.2` and `fsevents@2.3.3`
were not covered by `allowScripts`. No explicit script approval or global npm
configuration change was made. The installed tools passed the checks below.

## Initial failure and correction

The first type-check and production build exited 1 with:

```text
tests/home-page.test.tsx(9,64): error TS1501: This regular expression flag is only available when targeting 'es2018' or later.
```

The smoke test used the dotAll regex flag with an ES2017 target. Replacing that
flag with an ES2017-compatible character class fixed both checks. Initial lint
and smoke-test runs already passed. All checks were rerun after the fix and the
Next.js configuration change.

## Final check outputs

### `npm run typecheck`

Exit code: `0`.

```text
> celestia@0.1.0 typecheck
> next typegen && tsc --noEmit

Generating route types...
✓ Types generated successfully
```

### `npm run lint`

Exit code: `0`.

```text
> celestia@0.1.0 lint
> eslint . --max-warnings=0
```

### `npm test`

Exit code: `0`.

```text
> celestia@0.1.0 test
> tsx --test tests/*.test.tsx

✔ homepage renders the application name inside the main landmark (2.8655ms)
ℹ tests 1
ℹ suites 0
ℹ pass 1
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 157.049209
```

### `npm run build`

Exit code: `0`.

```text
> celestia@0.1.0 build
> next build

▲ Next.js 16.4.3 (Turbopack)
✓ Running next.config.ts took 15ms

  Creating an optimized production build ...
✓ Compiled successfully in 228ms
  Running TypeScript ...
  Finished TypeScript in 696ms ...
  Collecting page data using 4 workers ...
  Generating static pages using 4 workers (0/3) ...
✓ Generating static pages using 4 workers (3/3) in 143ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
└ ○ /_not-found


○  (Static)  prerendered as static content
```

## Runtime checks

Both `npm run dev` and `npm start` were started sequentially on port 3000. HTTP
requests to `/` returned 200. Responses contained the Celestia heading inside the
main landmark, `lang="en"`, and the Celestia document title. No form was present.
Both processes were stopped after verification. These were HTTP checks, not browser
interaction or visual accessibility tests.

The first development start appended a managed block to `AGENTS.md`. The scaffold
now sets `agentRules: false` in `next.config.ts`. The original instruction file was
restored byte-for-byte; repeated startup confirmed it remains unchanged and no
`CLAUDE.md` is created. This removes the observed automatic instruction mutation;
it does not claim full isolation from global or inherited Codex instructions.

## Dependency audit and limitations

`npm audit` exited 1 with 16 moderate findings in the development lint dependency
tree, rooted in minimatch advisory
[GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249).
`npm audit --omit=dev` exited 0 with actual output:

```text
found 0 vulnerabilities
```

The audit suggested breaking downgrades of ESLint and eslint-config-next. Those
were not applied. No transitive major-version overrides were introduced. ESLint
9.39.5 is deprecated but matches the included plugins' declared peer ranges;
these development tooling issues remain maintenance work.

The one automated test covers static homepage rendering only. No coverage
percentage, browser test coverage, chart behavior, or Issue #3 functionality is
claimed. No authentication, database, or AI integration was added.
