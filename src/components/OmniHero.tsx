import { ArrowRight, ChevronDown, ShieldCheck } from 'lucide-react';
import { OmniBackground } from './shared/OmniBackground';
import { DecodeText } from './shared/DecodeText';
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
          {/* Status badge - terminal register */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 mb-10">
            <div className="omni-chip">
              <ShieldCheck className="w-4 h-4 text-omni-violet flex-shrink-0" />
              <span className="omni-mono text-xs sm:text-[0.8125rem] text-gray-300 tracking-tight">
                ML-KEM-1024 · ML-DSA-65 — standardized in FIPS 203/204
              </span>
            </div>
            <span className="omni-mono text-[0.6875rem] uppercase tracking-widest text-gray-400">
              Not FIPS-validated
            </span>
          </div>

          {/* Headline - line two decodes out of ciphertext */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-7 leading-[1.06] tracking-[-0.03em]">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Post-Quantum Security,
            </span>
            <br />
            <span className="bg-gradient-to-r from-omni-violet via-omni-indigo to-omni-teal bg-clip-text text-transparent">
              <DecodeText text="Built for the Web" />
            </span>
          </h1>

          {/* Subtext - outcome focused */}
          <p className="text-lg sm:text-xl text-gray-300/90 max-w-2xl mx-auto mb-5 leading-relaxed">
            End-to-end encryption with quantum-resistant keys — no servers, no custody, no compromise.
          </p>

          {/* Positioning line - ties to Loggie */}
          <p className="text-sm text-gray-400 mb-12">
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
            <span className="omni-mono text-xs text-gray-400 px-3 py-1.5 rounded-lg bg-omni-dark/50 border border-omni-indigo/15">
              v0.7.0
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
