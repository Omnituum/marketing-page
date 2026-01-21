import { Check, X, Layers } from 'lucide-react';

const isItems = [
  'A cryptographic security layer (not an app, not a network)',
  'Focused on post-quantum-safe encryption primitives',
  'Designed for browser-native and embedded environments',
  'Built for long-lived systems (10-30 year horizons)',
];

const isNotItems = [
  'Not a messaging platform',
  'Not a key custody service',
  'Not an identity provider',
  'Not a protocol or blockchain',
  'Not a turnkey product',
];

const boundaryLayers = [
  {
    label: 'Applications / UX / Governance',
    color: 'text-gray-400',
    bgClass: 'bg-[#0a0a0e]/60',
    borderClass: 'border border-omni-indigo/5',
    weight: 'light'
  },
  {
    label: 'Loggie',
    sublabel: '(identity, messaging, truth anchoring)',
    color: 'text-omni-teal',
    bgClass: 'bg-[#0d0d14]/70',
    borderClass: 'border border-omni-teal/15',
    weight: 'medium'
  },
  {
    label: 'Omni',
    sublabel: '(cryptographic security layer)',
    color: 'text-omni-violet',
    highlight: true,
    bgClass: 'bg-[#13111d]/90',
    borderClass: 'border-2 border-omni-violet/50',
    weight: 'heavy'
  },
  {
    label: 'Open Standards',
    sublabel: '(ML-KEM, X25519, AEADs)',
    color: 'text-gray-500',
    bgClass: 'bg-[#08080b]/50',
    borderClass: 'border border-gray-800/30',
    weight: 'foundation'
  },
];

export function SubstrateSection() {
  return (
    <section id="substrate" className="relative omni-section-continuation bg-omni-black">
      <div className="relative z-10 omni-container">
        {/* Section header with eyebrow */}
        <div className="omni-section-header">
          <span className="omni-eyebrow">Scope &amp; Boundaries</span>
          <h2 className="omni-section-title">
            What Omni is (and isn&apos;t)
          </h2>
          <p className="omni-section-subtitle">
            Omni provides cryptographic primitives. Products, workflows, governance, and
            deployments are intentionally layered above it.
          </p>
        </div>

        {/* Is / Is Not grid with equal visual weight */}
        <div className="omni-card-grid omni-card-grid-2 mb-16">
          {/* What Omni IS */}
          <div className="omni-card omni-card-interactive rounded-xl p-7">
            <div className="omni-card-header mb-6">
              <div className="omni-card-icon omni-card-icon-round bg-green-500/15 border border-green-500/30">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <h3 className="omni-card-title mb-0">What Omni Is</h3>
            </div>
            <ul className="omni-list">
              {isItems.map((item, index) => (
                <li key={index} className="omni-list-item text-gray-300">
                  <Check className="w-4 h-4 text-green-400 omni-list-icon" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Omni IS NOT */}
          <div className="omni-card omni-card-interactive rounded-xl p-7">
            <div className="omni-card-header mb-6">
              <div className="omni-card-icon omni-card-icon-round bg-red-500/15 border border-red-500/30">
                <X className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="omni-card-title mb-0">What Omni Is Not</h3>
            </div>
            <ul className="omni-list">
              {isNotItems.map((item, index) => (
                <li key={index} className="omni-list-item text-gray-400">
                  <X className="w-4 h-4 text-red-400 omni-list-icon" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* System Boundaries - reduced container dominance, increased breathing room */}
        <div className="rounded-2xl p-10 md:p-14 mb-16 bg-gradient-to-b from-[#0a0a0f]/40 to-[#08080c]/30 border border-omni-indigo/5">
          <h3 className="text-lg font-semibold text-white mb-10 text-center tracking-wide">System Boundaries</h3>
          <div className="max-w-xl mx-auto space-y-4">
            {boundaryLayers.map((layer, index) => (
              <div
                key={index}
                className={`flex items-center justify-center rounded-xl text-center transition-all
                  ${layer.bgClass} ${layer.borderClass}
                  ${layer.highlight
                    ? 'py-6 px-6 shadow-[0_0_20px_-5px_rgba(109,40,217,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]'
                    : layer.weight === 'medium'
                      ? 'py-4 px-5'
                      : 'py-3.5 px-5'
                  }`}
              >
                <div className="flex items-center gap-2.5 flex-wrap justify-center">
                  {layer.highlight && <Layers className="w-5 h-5 text-omni-violet" />}
                  <span className={`${layer.highlight ? 'font-bold text-lg' : layer.weight === 'medium' ? 'font-semibold' : 'font-medium'} ${layer.color}`}>
                    {layer.label}
                  </span>
                  {layer.sublabel && (
                    <span className={`text-sm ${layer.highlight ? 'text-gray-400' : 'text-gray-500/80'}`}>
                      {layer.sublabel}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clarifying explanation */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <p className="text-gray-300 text-lg leading-relaxed">
            <span className="text-omni-violet font-medium">Omni is the cryptographic substrate.</span>{' '}
            Loggie is a system built on top of it for durable identity, messaging, and verification.
          </p>
          <p className="text-gray-500">
            Loggie is where composition, governance, and meaning live. Omni deliberately stops at cryptography.
          </p>
        </div>
      </div>
    </section>
  );
}
