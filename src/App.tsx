import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AIWorkflow from './components/AIWorkflow';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { bindScrollState } from './three/scrollState';

const Scene = lazy(() => import('./three/Scene'));

function useMediaFlags() {
  return useMemo(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches || navigator.maxTouchPoints > 1;
    let webgl = true;
    try {
      const canvas = document.createElement('canvas');
      webgl = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      webgl = false;
    }
    return { reducedMotion, isMobile, webgl };
  }, []);
}

export default function App() {
  const { reducedMotion, isMobile, webgl } = useMediaFlags();
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => bindScrollState(), []);

  useEffect(() => {
    // preload the hero portrait, then release the loader
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}assets/portrait-cinematic.webp`;
    const finish = () => {
      setReady(true);
      setTimeout(() => setStarted(true), 650);
    };
    if (img.complete) finish();
    else {
      img.onload = finish;
      img.onerror = finish;
      // hard fallback so the site never hangs on a slow asset
      const t = setTimeout(finish, 4000);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <>
      <a href="#about" className="skip-link">Skip to content</a>
      <Loader done={ready} />

      {webgl ? (
        <Suspense fallback={<div className="fixed inset-0 z-0 bg-void" aria-hidden="true" />}>
          <Scene reducedMotion={reducedMotion} isMobile={isMobile} />
        </Suspense>
      ) : (
        // graceful fallback: static cinematic gradient backdrop
        <div
          className="fixed inset-0 z-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(47,107,255,0.25), transparent), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(139,92,246,0.18), transparent), #04050a',
          }}
        />
      )}

      <Nav />
      <main id="main">
        <Hero started={started} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <AIWorkflow />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
