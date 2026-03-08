import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FinalCta() {
  return (
    <section className="bg-white section">
      <div className="container">
        <ScrollReveal className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full bg-gray-900 text-white font-mono text-xs tracking-widest uppercase mb-6 sm:mb-8 border border-gray-700">
            Start Now
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Smart Operations Start{" "}
            <br className="hidden sm:block" />
            <em>With One Simple Audit</em>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-lg mb-6 sm:mb-8">
            Answer a short diagnostic and see where your systems are helping and where they&#39;re quietly holding you back.
          </p>

          <a
            href="/startaudit"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-200 hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            Begin the Audit
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
