import "server-only";

import type { ContactInput } from "@/lib/validation";

export interface DeliveryContext {
  ip: string;
  userAgent: string | null;
  receivedAt: Date;
}

/**
 * Deliver a validated contact message.
 *
 * Default transport is a self-hosted webhook (ntfy, n8n, Mattermost, …)
 * configured via CONTACT_WEBHOOK_URL — no third-party email SaaS involved.
 * Without a webhook, messages are emitted as structured logs, which our
 * log pipeline (container runtime → Loki) already captures and alerts on.
 *
 * To add SMTP later: implement another branch here (e.g. nodemailer against
 * the self-hosted mail relay). Callers never change.
 */
export async function deliverContactMessage(
  message: ContactInput,
  context: DeliveryContext,
): Promise<void> {
  const record = {
    kind: "contact.message",
    name: message.name,
    email: message.email,
    message: message.message,
    ip: context.ip,
    userAgent: context.userAgent,
    receivedAt: context.receivedAt.toISOString(),
  };

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      throw new Error(`Contact webhook responded with ${response.status}`);
    }
    return;
  }

  console.info(`[contact] ${JSON.stringify(record)}`);
}
