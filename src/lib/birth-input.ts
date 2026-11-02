/** Provisional form values; this is not a chart calculation contract. */
export type BirthInput = {
  birthDate: string;
  birthTime: string;
  timeZone: string;
};

export type BirthInputField = keyof BirthInput;
export type BirthInputErrors = Partial<Record<BirthInputField, string>>;

export type BirthInputValidationResult =
  | { valid: true; value: BirthInput }
  | { valid: false; errors: BirthInputErrors };

function isGregorianDate(value: string): boolean {
  if (value.length !== 10 || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;

  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= daysInMonth[month - 1];
}

function isSupportedTimeZone(value: string): boolean {
  // Require a named zone, rather than a potentially ambiguous abbreviation or offset.
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

export function validateBirthInput(input: unknown): BirthInputValidationResult {
  const fields =
    typeof input === "object" && input !== null && !Array.isArray(input) ? input : {};
  const birthDate = "birthDate" in fields ? fields.birthDate : undefined;
  const birthTime = "birthTime" in fields ? fields.birthTime : undefined;
  const timeZone = "timeZone" in fields ? fields.timeZone : undefined;
  const errors: BirthInputErrors = {};

  if (typeof birthDate !== "string" || birthDate === "") {
    errors.birthDate = "Enter a birth date in YYYY-MM-DD format.";
  } else if (!isGregorianDate(birthDate)) {
    errors.birthDate = "Enter a real Gregorian date in YYYY-MM-DD format (years 0001–9999).";
  }

  if (typeof birthTime !== "string" || birthTime === "") {
    errors.birthTime = "Enter the local birth time in HH:mm format.";
  } else if (birthTime.length !== 5 || !/^([01]\d|2[0-3]):[0-5]\d$/.test(birthTime)) {
    errors.birthTime = "Enter a 24-hour time from 00:00 to 23:59, for example 14:30.";
  }

  if (typeof timeZone !== "string" || timeZone === "") {
    errors.timeZone = "Enter the birth location’s IANA timezone, for example Asia/Taipei, or UTC.";
  } else if (!isSupportedTimeZone(timeZone)) {
    errors.timeZone = "Enter a timezone supported by this browser, such as Asia/Taipei or America/Los_Angeles, or UTC. Do not use an abbreviation or numeric offset.";
  }

  if (
    Object.keys(errors).length > 0 ||
    typeof birthDate !== "string" ||
    typeof birthTime !== "string" ||
    typeof timeZone !== "string"
  ) {
    return { valid: false, errors };
  }

  return { valid: true, value: { birthDate, birthTime, timeZone } };
}
