"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import {
  validateBirthInput,
  type BirthInputErrors,
  type BirthInputField,
  type BirthInputValues,
} from "../lib/birth-input";

const fields: { key: BirthInputField; label: string; hint: string; placeholder: string }[] = [
  {
    key: "date",
    label: "Birth date (required)",
    hint: "Use the Gregorian calendar and YYYY-MM-DD format.",
    placeholder: "2000-01-15",
  },
  {
    key: "time",
    label: "Birth time (required)",
    hint: "Enter the local clock time at birth in 24-hour HH:MM format, to the minute.",
    placeholder: "14:30",
  },
  {
    key: "timeZone",
    label: "Birth location time zone (required)",
    hint: "Use an IANA zone for the birthplace, such as Asia/Shanghai or America/Los_Angeles, or UTC. Your device’s zone is not selected automatically.",
    placeholder: "Asia/Shanghai",
  },
];

const emptyValues: BirthInputValues = { date: "", time: "", timeZone: "" };
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function BirthInputFields({ values, errors, onChange }: {
  values: BirthInputValues;
  errors: BirthInputErrors;
  onChange: (field: BirthInputField, value: string) => void;
}) {
  return fields.map(({ key, label, hint, placeholder }) => (
    <div className="form-field" key={key}>
      <label htmlFor={`birth-${key}`}>{label}</label>
      <p className="field-hint" id={`birth-${key}-hint`}>{hint}</p>
      <input
        id={`birth-${key}`}
        type="text"
        required
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        placeholder={placeholder}
        value={values[key]}
        aria-invalid={errors[key] ? true : undefined}
        aria-describedby={`birth-${key}-hint${errors[key] ? ` birth-${key}-error` : ""}`}
        onChange={(event) => onChange(key, event.target.value)}
      />
      {errors[key] && <p className="field-error" id={`birth-${key}-error`}>{errors[key]}</p>}
    </div>
  ));
}

export default function BirthInputForm() {
  const ready = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<BirthInputErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [valid, setValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const pendingFocus = useRef<BirthInputField | null>(null);

  // Focus after error descriptions have been added to the DOM.
  useEffect(() => {
    if (pendingFocus.current) {
      formRef.current?.querySelector<HTMLInputElement>(`#birth-${pendingFocus.current}`)?.focus();
      pendingFocus.current = null;
    }
  });

  function changeValue(field: BirthInputField, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    setValid(false);
    if (attempted) {
      const result = validateBirthInput(next);
      setErrors(result.valid ? {} : result.errors);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateBirthInput(values);
    setAttempted(true);
    setValid(result.valid);
    setErrors(result.valid ? {} : result.errors);
    if (!result.valid) {
      pendingFocus.current = fields.find(({ key }) => result.errors[key])?.key ?? null;
    }
  }

  return (
    <section aria-labelledby="birth-input-heading">
      <h2 id="birth-input-heading">Check birth inputs</h2>
      <p>Check a date, local time, and birthplace time zone. Chart calculation is not available yet.</p>
      <p id="birth-privacy">This form checks entries in your browser. Entries are not sent, saved, or logged by the application.</p>
      <noscript>Enable JavaScript to check birth inputs.</noscript>
      {/* No names: native submission cannot serialize birth values, even before hydration. */}
      <form ref={formRef} onSubmit={submit} noValidate autoComplete="off" aria-describedby="birth-privacy">
        <fieldset disabled={!ready}>
          <legend>Birth details</legend>
          {Object.keys(errors).length > 0 && (
            <div className="error-summary" role="alert">
              <p>Please correct the following fields:</p>
              <ul>
                {fields.filter(({ key }) => errors[key]).map(({ key, label }) => (
                  <li key={key}><a href={`#birth-${key}`}>{label}: {errors[key]}</a></li>
                ))}
              </ul>
            </div>
          )}
          <BirthInputFields values={values} errors={errors} onChange={changeValue} />
          <button type="submit">Check inputs</button>
        </fieldset>
        <p role="status" aria-live="polite">
          {valid ? "Input format checks passed. No chart has been calculated. Local-time daylight-saving validity has not been checked." : ""}
        </p>
      </form>
    </section>
  );
}
