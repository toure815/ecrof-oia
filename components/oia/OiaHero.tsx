export default function OiaHero() {
  return (
    <section className="relative bg-ink overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/15196747/15196747-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-ink/85" />

      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(10,122,255,0.08),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* Dot grid texture */}
      <div className="absolute inset-0 dot-grid" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 md:py-44 flex flex-col items-center text-center gap-8">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
          Discover What&#39;s Quietly
          <br />
          Draining Your <em>Time, Money,</em>
          <br />
          <em>& Momentum.</em>
        </h1>

        {/* Pill label */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-bright font-mono text-xs tracking-widest uppercase">
          Your Operational Intelligence Partner
        </span>

        {/* Subhead */}
        <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
          A 12 minute operational intelligence audit that reveals where decisions stall,
          systems break, and growth leaks — before you spend another dollar fixing the wrong thing.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <a href="#pricing" className="btn-primary text-base px-8 py-4">
            Start Your Audit
          </a>
          <a
            href="#what-it-measures"
            className="btn-ghost-dark text-base"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
