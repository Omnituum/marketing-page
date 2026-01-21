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
 * (Gmail web handler, Outlook, local mail app, etc.)
 * Works across all browsers
 */
export function openMailto(opts: {
  to: string;
  subject?: string;
  body?: string;
}): void {
  const params = new URLSearchParams();
  if (opts.subject) params.set('subject', opts.subject);
  if (opts.body) params.set('body', opts.body);

  const queryString = params.toString();
  const href = `mailto:${encodeURIComponent(opts.to)}${queryString ? `?${queryString}` : ''}`;

  window.location.href = href;
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
