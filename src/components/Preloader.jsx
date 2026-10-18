import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const TIPS = [
  'TIP: CLICK ANYWHERE FOR COINS',
  'TIP: SCROLL TO EXPLORE THE WORLD',
  'TIP: THIS PORTFOLIO RUNS ON WEBGL',
];

export default function Preloader() {
  const [count, setCount] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    let n = 0;
    const tip = TIPS[Math.floor(Math.random() * TIPS.length)];
    const tipEl = document.getElementById('load-tip');
    if (tipEl) tipEl.textContent = tip;
    const tick = setInterval(() => {
      n += Math.floor(Math.random() * 14) + 5;
      if (n >= 100) {
        n = 100;
        clearInterval(tick);
        setTimeout(finish, 400);
      }
      setCount(n);
    }, 120);

    function finish() {
      window.__siteReady = true;
      window.dispatchEvent(new Event('site-ready'));
      gsap.to(rootRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: () => {
          if (rootRef.current) rootRef.current.style.display = 'none';
        },
      });
    }
    const safety = setTimeout(() => {
      clearInterval(tick);
      finish();
    }, 6000);
    return () => {
      clearInterval(tick);
      clearTimeout(safety);
    };
  }, []);

  const segs = 20;
  const filled = Math.round((count / 100) * segs);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#101018] px-6"
    >
      <div className="h-pixel-sm text-center text-lg text-[#00e436] md:text-xl">
        LOADING WORLD...
      </div>
      <div className="font-pixel mt-6 text-4xl text-white md:text-5xl tabular-nums">
        {count}%
      </div>
      <div className="mt-6 flex gap-1.5">
        {Array.from({ length: segs }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-3 border-2 border-black md:w-4"
            style={{ background: i < filled ? '#00e436' : '#1d1d2b' }}
          />
        ))}
      </div>
      <div
        id="load-tip"
        className="mt-8 text-center text-xl text-[#9a9ab0]"
        style={{ fontFamily: "'VT323', monospace" }}
      />
      <div className="font-pixel mt-4 text-[10px] text-[#4a4a60]">
        TAHA.SIRAJ // PORTFOLIO v4.0
      </div>
    </div>
  );
}
