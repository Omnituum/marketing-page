import { useState } from 'react';
import { ArrowRight, Building2, Shield, Clock, CheckCircle, Loader2 } from 'lucide-react';

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

export function PilotSection() {
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    useCase: '',
    timeline: '',
    compliance: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build mailto link with form data
    const subject = encodeURIComponent('Omni Pilot Access Request');
    const body = encodeURIComponent(
      `Pilot Access Request\n\n` +
      `Email: ${formData.email}\n` +
      `Company/Organization: ${formData.company}\n` +
      `Use Case: ${formData.useCase}\n` +
      `Timeline: ${formData.timeline}\n` +
      `Compliance Requirements: ${formData.compliance.join(', ') || 'None specified'}\n`
    );

    // Open mailto
    window.location.href = `mailto:pilot@omnituum.com?subject=${subject}&body=${body}`;

    // Show confirmation after brief delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleComplianceChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      compliance: prev.compliance.includes(value)
        ? prev.compliance.filter(c => c !== value)
        : [...prev.compliance, value],
    }));
  };

  if (isSubmitted) {
    return (
      <section id="pilot" className="relative omni-section-primary bg-omni-black">
        <div className="relative z-10 omni-container omni-container-narrow text-center">
          <div className="omni-card rounded-xl p-10 md:p-14 max-w-xl mx-auto">
            <div className="omni-card-icon omni-card-icon-round bg-green-500/10 border border-green-500/20 mx-auto w-20 h-20 mb-8">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-5">
              Request Received
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed omni-prose">
              Thanks — we&apos;ll reply with an evaluation packet and pilot steps.
              Optional NDA available for source code review.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-omni-violet hover:text-omni-indigo transition-colors omni-tap-target"
            >
              Submit another request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pilot" className="relative omni-section-primary bg-omni-black">
      {/* Destination section - increased padding */}
      <div className="relative z-10 omni-container">
        {/* Section header with badge and eyebrow */}
        <div className="omni-section-header">
          <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full
                          bg-omni-violet/10 text-omni-violet border border-omni-violet/20 mb-5">
            Limited Availability
          </span>
          <h2 className="omni-section-title">
            Request Pilot Access
          </h2>
          <p className="omni-section-subtitle">
            Omni is currently available through select pilot partnerships. We work with teams
            who need long-term cryptographic security for sensitive systems, communications, and data.
          </p>
        </div>

        <div className="omni-card-grid omni-card-grid-2">
          {/* Benefits */}
          <div className="space-y-5">
            {pilotBenefits.map((benefit, index) => (
              <div
                key={index}
                className="omni-card omni-card-interactive rounded-xl p-6"
              >
                <div className="omni-card-header">
                  <div className="omni-card-icon bg-omni-violet/10 border border-omni-violet/20">
                    <benefit.icon className="w-5 h-5 text-omni-violet" />
                  </div>
                  <div>
                    <h3 className="omni-card-title mb-1">{benefit.title}</h3>
                    <p className="omni-card-body">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-5 rounded-xl bg-omni-dark/40 border border-omni-violet/10 mt-8">
              <p className="text-gray-500 text-sm">
                Pilot deployments can be structured under NDA with source access available for security review.
              </p>
            </div>
          </div>

          {/* Form - centered container */}
          <div className="omni-card rounded-xl p-7 md:p-10">
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="omni-form-group">
                <label htmlFor="email" className="omni-form-label">
                  Work Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="omni-form-input"
                  placeholder="you@company.com"
                />
              </div>

              {/* Company */}
              <div className="omni-form-group">
                <label htmlFor="company" className="omni-form-label">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="omni-form-input"
                  placeholder="Acme Corp"
                />
              </div>

              {/* Use Case */}
              <div className="omni-form-group">
                <label htmlFor="useCase" className="omni-form-label">
                  Primary Use Case *
                </label>
                <select
                  id="useCase"
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
                <label htmlFor="timeline" className="omni-form-label">
                  Implementation Timeline
                </label>
                <select
                  id="timeline"
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
            </form>

            <p className="text-gray-500 text-sm mt-6 text-center">
              Interactive evaluation environments are available to qualified partners through the pilot program.
            </p>
            <p className="text-gray-600 text-xs mt-3 text-center">
              Ideal for: enterprise security teams, compliance-sensitive industries, critical infrastructure
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
