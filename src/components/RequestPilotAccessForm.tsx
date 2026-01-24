import { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2, Mail, Copy, Check } from 'lucide-react';

const useCaseOptions = [
  { value: '', label: 'Select use case...' },
  { value: 'messaging', label: 'Secure Messaging' },
  { value: 'files', label: 'File Encryption' },
  { value: 'vault', label: 'Key Vault / Storage' },
  { value: 'embedded', label: 'Embedded / IoT' },
  { value: 'other', label: 'Other' },
];

const timelineOptions = [
  { value: '', label: 'Select timeline...' },
  { value: '0-30', label: '0-30 days' },
  { value: '30-90', label: '30-90 days' },
  { value: '90+', label: '90+ days' },
];

const complianceOptions = [
  { value: 'hipaa', label: 'HIPAA' },
  { value: 'cjis', label: 'CJIS' },
  { value: 'finra', label: 'FINRA' },
  { value: 'fedramp', label: 'FedRAMP' },
  { value: 'soc2', label: 'SOC 2' },
  { value: 'gov', label: 'Government' },
];

interface RequestPilotAccessFormProps {
  /** Called after successful form submission */
  onSuccess?: () => void;
  /** Compact mode for modal display */
  compact?: boolean;
}

export function RequestPilotAccessForm({ onSuccess, compact = false }: RequestPilotAccessFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    useCase: '',
    timeline: '',
    compliance: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate brief processing delay then show success
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 300);
  };

  // Build email content
  const getEmailSubject = () => 'Omni Pilot Access Request';

  const getEmailBody = () =>
    `Pilot Access Request\n\n` +
    `Email: ${formData.email}\n` +
    `Company/Organization: ${formData.company}\n` +
    `Use Case: ${formData.useCase}\n` +
    `Timeline: ${formData.timeline}\n` +
    `Compliance Requirements: ${formData.compliance.join(', ') || 'None specified'}`;

  const getMailtoLink = () => {
    const subject = encodeURIComponent(getEmailSubject());
    const body = encodeURIComponent(getEmailBody());
    return `mailto:contact@omnituum.com?subject=${subject}&body=${body}`;
  };

  const handleCopyMessage = async () => {
    const message = `Subject: ${getEmailSubject()}\n\n${getEmailBody()}`;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = message;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleComplianceChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      compliance: prev.compliance.includes(value)
        ? prev.compliance.filter(c => c !== value)
        : [...prev.compliance, value],
    }));
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      email: '',
      company: '',
      useCase: '',
      timeline: '',
      compliance: [],
    });
  };

  if (isSubmitted) {
    return (
      <div className={`text-center ${compact ? 'py-6' : 'py-10'}`}>
        <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20
                        flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-7 h-7 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Ready to Send
        </h3>
        <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
          Your request details are ready. Choose how to send:
        </p>

        {/* Primary: Open Email Draft */}
        <a
          href={getMailtoLink()}
          className="flex items-center justify-center gap-2 w-full px-5 py-3
                     bg-omni-violet hover:bg-omni-violet/90
                     text-white font-semibold rounded-lg transition-colors mb-3"
        >
          <Mail className="w-5 h-5" />
          Open Email Draft
        </a>

        {/* Secondary: Copy Message */}
        <button
          onClick={handleCopyMessage}
          className="flex items-center justify-center gap-2 w-full px-5 py-3
                     bg-omni-dark border border-gray-700 hover:border-gray-600
                     text-gray-300 hover:text-white font-medium rounded-lg transition-colors mb-5"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              Copy Message
            </>
          )}
        </button>

        {/* Tertiary: Direct email */}
        <p className="text-gray-500 text-xs mb-4">
          Or email us directly at{' '}
          <span className="text-gray-400 select-all">contact@omnituum.com</span>
        </p>

        <button
          onClick={() => {
            resetForm();
            setCopied(false);
            onSuccess?.();
          }}
          className="text-omni-violet hover:text-omni-indigo transition-colors text-sm"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email */}
      <div className="omni-form-group">
        <label htmlFor="pilot-email" className="omni-form-label">
          Work Email *
        </label>
        <input
          type="email"
          id="pilot-email"
          required
          autoFocus
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="omni-form-input"
          placeholder="you@company.com"
        />
      </div>

      {/* Company */}
      <div className="omni-form-group">
        <label htmlFor="pilot-company" className="omni-form-label">
          Company / Organization *
        </label>
        <input
          type="text"
          id="pilot-company"
          required
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="omni-form-input"
          placeholder="Acme Corp"
        />
      </div>

      {/* Use Case */}
      <div className="omni-form-group">
        <label htmlFor="pilot-usecase" className="omni-form-label">
          Primary Use Case *
        </label>
        <select
          id="pilot-usecase"
          required
          value={formData.useCase}
          onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
          className="omni-form-input"
        >
          {useCaseOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Timeline */}
      <div className="omni-form-group">
        <label htmlFor="pilot-timeline" className="omni-form-label">
          Implementation Timeline
        </label>
        <select
          id="pilot-timeline"
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          className="omni-form-input"
        >
          {timelineOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Compliance */}
      <div className="omni-form-group">
        <label className="omni-form-label">
          Compliance Requirements (optional)
        </label>
        <div className="flex flex-wrap gap-2.5">
          {complianceOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleComplianceChange(opt.value)}
              className={`px-4 py-2 text-sm rounded-full border transition-colors omni-tap-target ${
                formData.compliance.includes(opt.value)
                  ? 'bg-omni-violet/20 border-omni-violet text-omni-violet'
                  : 'bg-omni-dark border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full omni-btn omni-btn-lg bg-omni-violet/90 hover:bg-omni-violet disabled:opacity-50
                   text-white font-semibold mt-4"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Request Pilot Access
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-gray-500 text-xs text-center pt-2">
        Initial requests are collected via standard email. Secure Omni channels are established after approval.
      </p>
    </form>
  );
}
