import ScrollReveal from "@/components/ui/ScrollReveal";

const FOR_LIST = [
  "Founders and operators doing $250K+ in annual revenue",
  "Leaders who feel busy but not leveraged",
  "Teams where decisions stall, work loops back, or momentum fades",
  "Businesses preparing for growth — not reacting to chaos",
];

const NOT_FOR_LIST = [
  "Anyone looking for quick hacks or surface level tips",
  "Early stage ideas without operational complexity",
  "Teams unwilling to change how decisions are made",
  "Founders who want more tools instead of more clarity",
];

export default function WhoItsFor() {
  return (
    <section className="bg-white section">
      <div className="container">
        <ScrollReveal className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900 text-white font-mono text-xs tracking-widest uppercase mb-6">
            Fit Check
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Is This Audit Right for <em>For You?</em>
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          <ScrollReveal delay={100}>
            <div>
              <h3 className="text-gray-900 font-bold text-lg mb-5 sm:mb-6">This Audit Is For:</h3>
              <div className="space-y-4">
                {FOR_LIST.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-core mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div>
              <h3 className="text-gray-900 font-bold text-lg mb-5 sm:mb-6">
                This Audit Is <em>Not</em> For:
              </h3>
              <div className="space-y-4">
                {NOT_FOR_LIST.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span className="text-gray-500 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={400} className="text-center mt-10 sm:mt-12">
          <p className="text-gray-900 font-bold text-sm sm:text-base">
            This audit is designed to protect your next move — not validate your current one.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
