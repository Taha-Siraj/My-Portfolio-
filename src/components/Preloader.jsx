import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const [count, setCount] = useState(0);
  const rootRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    let n = 0;
    const tick = setInterval(() => {
      n += Math.floor(Math.random() * 12) + 4;
      if (n >= 100) {
        n = 100;
        clearInterval(tick);
        setTimeout(finish, 350);
      }
      setCount(n);
      if (barRef.current) barRef.current.style.width = `${n}%`;
    }, 110);

    function finish() {
      window.__siteReady = true;
      window.dispatchEvent(new Event('site-ready'));
      gsap.to(rootRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        onComplete: () => {
          if (rootRef.current) rootRef.current.style.display = 'none';
        },
      });
    }

    const safety = setTimeout(() => {
      clearInterval(tick);
      finish();
    }, 5000);

    return () => {
      clearInterval(tick);
      clearTimeout(safety);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014]"
    >
      <div className="font-mono2 text-xs tracking-[0.4em] text-cyan-300/80 uppercase mb-4">
        Initializing dimension
      </div>
      <div className="font-display text-6xl md:text-8xl font-extrabold gradient-text tabular-nums">
        {count}%
      </div>
      <div className="mt-6 h-[3px] w-56 md:w-72 overflow-hidden rounded-full bg-white/10">
        <div
          ref={barRef}
          className="h-full w-0 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"
        />
      </div>
      <div className="font-mono2 mt-4 text-[11px] tracking-[0.3em] text-white/40 uppercase">
        Taha.Siraj // Portfolio v3.0
      </div>
    </div>
  );
}
