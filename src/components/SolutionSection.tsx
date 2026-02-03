import { FileText, Shield, Lock, ArrowRight, Layers } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    label: 'Your Data',
    description: 'Any file, message, or payload',
  },
  {
    icon: Shield,
    label: 'Hybrid PQC Encryption',
    description: 'X25519 + ML-KEM-768 combined',
  },
  {
    icon: Lock,
    label: 'Quantum-Safe Payload',
    description: 'Secure against future threats',
  },
];

export function SolutionSection() {
  return (
    <section className="relative omni-section-primary bg-omni-black">
      <div className="omni-container">
        {/* Section header with eyebrow */}
        <div className="omni-section-header">
          <span className="omni-eyebrow">The Solution</span>
          <h2 className="omni-section-title">
            Hybrid encryption, browser-native
          </h2>
          <p className="omni-section-subtitle">
            Omni combines classical cryptography with post-quantum algorithms for defense in depth.
          </p>
        </div>

        {/* Flow diagram - sequential cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="omni-card rounded-xl p-6 text-center w-64 md:w-56 lg:w-64">
                <div className="w-14 h-14 rounded-full bg-omni-violet/10 border border-omni-violet/20
                                flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-7 h-7 text-omni-violet" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{step.label}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center px-6">
                  <ArrowRight className="w-6 h-6 text-omni-violet/40" />
                </div>
              )}
              {index < steps.length - 1 && (
                <div className="md:hidden py-3">
                  <ArrowRight className="w-6 h-6 text-omni-violet/40 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Platform Architecture */}
        <div className="mt-20 pt-12 border-t border-gray-800/20">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Layers className="w-4 h-4 text-gray-500" />
            <span className="omni-eyebrow mb-0">Platform Architecture</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
            <div className="px-6 py-4 rounded-xl bg-omni-violet/10 border border-omni-violet/20">
              <span className="text-omni-violet font-medium">Omni Security Layer</span>
            </div>
            <div className="hidden sm:block px-4">
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </div>
            <div className="sm:hidden py-2">
              <ArrowRight className="w-5 h-5 text-gray-600 rotate-90" />
            </div>
            <a
              href="https://loggielabs.com"
              className="px-6 py-4 rounded-xl bg-purple-500/10 border border-purple-500/20
                         hover:border-purple-500/40 transition-colors"
            >
              <span className="text-purple-400 font-medium">Loggie Platform</span>
            </a>
            <div className="hidden sm:block px-4">
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </div>
            <div className="sm:hidden py-2">
              <ArrowRight className="w-5 h-5 text-gray-600 rotate-90" />
            </div>
            <div className="px-6 py-4 rounded-xl bg-gray-800/50 border border-gray-700/30">
              <span className="text-gray-400 font-medium">Your Use Cases</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
