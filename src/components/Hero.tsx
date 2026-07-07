import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { identity, stats, composeMailUrl } from '../data/content';

function Typewriter({ words }: { words: readonly string[] | string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) setTimeout(() => setDeleting(true), 1800);
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (next === '') {
            setDeleting(false);
            setIndex((i) => i + 1);
          }
        }
      },
      deleting ? 35 : 70
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span className="text-cyan" aria-live="polite">
      {text}
      <span className="animate-pulse">▍</span>
    </span>
  );
}

function StatCounter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now() + delay * 1000;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / 1400));
      setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, delay]);
  return (
    <div className="text-center">
      <p className="font-display text-3xl font-bold text-white sm:text-4xl">
        {n}
        <span className="text-cyan">{suffix}</span>
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mist sm:text-[11px]">{label}</p>
    </div>
  );
}

export default function Hero({ started }: { started: boolean }) {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24">
      {/* dark scrim behind the hero copy so the name + subhead always read over the city */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 58% at 50% 54%, rgba(4,6,14,0.82) 0%, rgba(4,6,14,0.5) 42%, transparent 76%)',
        }}
      />
      <div className="section-shell flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={started ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8"
        >
          <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-electric/40 via-cyan/30 to-violet/40 blur-2xl" aria-hidden="true" />
          <img
            src={`${import.meta.env.BASE_URL}assets/portrait-cinematic.webp`}
            alt="Portrait of Atchayam G."
            width={176}
            height={176}
            className="relative h-36 w-36 rounded-full border-2 border-cyan/40 object-cover object-top shadow-glow sm:h-44 sm:w-44"
            loading="eager"
          />
          <span className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-void">
            <span className="h-3 w-3 animate-pulse rounded-full bg-cyan" aria-hidden="true" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="section-kicker"
        >
          {identity.location} · Open to Global Opportunities
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.08] text-white sm:text-6xl lg:text-7xl"
        >
          <span className="grad-text">{identity.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-4 min-h-[2rem] font-display text-lg font-medium text-ice sm:text-2xl"
        >
          <Typewriter words={identity.roles} />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-5 max-w-2xl text-sm leading-relaxed text-mist sm:text-base"
        >
          {identity.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.05 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary">
            Explore My Work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14m0 0 6-6m-6 6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <a href={composeMailUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Let&apos;s Talk
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.3 }}
          className="glass mt-12 grid w-full max-w-2xl grid-cols-2 gap-6 px-8 py-6 sm:grid-cols-4"
        >
          {stats.map((s, i) => (
            <StatCounter key={s.label} {...s} delay={1.4 + i * 0.15} />
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.span animate={{ y: [0, 12, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="h-2 w-1 rounded-full bg-cyan" />
        </div>
      </motion.div>
    </section>
  );
}
