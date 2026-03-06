import ScrollReveal from "@/components/ui/ScrollReveal";

const STORIES = [
  {
    name: "Max",
    title: "50K Re-Activation",
    description:
      "After taking the audit, Max discovered over $50,000 in dormant leads sitting untouched in his pipeline. With a restructured workflow and intake system alignment, he reactivated lost connections, recovered momentum, and created a repeatable process that now fuels his growth consistently.",
    stats: [
      { value: "37%", label: "Increase in ROI" },
      { value: "18%", label: "Pipeline recovered" },
    ],
    quote:
      "They exposed our labor drain, removed the bottleneck on my desk, and freed the high value time that restored thousands in margin. Transformational!",
  },
  {
    name: "Nisha",
    title: "Labor Recovery",
    description:
      "Nisha, owner of Heavenly Ink Credentialing, was facing increased operational bottlenecks, delayed output, and avoidable payroll costs. By moving routine requests off the desk and aligning parts to staff where she now saves $4,600 in monthly labor expenses and kept 35.4% margin while refocusing her team to focus on real growth work.",
    stats: [
      { value: "35%", label: "Margin recovered" },
      { value: "40%", label: "Labor eliminated" },
    ],
    quote: null,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white section">
      <div className="container">
        <ScrollReveal className="flex flex-col items-center text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 font-mono text-xs tracking-widest uppercase mb-6">
            Case Studies
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Success Stories to <em>Inspire</em>
          </h2>
          <p className="text-gray-500 text-base max-w-xl">
            Real stories of reclaimed time, recovered revenue, and restored momentum.
          </p>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto space-y-8">
          {STORIES.map((story, i) => (
            <ScrollReveal key={story.name} delay={i * 150} animation="fade-in-scale">
              <div className="bg-gray-900 rounded-2xl overflow-hidden border border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Content side */}
                  <div className="p-8 md:p-10">
                    <h3 className="text-white font-bold text-xl mb-3">
                      {story.name}&#39;s {story.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                      {story.description}
                    </p>
                    <div className="flex gap-8">
                      {story.stats.map((stat) => (
                        <div key={stat.label}>
                          <p className="text-white text-3xl font-extrabold">{stat.value}</p>
                          <p className="text-white/40 text-xs mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image placeholder side */}
                  <div className="bg-gray-800 flex items-center justify-center min-h-[250px]">
                    <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                      <span className="text-white/30 text-3xl font-bold">{story.name[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pull quote */}
        <ScrollReveal delay={400} className="max-w-3xl mx-auto mt-12 text-center">
          <blockquote className="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug italic">
            They exposed our <em>labor drain,</em> removed the bottleneck on my desk, and freed the <em>high value</em> time that restored thousands in margin. <em>Transformational!</em>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
}
