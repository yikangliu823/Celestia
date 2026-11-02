import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import BirthInputForm, { BirthInputFields } from "../src/components/birth-input-form";
import { validateBirthInput } from "../src/lib/birth-input";

const emptyValues = { date: "", time: "", timeZone: "" };

test("required fields have labels and associated instructions", () => {
  const markup = renderToStaticMarkup(<BirthInputForm />);
  for (const key of ["date", "time", "timeZone"]) {
    assert.match(markup, new RegExp(`<label for="birth-${key}">[^<]+\\(required\\)</label>`));
    assert.match(markup, new RegExp(`<input[^>]+id="birth-${key}"[^>]+required=""`));
    assert.match(markup, new RegExp(`aria-describedby="birth-${key}-hint"`));
    assert.match(markup, new RegExp(`id="birth-${key}-hint"`));
  }
  assert.match(markup, /<button type="submit">Check inputs<\/button>/);
  assert.match(markup, /role="status" aria-live="polite"/);
  assert.doesNotMatch(markup, /aria-invalid="true"/);
});

test("each invalid field exposes its actionable error to assistive technology", () => {
  const result = validateBirthInput(emptyValues);
  assert.equal(result.valid, false);
  if (result.valid) return;
  const markup = renderToStaticMarkup(
    <BirthInputFields values={emptyValues} errors={result.errors} onChange={() => {}} />,
  );
  for (const key of ["date", "time", "timeZone"]) {
    assert.match(markup, new RegExp(`<input[^>]+id="birth-${key}"[^>]+aria-invalid="true"`));
    assert.match(markup, new RegExp(`aria-describedby="birth-${key}-hint birth-${key}-error"`));
    assert.match(markup, new RegExp(`<p[^>]+id="birth-${key}-error">[^<]+</p>`));
  }
});

test("server markup prevents pre-hydration submission and explains the JavaScript requirement", () => {
  const markup = renderToStaticMarkup(<BirthInputForm />);
  assert.match(markup, /<fieldset disabled="">/);
  assert.match(markup, /<noscript>Enable JavaScript to check birth inputs\.<\/noscript>/);
  assert.doesNotMatch(markup, /<input[^>]+name=/);
  assert.match(markup, /not sent, saved, or logged by the application/);
  assert.match(markup, /Chart calculation is not available yet/);
});
