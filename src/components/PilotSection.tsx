import { Building2, Shield, Clock } from 'lucide-react';
import { RequestPilotAccessForm } from './RequestPilotAccessForm';

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

export function PilotSection() {
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
            <RequestPilotAccessForm />

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
