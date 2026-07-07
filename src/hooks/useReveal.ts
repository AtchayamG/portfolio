import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Reveals children marked with [data-reveal] as the section scrolls in.
 * Uses IntersectionObserver to trigger a GSAP stagger — robust regardless
 * of layout shifts, image loading or scroll position at mount.
 * Respects prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (reduced || targets.length === 0) return;

    gsap.set(targets, { autoAlpha: 0, y: 42 });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      gsap.to(targets, { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out', overwrite: true });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0.05 }
    );
    io.observe(el);

    // safety net: if the section is already in view (deep-link / fast scroll)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) play();

    return () => {
      io.disconnect();
      gsap.set(targets, { clearProps: 'all' });
    };
  }, []);

  return ref;
}
