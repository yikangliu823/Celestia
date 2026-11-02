# Architecture

**Status:** Application scaffold implemented for Issue #1, with local birth-input
validation added for Issue #3. The calculation interface is absent from this
checkout; the other logical components below remain proposed.

## Application foundation

The scaffold uses Next.js App Router, React, and strict TypeScript, as requested in
Issue #1. Route components and the root layout live in `src/app`; tests live in
`tests`. Styling uses plain CSS. No application services or persistence exist yet.
Future calculation code must remain independent of route components and AI code.
See [dependencies](dependencies.md) for exact versions and license notes.

The homepage renders a client form in `src/components/birth-input-form.tsx`.
`src/lib/birth-input.ts` provides pure format validation and provisional form value
types, not a chart engine interface. Form values stay in component memory, with no
logging, transmission, storage, or chart calculation. Native controls, associated
labels and error descriptions, an error summary, and focus on the first invalid
field support keyboard and assistive-technology use. No dependencies were added.
See [birth-input scope and verification](birth-input-verification.md) for unresolved
input requirements. Any future server entry point must independently validate
inputs; browser checks are not a server trust boundary.

`next.config.ts` sets `agentRules: false` so development startup does not create or
rewrite instruction files. This preserves explicit control of `AGENTS.md` for the
planned Issue #3 experiment; no experimental branches have been created.

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
