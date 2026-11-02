import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "../src/app/page";

test("homepage renders the application name inside the main landmark", () => {
  const markup = renderToStaticMarkup(<HomePage />);

  assert.match(markup, /^<main>[\s\S]*<h1>Celestia<\/h1>[\s\S]*<\/main>$/);
});
