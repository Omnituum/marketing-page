import { ArrowRight } from 'lucide-react';
import { useRequestAccess } from '../context/RequestAccessContext';

export function CTASection() {
  const { handleRequestAccessClick } = useRequestAccess();

  return (
    <section className="relative omni-section-chapter overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-omni-black via-omni-violet/5 to-omni-black" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 omni-blueprint opacity-50" />

      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(109, 40, 217, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* Section separator top */}
      <div className="absolute top-0 left-0 right-0 omni-separator" />

      <div className="relative z-10 omni-container omni-container-narrow text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight">
          Ready to future-proof your security?
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join our pilot program to integrate post-quantum encryption into your infrastructure.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={handleRequestAccessClick}
            className="omni-btn omni-btn-lg bg-omni-violet/90 hover:bg-omni-violet
                       text-white font-semibold"
          >
            Partner With Omni
            <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href="https://loggie.io"
            className="omni-btn omni-btn-lg omni-card omni-card-interactive
                      text-white font-medium hover:border-white/20"
          >
            See it in Action
            <span className="text-omni-violet">→ Loggie</span>
          </a>
        </div>

        <p className="text-gray-500 mt-10">
          Already running in production on the Loggie platform.
        </p>
      </div>
    </section>
  );
}
