import { useScrollReveal } from '../hooks/useScrollReveal';

const steps = [
  {
    number: '01',
    title: 'Strategy & Architecture',
    description:
      'We define the technical roadmap and UX strategy first. The foundation is scalable before a single line of code is written.',
  },
  {
    number: '02',
    title: 'Design & Build',
    description:
      'Clean, conversion-focused design executed in semantic, performant code. No page builders. No bloat.',
  },
  {
    number: '03',
    title: 'Launch & Growth',
    description:
      'Deployment, analytics configuration, and SEO indexing. Your site is live, fast, and ready for traffic.',
  },
];

const Process = () => {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="process"
      ref={revealRef}
      className="reveal reveal-stagger bg-surface-dark text-surface"
      style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
    >
      <div className="grid-editorial">
        {/* Header */}
        <div className="grid-full mb-10 md:mb-16 lg:mb-24">
          <div className="reveal-child flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <span className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-surface/30 mb-3 md:mb-4">
                How it works
              </span>
              <h2 className="font-serif text-surface max-w-lg">
                Three steps<span className="text-accent">.</span>
                <br />
                No surprises<span className="text-accent/40">.</span>
              </h2>
            </div>
            <p className="reveal-child text-sm text-surface/35 max-w-sm leading-relaxed lg:text-right">
              Clear scope. Transparent pricing. Every project is structured before we write a single line.
            </p>
          </div>
        </div>

        {/* Steps — responsive grid */}
        {steps.map((step, i) => (
          <div
            key={i}
            className="reveal-child col-span-12 md:col-span-4"
          >
            <div className="border-t border-surface/10 pt-6 md:pt-8 group h-full">
              <span className="block text-[11px] font-mono text-accent/50 mb-4 md:mb-6 tabular-nums">
                {step.number}
              </span>
              <h3 className="text-lg md:text-xl font-serif text-surface mb-3 md:mb-4 group-hover:text-accent transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-[13px] md:text-sm text-surface/35 leading-[1.75] max-w-xs group-hover:text-surface/55 transition-colors duration-500">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
