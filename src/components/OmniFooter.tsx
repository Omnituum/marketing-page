import { Mail, ExternalLink } from 'lucide-react';
import { useRequestAccess } from '../context/RequestAccessContext';

export function OmniFooter() {
  const { handleRequestAccessClick } = useRequestAccess();

  return (
    <footer className="relative py-16 bg-omni-black border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img
                src="/omnituum-icon-phase-1-transparent-text-only.png"
                alt="Omnituum"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              Post-quantum cryptographic security for the modern web. End-to-end encryption
              with quantum-resistant keys — available through select pilot partnerships.
            </p>
            <p className="text-gray-500 text-xs">
              Omnituum is the cryptographic security layer powering the{' '}
              <a
                href="https://loggie.io"
                className="text-omni-violet hover:text-omni-indigo transition-colors"
              >
                Loggie platform
              </a>
              .
            </p>
          </div>

          {/* Partnership */}
          <div>
            <h4 className="text-white font-semibold mb-4">Partnership</h4>
            <ul className="space-y-2">
              <li>
                <a href="#pilot" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Pilot Program
                </a>
              </li>
              <li>
                <a
                  href="#request-access"
                  onClick={handleRequestAccessClick}
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  Contact
                  <Mail className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#technology" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Technology
                </a>
              </li>
            </ul>
          </div>

          {/* Technology / Standards */}
          <div>
            <h4 className="text-white font-semibold mb-4">Technology</h4>
            <p className="text-gray-500 text-xs mb-2">Standards</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://csrc.nist.gov/pubs/fips/203/final"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  NIST FIPS 203
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.rfc-editor.org/rfc/rfc7748"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  RFC 7748 (X25519)
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <span className="text-gray-400 text-sm">ML-KEM-768</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/omnituum/pqc-shared"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@omnituum/pqc-shared"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  npm
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/omnituum/pqc-shared/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  Releases
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal clarity */}
        <div className="mb-8 text-center space-y-2">
          <p className="text-gray-600 text-xs max-w-2xl mx-auto">
            Omnituum provides cryptographic software components implementing NIST-standardized algorithms.
            It is not itself FIPS-certified.
          </p>
          <p className="text-gray-600 text-xs max-w-2xl mx-auto">
            Omnituum does not provide custodial services, data hosting, or access to user keys.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Omnituum. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://loggie.io"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Loggie
              </a>
              <a
                href="#request-access"
                onClick={handleRequestAccessClick}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
