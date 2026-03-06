import ScrollReveal from "@/components/ui/ScrollReveal";

const MEASURES = [
  {
    title: "Time Efficiency",
    description: "Where your week is being consumed without producing leverage",
  },
  {
    title: "Workflow Clarity",
    description: "How organized your execution really is (not how it feels)",
  },
  {
    title: "Tool Alignment",
    description: "Whether your systems are accelerating work or creating friction",
  },
  {
    title: "Decision Bottlenecks",
    description: "Hidden delays that compound cost and stall momentum",
  },
  {
    title: "Delegation Opportunities",
    description: "What should be automated, delegated, or removed entirely",
  },
];

export default function WhatItMeasures() {
  return (
    <section id="what-it-measures" className="bg-white section">
      <div className="container">
        <ScrollReveal className="flex flex-col items-center text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900 text-white font-mono text-xs tracking-widest uppercase mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
            Insight
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            What This Audit <em>Measures</em>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl">
            In 12 minutes or less get a clear snapshot of how your operations stack up.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150} animation="fade-in-scale">
          <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl p-8 md:p-10">
            <div className="flex flex-col gap-1">
              {MEASURES.map((item, i) => (
                <div key={item.title}>
                  <div className="flex items-start gap-3 py-4">
                    <svg className="w-5 h-5 text-blue-core mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <div>
                      <span className="text-white font-semibold">{item.title}</span>
                      <span className="text-white/50"> — {item.description}</span>
                    </div>
                  </div>
                  {i < MEASURES.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
