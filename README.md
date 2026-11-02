# Celestia

Celestia is an independent software project exploring deterministic Zi Wei Dou Shu chart generation and AI-assisted chart interpretation.

## Project status

The Next.js homepage includes a local birth-input form with basic validation for
a Gregorian date, local time, and explicit timezone. It provides labeled fields,
linked errors, and validation status feedback. Entries are held only in page memory.
Chart calculation, authentication, persistence, and AI services are not implemented.
The calculation interface and additional required chart inputs remain undefined;
see the [Issue #3 implementation record](docs/birth-input-verification.md).

## Local development

Use Node.js 22.13 or newer and npm. Verification used Node.js 26.11.0 and npm 11.20.0.
No environment variables or provider credentials are required.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Stop the server with Ctrl+C.

## Verification and production

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm start
```

`typecheck` generates Next.js route types before running TypeScript, including on
a fresh checkout. `lint` treats warnings as failures. `test` uses Node's test runner
with `tsx` for birth-input validation and static form/homepage rendering;
these are not browser or end-to-end tests. `start` serves the production build
at [localhost:3000](http://localhost:3000) and requires a successful build first.

See [scaffold verification](docs/scaffold-verification.md) for recorded results and
[dependencies](docs/dependencies.md) for pinned versions and license notes.

## Repository structure

```text
src/app/
  layout.tsx             Root HTML layout and metadata
  page.tsx               Celestia homepage with birth-input form
  globals.css            Base responsive styles
src/components/
  birth-input-form.tsx    Client form and accessible validation feedback
src/lib/
  birth-input.ts          Standalone basic validation and provisional input types
tests/
  home-page.test.tsx      Homepage render smoke test
  birth-input.test.tsx    Synthetic validation fixtures
  birth-input-form.test.tsx Static form render checks
docs/                    Product, architecture, dependency, and verification records
eslint.config.mjs         Next.js and TypeScript lint rules
next.config.ts            Disable automatic agent instruction generation
tsconfig.json            Strict TypeScript configuration
package.json             Scripts and direct dependencies
package-lock.json        Reproducible dependency resolution
```

## Planned capabilities

- Calculate reproducible natal charts using a documented calculation library.
- Display chart data in an accessible interface.
- Explain structured chart data through a server-side AI service.
- Store private charts with authenticated access.
- Explore compatibility analysis and practitioner workflows in later iterations.

## Engineering documents

- [Product requirements](docs/product-requirements.md)
- [Engineering rules](AGENTS.md)
- [Architecture decisions](docs/architecture.md)

## Intellectual property

Celestia is an independent project. External repositories may inform engineering decisions, but their code, assets, text, and documentation must not be copied without an explicit license review. Any subsequently incorporated third-party material must retain the notices required by its license.

## Interpretation notice

Astrological readings are interpretive cultural content, not scientifically validated predictions. They must not be presented as medical, legal, or financial advice.
