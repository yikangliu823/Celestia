# Issue #3 birth-input implementation and verification

Scope: [Issue #3](https://github.com/yikangliu823/Celestia/issues/3), using the
frozen requirements supplied for this task and the current checkout's product
requirements and architecture. Work remains on `experiment/with-agent-instructions`.
No other worktrees, branches, repository history, or external application
repositories were inspected. The issue is not marked complete.

## Implemented behavior

- The homepage has required, explicitly labeled Gregorian date, local birth time,
  and birth-location timezone fields. Native text inputs and a submit button
  support keyboard operation; CSS provides visible focus indicators.
- Submission checks for missing values, non-string values, impossible Gregorian
  dates, malformed/out-of-range times, and unsupported named timezones. Values
  are not silently trimmed, converted, or defaulted.
- Errors identify how to correct each field, use `aria-invalid` and
  `aria-describedby`, and appear in an alert summary with focus links. Submission
  focuses the first invalid field. Editing a field clears its stale error and
  removes any previous success message. Successful validation is announced in
  a status region without claiming chart readiness or calculation.
- Inputs remain in React page memory. There are no input logging, network,
  storage, analytics, or AI calls. Native submission is prevented, controls have
  no submission names, and the fieldset remains disabled until hydration.
  A no-JavaScript message explains that the form requires JavaScript.
- Validation is independent of React in `src/lib/birth-input.ts`; untrusted values
  are narrowed without `any`, type-error suppression, or unchecked casts.

## Assumptions and unresolved requirements

The scaffold dependency exists. The calculation-interface dependency does not
exist in this checkout; there is no contract to integrate with. The form's type
is provisional and is not a calculation interface. Full satisfaction of “other
required chart inputs” cannot be established from the available requirements.

The documents do not define:

- Additional required chart inputs, including whether any sex/gender input or
  calculation convention is needed. No such fields or defaults were invented.
- Calendar selection, lunar conversion, leap-month rules, supported calculation
  years, or whether future dates should be rejected. This form explicitly uses
  Gregorian dates with four-digit years 0001–9999. This is a format boundary,
  not a promise of engine support; no age or current-date restriction is inferred.
- Whether “location/timezone” requires a place name, coordinates, a lookup
  service, or just a timezone. This implementation uses an explicit timezone
  without geolocation, a location service, inferred device timezone, or collection
  of an additional place name. Place-to-timezone matching remains undefined.
- Required time precision, unknown/approximate birth times, and historical or
  solar-time conventions. This form requires a local 24-hour time to the minute.
- Daylight-saving gap/fold resolution and historical offset rules. Named zones
  (including supported aliases) and UTC are checked using runtime `Intl` support;
  abbreviations and raw offsets are rejected. No instant or offset is computed.
  Passing basic validation does not establish that a local time exists or is
  unambiguous. Runtime timezone databases may differ.

These assumptions are stated in the UI where relevant. No chart calculation,
authentication, persistence, application API, or AI service was added. The
product's server-side validation requirement remains applicable to future API
boundaries; this local-only form does not fulfill that future requirement.

## Actual verification

Environment: Node.js `26.11.0`, npm `11.20.0`.

| Command | Actual result |
| --- | --- |
| `npm ci` | Exit 0; 349 packages added, 350 audited; warnings described below. |
| `npm run typecheck` | Initially exit 2 with TS2322; after the fix, exit 0. |
| `npm run lint` | Exit 0 before and after the fix; no lint warnings. |
| `npm test` | Exit 0 before and after the fix; 15 passed, 0 failed, 0 skipped. |
| `npm run build` | Exit 0; optimized production build succeeded and `/` and `/_not-found` were statically prerendered. |
| `git diff --check` | Exit 0. |

The initial typecheck error was:

```text
src/lib/birth-input.ts(41,9): error TS2322: Type 'object' is not assignable to type 'Record<string, unknown>'.
  Index signature for type 'string' is missing in type '{}'.
```

The validator initially assigned a narrowed object to an indexed record type.
The fix checks each property's presence with `in` before reading its unknown
value, then narrows its type. Typecheck, lint, and tests were rerun successfully;
the subsequent production build also passed.

`npm ci` reported 18 moderate vulnerabilities, the existing ESLint 9.39.5
deprecation, and install-script warnings for `esbuild@0.28.2` and
`fsevents@2.3.3` not covered by `allowScripts`. No audit fixes, script approvals,
dependency additions, manifest changes, or lockfile changes were made. A separate
audit investigation was not performed for this task.

The tests comprise 12 validation tests using synthetic fixtures, two static form
render tests, and the unchanged homepage smoke test. Validation cases include
missing/malformed input, leap years and month lengths, exact format and whitespace
rejection, time boundaries, supported/unknown timezones, input immutability, and
errors that do not echo entered values. Gap/fold fixtures explicitly document the
boundary of basic validation. Static tests check labels, required controls,
instruction associations, status markup, and the disabled pre-hydration form.

No browser interaction, screen-reader, responsive visual, or runtime network
capture checks were performed. Static rendering does not verify hydration,
keyboard focus behavior, live announcements, or accessibility conformance. No
coverage percentage or complete issue acceptance is claimed. All five requested
commands were run; none was skipped.

## Changed files

- `src/components/birth-input-form.tsx`: client form and feedback.
- `src/lib/birth-input.ts`: provisional input types and standalone validation.
- `src/app/page.tsx`, `src/app/globals.css`: homepage integration and form styles.
- `tests/birth-input.test.tsx`, `tests/birth-input-form.test.tsx`: validation and
  static render tests; the original homepage test is preserved.
- `README.md`, `docs/product-requirements.md`, `docs/architecture.md`: current
  implementation status and boundaries.
- `docs/birth-input-verification.md`: this record.

Changes are left uncommitted for review. No push, pull request, merge, or issue
status change was performed. `next.config.ts` and its `agentRules: false` setting,
dependency files, and `AGENTS.md` remain unchanged.
