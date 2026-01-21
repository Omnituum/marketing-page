import { ArrowRight } from 'lucide-react';

const nonObviousProblems = [
  'Algorithms ≠ systems. Correct primitives do not guarantee correct systems.',
  'PQC failures will come from composition errors, not broken math.',
  'Browser-native, zero-custody, hybrid envelopes are not trivial to operationalize correctly.',
];

export function WhySection() {
  return (
    <section id="why" className="relative omni-section-continuation omni-substrate material-noise">
      {/* Soft separator - continuation, not reset */}
      <div className="absolute top-0 left-0 right-0 omni-separator-soft" />

      <div className="relative z-10 omni-container omni-container-narrow">
        {/* Section header - tighter spacing for continuation flow */}
        <div className="text-center mb-10 md:mb-12">
          <span className="omni-eyebrow">Philosophy</span>
          <h2 className="omni-section-title">
            Why Omni exists
          </h2>
        </div>

        {/* Main explanation - constrained line length */}
        <div className="omni-card omni-card-interactive rounded-xl p-8 md:p-10 mb-10">
          <div className="omni-prose">
            <p className="text-gray-300 leading-relaxed">
              The post-quantum transition is failing less because of algorithms and more because of
              composition: cryptography is too often tangled with protocols, products, and infrastructure
              decisions.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Omni exists to isolate the cryptographic layer, make it auditable and verifiable,
              and allow higher-level systems to evolve without re-implementing or re-trusting primitives.
            </p>
            <p className="text-gray-400 leading-relaxed">
              The goal is not novelty, but durability: cryptography that can be reviewed today and still
              be defensible decades from now.
            </p>
          </div>
        </div>

        {/* Two-column layout for Why/Non-obvious on desktop */}
        <div className="omni-card-grid omni-card-grid-2">
          {/* Why this matters */}
          <div className="omni-card omni-card-interactive rounded-xl p-7 md:p-8">
            <h3 className="omni-card-title mb-5">Why this matters</h3>
            <div className="omni-prose">
              <p className="text-gray-400 leading-relaxed">
                Post-quantum algorithms are necessary but insufficient. The real risk lies in long-term
                key lifecycle, identity continuity, envelope composition, and verification across decades.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Omni exists to define how post-quantum cryptography is safely composed, verified, and
                operationalized in real systems — not just implemented.
              </p>
            </div>
          </div>

          {/* The non-obvious problem */}
          <div className="omni-card omni-card-interactive rounded-xl p-7 md:p-8">
            <h3 className="omni-card-title mb-5">The non-obvious problem</h3>
            <ul className="omni-list">
              {nonObviousProblems.map((problem, index) => (
                <li key={index} className="omni-list-item text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-omni-violet/15 border border-omni-violet/30 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-3 h-3 text-omni-violet" />
                  </div>
                  <span className="leading-relaxed">{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
