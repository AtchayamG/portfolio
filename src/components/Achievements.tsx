import { achievements, certifications } from '../data/content';
import { useReveal } from '../hooks/useReveal';

export default function Achievements() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="achievements" ref={ref} className="relative z-10 py-28 sm:py-36">
      <div className="section-shell">
        <p className="section-kicker" data-reveal>Achievements &amp; Certifications</p>
        <h2 className="section-title" data-reveal>Proof, not promises.</h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a) => (
            <div key={a.title} className="glass glass-hover p-6" data-reveal>
              <svg className="text-cyan" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 0v6m-3.5-2 3.5 2 3.5-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="mt-3 font-display text-base font-semibold text-white">{a.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-mist">{a.text}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-16 font-display text-xl font-semibold text-white" data-reveal>Certified in the AI era</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {certifications.map((c) => (
            <div key={c.name} className="glass glass-hover flex items-start gap-4 p-5" data-reveal>
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet/30 bg-violet/10 text-violet">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 12l2 2 4-4m5 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-white">{c.name}</p>
                <p className="font-mono text-[11px] text-cyan">{c.org}</p>
                <p className="mt-1 text-xs leading-relaxed text-mist">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
