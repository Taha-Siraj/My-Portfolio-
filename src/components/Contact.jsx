import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile, socials, contactInfo } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const rootRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-word span', {
        yPercent: 120,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power4.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
      });
      gsap.from('.ct-card', {
        y: 70,
        opacity: 0,
        rotate: -4,
        duration: 0.8,
        ease: 'back.out(1.4)',
        stagger: 0.1,
        scrollTrigger: { trigger: '.ct-grid', start: 'top 82%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    const f = e.target.elements;
    const text = encodeURIComponent(
      `Hello Taha,\n\nName: ${f.name.value}\nEmail: ${f.email.value}\nSubject: ${f.subject.value}\n\nMessage:\n${f.message.value}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/${profile.whatsapp}?text=${text}`, '_blank');
      setSending(false);
      setSent(true);
      e.target.reset();
      setTimeout(() => setSent(false), 5000);
    }, 700);
  };

  const inputCls =
    'w-full border-4 border-[#101010] bg-white px-4 py-3 text-lg font-semibold text-[#101010] placeholder-[#101010]/40 outline-none focus:bg-[#f7d000]/25';

  return (
    <section id="contact" ref={rootRef} className="relative overflow-hidden bg-[#013900] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="ct-word overflow-hidden text-center font-display leading-[0.95] text-[#b6fe00]">
          {'LET\'S STICK'.split('').map((ch, i) => (
            <span key={i} className="inline-block text-[15vw] md:text-[10vw]">{ch === ' ' ? '\u00A0' : ch}</span>
          ))}
          <br />
          {'TOGETHER'.split('').map((ch, i) => (
            <span key={i} className="inline-block text-[15vw] text-[#f5f0e6] md:text-[10vw]">{ch}</span>
          ))}
        </h2>
        <p className="font-hand mt-4 rotate-[-1deg] text-center text-3xl text-[#b6fe00]">
          got a project? let's make it stick.
        </p>

        <div className="ct-grid mt-14 grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            {contactInfo.map((c) => (
              <div key={c.label} className="ct-card paper-card relative flex items-center gap-4 p-4">
                <span className="tape -top-3 left-8 rotate-[-6deg]" style={{ width: 80 }} />
                <span className="flex h-14 w-14 shrink-0 items-center justify-center border-4 border-[#101010] bg-[#b6fe00] text-[#013900]">
                  <c.icon size={24} />
                </span>
                <span className="min-w-0">
                  <span className="font-display block text-xs tracking-[0.25em] text-[#a87c4e]">
                    {c.label.toUpperCase()}
                  </span>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noreferrer" className="block truncate text-xl font-bold text-[#101010] hover:text-[#013900] hover:underline">
                      {c.value}
                    </a>
                  ) : (
                    <span className="block text-xl font-bold text-[#101010]">{c.value}</span>
                  )}
                </span>
              </div>
            ))}
            <div className="ct-card flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="sticker flex h-14 w-14 items-center justify-center text-[#013900] transition-transform hover:-rotate-6 hover:scale-110"
                >
                  <s.icon size={22} />
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="ct-card paper-card relative p-6 md:p-8">
            <span className="tape tape-green -top-3 right-10 rotate-[7deg]" style={{ width: 100 }} />
            <p className="font-display text-2xl text-[#013900]">✉️ SEND A NOTE</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input name="name" required placeholder="YOUR NAME" className={inputCls} />
              <input name="email" type="email" required placeholder="EMAIL" className={inputCls} />
              <input name="subject" required placeholder="SUBJECT" className={`${inputCls} sm:col-span-2`} />
              <textarea name="message" required rows={4} placeholder="TELL ME ABOUT YOUR PROJECT..." className={`${inputCls} resize-none sm:col-span-2`} />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="btn-chunk mt-6 w-full bg-[#fa8005] px-8 py-4 font-display text-lg text-white disabled:opacity-60"
            >
              {sending ? 'STICKING...' : sent ? '✓ STUCK! TALK SOON' : 'STICK IT →'}
            </button>
            <p className="font-hand mt-3 text-center text-2xl text-[#a87c4e]">
              opens whatsapp with your message
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
