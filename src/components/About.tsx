import { about, education } from '../data/content';
import { useReveal } from '../hooks/useReveal';

export default function About() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="about" ref={ref} className="relative z-10 py-28 sm:py-36">
      <div className="section-shell">
        <p className="section-kicker" data-reveal>Career Story</p>
        <h2 className="section-title max-w-3xl" data-reveal>{about.title}</h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-[15px] leading-relaxed text-mist sm:text-base">
            {about.paragraphs.map((p, i) => (
              <p key={i} data-reveal>{p}</p>
            ))}
          </div>

          <div className="space-y-5">
            <div className="glass glass-hover relative overflow-hidden p-1.5" data-reveal>
              <img
                src={`${import.meta.env.BASE_URL}assets/portrait-cinematic.webp`}
                alt="Atchayam G. in a futuristic professional setting"
                className="aspect-[3/4] w-full rounded-xl object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-void/70 via-transparent to-transparent" aria-hidden="true" />
              <p className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan">Architect · Builder · Leader</p>
            </div>
            <div className="glass glass-hover p-5" data-reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">Education</p>
              <p className="mt-2 font-display text-sm font-semibold text-white">{education.degree}</p>
              <p className="mt-1 text-xs text-mist">{education.college}</p>
              <p className="mt-1 font-mono text-[11px] text-mist/70">{education.period}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
