import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <Container className="text-center">
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent">
          HTTP 404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Route not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-fg-muted">
          This path doesn&apos;t resolve to anything in the cluster. The
          ingress logs have already noted it.
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/">Back to danshly.com</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
