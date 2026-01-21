import { setPreferredAction, type PreferredAction } from './userPrefs';

/**
 * Open external URL in new tab (for scheduling links, etc.)
 * Works in Chrome, Brave, Firefox, Safari
 */
export function openExternal(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Open mailto link - uses user's configured email handler
 * Uses window.open for more predictable cross-browser behavior
 */
export function openMailto(opts: {
  to: string;
  subject?: string;
  body?: string;
}): void {
  // Build query string manually to avoid double-encoding issues
  const parts: string[] = [];
  if (opts.subject) parts.push(`subject=${encodeURIComponent(opts.subject)}`);
  if (opts.body) parts.push(`body=${encodeURIComponent(opts.body)}`);

  const queryString = parts.length > 0 ? `?${parts.join('&')}` : '';
  const href = `mailto:${opts.to}${queryString}`;

  // Use window.open - more reliable than location.href for mailto
  window.open(href, '_self');
}

/**
 * Open Gmail compose directly (bypasses system mailto handler)
 * Useful when user prefers Gmail but system default is different
 */
export function openGmailCompose(opts: {
  to: string;
  subject?: string;
  body?: string;
}): void {
  const params = new URLSearchParams();
  params.set('to', opts.to);
  if (opts.subject) params.set('su', opts.subject);
  if (opts.body) params.set('body', opts.body);

  const href = `https://mail.google.com/mail/?view=cm&${params.toString()}`;
  window.open(href, '_blank', 'noopener,noreferrer');
}

/**
 * Record user's preferred action for future visits
 */
export function recordPreference(action: PreferredAction): void {
  setPreferredAction(action);
}

// Centralized contact config
export const CONTACT_CONFIG = {
  email: 'pilot@omnituum.com',
  // Update this when you have a Cal.com/Calendly link
  scheduleUrl: 'https://cal.com/omnituum/pilot',
} as const;

// Pre-built email templates
export const EMAIL_TEMPLATES = {
  pilotRequest: {
    subject: 'Omni Pilot Access Request',
    body: `Hi Omni team,

I'd like to request pilot access for post-quantum security evaluation.

Target Environment:
Use Case:
Timeline:

Thanks,`,
  },
  evaluationCall: {
    subject: 'Omni Pilot Evaluation Call Request',
    body: `I'd like to schedule a 20-minute evaluation call to discuss:

- Target Environment:
- Use Case:
- Timeline:

Please let me know your availability.`,
  },
} as const;
