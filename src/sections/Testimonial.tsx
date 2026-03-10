import { useScrollReveal } from '../hooks/useScrollReveal';

const testimonials = [
  {
    quote: "Finally, an agency that understands the difference between 'clean' and 'empty.' They built us a site that actually converts.",
    name: 'Sarah Jenkins',
    role: 'Founder, Arch. Studio',
    metric: '+40% inquiries',
  },
  {
    quote: "We went from a template that was embarrassing to show investors to one we're genuinely proud of. Pre-seed closed in 3 weeks after launch.",
    name: 'Arjun Mehta',
    role: 'Co-founder, Vibes.ai',
    metric: 'Pre-seed secured',
  },
  {
    quote: "ARC didn't just build what I asked for — they challenged me on things that would have hurt conversions. That honesty is rare.",
    name: 'Priya Nair',
    role: 'CEO, Maison & Co.',
    metric: '+65% conversion',
  },
];

const Testimonial = () => {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={revealRef}
      className="reveal reveal-stagger bg-surface"
      style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
    >
      <div className="grid-editorial">
        {/* Label */}
        <div className="grid-full mb-12 md:mb-16">
          <div className="reveal-child flex items-end justify-between">
            <span className="label-overline">What they say</span>
            <span className="text-text-muted text-[12px] font-sans">{testimonials.length} clients</span>
          </div>
        </div>

        {/* Cards */}
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="reveal-child col-span-12 md:col-span-4 flex flex-col"
            style={{ paddingBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            <div
              className="flex flex-col h-full py-10 md:py-14"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              {/* Index */}
              <span className="font-mono text-xs text-text-muted tabular-nums mb-8 md:mb-12 block">
                0{i + 1}
              </span>

              {/* Quote */}
              <p
                className="font-serif text-primary leading-[1.3] flex-1 mb-10 md:mb-14"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw + 0.5rem, 2.5rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                "{t.quote}"
              </p>

              {/* Attribution */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-[13px] font-sans font-semibold text-primary">
                    {t.name}
                  </span>
                  <span className="block text-[11px] font-sans text-text-muted mt-0.5 uppercase tracking-[0.08em]">
                    {t.role}
                  </span>
                </div>
                <span
                  className="text-[10px] font-sans font-semibold uppercase tracking-[0.1em] px-2.5 py-1.5"
                  style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
                >
                  {t.metric}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
