import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sections, identity } from '../data/content';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>
      <nav aria-label="Main navigation" className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${scrolled ? 'glass mx-4 sm:mx-auto' : ''}`}>
        <button onClick={() => go('hero')} className="flex items-center" aria-label="Atchayam G. — back to top">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan/30 bg-white/5 font-display text-base font-extrabold tracking-tight shadow-glow">
            <span className="text-cyan">A</span><span className="text-violet">G</span>
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {sections.slice(1).map((s) => (
            <li key={s.id}>
              <button
                onClick={() => go(s.id)}
                className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-200 ${
                  active === s.id ? 'bg-cyan/15 text-cyan' : 'text-mist hover:text-white'
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href={`${import.meta.env.BASE_URL}${identity.resumeFile}`} download className="btn-ghost hidden !px-4 !py-2 !text-xs md:inline-flex">
            Resume
          </a>
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span className={`h-[2px] w-5 bg-ice transition-transform ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
            <span className={`h-[2px] w-5 bg-ice transition-transform ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass mx-4 mt-2 p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {sections.slice(1).map((s) => (
                <li key={s.id}>
                  <button onClick={() => go(s.id)} className="w-full rounded-xl px-4 py-3 text-left font-display text-sm text-ice hover:bg-white/5 hover:text-cyan">
                    {s.label}
                  </button>
                </li>
              ))}
              <li>
                <a href={`${import.meta.env.BASE_URL}${identity.resumeFile}`} download className="block w-full rounded-xl px-4 py-3 font-display text-sm text-cyan">
                  Download Resume ↓
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
