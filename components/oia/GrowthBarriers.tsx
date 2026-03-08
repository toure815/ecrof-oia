import ScrollReveal from "@/components/ui/ScrollReveal";

const BARRIERS = [
  {
    title: "Diminishing Visibility",
    description:
      "As messaging, priorities, or decision criteria blur, effort spreads thin. Teams stay busy but outcomes weaken, momentum fades, and growth becomes harder to sustain.",
    icons: (
      <div className="flex gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
      </div>
    ),
  },
  {
    title: "Process & System Chaos",
    description:
      "Disconnected systems, patched workflows, and ad hoc processes create friction at every handoff. Time is lost to rework, confusion, and unnecessary coordination.",
    icons: (
      <div className="flex gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        </div>
        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
        </div>
      </div>
    ),
  },
  {
    title: "Bottlenecks & Over Hiring",
    description:
      "When roles, workflows, or decisions aren't designed properly, work escalates upward, leaders become bottlenecks, and headcount grows to compensate.",
    icons: (
      <div className="flex gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
        </div>
        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>
        </div>
      </div>
    ),
  },
];

export default function GrowthBarriers() {
  return (
    <section className="bg-white section">
      <div className="container">
        <ScrollReveal className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900 text-white font-mono text-xs tracking-widest uppercase mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Growth Blockers
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Every Founder Hits These{" "}
            <br className="hidden sm:block" />
            <em>3 Growth Barriers</em>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl">
            Everything you need to automate operations, boost clarity, and work smarter
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {BARRIERS.map((barrier, i) => (
            <ScrollReveal key={barrier.title} delay={i * 100} animation="fade-in-scale">
              <div className="bg-gray-900 rounded-2xl p-6 sm:p-7 h-full border border-white/5 transition-transform duration-300 hover:-translate-y-1">
                {barrier.icons}
                <h3 className="text-white font-bold text-lg mb-3">{barrier.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{barrier.description}</p>
              </div>
            </ScrollReveal>
          ))}
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
