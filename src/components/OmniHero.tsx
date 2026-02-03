import { ArrowRight, ChevronDown, ShieldCheck } from 'lucide-react';
import { OmniBackground } from './shared/OmniBackground';
import { useRequestAccess } from '../context/RequestAccessContext';

export function OmniHero() {
  const { handleRequestAccessClick } = useRequestAccess();

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Procedural abstract background */}
      <OmniBackground />

      {/* Main content - centered with consistent max-width */}
      <div className="relative z-10 w-full omni-container py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Status badge - more breathing room */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 mb-10">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full
                            bg-omni-violet/10 border border-omni-violet/20">
              <ShieldCheck className="w-4 h-4 text-omni-violet" />
              <span className="text-sm text-gray-300">Implements NIST FIPS 203 (ML-KEM-768)</span>
            </div>
            <span className="text-xs text-gray-500">Pre-certification</span>
          </div>

          {/* Headline - increased spacing below */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1]">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Post-Quantum Security,
            </span>
            <br />
            <span className="bg-gradient-to-r from-omni-violet to-omni-indigo bg-clip-text text-transparent">
              Built for the Web
            </span>
          </h1>

          {/* Subtext - outcome focused */}
          <p className="text-lg sm:text-xl text-gray-400/80 max-w-2xl mx-auto mb-5 leading-relaxed">
            End-to-end encryption with quantum-resistant keys — no servers, no custody, no compromise.
          </p>

          {/* Positioning line - ties to Loggie */}
          <p className="text-sm text-gray-500 mb-10">
            Omni powers the cryptographic security layer behind the{' '}
            <a
              href="https://loggielabs.com"
              className="text-omni-violet hover:text-omni-indigo transition-colors"
            >
              Loggie platform
            </a>
            .
          </p>

          {/* CTAs - partnership focused, clearly separated from headline */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
            <button
              onClick={handleRequestAccessClick}
              className="omni-btn omni-btn-lg bg-omni-violet/90 hover:bg-omni-violet
                         text-white font-medium"
            >
              Request Pilot Access
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://studio.omnituum.com"
              className="omni-btn omni-btn-lg bg-omni-teal/20 hover:bg-omni-teal/30
                         text-omni-teal hover:text-white border border-omni-teal/30
                         font-medium transition-colors"
            >
              Launch PQC Studio
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Quick links */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <a
              href="#technology"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Technical Overview
            </a>
            <a
              href="https://github.com/omnituum/pqc-shared"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@omnituum/pqc-shared"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              npm
            </a>
            <span className="text-gray-500 px-3 py-1.5 rounded-lg bg-omni-dark/50 border border-omni-indigo/10">
              v0.2.6
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <a href="#threats" className="flex flex-col items-center gap-2 text-gray-500/60 hover:text-gray-400 transition-colors">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
