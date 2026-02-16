import { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { submitRequestAccess, type RequestFormData } from '../lib/intake';

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
  /** Request kind for categorization */
  kind?: 'request_access' | 'request_pilot_access';
}

export function RequestPilotAccessForm({
  onSuccess,
  compact = false,
  kind = 'request_pilot_access',
}: RequestPilotAccessFormProps) {
  const [formData, setFormData] = useState<RequestFormData>({
    email: '',
    company: '',
    system: '',
    useCase: '',
    timeline: '',
    compliance: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitRequestAccess(formData, kind);

      if (result.ok) {
        setIsSubmitted(true);
      } else {
        setSubmitError(
          ('error' in result ? result.error : null) || 'Submission failed. Please try again.'
        );
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
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
    setSubmitError(null);
    setFormData({
      email: '',
      company: '',
      system: '',
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
          Request Submitted
        </h3>
        <p className="text-gray-400 text-sm mb-4 max-w-xs mx-auto">
          Your pilot access request has been securely submitted.
        </p>
        <p className="text-gray-500 text-xs mb-6 max-w-xs mx-auto">
          We typically respond within 1–2 business days to schedule a scoping call.
        </p>

        <button
          onClick={() => {
            resetForm();
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

      {/* System / Workflow */}
      <div className="omni-form-group">
        <label htmlFor="pilot-system" className="omni-form-label">
          System / workflow to evaluate (1–2 sentences)
        </label>
        <textarea
          id="pilot-system"
          value={formData.system}
          onChange={(e) => setFormData({ ...formData, system: e.target.value })}
          className="omni-form-input min-h-[80px] resize-none"
          placeholder="E.g., secure messaging layer, key vault integration, IoT device fleet..."
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

      {/* Error message */}
      {submitError && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">{submitError}</p>
        </div>
      )}

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
            Encrypting & Submitting...
          </>
        ) : (
          <>
            Request Pilot Access
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-gray-500 text-xs text-center pt-2">
        Your request is encrypted end-to-end before leaving your browser.
      </p>
    </form>
  );
}
