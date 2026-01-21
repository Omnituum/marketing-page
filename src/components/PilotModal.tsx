import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Package, Code2, Headphones, FileText, ShieldCheck, Target, AlertTriangle, Database, DollarSign, Calendar, ArrowRight } from 'lucide-react';

interface PilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const whatYouGet = [
  {
    icon: Package,
    title: 'Evaluation Build',
    description: 'Production-ready PQC SDK with full feature access',
  },
  {
    icon: Code2,
    title: 'Reference Implementation',
    description: 'Working examples for your target platform',
  },
  {
    icon: Headphones,
    title: 'Integration Support',
    description: 'Direct access to engineering team during pilot',
  },
  {
    icon: FileText,
    title: 'Optional NDA',
    description: 'Source code access under confidentiality agreement',
  },
  {
    icon: ShieldCheck,
    title: 'Security Review Materials',
    description: 'Algorithm specifications and audit documentation',
  },
];

const requirements = [
  {
    icon: Target,
    title: 'Target Environment',
    description: 'Web, mobile, embedded, or server infrastructure',
  },
  {
    icon: AlertTriangle,
    title: 'Threat Model',
    description: 'Understanding of adversary capabilities and data sensitivity',
  },
  {
    icon: Database,
    title: 'Data Sensitivity',
    description: 'Classification of data requiring long-term protection',
  },
  {
    icon: DollarSign,
    title: 'Pilot Budget Range',
    description: 'Resources allocated for evaluation and integration',
  },
];

export function PilotModal({ isOpen, onClose }: PilotModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleScheduleCall = () => {
    const subject = encodeURIComponent('Omni Pilot Evaluation Call Request');
    const body = encodeURIComponent(
      `I'd like to schedule a 20-minute evaluation call to discuss:\n\n` +
      `- Target Environment: \n` +
      `- Use Case: \n` +
      `- Timeline: \n\n` +
      `Please let me know your availability.`
    );
    window.location.href = `mailto:pilot@omnituum.com?subject=${subject}&body=${body}`;
  };

  // Render via portal to avoid parent overflow/transform issues
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal - proper internal scroll structure */}
      <div
        className="relative w-full max-w-4xl max-h-[85vh] flex flex-col
                   bg-omni-dark border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - fixed at top */}
        <div className="flex-shrink-0 flex items-center justify-between p-6
                        bg-omni-dark border-b border-gray-800/50">
          <div>
            <h2 className="text-2xl font-bold text-white">Pilot Program</h2>
            <p className="text-gray-400 text-sm mt-1">
              Enterprise evaluation for post-quantum security integration
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg
                       hover:bg-gray-800/50"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: What You Get */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/20
                               flex items-center justify-center text-xs text-green-400">✓</span>
                What You Get
              </h3>
              <div className="space-y-3">
                {whatYouGet.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-omni-black/50
                               border border-gray-800/50"
                  >
                    <div className="w-8 h-8 rounded-lg bg-omni-violet/10 border border-omni-violet/20
                                    flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-omni-violet" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">{item.title}</h4>
                      <p className="text-gray-500 text-xs">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-omni-indigo/10 border border-omni-indigo/20
                               flex items-center justify-center text-xs text-omni-indigo">→</span>
                What We Need
              </h3>
              <div className="space-y-3">
                {requirements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-omni-black/50
                               border border-gray-800/50"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-800/50 border border-gray-700/50
                                    flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">{item.title}</h4>
                      <p className="text-gray-500 text-xs">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional note */}
          <div className="mt-6 p-4 rounded-lg bg-omni-violet/5 border border-omni-violet/10">
            <p className="text-gray-400 text-xs text-center">
              Pilot partnerships are structured under mutual NDA. Source code review available
              for qualified enterprise security teams.
            </p>
          </div>
        </div>

        {/* Footer CTA - fixed at bottom */}
        <div className="flex-shrink-0 p-6 border-t border-gray-800/50 bg-omni-dark">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-sm">
                Ready to evaluate Omni for your infrastructure?
              </p>
              <p className="text-gray-500 text-xs mt-1">
                20-minute introductory call to discuss your requirements
              </p>
            </div>
            <button
              onClick={handleScheduleCall}
              className="flex items-center gap-2 px-6 py-3 bg-omni-violet hover:bg-omni-violet/80
                         text-white font-medium rounded-xl transition-colors whitespace-nowrap"
            >
              <Calendar className="w-5 h-5" />
              Schedule Evaluation Call
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
