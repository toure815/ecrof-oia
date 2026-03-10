"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function VslSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-white vsl-section">
      <div className="container">
        <ScrollReveal className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900 text-white font-mono text-xs tracking-widest uppercase mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Watch This First
          </span>

          <h2 className="text-[32px] md:text-5xl font-extrabold text-gray-900 leading-[1.15] mb-4">
            Why Most Fixes <em>Don&#39;t Work</em>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-[520px] leading-[1.55]">
            In under 6 minutes, you&#39;ll see where businesses lose time, money, and momentum — and why adding more tools, people, or effort often makes the problem worse.
          </p>
        </ScrollReveal>

        {/* Video container */}
        <ScrollReveal delay={150} animation="fade-in-scale" className="vsl-video-wrap max-w-[720px] mx-auto">
          {/* Intro line */}
          <p className="text-gray-400 text-xs md:text-sm text-center mb-4 tracking-wide">
            A quick breakdown before you start.
          </p>

          <div className="vsl-video-container relative rounded-2xl overflow-hidden">
            {playing ? (
              <>
                {/* Overlay to hide YouTube title bar */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-black z-10 pointer-events-none" />
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube-nocookie.com/embed/1-WJxwQlGVY?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&autoplay=1"
                  title="Why Most Fixes Don't Work"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </>
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="relative w-full cursor-pointer bg-gray-900 group"
                aria-label="Play video"
              >
                {/* Thumbnail */}
                <img
                  src="https://img.youtube.com/vi/1-WJxwQlGVY/maxresdefault.jpg"
                  alt="Video thumbnail"
                  loading="lazy"
                  className="w-full aspect-video object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-300"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 md:w-8 md:h-8 text-gray-900 ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* Micro trust line */}
          <p className="text-gray-400 text-xs md:text-sm text-center mt-4 tracking-wide">
            Most founders realize the problem within the first 3 minutes.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300} className="flex flex-col items-center mt-10 gap-4">
          <a href="#pricing" className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:bg-gray-800 hover:-translate-y-0.5">
            Start the Audit — $197
          </a>
          <p className="text-gray-400 text-sm">
            Takes &lt; 12 minutes &bull; Immediate results &bull; Private &amp; Confidential
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
