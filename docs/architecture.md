# Architecture

**Status:** Application scaffold and provisional local birth-input validation are
implemented. Chart calculation and the remaining services below are proposed.

## Application foundation

The scaffold uses Next.js App Router, React, and strict TypeScript, as requested in
Issue #1. Route components and the root layout live in `src/app`; tests live in
`tests`. Styling uses plain CSS. No application services or persistence exist yet.
Future calculation code must remain independent of route components and AI code.
See [dependencies](dependencies.md) for exact versions and license notes.

The homepage renders `src/components/birth-input-form.tsx` as a client component.
It calls the standalone `src/lib/birth-input.ts` validator with local state and
does not submit inputs to a server or store them outside page memory. The validator
narrows unknown values and checks Gregorian date validity, local time format, and
named timezone support through the runtime's `Intl` implementation. It performs no
timezone conversion or chart computation. Form controls remain disabled until
hydration; they have no native submission names. See the
[Issue #3 record](birth-input-verification.md) for verification and open decisions.

No calculation interface exists in this checkout. The form types are provisional
and must be reconciled with that contract when defined. Browser validation is not
a server trust boundary: any future API must validate requests independently and
add the calculation-specific checks before consuming them.

`next.config.ts` sets `agentRules: false` so development startup does not create or
rewrite instruction files. This preserves explicit control of `AGENTS.md`.

## Logical components

1. **Chart engine:** Pure functions that transform validated inputs into structured chart data.
2. **Application interface:** Accessible forms, chart visualization, and reading history.
3. **Application API:** Request validation, authentication, authorization, and rate limiting.
4. **Interpretation service:** Converts selected chart facts into constrained AI requests and streams responses.
5. **Persistence:** Encrypted or otherwise appropriately protected private records, with ownership checks.

## Design constraints

- A language model must not be the source of calculated chart positions.
- Sensitive input must be minimized before interpretation requests.
- External integrations must be reviewed for licensing and data handling.
- Data access must be enforced server-side.
- Any proposed technology stack must be confirmed before dependencies are added.

## Verification plan

Establish fixed calculation fixtures, API contract tests, authorization tests, and accessible interaction tests during implementation.

## Open decisions

Database, hosting, authentication provider, calculation engine, and model provider have not been selected for this independent implementation.
