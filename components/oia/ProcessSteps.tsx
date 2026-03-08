"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const STEPS = [
  {
    label: "Step 1",
    number: "01",
    title: "DIAGNOSE",
    description:
      "Answer a focused set of questions that reveal where your operations are creating drag before you try to fix anything.",
    visual: (
      <div className="bg-ink-deep rounded-xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 bg-white/5 rounded-lg p-3 sm:p-4 border border-white/8">
            <p className="text-white/40 text-xs mb-1">Customers</p>
            <p className="text-white text-xl sm:text-2xl font-bold">-32%</p>
            <div className="mt-3 h-12 flex items-end gap-1">
              {[40, 55, 35, 60, 45, 30, 50, 38, 42].map((h, i) => (
                <div key={i} className="flex-1 bg-white/10 rounded-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="flex-1 bg-white/5 rounded-lg p-3 sm:p-4 border border-white/8">
            <p className="text-white/40 text-xs mb-1">Cost Management</p>
            <p className="text-white text-xl sm:text-2xl font-bold">-54%</p>
            <div className="mt-3 h-12 flex items-end gap-1">
              {[60, 45, 55, 30, 40, 35, 25, 30, 20].map((h, i) => (
                <div key={i} className="flex-1 bg-white/10 rounded-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/8">
          <p className="text-white/60 text-xs font-semibold mb-3">Weakest Systems</p>
          {[
            { name: "Marketing & ads", score: 32, color: "bg-blue-core" },
            { name: "Operations", score: 14, color: "bg-blue-vivid" },
            { name: "Money & Finance", score: 44, color: "bg-blue-bright" },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-2 sm:gap-3 mb-2.5 last:mb-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-white/10" />
              </div>
              <span className="text-white text-xs sm:text-sm font-medium flex-1 min-w-0 truncate">{item.name}</span>
              <div className="w-16 sm:w-24 h-2 bg-white/5 rounded-full overflow-hidden flex-shrink-0">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
              </div>
              <span className="text-white/40 text-[10px] sm:text-xs w-12 sm:w-14 text-right flex-shrink-0">{item.score}% <span className="text-white/25">Score</span></span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Step 2",
    number: "02",
    title: "DEFINE",
    description:
      "We analyze your answers across core operational dimensions to identify where effort is leaking and momentum breaks down.",
    visual: (
      <div className="bg-ink-deep rounded-xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
          <div className="bg-white/5 rounded-lg px-3 py-1.5 border border-white/8">
            <span className="text-white/60 text-xs">Analysis</span>
          </div>
          <div className="flex gap-2">
            <div className="bg-white/5 rounded px-2 py-1 border border-white/8">
              <span className="text-blue-bright text-base sm:text-lg font-bold">3,6K</span>
              <span className="text-white/30 text-[10px] sm:text-xs ml-1">Data Points</span>
            </div>
            <div className="bg-white/5 rounded px-2 py-1 border border-white/8">
              <span className="text-blue-bright text-base sm:text-lg font-bold">2m</span>
              <span className="text-white/30 text-[10px] sm:text-xs ml-1">Processing</span>
            </div>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/8 font-mono text-xs sm:text-sm overflow-x-auto">
          <p className="text-white/30 mb-2">// Build & Implement →</p>
          <p className="text-white/60">
            <span className="text-blue-bright">async function</span> <span className="text-white">generateResponse</span>(prompt) &#123;
          </p>
          <p className="text-white/40 pl-4">const response = await fetch(...);</p>
          <p className="text-white/40 pl-4">method: &apos;POST&apos;,</p>
          <p className="text-white/40 pl-4">headers: &#123; ... &#125;,</p>
          <p className="text-white/40 pl-4">body: JSON.stringify(&#123;</p>
          <p className="text-white/40 pl-6 sm:pl-8">model: &apos;analysis&apos;,</p>
          <p className="text-white/40 pl-4">&#125;)</p>
          <p className="text-white/60">&#125;</p>
        </div>
      </div>
    ),
  },
  {
    label: "Step 3",
    number: "03",
    title: "DESIGN → DEPLOY",
    description:
      "You get a concise operational scorecard showing where to focus, what to ignore, and what will move the needle next.",
    visual: (
      <div className="bg-ink-deep rounded-xl p-4 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 sm:gap-4 mb-2">
          <div className="flex gap-2">
            <div className="bg-white/5 rounded px-2 py-1 border border-white/8">
              <span className="text-blue-bright text-base sm:text-lg font-bold">3,6K</span>
              <span className="text-white/30 text-[10px] sm:text-xs ml-1">Users</span>
            </div>
            <div className="bg-white/5 rounded px-2 py-1 border border-white/8">
              <span className="text-blue-bright text-base sm:text-lg font-bold">2m</span>
              <span className="text-white/30 text-[10px] sm:text-xs ml-1">Processed</span>
            </div>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/8">
          <p className="text-white/60 text-xs font-semibold mb-1">Growth & Efficiency Driven</p>
          <div className="h-16 flex items-end gap-1 mb-4">
            {[20, 30, 25, 40, 50, 45, 55, 65, 60, 70, 75, 80].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-core/30 rounded-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
          {[
            { name: "Marketing & ads", score: 84 },
            { name: "Operations", score: 94 },
            { name: "Money & Finance", score: 88 },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-2 sm:gap-3 mb-2.5 last:mb-0">
              <span className="text-white text-xs sm:text-sm font-medium flex-1 min-w-0 truncate">{item.name}</span>
              <div className="w-16 sm:w-24 h-2 bg-white/5 rounded-full overflow-hidden flex-shrink-0">
                <div className="h-full bg-blue-core rounded-full" style={{ width: `${item.score}%` }} />
              </div>
              <span className="text-white/40 text-[10px] sm:text-xs w-12 sm:w-14 text-right flex-shrink-0">{item.score}% <span className="text-white/25">Score</span></span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function ProcessSteps() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="bg-white section">
      <div className="container">
        <ScrollReveal className="flex flex-col items-center text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our Simple & <em>Smart Process</em>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl">
            Everything you need to clarify, organize, and scale; all in one place.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-in-scale">
          <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden">
            {/* Step tabs */}
            <div className="grid grid-cols-3">
              {STEPS.map((step, i) => (
                <button
                  key={step.label}
                  onClick={() => setActive(i)}
                  className={`py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                    active === i
                      ? "bg-white text-gray-900"
                      : "bg-gray-700 text-white/60 hover:bg-gray-600 hover:text-white/80"
                  }`}
                >
                  {step.label}
                </button>
              ))}
            </div>

            {/* Step content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-5 sm:p-8 md:p-12">
              <div className="transition-opacity duration-500 order-2 md:order-1">
                {STEPS[active].visual}
              </div>
              <div className="flex flex-col justify-center order-1 md:order-2">
                <span className="text-white/30 font-mono text-sm mb-2">{STEPS[active].number}</span>
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 tracking-tight">
                  {STEPS[active].title}
                </h3>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                  {STEPS[active].description}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} className="flex justify-center mt-10">
          <a href="#pricing" className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 hover:bg-gray-800 hover:-translate-y-0.5 border border-gray-900 hover:border-gray-700">
            Start Your Audit
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
