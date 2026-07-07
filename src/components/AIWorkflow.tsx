import { aiWorkflow } from '../data/content';
import { useReveal } from '../hooks/useReveal';

export default function AIWorkflow() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="ai-workflow" ref={ref} className="relative z-10 py-28 sm:py-36">
      <div className="section-shell">
        <p className="section-kicker" data-reveal>AI Tools · Automation · Workflow</p>
        <h2 className="section-title max-w-3xl" data-reveal>{aiWorkflow.title}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist sm:text-base" data-reveal>{aiWorkflow.intro}</p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {aiWorkflow.pillars.map((pillar, i) => (
            <div key={pillar.title} className="glass glass-hover relative overflow-hidden p-6" data-reveal>
              <span className="font-mono text-[11px] text-cyan/70">0{i + 1}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{pillar.text}</p>
              <div className="pointer-events-none absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-cyan/50 via-electric/30 to-transparent" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* pipeline strip */}
        <div className="glass mt-10 overflow-x-auto p-6" data-reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">Daily Delivery Pipeline</p>
          <div className="mt-4 flex min-w-max items-center gap-3 font-mono text-[11px] text-mist sm:text-xs">
            {['Architect with AI pair', 'Agents build in parallel', 'Automated review + tests', 'Human approval gate', 'Ship with audit trail'].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-3">
                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-ice">{step}</span>
                {i < arr.length - 1 && <span className="text-cyan" aria-hidden="true">─▶</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
