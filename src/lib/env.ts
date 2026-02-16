/**
 * Environment configuration for intake encryption
 */

import { createPilotAccessClient } from "@omnituum/secure-intake-client/presets/pilot-access";

export interface IntakeEnv {
  endpoint: string;
  x25519PubHex: string;
  kyberPubB64: string;
}

/**
 * Get org public keys and endpoint from Vite environment
 * @throws if required keys are missing
 */
export function getIntakeEnv(): IntakeEnv {
  const endpoint = import.meta.env.VITE_INTAKE_ENDPOINT;
  const x25519PubHex = import.meta.env.VITE_OMNITUUM_X25519_PUB_HEX;
  const kyberPubB64 = import.meta.env.VITE_OMNITUUM_KYBER_PUB_B64;

  if (!endpoint || !x25519PubHex || !kyberPubB64) {
    throw new Error(
      "Missing intake env vars. Set VITE_INTAKE_ENDPOINT, VITE_OMNITUUM_X25519_PUB_HEX, and VITE_OMNITUUM_KYBER_PUB_B64 in .env"
    );
  }

  return { endpoint, x25519PubHex, kyberPubB64 };
}

/**
 * Create the pilot access intake client configured with env public keys.
 */
export function createIntakeClient() {
  const env = getIntakeEnv();
  return createPilotAccessClient({
    endpoint: env.endpoint,
    publicKeys: {
      x25519PubHex: env.x25519PubHex,
      kyberPubB64: env.kyberPubB64,
    },
  });
}
