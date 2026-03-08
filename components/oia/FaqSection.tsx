"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const FAQS = [
  {
    question: "Is this just another assessment?",
    answer:
      "No. Most assessments score behavior. This audit diagnoses operational design — how decisions, workflows, and systems actually function together. It shows where fixes will compound value... and where they'll backfire.",
  },
  {
    question: "Will this tell me what to do next?",
    answer:
      "Yes. You'll receive a personalized operational scorecard with specific, prioritized recommendations tied to measurable outcomes. Not generic advice — actionable next steps based on your unique operational profile.",
  },
  {
    question: "Who gets the most value from this?",
    answer:
      "Founders and operators running businesses at $250K+ in annual revenue who feel busy but not leveraged. If you know something is off in how your business operates but can't pinpoint exactly where, this audit was designed for you.",
  },
  {
    question: "What happens after I complete the audit?",
    answer:
      "You receive your results immediately. Based on your score, you'll see which operational phase you fall into — Category, Operational, or Autonomous Intelligence — and what the most impactful next move is for your business.",
  },
  {
    question: "Can the $197 be applied to future work?",
    answer:
      "Yes. If you move forward with any Ecrof engagement within 30 days, the full $197 is credited toward your investment. Think of it as a deposit on clarity.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 sm:py-5 text-left cursor-pointer group"
      >
        <span className="text-gray-900 font-semibold text-sm sm:text-base pr-4 group-hover:text-blue-core transition-colors">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-4 sm:pb-5" : "max-h-0"
        }`}
      >
        <p className="text-gray-500 text-sm leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  return (
    <section className="bg-white section">
      <div className="container">
        <ScrollReveal className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900 text-white font-mono text-xs tracking-widest uppercase mb-6">
            Before You Start
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Common Questions <em>Founders Ask</em>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl">
            Clarity on what this audit does and what it intentionally doesn&#39;t.
          </p>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 sm:gap-8">
          {/* Contact card */}
          <ScrollReveal delay={100}>
            <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 text-center border border-white/5 h-fit order-2 md:order-1">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Still Have Questions?</h3>
              <p className="text-white/50 text-sm mb-6">
                Still have questions? Feel free to get in touch with us today!
              </p>
              <a
                href="mailto:hello@ecrofmedia.com"
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:bg-gray-100"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Ask A Question
              </a>
            </div>
          </ScrollReveal>

          {/* FAQ accordion */}
          <ScrollReveal delay={200}>
            <div className="bg-white rounded-2xl order-1 md:order-2">
              {FAQS.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
