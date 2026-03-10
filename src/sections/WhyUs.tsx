import { useScrollReveal } from '../hooks/useScrollReveal';

const differentiators = [
  {
    number: '01',
    heading: 'Investment, not expense',
    body: 'Every week with a mediocre site compounds lost revenue. We build conversion assets that pay for themselves — then keep paying.',
  },
  {
    number: '02',
    heading: 'Senior-only execution',
    body: 'You work directly with the people writing the code. No account managers. No juniors learning on your budget.',
  },
  {
    number: '03',
    heading: 'Built for results',
    body: 'Speed, SEO, conversion architecture — baked in from the first wireframe. Every decision filters through one question: will this convert?',
  },
];

const WhyUs = () => {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={revealRef}
      id="why"
      className="reveal reveal-stagger bg-surface-dark"
      style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
    >
      <div className="grid-editorial">
        {/* Header */}
        <div className="grid-full mb-14 md:mb-20">
          <div className="reveal-child flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <span className="label-overline block mb-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Why ARC Studio
              </span>
              <h2 style={{ color: '#FFFFFF', letterSpacing: '-0.035em' }}>
                The difference is in
                <br />
                the details<span style={{ color: 'var(--color-accent)' }}>.</span>
              </h2>
            </div>
            <p
              className="reveal-child text-sm leading-[1.8] max-w-xs lg:text-right"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              We partner with founders who understand that digital infrastructure
              is an investment, not a line item.
            </p>
          </div>
        </div>

        {/* 3-column differentiators */}
        {differentiators.map((d, i) => (
          <div key={i} className="reveal-child col-span-12 md:col-span-4">
            <div
              className="h-full flex flex-col pt-10 md:pt-14"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span
                className="block font-serif text-[4rem] md:text-[6rem] lg:text-[8rem] leading-none mb-4 md:mb-8"
                style={{ color: 'rgba(247,127,0,0.1)' }}
              >
                {d.number}
              </span>
              <h3
                className="font-serif mb-6 leading-[1.2]"
                style={{
                  fontSize: 'clamp(1.5rem, 2vw + 0.5rem, 2.5rem)',
                  color: '#FFFFFF',
                  letterSpacing: '-0.025em',
                }}
              >
                {d.heading}
              </h3>
              <p
                className="text-base leading-[1.8]"
                style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '30ch' }}
              >
                {d.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
