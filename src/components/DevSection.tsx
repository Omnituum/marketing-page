import { Terminal, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const codeExample = `import {
  generateHybridIdentity,
  hybridEncrypt,
  hybridDecryptToString,
  getPublicKeys
} from '@omnituum/pqc-shared';

const alice = await generateHybridIdentity('Alice');
const bob = await generateHybridIdentity('Bob');

const envelope = await hybridEncrypt(
  'Hello',
  getPublicKeys(bob)
);

const plaintext = await hybridDecryptToString(envelope, bob);`;

export function DevSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developers" className="relative omni-section-primary omni-substrate material-noise">

      <div className="relative z-10 omni-container omni-container-narrow">
        {/* Section header with eyebrow */}
        <div className="omni-section-header">
          <span className="omni-eyebrow">Integration</span>
          <h2 className="omni-section-title">
            Developer-friendly API
          </h2>
          <p className="omni-section-subtitle">
            Integrate post-quantum encryption into your application with a simple, intuitive API.
          </p>
        </div>

        {/* Code block - clearly separated with overflow handling */}
        <div className="omni-card rounded-xl overflow-hidden shadow-lg shadow-black/20">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-omni-indigo/10">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-omni-indigo" />
              <span className="text-sm text-gray-400">@omnituum/pqc-shared</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400
                         hover:text-white transition-colors rounded bg-omni-dark/50 hover:bg-omni-dark"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Code */}
          <pre className="p-4 omni-code-scroll text-sm">
            <code className="text-gray-300">
              <span className="text-omni-indigo">import</span>{' '}
              <span className="text-white">{'{'}</span>
              {'\n'}
              {'  '}<span className="text-omni-teal">generateHybridIdentity</span>,
              {'\n'}
              {'  '}<span className="text-omni-teal">hybridEncrypt</span>,
              {'\n'}
              {'  '}<span className="text-omni-teal">hybridDecryptToString</span>,
              {'\n'}
              {'  '}<span className="text-omni-teal">getPublicKeys</span>
              {'\n'}
              <span className="text-white">{'}'}</span>{' '}
              <span className="text-omni-indigo">from</span>{' '}
              <span className="text-green-400">'@omnituum/pqc-shared'</span>;
              {'\n\n'}
              <span className="text-omni-indigo">const</span>{' '}
              <span className="text-omni-teal">alice</span>{' '}
              <span className="text-omni-violet">=</span>{' '}
              <span className="text-omni-indigo">await</span>{' '}
              <span className="text-yellow-400">generateHybridIdentity</span>(<span className="text-green-400">'Alice'</span>);
              {'\n'}
              <span className="text-omni-indigo">const</span>{' '}
              <span className="text-omni-teal">bob</span>{' '}
              <span className="text-omni-violet">=</span>{' '}
              <span className="text-omni-indigo">await</span>{' '}
              <span className="text-yellow-400">generateHybridIdentity</span>(<span className="text-green-400">'Bob'</span>);
              {'\n\n'}
              <span className="text-omni-indigo">const</span>{' '}
              <span className="text-omni-teal">envelope</span>{' '}
              <span className="text-omni-violet">=</span>{' '}
              <span className="text-omni-indigo">await</span>{' '}
              <span className="text-yellow-400">hybridEncrypt</span>(
              {'\n'}
              {'  '}<span className="text-green-400">'Hello'</span>,
              {'\n'}
              {'  '}<span className="text-yellow-400">getPublicKeys</span>(bob)
              {'\n'}
              );
              {'\n\n'}
              <span className="text-omni-indigo">const</span>{' '}
              <span className="text-omni-teal">plaintext</span>{' '}
              <span className="text-omni-violet">=</span>{' '}
              <span className="text-omni-indigo">await</span>{' '}
              <span className="text-yellow-400">hybridDecryptToString</span>(envelope, bob);
            </code>
          </pre>
        </div>

        {/* Open Source & Pilots - separated from code block */}
        <div className="mt-16 omni-card rounded-xl p-8 md:p-10">
          <h3 className="text-lg font-semibold text-white mb-8 text-center">Open Source &amp; Pilots</h3>
          <div className="omni-card-grid omni-card-grid-3 mb-8">
            <div className="text-center p-5 rounded-xl bg-green-500/10 border border-green-500/20">
              <span className="text-green-400 font-medium">Open source</span>
              <p className="text-gray-400 text-sm mt-2">Core cryptographic primitives (Omni substrate)</p>
            </div>
            <div className="text-center p-5 rounded-xl bg-omni-violet/10 border border-omni-violet/20">
              <span className="text-omni-violet font-medium">Pilot access</span>
              <p className="text-gray-400 text-sm mt-2">Deployment guidance, audits, integration support</p>
            </div>
            <div className="text-center p-5 rounded-xl bg-gray-500/10 border border-gray-500/20">
              <span className="text-gray-400 font-medium">Closed</span>
              <p className="text-gray-500 text-sm mt-2">Product semantics, workflows, governance, operational systems</p>
            </div>
          </div>
          <p className="text-gray-400 text-center mb-8">
            Open source enables review. Pilots enable real-world deployment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://studio.omnituum.com/"
              className="px-5 py-2.5 text-sm font-medium text-omni-teal hover:text-white transition-colors border border-omni-teal/30 rounded-xl hover:bg-omni-teal/10"
            >
              PQC Demo App
            </a>
            <a
              href="https://www.npmjs.com/package/@omnituum/pqc-shared"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm font-medium text-omni-violet hover:text-white transition-colors border border-omni-violet/30 rounded-xl hover:bg-omni-violet/10"
            >
              npm @omnituum/pqc-shared
            </a>
            <a
              href="https://github.com/omnituum/pqc-shared"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-colors border border-gray-500/30 rounded-xl hover:bg-gray-500/10"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
