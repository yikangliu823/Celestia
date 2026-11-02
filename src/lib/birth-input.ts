/** Provisional form values, not a calculation-engine contract. */
export type BirthInputValues = {
  date: string;
  time: string;
  timeZone: string;
};

export type BirthInputField = keyof BirthInputValues;
export type BirthInputErrors = Partial<Record<BirthInputField, string>>;

export type BirthInputValidation =
  | { valid: true; values: BirthInputValues }
  | { valid: false; errors: BirthInputErrors };

function isGregorianDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;

  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= daysInMonth[month - 1];
}

function isTimeZone(value: string): boolean {
  // Require a named zone rather than an abbreviation or fixed UTC offset.
  if (value !== "UTC" && !/^[A-Za-z_+-]+(?:\/[A-Za-z0-9_+-]+)+$/.test(value)) {
    return false;
  }
  try {
    new Intl.DateTimeFormat("en", { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

/** Checks syntax only; does not resolve a local time to an instant or log inputs. */
export function validateBirthInput(input: BirthInputValues): BirthInputValidation {
  const values = {
    date: input.date.trim(),
    time: input.time.trim(),
    timeZone: input.timeZone.trim(),
  };
  const errors: BirthInputErrors = {};

  if (!values.date) {
    errors.date = "Enter a birth date in YYYY-MM-DD format.";
  } else if (!isGregorianDate(values.date)) {
    errors.date = "Enter a real Gregorian date in YYYY-MM-DD format (years 0001–9999).";
  }

  if (!values.time) {
    errors.time = "Enter a birth time in 24-hour HH:MM format.";
  } else if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(values.time)) {
    errors.time = "Enter a time from 00:00 to 23:59 in 24-hour HH:MM format.";
  }

  if (!values.timeZone) {
    errors.timeZone = "Enter the birth location’s time zone, such as America/Los_Angeles or UTC.";
  } else if (!isTimeZone(values.timeZone)) {
    errors.timeZone = "Enter a recognized IANA time zone, such as Asia/Shanghai or America/Los_Angeles, or UTC; avoid abbreviations such as PST.";
  }

  return Object.keys(errors).length ? { valid: false, errors } : { valid: true, values };
}
