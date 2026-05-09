import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";

export default function QuoteSection() {
  return (
    <section className="bg-gray-50 section">
      <div className="container">
        <ScrollReveal className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900 text-white font-mono text-xs tracking-widest uppercase mb-10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            We Analyze Your Data
          </span>

          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-snug mb-8">
            We show you your real <em>gaps,</em> what&#39;s disrupting your <em>flow,</em> and the vision that brings your genius back into <em>focus.</em>
          </blockquote>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <Image
                src="/toure-headshot.png"
                alt="Toure Young"
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 text-sm">Toure Young</p>
              <p className="text-gray-500 text-sm">Co-founder & Strategy Lead</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
