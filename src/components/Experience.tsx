import { experience } from '../data/content';
import { useReveal } from '../hooks/useReveal';

export default function Experience() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="experience" ref={ref} className="relative z-10 py-28 sm:py-36">
      <div className="section-shell">
        <p className="section-kicker" data-reveal>Experience Timeline</p>
        <h2 className="section-title" data-reveal>Thirteen years. Five banks. One trajectory.</h2>

        <div className="relative mt-16">
          {/* glowing spine */}
          <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-cyan via-electric to-violet opacity-50 sm:left-1/2 sm:-translate-x-1/2" aria-hidden="true" />

          <ol className="space-y-12">
            {experience.map((job, i) => (
              <li key={`${job.company}-${job.period}`} className={`relative flex sm:items-center ${i % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end'}`} data-reveal>
                {/* node */}
                <span className="absolute left-4 top-6 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2" aria-hidden="true">
                  <span className="absolute h-4 w-4 animate-ping rounded-full bg-cyan/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-cyan to-electric shadow-glow" />
                </span>

                <article className={`glass glass-hover ml-10 w-full p-6 sm:ml-0 sm:w-[calc(50%-2.5rem)]`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-base font-semibold text-white sm:text-lg">{job.role}</h3>
                  </div>
                  <p className="mt-1 font-display text-sm font-medium text-cyan">{job.company}</p>
                  <p className="mt-1 font-mono text-[11px] text-mist/80">{job.period} · {job.mode}</p>
                  <ul className="mt-4 space-y-2">
                    {job.points.map((pt, j) => (
                      <li key={j} className="flex gap-2 text-[13px] leading-relaxed text-mist">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.tech.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
