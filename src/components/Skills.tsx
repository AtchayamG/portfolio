import { skillGroups } from '../data/content';
import { useReveal } from '../hooks/useReveal';

const icons: Record<string, JSX.Element> = {
  ai: <path d="M12 2a4 4 0 0 1 4 4c0 .7-.2 1.4-.5 2H17a3 3 0 0 1 3 3c0 .8-.3 1.6-.9 2.1.6.6.9 1.3.9 2.1a3 3 0 0 1-3 3h-1.5c.3.6.5 1.3.5 2a4 4 0 0 1-8 0c0-.7.2-1.4.5-2H7a3 3 0 0 1-3-3c0-.8.3-1.5.9-2.1A3 3 0 0 1 4 11a3 3 0 0 1 3-3h1.5A4.2 4.2 0 0 1 8 6a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  tools: <path d="m14.7 6.3 3 3L21 6l-3-3-3.3 3.3ZM3 21l7.5-7.5M13 8l3 3L8.5 18.5l-4-1 1-3L13 8Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  mobile: <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm3 16h2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />,
  web: <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm0 0h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9Z" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  backend: <path d="M4 5h16v5H4V5Zm0 9h16v5H4v-5Zm3-6.5h.01M7 16.5h.01" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />,
  bank: <path d="M3 9.5 12 4l9 5.5M5 10v8m4.5-8v8m5-8v8M19 10v8M3 20h18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  shield: <path d="M12 3 5 6v5c0 4.5 3 8.6 7 10 4-1.4 7-5.5 7-10V6l-7-3Zm-2.5 9 2 2 3.5-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  lead: <path d="M16 11a4 4 0 1 0-8 0m8 0a4 4 0 0 1-8 0m8 0c2.8.6 5 2 5 4.5V19H3v-3.5C3 13 5.2 11.6 8 11" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />,
};

export default function Skills() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="skills" ref={ref} className="relative z-10 py-28 sm:py-36">
      <div className="section-shell">
        <p className="section-kicker" data-reveal>Skills &amp; Tech Stack</p>
        <h2 className="section-title" data-reveal>Holographic control panels of a hybrid engineer.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist sm:text-base" data-reveal>
          A rare stack: a decade of banking-grade mobile architecture, fused with a modern AI-native toolchain.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title} className="glass glass-hover group relative overflow-hidden p-5" data-reveal>
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0" aria-hidden="true" />
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan/25 bg-cyan/10 text-cyan">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">{icons[group.icon]}</svg>
                </span>
                <h3 className="font-display text-sm font-semibold text-white">{group.title}</h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
