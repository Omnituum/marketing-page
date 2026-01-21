import { Key, Lock, RefreshCw, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Key,
    title: 'Generate Keys',
    description: 'PQC keypair generated entirely in your browser. Private keys never leave your device.',
  },
  {
    number: '02',
    icon: Lock,
    title: 'Encrypt Locally',
    description: 'Hybrid encryption combines X25519 and ML-KEM-768 for maximum security.',
  },
  {
    number: '03',
    icon: RefreshCw,
    title: 'Exchange Securely',
    description: 'Key exchange without servers. Direct peer-to-peer cryptographic handshake.',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Verify Independently',
    description: 'Anyone can verify encryption integrity. No trust in third parties required.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative omni-section-primary bg-omni-black omni-blueprint">
      <div className="relative z-10 omni-container">
        {/* Section header with eyebrow */}
        <div className="omni-section-header">
          <span className="omni-eyebrow">Process</span>
          <h2 className="omni-section-title">
            How it works
          </h2>
          <p className="omni-section-subtitle">
            Browser-native post-quantum encryption in four simple steps.
          </p>
        </div>

        {/* Step-based flow - sequential, not decorative */}
        <div className="omni-card-grid omni-card-grid-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line (hidden on mobile/tablet) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-omni-violet/30 to-transparent z-0" />
              )}

              <div className="omni-card omni-card-interactive rounded-xl p-6 relative z-10 h-full flex flex-col">
                {/* Step header: number above icon, both left-aligned */}
                <div className="mb-5">
                  <span className="text-2xl font-bold text-omni-violet/40 block mb-3">{step.number}</span>
                  <div className="omni-card-icon-block bg-omni-violet/10 border border-omni-violet/20">
                    <step.icon className="w-5 h-5 text-omni-violet" />
                  </div>
                </div>
                <h3 className="omni-card-title">{step.title}</h3>
                <p className="omni-card-body flex-grow">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
