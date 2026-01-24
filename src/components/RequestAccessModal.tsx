import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Shield, Building2, Clock } from 'lucide-react';
import { RequestPilotAccessForm } from './RequestPilotAccessForm';

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const pilotBenefits = [
  {
    icon: Shield,
    title: 'Enterprise Integration',
    description: 'Direct support for integrating Omni into your security infrastructure.',
  },
  {
    icon: Building2,
    title: 'Custom Deployment',
    description: 'Tailored implementation for your specific use case and compliance requirements.',
  },
  {
    icon: Clock,
    title: 'Priority Access',
    description: 'Early access to new features and direct input on the development roadmap.',
  },
];

export function RequestAccessModal({ isOpen, onClose }: RequestAccessModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key and lock body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      // Focus first focusable element
      setTimeout(() => {
        const firstInput = modalRef.current?.querySelector('input, button') as HTMLElement;
        firstInput?.focus();
      }, 0);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTabKey);
    return () => modal.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="request-access-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col
                   bg-omni-dark border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-5 sm:p-6
                        border-b border-gray-800/50">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full
                            bg-omni-violet/10 text-omni-violet border border-omni-violet/20 mb-2">
              Limited Availability
            </span>
            <h2 id="request-access-title" className="text-xl sm:text-2xl font-bold text-white">
              Request Pilot Access
            </h2>
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

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <p className="text-gray-400 mb-6">
            Omni is currently available through select pilot partnerships. We work with teams
            who need long-term cryptographic security for sensitive systems, communications, and data.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Benefits column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                What You Get
              </h3>
              {pilotBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg
                             bg-omni-black/50 border border-gray-800/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-omni-violet/10 border border-omni-violet/20
                                  flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-omni-violet" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">{benefit.title}</h4>
                    <p className="text-gray-500 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}

              <div className="p-4 rounded-lg bg-omni-violet/5 border border-omni-violet/10 mt-4">
                <p className="text-gray-500 text-xs">
                  Pilot deployments can be structured under NDA with source access available
                  for security review.
                </p>
              </div>
            </div>

            {/* Form column */}
            <div className="omni-card rounded-xl p-5 sm:p-6">
              <RequestPilotAccessForm compact onSuccess={onClose} />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
