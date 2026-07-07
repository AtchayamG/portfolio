import { identity } from '../data/content';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-10">
      <div className="section-shell flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="flex items-center gap-2 font-display text-sm text-mist">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-electric to-cyan font-display text-[11px] font-bold text-void">A</span>
          © {new Date().getFullYear()} {identity.name} — All rights reserved.
        </p>
        <p className="font-mono text-[11px] text-mist/60">
          Designed &amp; engineered with an AI-native workflow · React · Three.js · GSAP
        </p>
      </div>
    </footer>
  );
}
