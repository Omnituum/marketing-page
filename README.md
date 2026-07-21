# Omnituum Marketing

Marketing website for Omnituum — browser-native post-quantum cryptography for secure messaging, files, and identities.

## What This Is

A single-page marketing site for [omnituum.com](https://omnituum.com/) that showcases Omnituum's post-quantum security platform. Includes hero, threat/solution messaging, technical deep-dives, feature highlights, developer info, and an encrypted pilot access signup form powered by `@omnituum/secure-intake-client`.

## Status

**Production** — live at [omnituum.com](https://omnituum.com/) (v1.0.0).

## Getting Started

**Prerequisites:** Node.js >= 20, pnpm

```bash
# Install dependencies
pnpm install

# Start dev server (port 3000)
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview
```

**Environment:** Copy `.env.example` and set:
- `VITE_INTAKE_ENDPOINT` — secure intake API URL
- `VITE_OMNITUUM_X25519_PUB_HEX` — X25519 public key (hex)
- `VITE_OMNITUUM_KYBER_PUB_B64` — Kyber public key (base64)

## Repository Structure

```
omnituum-marketing/
├── src/
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # React DOM mount
│   ├── components/              # 19 React components
│   │   ├── OmniPage.tsx         # Main page orchestrator
│   │   ├── OmniHero.tsx         # Hero section
│   │   ├── ThreatSection.tsx    # Problem messaging
│   │   ├── SolutionSection.tsx  # Solution pitch
│   │   ├── TechSection.tsx      # Technology deep-dive
│   │   ├── PilotSection.tsx     # Pilot access signup
│   │   └── ...                  # 13 more sections/modals
│   ├── context/                 # Modal state management
│   ├── hooks/                   # Custom hooks
│   └── lib/                     # Intake client, env helpers
├── public/                      # Favicons, brand assets, _redirects
├── scripts/                     # Favicon generation
└── dist/                        # Build output (Vite)
```

## Tech Stack

React 18 + TypeScript, Vite, Tailwind CSS, `@omnituum/secure-intake-client` for encrypted form submissions.

## License

[MIT](LICENSE)
