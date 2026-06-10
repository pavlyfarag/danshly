/**
 * Hand-rolled, dependency-free validation for the contact endpoint.
 * Shape-checks unknown input at the trust boundary and returns typed data.
 */

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export interface FieldError {
  field: keyof ContactInput;
  message: string;
}

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: readonly FieldError[] };

const LIMITS = {
  name: { min: 2, max: 120 },
  email: { min: 6, max: 254 },
  message: { min: 10, max: 5000 },
} as const;

/** Pragmatic e-mail shape check; real verification happens by replying. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** C0/C1 control characters except \n and \t (allowed in messages). */
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;

function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === "string" ? value.replace(CONTROL_CHARS, "").trim() : "";
}

export function validateContact(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return {
      ok: false,
      errors: [{ field: "name", message: "Malformed request body." }],
    };
  }

  const source = input as Record<string, unknown>;
  const name = readString(source, "name");
  const email = readString(source, "email");
  const message = readString(source, "message");

  const errors: FieldError[] = [];

  if (name.length < LIMITS.name.min || name.length > LIMITS.name.max) {
    errors.push({ field: "name", message: "Please provide your name." });
  }
  if (
    email.length < LIMITS.email.min ||
    email.length > LIMITS.email.max ||
    !EMAIL_PATTERN.test(email)
  ) {
    errors.push({ field: "email", message: "Please provide a valid email address." });
  }
  if (message.length < LIMITS.message.min) {
    errors.push({ field: "message", message: "Tell us a little more — at least 10 characters." });
  }
  if (message.length > LIMITS.message.max) {
    errors.push({ field: "message", message: "Message is too long (5000 characters max)." });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return { ok: true, data: { name, email, message } };
}
