import assert from "node:assert/strict";
import test from "node:test";
import { validateBirthInput, type BirthInput, type BirthInputField } from "../src/lib/birth-input";

const syntheticInput: BirthInput = {
  birthDate: "2000-02-29",
  birthTime: "14:30",
  timeZone: "Asia/Taipei",
};

function expectInvalidField(field: BirthInputField, value: unknown) {
  const result = validateBirthInput({ ...syntheticInput, [field]: value });
  assert.equal(result.valid, false);
  if (result.valid) assert.fail("Expected validation errors");
  assert.deepEqual(Object.keys(result.errors), [field]);
  assert.match(result.errors[field] ?? "", /Enter/);
  assert.equal("value" in result, false);
}

test("valid synthetic values are returned unchanged without mutating the input", () => {
  const input = Object.freeze({ ...syntheticInput });
  assert.deepEqual(validateBirthInput(input), { valid: true, value: syntheticInput });
  assert.deepEqual(input, syntheticInput);
});

test("missing or malformed input produces actionable errors for all required fields", () => {
  for (const input of [undefined, null, false, 42, "birth input", [], {}, { birthDate: "", birthTime: "", timeZone: "" }]) {
    const result = validateBirthInput(input);
    assert.equal(result.valid, false);
    if (result.valid) assert.fail("Expected validation errors");
    assert.deepEqual(Object.keys(result.errors), ["birthDate", "birthTime", "timeZone"]);
    assert.match(result.errors.birthDate ?? "", /YYYY-MM-DD/);
    assert.match(result.errors.birthTime ?? "", /HH:mm/);
    assert.match(result.errors.timeZone ?? "", /IANA timezone/);
  }
});

test("each field rejects missing and non-string values without coercion", () => {
  for (const field of ["birthDate", "birthTime", "timeZone"] as const) {
    for (const value of [undefined, null, "", 0, 2000, false, {}, [], [syntheticInput[field]]]) {
      expectInvalidField(field, value);
    }
  }
});

test("Gregorian dates accept leap days and exact month boundaries", () => {
  for (const birthDate of ["0001-01-01", "2000-02-29", "2004-02-29", "2024-04-30", "2024-01-31", "9999-12-31"]) {
    assert.equal(validateBirthInput({ ...syntheticInput, birthDate }).valid, true, birthDate);
  }
});

test("Gregorian dates reject impossible dates including century leap-year exceptions", () => {
  for (const value of ["0000-01-01", "1900-02-29", "2100-02-29", "2001-02-29", "2000-02-30", "2024-04-31", "2024-06-31", "2024-09-31", "2024-11-31", "2024-00-01", "2024-13-01", "2024-01-00", "2024-01-32"]) {
    expectInvalidField("birthDate", value);
  }
});

test("dates reject ambiguous formats, whitespace, timestamps, and expanded years", () => {
  for (const value of ["01/02/2000", "2000-2-29", "00-02-29", "10000-01-01", "-001-01-01", "2000-02-29T00:00:00Z", " 2000-02-29", "2000-02-29\n", " "]) {
    expectInvalidField("birthDate", value);
  }
});

test("local times accept midnight, noon, and the last minute without conversion", () => {
  for (const birthTime of ["00:00", "00:01", "12:00", "23:59"]) {
    assert.deepEqual(validateBirthInput({ ...syntheticInput, birthTime }), {
      valid: true,
      value: { ...syntheticInput, birthTime },
    });
  }
});

test("times reject out-of-range values, missing padding, seconds, and timezone suffixes", () => {
  for (const value of ["24:00", "23:60", "-1:00", "1:00", "01:0", "12:00 PM", "12:00:00", "12:00Z", "12:00+08:00", " 12:00", "12:00\n", " "]) {
    expectInvalidField("birthTime", value);
  }
});

test("timezone validation accepts explicit supported named zones and UTC", () => {
  for (const timeZone of ["Asia/Taipei", "America/Los_Angeles", "Europe/London", "Etc/GMT+8", "UTC"]) {
    assert.deepEqual(validateBirthInput({ ...syntheticInput, timeZone }), {
      valid: true,
      value: { ...syntheticInput, timeZone },
    });
  }
});

test("timezone validation rejects unknown zones, places, abbreviations, and raw offsets", () => {
  for (const value of ["Mars/Olympus_Mons", "America/Unknown", "Taipei", "PST", "CST", "+08:00", "-0800", "UTC+8", " Asia/Taipei", "Asia/Taipei\n", " "]) {
    expectInvalidField("timeZone", value);
  }
});

test("basic format validation does not claim to resolve daylight-saving gaps or folds", () => {
  for (const input of [
    { birthDate: "2000-04-02", birthTime: "02:30", timeZone: "America/Los_Angeles" },
    { birthDate: "2000-10-29", birthTime: "01:30", timeZone: "America/Los_Angeles" },
  ]) {
    assert.deepEqual(validateBirthInput(input), { valid: true, value: input });
  }
});

test("invalid values are not echoed in errors or returned as successful data", () => {
  const result = validateBirthInput({ birthDate: "synthetic invalid date", birthTime: "synthetic invalid time", timeZone: "Synthetic/Invalid" });
  assert.equal(result.valid, false);
  assert.doesNotMatch(JSON.stringify(result), /synthetic|Synthetic/);
  assert.equal("value" in result, false);
});
