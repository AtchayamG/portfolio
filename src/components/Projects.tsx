import { projects } from '../data/content';
import { useReveal } from '../hooks/useReveal';

export default function Projects() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="projects" ref={ref} className="relative z-10 py-28 sm:py-36">
      <div className="section-shell">
        <p className="section-kicker" data-reveal>Featured Projects</p>
        <h2 className="section-title" data-reveal>Case studies from production, not prototypes.</h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className={`glass glass-hover group relative flex flex-col overflow-hidden p-7 ${i === 0 ? 'lg:col-span-2' : ''}`}
              data-reveal
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan/60 to-transparent opacity-60" aria-hidden="true" />
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{p.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">{p.tagline}</p>
                </div>
                <span className="rounded-full border border-violet/40 bg-violet/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-violet">{p.badge}</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-mist">{p.description}</p>

              <ul className={`mt-4 grid gap-2 ${i === 0 ? 'sm:grid-cols-2' : ''}`}>
                {p.highlights.map((h, j) => (
                  <li key={j} className="flex gap-2 text-[13px] leading-relaxed text-mist/90">
                    <svg className="mt-[3px] shrink-0 text-cyan" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-cyan transition-transform duration-200 hover:translate-x-1">
                    {p.linkLabel ?? 'View'}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7m0 0H8m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
