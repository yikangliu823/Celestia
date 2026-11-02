import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import BirthInputForm from "../src/components/birth-input-form";

test("form renders required fields with labels and associated instructions", () => {
  const markup = renderToStaticMarkup(<BirthInputForm />);
  assert.match(markup, /<form[^>]*aria-labelledby="birth-input-heading"/);
  assert.match(markup, /<legend>Birth details — all fields are required<\/legend>/);
  for (const field of ["birthDate", "birthTime", "timeZone"]) {
    assert.match(markup, new RegExp(`<label for="${field}">[^<]+\\(required\\)</label>`));
    assert.match(markup, new RegExp(`<input[^>]*id="${field}"[^>]*required=""[^>]*aria-describedby="${field}-hint"`));
    assert.match(markup, new RegExp(`<p[^>]*id="${field}-hint"`));
  }
  assert.match(markup, /<button type="submit">Check inputs<\/button>/);
  assert.match(markup, /<p role="status"><\/p>/);
});

test("server-rendered form prevents entry before hydration and explains its limits", () => {
  const markup = renderToStaticMarkup(<BirthInputForm />);
  assert.match(markup, /<fieldset disabled="">/);
  assert.match(markup, /<noscript>[\s\S]*Enable JavaScript/);
  assert.match(markup, /Chart calculation is not available/);
  assert.match(markup, /not sent, saved, or logged by Celestia/);
  assert.doesNotMatch(markup, /<input[^>]*\bname=/);
  assert.doesNotMatch(markup, /<input[^>]*value="[^"]+"/);
  assert.doesNotMatch(markup, /<form[^>]*\baction=/);
});
