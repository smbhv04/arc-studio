import { useScrollReveal } from '../hooks/useScrollReveal';

const steps = [
  {
    number: '01',
    title: 'Strategy & Architecture',
    description: 'We define the technical roadmap and UX strategy first. Scalable foundation before a single line of code.',
    time: 'Week 1',
  },
  {
    number: '02',
    title: 'Design & Build',
    description: 'Conversion-focused design executed in semantic, performant code. No page builders. No bloat.',
    time: 'Weeks 2–4',
  },
  {
    number: '03',
    title: 'Launch & Grow',
    description: 'Deployment, analytics setup, SEO indexing. Your site goes live fast and ready for traffic.',
    time: 'Week 4–5',
  },
];

const Process = () => {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="process"
      ref={revealRef}
      className="reveal reveal-stagger bg-surface"
      style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
    >
      <div className="grid-editorial">
        {/* Header */}
        <div className="grid-full mb-14 md:mb-20">
          <div className="reveal-child flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <span className="label-overline block mb-4">How it works</span>
              <h2 className="text-primary">
                Three steps<span className="text-accent">.</span>
                {' '}No surprises<span style={{ color: 'rgba(0,0,0,0.15)' }}>.</span>
              </h2>
            </div>
            <p
              className="reveal-child text-sm text-text-secondary leading-[1.8] max-w-xs lg:text-right"
            >
              Clear scope. Transparent pricing. Every project is structured before we write a single line.
            </p>
          </div>
        </div>

        {/* Step cards */}
        <div className="grid-full grid grid-cols-1 md:grid-cols-3 gap-0">
          {steps.map((step, i) => (
            <div
              key={i}
              className="reveal-child flex flex-col py-8 md:py-0"
              style={{
                borderTop: '1px solid var(--color-border)',
                paddingRight: i < steps.length - 1 ? 'clamp(1.5rem, 4vw, 4rem)' : 0,
              }}
            >
              {/* Step + time */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] tabular-nums text-text-muted">
                  {step.number}
                </span>
                <span
                  className="text-[10px] font-sans font-semibold uppercase tracking-[0.12em] px-2.5 py-1"
                  style={{
                    background: 'var(--color-accent-soft)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {step.time}
                </span>
              </div>

              <h3
                className="font-serif text-primary mb-4 leading-[1.2]"
                style={{
                  fontSize: 'clamp(1.125rem, 1.3vw + 0.4rem, 1.5rem)',
                  letterSpacing: '-0.025em',
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm text-text-secondary leading-[1.8]"
                style={{ maxWidth: '26ch' }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
