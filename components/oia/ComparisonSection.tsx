import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";

const ECROF_POINTS = [
  "Fast, frictionless setup focused on clarity and progress",
  "Built to adapt as your business grows and evolves",
  "Real time insight into where time, money, and focus are being lost",
  "Streamlined workflows that eliminate unnecessary efforts",
  "Every recommendation tied to measurable ROI and next steps",
];

const OTHERS_POINTS = [
  "Slower execution and manually built systems",
  "Requires constant updates as you scale",
  "Delayed or unclear reporting",
  "High labor costs, inefficient workflows",
  "No measurable ROI before decisions",
];

export default function ComparisonSection() {
  return (
    <section className="bg-white section">
      <div className="container">
        <ScrollReveal className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 font-mono text-xs tracking-widest uppercase mb-6">
            Comparison
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Why Choose Us <em>Over Others</em>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl">
            Compare the impact of aligned operations vs. repair as you go.
          </p>
          <p className="text-gray-700 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
            Growth rarely breaks because of effort. It breaks when decisions, systems and workflows stop reinforcing each other.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm max-w-2xl mt-3 leading-relaxed">
            Ecrof is designed to surface where alignment is failing, quantify the cost of that misalignment, and translate insight into clear next steps. Every outcome is tied to projected impact so you understand the financial outcome before committing to change.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {/* Ecrof column */}
          <ScrollReveal delay={100} animation="fade-in-scale">
            <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 h-full border border-white/5">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <Image
                  src="/ecrof_logo_transparent.png"
                  alt="Ecrof"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="space-y-4 sm:space-y-5">
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

          {/* Others column */}
          <ScrollReveal delay={250} animation="fade-in-scale">
            <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 h-full border border-white/5">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <span className="text-white/60 font-mono text-sm tracking-wide">Others</span>
              </div>
              <div className="space-y-4 sm:space-y-5">
                {OTHERS_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span className="text-white/50 text-sm leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={400} className="flex justify-center mt-10 sm:mt-12">
          <a href="#pricing" className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 hover:bg-gray-800 hover:-translate-y-0.5">
            Start Your Audit
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
