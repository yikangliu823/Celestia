import assert from "node:assert/strict";
import test from "node:test";
import { validateBirthInput, type BirthInputField, type BirthInputValues } from "../src/lib/birth-input";

const syntheticInput: BirthInputValues = {
  date: "2000-01-15",
  time: "14:30",
  timeZone: "Asia/Shanghai",
};

test("valid input returns trimmed values without mutating the caller's input", () => {
  const input = { date: " 2000-01-15 ", time: " 14:30 ", timeZone: " Asia/Shanghai " };
  const original = { ...input };
  assert.deepEqual(validateBirthInput(input), { valid: true, values: syntheticInput });
  assert.deepEqual(input, original);
});

test("all missing fields receive actionable errors and no validated values", () => {
  const result = validateBirthInput({ date: "", time: "   ", timeZone: "\t" });
  assert.equal(result.valid, false);
  if (result.valid) return;
  assert.deepEqual(Object.keys(result.errors), ["date", "time", "timeZone"]);
  assert.match(result.errors.date!, /YYYY-MM-DD/);
  assert.match(result.errors.time!, /HH:MM/);
  assert.match(result.errors.timeZone!, /America\/Los_Angeles/);
  assert.equal("values" in result, false);
});

function invalidField(field: BirthInputField, value: string) {
  const result = validateBirthInput({ ...syntheticInput, [field]: value });
  assert.equal(result.valid, false);
  if (result.valid) return;
  assert.deepEqual(Object.keys(result.errors), [field]);
  assert.ok(result.errors[field]);
  assert.equal("values" in result, false);
}

for (const date of [
  "0000-01-01", "10000-01-01", "2001-02-29", "1900-02-29", "2100-02-29",
  "2000-04-31", "2000-02-30", "2000-00-01", "2000-13-01", "2000-01-00",
  "2000-01-32", "2000-1-15", "01/15/2000", "2000-01-15T14:30", "invalid",
]) {
  test(`rejects invalid Gregorian date: ${date}`, () => invalidField("date", date));
}

for (const date of ["0001-01-01", "1900-02-28", "2000-02-29", "2024-02-29", "9999-12-31"]) {
  test(`accepts real Gregorian date without inventing an engine year range: ${date}`, () => {
    assert.equal(validateBirthInput({ ...syntheticInput, date }).valid, true);
  });
}

for (const time of ["24:00", "23:60", "-1:00", "12:99", "9:30", "12:3", "12:30:00", "2:30 PM", "noon"]) {
  test(`rejects invalid minute-precision time: ${time}`, () => invalidField("time", time));
}

for (const time of ["00:00", "12:00", "23:59"]) {
  test(`accepts time boundary: ${time}`, () => {
    assert.equal(validateBirthInput({ ...syntheticInput, time }).valid, true);
  });
}

for (const timeZone of ["UTC", "America/Los_Angeles", "Asia/Kolkata", "Pacific/Auckland"]) {
  test(`accepts named time zone: ${timeZone}`, () => {
    assert.equal(validateBirthInput({ ...syntheticInput, timeZone }).valid, true);
  });
}

for (const timeZone of ["PST", "CST", "+08:00", "UTC+8", "Mars/Olympus", "Los Angeles"]) {
  test(`rejects unknown zones, abbreviations, and raw offsets: ${timeZone}`, () => {
    invalidField("timeZone", timeZone);
  });
}

test("errors do not echo rejected input", () => {
  const rejected = "synthetic-private-value";
  const result = validateBirthInput({ date: rejected, time: rejected, timeZone: rejected });
  assert.equal(result.valid, false);
  assert.ok(!JSON.stringify(result).includes(rejected));
});

test("validation does not log valid or rejected birth information", (context) => {
  const spies = (["log", "info", "warn", "error", "debug", "trace", "dir", "table"] as const)
    .map((method) => context.mock.method(console, method, () => {}));
  validateBirthInput(syntheticInput);
  validateBirthInput({ date: "synthetic-invalid", time: "25:00", timeZone: "Unknown/Zone" });
  for (const spy of spies) assert.equal(spy.mock.callCount(), 0);
});

test("reports multiple errors together and permits correction", () => {
  const result = validateBirthInput({ ...syntheticInput, date: "2001-02-29", time: "25:00" });
  assert.equal(result.valid, false);
  if (result.valid) return;
  assert.deepEqual(Object.keys(result.errors), ["date", "time"]);
  assert.equal(validateBirthInput(syntheticInput).valid, true);
});

test("format checks do not pretend to resolve daylight-saving gaps or overlaps", () => {
  for (const [date, time] of [["2024-03-10", "02:30"], ["2024-11-03", "01:30"]]) {
    assert.equal(validateBirthInput({ date, time, timeZone: "America/Los_Angeles" }).valid, true);
  }
});
