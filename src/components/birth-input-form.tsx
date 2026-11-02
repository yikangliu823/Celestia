"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import {
  validateBirthInput,
  type BirthInput,
  type BirthInputErrors,
  type BirthInputField,
} from "../lib/birth-input";

const fields: { name: BirthInputField; label: string; hint: string; placeholder: string }[] = [
  {
    name: "birthDate",
    label: "Birth date (Gregorian)",
    hint: "Use YYYY-MM-DD, for example 2000-02-29. Lunar dates are not supported by this form.",
    placeholder: "YYYY-MM-DD",
  },
  {
    name: "birthTime",
    label: "Local birth time",
    hint: "Use 24-hour HH:mm, for example 14:30. Enter the clock time at the birth location.",
    placeholder: "HH:mm",
  },
  {
    name: "timeZone",
    label: "Birth location timezone",
    hint: "Enter an IANA timezone such as Asia/Taipei or America/Los_Angeles, or UTC. No timezone is chosen automatically.",
    placeholder: "Asia/Taipei",
  },
];

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function BirthInputForm() {
  // Keep native submission unavailable until the client handler can prevent it.
  const isInteractive = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [values, setValues] = useState<BirthInput>({ birthDate: "", birthTime: "", timeZone: "" });
  const [errors, setErrors] = useState<BirthInputErrors>({});
  const [isValid, setIsValid] = useState(false);
  const inputRefs = useRef<Partial<Record<BirthInputField, HTMLInputElement | null>>>({});
  const invalidFields = fields.filter(({ name }) => errors[name]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateBirthInput(values);
    setIsValid(result.valid);
    setErrors(result.valid ? {} : result.errors);

    if (!result.valid) {
      const firstInvalidField = fields.find(({ name }) => result.errors[name]);
      if (firstInvalidField) inputRefs.current[firstInvalidField.name]?.focus();
    }
  }

  function updateField(name: BirthInputField, value: string) {
    setValues((previous) => ({ ...previous, [name]: value }));
    setIsValid(false);
    setErrors((previous) => {
      const next = { ...previous };
      delete next[name];
      return next;
    });
  }

  return (
    <section aria-labelledby="birth-input-heading">
      <h2 id="birth-input-heading">Check birth inputs</h2>
      <p id="birth-input-scope">
        Check the date, time, and timezone formats here. Chart calculation is not available,
        and additional chart inputs have not yet been defined.
      </p>
      <p id="birth-input-privacy">
        These entries stay in this page’s memory. They are not sent, saved, or logged by Celestia.
      </p>
      <noscript><p>Enable JavaScript to use this form. Entries cannot be submitted without it.</p></noscript>
      <form
        aria-labelledby="birth-input-heading"
        aria-describedby="birth-input-scope birth-input-privacy"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <fieldset disabled={!isInteractive}>
          <legend>Birth details — all fields are required</legend>
          {invalidFields.length > 0 && (
            <div className="error-summary" role="alert">
              <p>Correct {invalidFields.length} {invalidFields.length === 1 ? "field" : "fields"} and check again.</p>
              <ul>
                {invalidFields.map(({ name, label }) => (
                  <li key={name}>
                    <a href={`#${name}`} onClick={(event) => {
                      event.preventDefault();
                      inputRefs.current[name]?.focus();
                    }}>{label}: {errors[name]}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {fields.map(({ name, label, hint, placeholder }) => (
            <div className="form-field" key={name}>
              <label htmlFor={name}>{label} (required)</label>
              <p className="field-hint" id={`${name}-hint`}>{hint}</p>
              <input
                id={name}
                ref={(element) => { inputRefs.current[name] = element; }}
                type="text"
                required
                spellCheck={false}
                autoCapitalize="none"
                placeholder={placeholder}
                value={values[name]}
                onChange={(event) => updateField(name, event.target.value)}
                aria-invalid={Boolean(errors[name])}
                aria-describedby={`${name}-hint${errors[name] ? ` ${name}-error` : ""}`}
              />
              {errors[name] && <p className="field-error" id={`${name}-error`}>{errors[name]}</p>}
            </div>
          ))}
          <button type="submit">Check inputs</button>
        </fieldset>
        <p role="status">
          {isValid ? "These inputs passed basic validation. No chart has been calculated. Historical timezone offsets and daylight-saving time conflicts have not been checked." : ""}
        </p>
      </form>
    </section>
  );
}
