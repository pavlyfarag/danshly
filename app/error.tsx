"use client";

import { useEffect } from "react";

import { Container } from "@/components/ui/container";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in the browser console; the server side is already logged.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <Container className="text-center">
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-danger">
          Runtime error
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Something failed on our side
        </h1>
        <p className="mx-auto mt-4 max-w-md text-fg-muted">
          The error is logged and alerting is on. You can try again, or just
          email us at hello@danshly.com.
        </p>
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-accent-strong px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            Try again
          </button>
        </div>
      </Container>
    </section>
  );
}
