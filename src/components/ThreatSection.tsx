import { Clock, KeyRound, Server } from 'lucide-react';

const threats = [
  {
    icon: Clock,
    title: 'Harvest Now, Decrypt Later',
    description: 'Adversaries are storing your encrypted data today, waiting for quantum computers to crack it tomorrow.',
  },
  {
    icon: KeyRound,
    title: 'Algorithm Obsolescence',
    description: 'RSA and ECC algorithms that secure the internet will become vulnerable to quantum attacks.',
  },
  {
    icon: Server,
    title: 'Infrastructure Dependency',
    description: 'Current encryption solutions require centralized servers and trusted third parties.',
  },
];

export function ThreatSection() {
  return (
    <section id="threats" className="relative omni-section-primary omni-substrate material-noise">
      {/* Section separator top */}
      <div className="absolute top-0 left-0 right-0 omni-separator" />

      <div className="relative z-10 omni-container">
        {/* Section header with eyebrow */}
        <div className="omni-section-header">
          <span className="omni-eyebrow">The Challenge</span>
          <h2 className="omni-section-title">
            The quantum threat is real
          </h2>
          <p className="omni-section-subtitle">
            Today&apos;s encryption won&apos;t survive tomorrow&apos;s quantum computers.
          </p>
        </div>

        {/* Card grid with equal heights */}
        <div className="omni-card-grid omni-card-grid-3">
          {threats.map((threat, index) => (
            <div
              key={index}
              className="omni-card omni-card-interactive rounded-xl p-6 text-center flex flex-col"
            >
              <div className="omni-card-icon-block omni-card-icon-lg omni-card-icon-round bg-red-500/10 border border-red-500/20 mx-auto">
                <threat.icon className="w-6 h-6 text-red-400/80" />
              </div>
              <h3 className="omni-card-title">{threat.title}</h3>
              <p className="omni-card-body flex-grow">{threat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
