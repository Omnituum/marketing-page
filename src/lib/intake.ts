/**
 * Client-side encrypted intake submission
 */

import { createIntakeClient } from "./env";

export type {
  RequestFormData,
  PilotAccessKind,
  SubmitResult,
  CryptoCapability,
} from "@omnituum/secure-intake-client/presets/pilot-access";

// Lazy singleton client
let client: ReturnType<typeof createIntakeClient> | null = null;

function getClient() {
  if (!client) {
    client = createIntakeClient();
  }
  return client;
}

/**
 * Check if the browser has required crypto primitives.
 */
export async function checkCryptoCapability(force = false) {
  return getClient().checkCryptoCapability(force);
}

/**
 * Submit encrypted intake request.
 */
export async function submitRequestAccess(
  formData: import("@omnituum/secure-intake-client/presets/pilot-access").RequestFormData,
  kind: "request_access" | "request_pilot_access" = "request_pilot_access",
  honeypot?: string
) {
  return getClient().submit(formData, kind, honeypot);
}
