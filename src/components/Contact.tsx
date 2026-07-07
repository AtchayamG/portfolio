import { identity, composeMailUrl } from '../data/content';
import { useReveal } from '../hooks/useReveal';

export default function Contact() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="contact" ref={ref} className="relative z-10 overflow-hidden py-28 sm:py-40">
      {/* Higgsfield-generated digital-city backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src={`${import.meta.env.BASE_URL}assets/city-backdrop.webp`}
          alt=""
          className="h-full w-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #04050a 0%, rgba(4,5,10,0.55) 45%, #04050a 100%)' }} />
      </div>
      <div className="section-shell">
        <div className="glass relative overflow-hidden p-8 text-center sm:p-14" data-reveal>
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-electric/25 via-cyan/25 to-violet/25 blur-3xl" aria-hidden="true" />

          <p className="section-kicker">Resume &amp; Contact</p>
          <h2 className="section-title mx-auto max-w-2xl">Let&apos;s build something that matters.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
            Hiring for a lead architect? Modernising a mobile platform? Exploring AI-native delivery?
            I answer every serious message.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={composeMailUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16v12H4V6Zm0 0 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {identity.email}
            </a>
            <a href={`${import.meta.env.BASE_URL}${identity.resumeFile}`} download className="btn-ghost">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v12m0 0 4-4m-4 4-4-4M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Download Resume
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-5">
            <a href={identity.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-mist transition-all duration-300 hover:border-cyan/60 hover:text-cyan hover:shadow-glow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8.31h4.52V23H.24V8.31Zm7.44 0h4.33v2h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.92V23h-4.5v-7.1c0-1.7-.03-3.88-2.37-3.88-2.37 0-2.73 1.85-2.73 3.76V23H7.68V8.31Z"/></svg>
            </a>
            <a href={identity.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-mist transition-all duration-300 hover:border-cyan/60 hover:text-cyan hover:shadow-glow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.05.78 2.13v3.16c0 .3.2.66.8.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
            </a>
            <a href={`tel:${identity.phone.replace(/\s/g, '')}`} aria-label="Call Atchayam" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-mist transition-all duration-300 hover:border-cyan/60 hover:text-cyan hover:shadow-glow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>

          <p className="mt-6 font-mono text-[11px] text-mist/70">
            <a href={`mailto:${identity.email}`} className="transition-colors hover:text-cyan">{identity.email}</a> · {identity.phone} · {identity.location}
          </p>
        </div>
      </div>
    </section>
  );
}
