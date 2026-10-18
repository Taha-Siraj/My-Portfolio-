import { useState } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';
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
    'w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-white/30 outline-none backdrop-blur-md transition-all focus:border-cyan-300/60 focus:bg-white/10 focus:shadow-[0_0_24px_rgba(34,211,238,0.15)]';

  return (
    <section
      id="contact"
      data-palette="7"
      className="relative z-10 px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Transmission"
          title="Let's Build Something Epic"
          desc="Have a project in mind? My inbox — and my DMs — are always open."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Reveal>
              <h3 className="font-display text-2xl font-bold text-white">
                Get in <span className="gradient-text">touch</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Whether it's a full-stack build, a Shopify store, or a wild
                WebGL idea — let's talk. I usually reply within 24 hours.
              </p>
            </Reveal>

            <div className="mt-7 space-y-4">
              {contactInfo.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.08}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="glass group flex items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-cyan-300/40"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-400/10 text-cyan-300 transition-transform group-hover:scale-110">
                        <c.icon size={19} />
                      </span>
                      <span>
                        <span className="font-mono2 block text-[10px] uppercase tracking-[0.2em] text-white/40">
                          {c.label}
                        </span>
                        <span className="block text-sm font-semibold text-white">
                          {c.value}
                        </span>
                      </span>
                    </a>
                  ) : (
                    <div className="glass flex items-center gap-4 rounded-2xl p-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-400/10 text-cyan-300">
                        <c.icon size={19} />
                      </span>
                      <span>
                        <span className="font-mono2 block text-[10px] uppercase tracking-[0.2em] text-white/40">
                          {c.label}
                        </span>
                        <span className="block text-sm font-semibold text-white">
                          {c.value}
                        </span>
                      </span>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.25}>
              <div className="mt-7 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="glass flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-all hover:-translate-y-1 hover:border-fuchsia-400/50 hover:text-white hover:shadow-[0_0_20px_rgba(255,0,255,0.35)]"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="glass relative overflow-hidden rounded-[1.75rem] p-7 md:p-9"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />

              <div className="relative grid gap-5 sm:grid-cols-2">
                <input name="name" required placeholder="Your name" className={inputCls} />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  className={inputCls}
                />
                <input
                  name="subject"
                  required
                  placeholder="Subject"
                  className={`${inputCls} sm:col-span-2`}
                />
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={`${inputCls} resize-none sm:col-span-2`}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 px-8 py-4 text-sm font-bold text-[#030014] shadow-[0_0_36px_rgba(34,211,238,0.3)] transition-transform hover:scale-[1.02] disabled:opacity-70 sm:w-auto"
              >
                {sending ? (
                  <>
                    <Loader2 size={17} className="animate-spin" /> Opening WhatsApp...
                  </>
                ) : sent ? (
                  <>
                    <CheckCircle2 size={17} /> Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
              <p className="font-mono2 relative mt-4 text-[11px] text-white/35">
                {'//'} messages open directly in WhatsApp
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
