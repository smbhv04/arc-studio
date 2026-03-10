import { useScrollReveal } from '../hooks/useScrollReveal';

const pains = [
  {
    label: 'Lost Leads',
    detail: 'Slow sites and poor UX drive away your highest-value prospects before they see your offer.',
  },
  {
    label: 'Generic Presence',
    detail: 'A template website signals a template business. You lose trust before the sales call starts.',
  },
  {
    label: 'Technical Debt',
    detail: "Quick fixes compound into expensive rebuilds that drain your runway and kill momentum.",
  },
];

const PainAgitation = () => {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={revealRef}
      className="reveal reveal-stagger bg-surface"
      style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
    >
      <div className="grid-editorial items-start">
        {/* Left: headline */}
        <div className="grid-7-right order-1 md:order-2 mb-14 md:mb-0">
          <div className="reveal-child">
            <span className="label-overline block mb-4">The cost of inaction</span>
            <h2 className="text-primary">
              Your website is{' '}
              <em className="italic text-accent">costing</em>{' '}
              you clients<span className="text-accent">.</span>
            </h2>
            <p
              className="mt-6 text-text-secondary leading-[1.8] max-w-md"
              style={{ fontSize: 'clamp(0.9375rem, 0.5vw + 0.75rem, 1rem)' }}
            >
              Every day with a slow, generic, or broken site is a day your competitors
              win the clients you should be closing. The cost isn't just design — it's compounding opportunity lost.
            </p>
          </div>
        </div>

        {/* Right: pain list */}
        <div className="grid-5-left order-2 md:order-1">
          {pains.map((pain, i) => (
            <div
              key={i}
              className="reveal-child group py-7 md:py-8"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <div className="flex items-baseline gap-4 mb-2.5">
                <span className="font-mono text-[10px] text-text-muted tabular-nums flex-shrink-0">
                  0{i + 1}
                </span>
                <h3
                  className="font-sans font-semibold text-primary transition-colors duration-300 group-hover:text-accent"
                  style={{ fontSize: 'clamp(0.9375rem, 1vw + 0.25rem, 1.0625rem)', letterSpacing: '-0.01em' }}
                >
                  {pain.label}
                </h3>
              </div>
              <p
                className="text-sm text-text-secondary leading-[1.8] pl-8"
                style={{ maxWidth: '30ch' }}
              >
                {pain.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainAgitation;
