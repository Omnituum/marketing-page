# Omnituum Marketing Page

This repository contains the public-facing marketing site for **Omnituum** — a
post-quantum, web-native cryptographic security platform.

The site explains the quantum threat model, Omnituum's hybrid cryptographic
approach (classical + post-quantum), and how it integrates with modern web
applications. It also serves as the entry point for pilot access, documentation,
and developer resources.

This repository intentionally contains **no cryptographic logic**. All security-
critical implementations live in the Omnituum core libraries.

## Scope

This repository includes:
- Marketing and product positioning pages
- Technical overviews and diagrams
- Pilot access request flows
- Developer-facing explanations and examples (non-production)

This repository does **not** include:
- Cryptographic implementations
- Key management or encryption logic
- Security-sensitive code

## Related Repositories

- `Omnituum/pqc-shared` — Core post-quantum cryptographic primitives and utilities
- `Omnituum/pqc-demo` — Reference demos using Omnituum libraries
