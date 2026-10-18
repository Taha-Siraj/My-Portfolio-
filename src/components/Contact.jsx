import { useState } from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { profile, socials, contactInfo } from '../data/content';

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

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
    'w-full border-4 border-black bg-[#0a0a10] px-4 py-3 text-2xl text-white placeholder-[#4a4a60] outline-none transition-colors focus:border-[#00e436]';

  return (
    <section id="contact" className="relative z-10 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="MULTIPLAYER"
          title="JOIN MY PARTY"
          desc="Looking for a developer for your next quest? Send a transmission."
          color="green"
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="pixel-panel p-6">
                <div className="font-pixel text-[10px] text-[#00e436]">
                  ▸ PARTY INVITE
                </div>
                <p className="mt-4 text-2xl leading-snug text-[#c9c9d8]">
                  Whether it's a full-stack build, a Shopify store, or a wild
                  WebGL idea — let's team up. I usually reply within 24 hours.
                </p>
              </div>
            </Reveal>

            <div className="mt-6 space-y-4">
              {contactInfo.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.07}>
                  <div className="pixel-panel flex items-center gap-4 p-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border-[3px] border-black bg-[#00e436] text-[#061206]">
                      <c.icon size={22} />
                    </span>
                    <span className="min-w-0">
                      <span className="font-pixel block text-[8px] text-[#9a9ab0]">
                        {c.label.toUpperCase()}
                      </span>
                      {c.href ? (
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noreferrer"
                          className="block truncate text-xl text-white hover:text-[#ffec27]"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <span className="block text-xl text-white">{c.value}</span>
                      )}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-6 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="pixel-panel-light flex h-12 w-12 items-center justify-center text-white transition-transform hover:-translate-y-1"
                  >
                    <s.icon size={20} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="pixel-panel p-6 md:p-8">
              <div className="font-pixel mb-6 text-[10px] text-[#ffec27]">
                ▸ NEW MESSAGE
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <input name="name" required placeholder="YOUR NAME" className={inputCls} />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="YOUR EMAIL"
                  className={inputCls}
                />
                <input
                  name="subject"
                  required
                  placeholder="QUEST SUBJECT"
                  className={`${inputCls} sm:col-span-2`}
                />
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="DESCRIBE YOUR QUEST..."
                  className={`${inputCls} resize-none sm:col-span-2`}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="pixel-btn pixel-btn-green font-pixel mt-6 w-full px-8 py-4 text-[11px] disabled:opacity-60 sm:w-auto"
              >
                {sending ? 'SENDING...' : sent ? '✓ SENT!' : '▶ SEND TRANSMISSION'}
              </button>
              <p className="mt-4 text-xl text-[#4a4a60]">
                {'//'} opens WhatsApp with your message
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
