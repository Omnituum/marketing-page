export type PreferredAction = 'call' | 'email';

const KEY = 'omni_preferred_action';

export function getPreferredAction(): PreferredAction {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'email' || v === 'call' ? v : 'call';
  } catch {
    // localStorage unavailable (SSR, private browsing, etc.)
    return 'call';
  }
}

export function setPreferredAction(v: PreferredAction): void {
  try {
    localStorage.setItem(KEY, v);
  } catch {
    // Silently fail if localStorage unavailable
  }
}
