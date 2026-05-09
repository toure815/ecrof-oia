import ScrollReveal from "@/components/ui/ScrollReveal";

const ECROF_POINTS = [
  "Fast setup focused on clarity and momentum",
  "Built to evolve as your business grows",
  "Real-time insight into where time and money leak",
  "Clear next steps instead of vague diagnostics",
];

export default function ComparisonSection() {
  return (
    <section className="bg-white section">
      <div className="container">
        <ScrollReveal className="flex flex-col items-center text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 font-mono text-xs tracking-widest uppercase mb-6">
            Operational Alignment
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Where Growth Actually <em>Breaks</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100} className="flex flex-col items-center text-center max-w-[520px] mx-auto comparison-body mb-7">
          <p className="text-gray-700 text-base md:text-lg leading-[1.55]">
            Growth rarely breaks because of effort.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-[1.55]">
            It breaks when decisions, systems, and workflows stop reinforcing each other.
          </p>
          <p className="text-gray-500 text-base md:text-lg leading-[1.55]">
            Most businesses try to fix problems one piece at a time.
          </p>
          <p className="text-gray-500 text-base md:text-lg leading-[1.55]">
            But when operations aren&#39;t aligned, every fix creates another bottleneck.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-[1.55] font-medium">
            Ecrof surfaces where alignment is failing, quantifies the cost of that misalignment, and translates insight into clear next steps.
          </p>
          <p className="text-gray-500 text-base md:text-lg leading-[1.55]">
            So you understand the financial impact before committing to change.
          </p>
        </ScrollReveal>

        {/* Divider label */}
        <ScrollReveal delay={200} className="flex justify-center mb-7">
          <span className="text-gray-400 font-mono text-xs tracking-widest uppercase">
            What Makes Ecrof Different
          </span>
        </ScrollReveal>

        {/* Feature card */}
        <ScrollReveal delay={300} animation="fade-in-scale" className="max-w-xl mx-auto">
          <div className="bg-gray-900 rounded-2xl p-6 md:p-9 border border-white/5">
            <div className="space-y-4">
              {ECROF_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-core mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-white/70 text-sm leading-relaxed font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400} className="flex justify-center mt-12">
          <a href="#pricing" className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-all duration-200 hover:bg-gray-800 hover:-translate-y-0.5">
            Start Your Audit
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
