import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FinalCta() {
  return (
    <section className="bg-white final-cta-section">
      <div className="container">
        <ScrollReveal className="flex flex-col items-center text-center max-w-[520px] mx-auto">
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gray-900 text-white font-mono text-xs tracking-widest uppercase mb-4 border border-gray-700">
            Begin Your Audit
          </span>

          <h2 className="text-[32px] md:text-5xl font-extrabold text-gray-900 leading-[1.15] mb-4">
            Smarter Operations Start
            <br />
            <em>With One Audit</em>
          </h2>
          <p className="text-gray-500 text-base md:text-lg leading-[1.5] mb-3">
            Answer a short diagnostic and uncover where your systems are helping — and where they&#39;re quietly slowing you down.
          </p>
          <p className="text-gray-400 text-sm mb-7">
            Founders use this audit to uncover hidden operational leaks before scaling.
          </p>

          <a
            href="/startaudit"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold text-base w-full sm:w-auto px-8 py-4 rounded-xl transition-all duration-200 hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Begin the Audit
          </a>
          <p className="text-gray-400 text-xs mt-3 tracking-wide">
            Takes about 12 minutes to complete.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
