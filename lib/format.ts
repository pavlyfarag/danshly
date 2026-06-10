/**
 * Deterministic, locale-independent formatting helpers.
 * Everything renders on the server, but UTC keeps output stable and honest.
 */

export function formatUtc(date: Date): string {
  return `${date.toISOString().slice(0, 16).replace("T", " ")} UTC`;
}

export function formatRelative(date: Date, now: Date = new Date()): string {
  const deltaSeconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));

  if (deltaSeconds < 60) return "just now";
  if (deltaSeconds < 3600) {
    const minutes = Math.floor(deltaSeconds / 60);
    return `${minutes} min ago`;
  }
  if (deltaSeconds < 86_400) {
    const hours = Math.floor(deltaSeconds / 3600);
    return `${hours} h ago`;
  }
  const days = Math.floor(deltaSeconds / 86_400);
  return `${days} d ago`;
}
