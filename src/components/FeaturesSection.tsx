import { Cloud, Globe, Layers, Code } from 'lucide-react';

const features = [
  {
    icon: Cloud,
    title: 'Zero Infrastructure',
    description: 'No servers to deploy, no cloud dependencies. Everything runs client-side.',
  },
  {
    icon: Globe,
    title: 'Browser Native',
    description: 'Pure JavaScript implementation. Works in any modern browser without plugins.',
  },
  {
    icon: Layers,
    title: 'Hybrid Security',
    description: 'Classical + post-quantum algorithms combined. Defense in depth by design.',
  },
  {
    icon: Code,
    title: 'Open Source',
    description: 'Fully auditable codebase. No black boxes, no hidden backdoors.',
  },
];

export function FeaturesSection() {
  return (
    <section className="relative omni-section-primary omni-substrate material-noise">

      <div className="relative z-10 omni-container">
        {/* Section header with eyebrow */}
        <div className="omni-section-header">
          <span className="omni-eyebrow">Features</span>
          <h2 className="omni-section-title">
            Built for the modern web
          </h2>
          <p className="omni-section-subtitle">
            Post-quantum security without the complexity.
          </p>
        </div>

        {/* Feature cards - equal heights, centered content */}
        <div className="omni-card-grid omni-card-grid-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="omni-card omni-card-interactive rounded-xl p-6 text-center flex flex-col"
            >
              <div className="omni-card-icon-block omni-card-icon-lg omni-card-icon-round bg-omni-teal/10 border border-omni-teal/20 mx-auto">
                <feature.icon className="w-6 h-6 text-omni-teal" />
              </div>
              <h3 className="omni-card-title">{feature.title}</h3>
              <p className="omni-card-body flex-grow">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
