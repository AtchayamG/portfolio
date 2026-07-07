import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader({ done }: { done: boolean }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    // time-based (immune to rAF throttling in background tabs)
    const start = performance.now();
    const id = window.setInterval(() => {
      const elapsed = (performance.now() - start) / 1000;
      const target = done ? 100 : 88;
      const value = target * (1 - Math.exp(-2.6 * elapsed));
      const next = Math.min(100, Math.round(value));
      setPct(next);
      if (next >= 100) window.clearInterval(id);
    }, 50);
    return () => window.clearInterval(id);
  }, [done]);

  return (
    <AnimatePresence>
      {!(done && pct >= 100) && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          aria-label="Loading portfolio"
          role="status"
        >
          <div className="relative flex h-28 w-28 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full border border-cyan/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{ borderTopColor: '#22d3ee' }}
            />
            <motion.span
              className="absolute inset-3 rounded-full border border-electric/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ borderBottomColor: '#2f6bff' }}
            />
            <span className="font-display text-2xl font-bold grad-text">AG</span>
          </div>
          <p className="mt-8 font-mono text-xs tracking-[0.4em] text-mist">INITIALIZING DIGITAL WORLD</p>
          <div className="mt-4 h-[2px] w-48 overflow-hidden rounded bg-white/10">
            <div className="h-full rounded bg-gradient-to-r from-cyan to-electric transition-[width] duration-200" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 font-mono text-[11px] text-mist/70">{pct}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
