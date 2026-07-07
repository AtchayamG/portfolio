// Shared mutable scroll state — written by the DOM scroll listener,
// read every frame by the R3F camera rig (no React re-renders).
export const scrollState = {
  /** normalized page scroll 0..1 */
  progress: 0,
  /** smoothed value the camera actually uses */
  smooth: 0,
  /** normalized pointer -1..1 */
  pointerX: 0,
  pointerY: 0,
};

export function bindScrollState() {
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollState.progress = max > 0 ? window.scrollY / max : 0;
  };
  const onPointer = (e: PointerEvent) => {
    scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    scrollState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('pointermove', onPointer, { passive: true });
  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('pointermove', onPointer);
  };
}
