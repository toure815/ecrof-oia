import ScrollReveal from "@/components/ui/ScrollReveal";

const FEATURES = [
  "36 question operational intelligence assessment",
  "Revenue per employee health check",
  "Personalized sprint recommendation",
  "Clear what not to do next guidance",
  "Time recovery & ROI analysis",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-white section">
      <div className="container">
        <ScrollReveal className="flex flex-col items-center text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900 text-white font-mono text-xs tracking-widest uppercase mb-6">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            The Operational Intelligence
            <br />
            <em>Audit</em>
          </h2>
          <p className="text-gray-500 text-base max-w-2xl leading-relaxed">
            This is not a personality test or surface level scorecard. It&#39;s a diagnostic built to expose where operational decisions are costing you money and which fixes would actually make things worse.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150} animation="fade-in-scale">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg shadow-gray-200/50">
              {/* Header */}
              <div className="p-8 pb-6 text-center border-b border-gray-100">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium mb-5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  Popular
                </span>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-5xl font-extrabold text-gray-900">$197</span>
                </div>
                <p className="text-gray-500 text-sm">One Time Audit</p>
              </div>

              {/* CTA */}
              <div className="px-8 pt-6">
                <a
                  href="/startaudit"
                  className="btn-primary w-full justify-center text-base py-4"
                >
                  Get Started
                </a>
              </div>

              {/* Features */}
              <div className="p-8 space-y-4">
                {FEATURES.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-core mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
