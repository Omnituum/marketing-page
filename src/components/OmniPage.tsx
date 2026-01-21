import { useEffect } from 'react';
import { OmniNavbar } from './OmniNavbar';
import { OmniHero } from './OmniHero';
import { ThreatSection } from './ThreatSection';
import { SolutionSection } from './SolutionSection';
import { SubstrateSection } from './SubstrateSection';
import { WhySection } from './WhySection';
import { TechSection } from './TechSection';
import { HowItWorksSection } from './HowItWorksSection';
import { FeaturesSection } from './FeaturesSection';
import { TrustSection } from './TrustSection';
import { DevSection } from './DevSection';
import { PilotSection } from './PilotSection';
import { CTASection } from './CTASection';
import { OmniFooter } from './OmniFooter';

export default function OmniPage() {
  // Force dark mode and enable scroll for Omni page
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('omni-page');

    return () => {
      document.body.classList.remove('omni-page');
    };
  }, []);

  return (
    <div className="min-h-screen bg-omni-black text-white overflow-x-hidden">
      <OmniNavbar />
      <main>
        <OmniHero />
        <ThreatSection />
        <SolutionSection />
        <SubstrateSection />
        <WhySection />
        <TechSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TrustSection />
        <DevSection />
        <PilotSection />
        <CTASection />
      </main>
      <OmniFooter />
    </div>
  );
}
