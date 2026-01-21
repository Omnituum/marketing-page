import { KeyRound, Timer, Award, Eye } from 'lucide-react';

const trustPoints = [
  {
    icon: KeyRound,
    title: 'No Custody',
    description: 'Private keys are generated and stored only in your browser. We never see them.',
  },
  {
    icon: Timer,
    title: 'Forward Secrecy',
    description: 'Each session uses ephemeral keys. Past communications remain secure even if keys are compromised.',
  },
  {
    icon: Award,
    title: 'Open Standards',
    description: 'Built on NIST-approved ML-KEM (Kyber) and battle-tested X25519.',
  },
  {
    icon: Eye,
    title: 'Verifiable',
    description: 'Open source, auditable, no black boxes. Trust the math, not the vendor.',
  },
];

export function TrustSection() {
  return (
    <section id="trust" className="relative omni-section-primary bg-omni-black">
      <div className="relative z-10 omni-container">
        {/* Section header with eyebrow */}
        <div className="omni-section-header">
          <span className="omni-eyebrow">Trust Model</span>
          <h2 className="omni-section-title">
            Security without trust assumptions
          </h2>
          <p className="omni-section-subtitle">
            Omni is built on principles of cryptographic verification and zero custody.
          </p>
        </div>

        {/* Trust point cards - equal heights, centered content */}
        <div className="omni-card-grid omni-card-grid-4">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="omni-card omni-card-interactive rounded-xl p-6 text-center flex flex-col"
            >
              <div className="omni-card-icon-block omni-card-icon-lg omni-card-icon-round bg-omni-violet/10 border border-omni-violet/20 mx-auto">
                <point.icon className="w-6 h-6 text-omni-violet" />
              </div>
              <h3 className="omni-card-title">{point.title}</h3>
              <p className="omni-card-body flex-grow">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
