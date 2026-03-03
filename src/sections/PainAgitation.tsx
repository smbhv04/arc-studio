import { useScrollReveal } from '../hooks/useScrollReveal';

const pains = [
  {
    label: 'Lost Leads',
    detail: 'Slow sites and poor UX silently drive away your highest-value prospects.',
  },
  {
    label: 'Generic Presence',
    detail: 'A template website implies a template business. Your brand deserves better.',
  },
  {
    label: 'Technical Debt',
    detail: 'Quick fixes compound into expensive rebuilds that kill your momentum.',
  },
];

const PainAgitation = () => {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={revealRef}
      className="reveal reveal-stagger"
      style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
    >
      <div className="grid-editorial items-start">
        {/* LEFT — 5 columns (narrow): Pain list */}
        <div className="grid-5-left order-2 md:order-1 mt-8 md:mt-0">
          <span className="reveal-child block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-text-muted mb-8 md:mb-10">
            The cost of inaction
          </span>
          <div className="space-y-8 md:space-y-10">
            {pains.map((pain, i) => (
              <div key={i} className="reveal-child group cursor-default">
                <div className="flex items-baseline gap-3 md:gap-4 mb-2">
                  <span className="text-[11px] font-mono text-text-muted/50 tabular-nums">
                    0{i + 1}
                  </span>
                  <h3 className="text-base md:text-lg font-sans font-medium text-primary group-hover:text-accent transition-colors duration-300">
                    {pain.label}
                  </h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed pl-8 md:pl-10 max-w-xs">
                  {pain.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — 7 columns (wide): Statement */}
        <div className="grid-7-right flex items-center order-1 md:order-2">
          <div className="reveal-child">
            <h2 className="font-serif text-primary leading-[1.08] tracking-[-0.025em]">
              Your website is{' '}
              <em className="italic">costing</em> you clients
              <span className="text-accent">.</span>
            </h2>
            <p className="mt-6 md:mt-8 text-text-secondary text-[clamp(0.9375rem,1vw+0.5rem,1.0625rem)] leading-[1.75] max-w-lg">
              Every day with a slow, generic, or broken site is a day your competitors win the clients you should be closing. The cost isn't just design — it's opportunity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainAgitation;
