# Celestia

Celestia is an independent software project exploring deterministic Zi Wei Dou Shu chart generation and AI-assisted chart interpretation.

## Project status

The Issue #1 application scaffold provides a minimal Next.js App Router homepage,
strict TypeScript checking, ESLint, and one automated render smoke test. Birth-input
forms, chart calculation, authentication, persistence, and AI services are not implemented.

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
with `tsx` to render the homepage and check its application heading inside the main
landmark; it is not a browser or end-to-end test. `start` serves the production build
at [localhost:3000](http://localhost:3000) and requires a successful build first.

See [scaffold verification](docs/scaffold-verification.md) for recorded results and
[dependencies](docs/dependencies.md) for pinned versions and license notes.

## Repository structure

```text
src/app/
  layout.tsx             Root HTML layout and metadata
  page.tsx               Minimal Celestia homepage
  globals.css            Base responsive styles
tests/
  home-page.test.tsx      Homepage render smoke test
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
