import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const [count, setCount] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    let n = 0;
    const tick = setInterval(() => {
      n += Math.floor(Math.random() * 16) + 6;
      if (n >= 100) {
        n = 100;
        clearInterval(tick);
        setTimeout(finish, 350);
      }
      setCount(n);
    }, 110);

    function finish() {
      window.__siteReady = true;
      window.dispatchEvent(new Event('site-ready'));
      gsap.to(rootRef.current, {
        yPercent: -100,
        duration: 0.8,
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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#b6fe00]"
    >
      <div className="sticker-dark rotate-[-4deg] px-6 py-3">
        <span className="font-display text-2xl tracking-wide text-white">
          TAHA<span className="text-[#b6fe00]">.SIRAJ</span>
        </span>
      </div>
      <div className="font-display mt-8 text-7xl text-[#013900] tabular-nums md:text-8xl">
        {count}%
      </div>
      <div className="font-hand mt-4 text-3xl text-[#013900]">
        sticking things together...
      </div>
    </div>
  );
}
