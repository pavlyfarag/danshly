"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const inputClass =
  "w-full rounded-lg border border-edge bg-panel-2 px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-faint transition-colors focus:border-accent/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-accent";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      // Honeypot — humans never see or fill this field.
      website: String(data.get("website") ?? ""),
    };

    const errors: FieldErrors = {};
    if (payload.name.length < 2) errors.name = "Please enter your name.";
    if (!EMAIL_PATTERN.test(payload.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (payload.message.length < 10) {
      errors.message = "Tell us a little more — at least 10 characters.";
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("submitting");
    setFormError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 429) {
        setStatus("error");
        setFormError("Too many requests from your network — please try again in a minute.");
        return;
      }
      if (!response.ok) {
        setStatus("error");
        setFormError("Something went wrong on our side. Email us instead: hello@danshly.com");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setFormError("Network error — check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex h-full min-h-72 flex-col items-center justify-center rounded-2xl border border-ok/25 bg-ok/[0.04] p-10 text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ok">
          message delivered
        </p>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
          Thanks — your message is in our queue. A human (one of the two
          adults) will reply within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-medium text-accent transition-colors hover:text-fg"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="rounded-2xl border border-edge bg-panel/70 p-7 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-fg">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
            placeholder="Ada Lovelace"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            className={inputClass}
          />
          {fieldErrors.name ? (
            <p id="contact-name-error" className="mt-1.5 text-xs text-danger">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-fg">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            className={inputClass}
          />
          {fieldErrors.email ? (
            <p id="contact-email-error" className="mt-1.5 text-xs text-danger">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-fg">
          Project details
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="What are you building? Timelines, constraints, the works."
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          className={`${inputClass} resize-y`}
        />
        {fieldErrors.message ? (
          <p id="contact-message-error" className="mt-1.5 text-xs text-danger">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: visually hidden and skipped by keyboard/AT users. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-fg-faint">
          POST /api/contact · validated · rate-limited
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 rounded-lg bg-accent-strong px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Transmitting…" : "Send message"}
        </button>
      </div>

      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-danger">
        {formError}
      </p>
    </form>
  );
}
