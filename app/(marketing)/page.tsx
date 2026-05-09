import OiaHero from "@/components/oia/OiaHero";
import WhatItMeasures from "@/components/oia/WhatItMeasures";
import GrowthBarriers from "@/components/oia/GrowthBarriers";
import QuoteSection from "@/components/oia/QuoteSection";
import ProcessSteps from "@/components/oia/ProcessSteps";
import ComparisonSection from "@/components/oia/ComparisonSection";
import VslSection from "@/components/oia/VslSection";
import PricingSection from "@/components/oia/PricingSection";
import WhoItsFor from "@/components/oia/WhoItsFor";
import Testimonials from "@/components/oia/Testimonials";
import FaqSection from "@/components/oia/FaqSection";
import FinalCta from "@/components/oia/FinalCta";

export default function HomePage() {
  return (
    <main>
      <OiaHero />
      <WhatItMeasures />
      <GrowthBarriers />
      <QuoteSection />
      <ProcessSteps />
      <ComparisonSection />
      <VslSection />
      <PricingSection />
      <WhoItsFor />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
