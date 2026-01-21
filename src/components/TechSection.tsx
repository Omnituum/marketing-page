import { Cpu, Layers, ShieldCheck } from 'lucide-react';

const algorithms = [
  {
    icon: Cpu,
    name: 'ML-KEM-768',
    subtitle: 'Kyber',
    description: 'NIST-standardized lattice-based key encapsulation mechanism. Quantum-resistant.',
    badge: 'Post-Quantum',
  },
  {
    icon: Layers,
    name: 'X25519',
    subtitle: 'Curve25519',
    description: 'Battle-tested elliptic curve Diffie-Hellman. Proven security against classical attacks.',
    badge: 'Classical',
  },
  {
    icon: ShieldCheck,
    name: 'Hybrid Mode',
    subtitle: 'Defense in Depth',
    description: 'Both algorithms combined. If either remains secure, your data stays protected.',
    badge: 'Combined',
  },
];

export function TechSection() {
  return (
    <section id="technology" className="relative omni-section-primary omni-substrate material-noise">

      <div className="relative z-10 omni-container">
        {/* Section header with eyebrow */}
        <div className="omni-section-header">
          <span className="omni-eyebrow">Technical Specs</span>
          <h2 className="omni-section-title">
            Cryptographic foundation
          </h2>
          <p className="omni-section-subtitle">
            Built on NIST-approved algorithms and proven cryptographic primitives.
          </p>
        </div>

        {/* Spec cards - equal heights, title-first emphasis */}
        <div className="omni-card-grid omni-card-grid-3">
          {algorithms.map((algo, index) => (
            <div
              key={index}
              className="omni-card omni-card-interactive rounded-xl p-6 flex flex-col"
            >
              {/* Header row: icon + badge, top-aligned */}
              <div className="flex justify-between mb-5">
                <div className="omni-card-icon-block bg-omni-indigo/10 border border-omni-indigo/20 mb-0">
                  <algo.icon className="w-5 h-5 text-omni-indigo" />
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-omni-violet/10 text-omni-violet border border-omni-violet/20 h-fit">
                  {algo.badge}
                </span>
              </div>
              {/* Title first, subtitle second */}
              <h3 className="omni-spec-value mb-1">{algo.name}</h3>
              <p className="text-omni-teal text-sm mb-3">{algo.subtitle}</p>
              {/* Description fills remaining space */}
              <p className="omni-card-body flex-grow">{algo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
