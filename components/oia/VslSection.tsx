import ScrollReveal from "@/components/ui/ScrollReveal";

export default function VslSection() {
  return (
    <section className="bg-white section">
      <div className="container">
        <ScrollReveal className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900 text-white font-mono text-xs tracking-widest uppercase mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Watch Before You Start
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Why Most Fixes <em>Don&#39;t Work</em>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mb-10">
            In under 6 minutes, you&#39;ll understand where your business is leaking time, money, and momentum and why adding more effort, tools, or people often makes it worse.
          </p>
        </ScrollReveal>

        {/* YouTube video embed */}
        <ScrollReveal delay={150} animation="fade-in-scale" className="max-w-[950px] mx-auto">
          <div className="rounded-2xl overflow-hidden">
            <iframe
              width="100%"
              height="534"
              src="https://www.youtube.com/embed/1-WJxwQlGVY?rel=0&modestbranding=1"
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300} className="flex flex-col items-center mt-10 gap-4">
          <a href="#pricing" className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 hover:bg-gray-800 hover:-translate-y-0.5">
            Start the Audit — $197
          </a>
          <p className="text-gray-400 text-sm">
            Takes &lt; 12 minutes &bull; Immediate results &bull; Private & Confidential
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
