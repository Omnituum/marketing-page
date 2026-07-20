import { Box, Bluetooth, Database, FileJson, Globe, KeyRound, QrCode } from 'lucide-react';

type PackageStatus = 'npm' | 'Source' | 'Beta' | 'Experimental';

const statusStyles: Record<PackageStatus, string> = {
  npm: 'bg-green-500/10 text-green-400 border-green-500/20',
  Source: 'bg-omni-teal/10 text-omni-teal border-omni-teal/20',
  Beta: 'bg-omni-violet/10 text-omni-violet border-omni-violet/20',
  Experimental: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const packages: Array<{
  icon: typeof Box;
  name: string;
  status: PackageStatus;
  description: string;
  href?: string;
}> = [
  {
    icon: KeyRound,
    name: '@omnituum/pqc-shared',
    status: 'npm',
    description:
      'The core substrate: hybrid X25519 + ML-KEM-1024 encryption, ML-DSA-65 signatures, identity vault, and encrypted file format.',
    href: 'https://www.npmjs.com/package/@omnituum/pqc-shared',
  },
  {
    icon: QrCode,
    name: '@omnituum/noise-kyber',
    status: 'npm',
    description:
      'Post-quantum device pairing — a Noise XX handshake with hybrid KEM, QR-code binding, and human-verifiable auth codes.',
    href: 'https://www.npmjs.com/package/@omnituum/noise-kyber',
  },
  {
    icon: Globe,
    name: '@omnituum/pqc-web',
    status: 'Source',
    description:
      'Encrypted HTTP transport: one hybrid KEM handshake per session, then every response sealed with XChaCha20-Poly1305.',
  },
  {
    icon: FileJson,
    name: '@omnituum/envelope-registry',
    status: 'Source',
    description:
      'Canonical wire formats for the whole stack — envelope schemas, validation, type detection, and migration paths.',
  },
  {
    icon: Database,
    name: '@omnituum/pqc-db',
    status: 'Source',
    description:
      'Server-side field encryption with hybrid-wrapped keys, plus ML-DSA-signed attestations of encryption posture.',
  },
  {
    icon: Box,
    name: 'omnituum-pqc (Python)',
    status: 'Beta',
    description:
      'Server-side ML-DSA-65 signing, verification, and BLAKE3 Merkle proofs for Python backends.',
  },
  {
    icon: Bluetooth,
    name: '@omnituum/pqc-ble',
    status: 'Experimental',
    description:
      'BLE mesh envelope toolkit — chunked, padded, relay-safe post-quantum encrypted messaging between devices.',
  },
];

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="relative omni-section-primary bg-omni-black">
      <div className="relative z-10 omni-container">
        {/* Section header with eyebrow */}
        <div className="omni-section-header">
          <span className="omni-eyebrow">Ecosystem</span>
          <h2 className="omni-section-title">
            One substrate, many layers
          </h2>
          <p className="omni-section-subtitle">
            A family of packages built on the same hybrid core — from browser identities to
            server-side transport, storage, and attestation.
          </p>
        </div>

        {/* Package cards */}
        <div className="omni-card-grid omni-card-grid-3">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="omni-card omni-card-interactive rounded-xl p-6 flex flex-col"
            >
              <div className="flex justify-between mb-5">
                <div className="omni-card-icon-block bg-omni-indigo/10 border border-omni-indigo/20 mb-0">
                  <pkg.icon className="w-5 h-5 text-omni-indigo" />
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full border h-fit ${statusStyles[pkg.status]}`}
                >
                  {pkg.status === 'npm' ? 'On npm' : pkg.status}
                </span>
              </div>
              <h3 className="text-white font-mono text-sm font-semibold mb-3 break-words">
                {pkg.href ? (
                  <a
                    href={pkg.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-omni-teal transition-colors"
                  >
                    {pkg.name}
                  </a>
                ) : (
                  pkg.name
                )}
              </h3>
              <p className="omni-card-body flex-grow">{pkg.description}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-500 text-sm text-center mt-10 max-w-2xl mx-auto">
          All packages share the same NIST-standardized primitives and envelope formats.
          Packages marked &ldquo;Source&rdquo; are available today in the Omnituum repositories
          ahead of their npm release.
        </p>
      </div>
    </section>
  );
}
