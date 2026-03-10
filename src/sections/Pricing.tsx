import { useScrollReveal } from '../hooks/useScrollReveal';

interface PlanData {
  tag: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  priceNote?: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
}

const plans: PlanData[] = [
  {
    tag: 'STARTER',
    name: 'Website',
    tagline: 'For brands that need a premium, conversion-ready presence fast.',
    price: '₹75K',
    period: 'one-time',
    priceNote: '50 / 50 payment structure',
    features: [
      'Up to 8 pages, fully custom',
      'Conversion-focused UX architecture',
      'Technical SEO built-in from day one',
      'CMS integration for easy updates',
      'Sub-second load times guaranteed',
      '2-week turnaround',
    ],
    ctaLabel: 'Start with Website',
  },
  {
    tag: 'MOST POPULAR',
    name: 'Web Application',
    tagline: 'Production-grade apps that scale from MVP to Series A without the debt.',
    price: '₹1.5L+',
    period: 'starting from',
    priceNote: 'Milestone-based billing',
    features: [
      'Full-stack architecture review',
      'Auth, data handling & security',
      'Modular codebase for fast iteration',
      'CI/CD pipeline configuration',
      'Analytics + error monitoring setup',
      '4–8 weeks, structured sprints',
    ],
    ctaLabel: 'Plan my product build',
    highlighted: true,
  },
  {
    tag: 'QUICK WIN',
    name: 'Audit + Strategy',
    tagline: "Know exactly what's killing your conversions before spending a rupee.",
    price: '₹12K',
    period: 'one-time',
    priceNote: 'Delivered in 48 hours',
    features: [
      'Full CWV + PageSpeed analysis',
      'UX friction audit with recordings',
      'SEO technical health report',
      'Conversion bottleneck identification',
      'Prioritised action plan (30-day)',
      'Recorded 30-min walkthrough call',
    ],
    ctaLabel: 'Book an audit',
  },
];

const PricingCard = ({ plan }: { plan: PlanData }) => (
  <div
    className="reveal-child relative flex flex-col p-6 md:p-8 transition-all duration-300"
    style={{
      background: plan.highlighted ? 'var(--color-accent)' : 'var(--color-surface)',
      border: `1px solid ${plan.highlighted ? 'transparent' : 'var(--color-border)'}`,
    }}
  >
    {/* Tag */}
    <span
      className="inline-flex self-start text-[10px] font-sans font-semibold uppercase tracking-[0.15em] px-2.5 py-1 mb-6"
      style={{
        background: plan.highlighted ? 'rgba(0,0,0,0.15)' : 'var(--color-surface-elevated)',
        color: plan.highlighted ? 'rgba(255,255,255,0.9)' : 'var(--color-text-muted)',
      }}
    >
      {plan.tag}
    </span>

    {/* Name */}
    <h3
      className="font-serif mb-3 leading-[1.1]"
      style={{
        fontSize: 'clamp(1.5rem, 2vw, 2rem)',
        color: plan.highlighted ? '#FFFFFF' : 'var(--color-primary)',
        letterSpacing: '-0.03em',
      }}
    >
      {plan.name}
    </h3>

    {/* Tagline */}
    <p
      className="text-sm leading-[1.7] mb-7"
      style={{ color: plan.highlighted ? 'rgba(255,255,255,0.65)' : 'var(--color-text-secondary)' }}
    >
      {plan.tagline}
    </p>

    {/* Divider */}
    <div
      className="mb-7"
      style={{
        height: '1px',
        background: plan.highlighted ? 'rgba(255,255,255,0.15)' : 'var(--color-border)',
      }}
    />

    {/* Price */}
    <div className="mb-7">
      <div className="flex items-baseline gap-2 mb-1">
        <span
          className="font-serif leading-none"
          style={{
            fontSize: 'clamp(2.25rem, 3vw, 3rem)',
            color: plan.highlighted ? '#FFFFFF' : 'var(--color-primary)',
            letterSpacing: '-0.04em',
          }}
        >
          {plan.price}
        </span>
        <span
          className="text-[12px] font-sans"
          style={{ color: plan.highlighted ? 'rgba(255,255,255,0.5)' : 'var(--color-text-muted)' }}
        >
          {plan.period}
        </span>
      </div>
      {plan.priceNote && (
        <span
          className="text-[10px] font-sans uppercase tracking-[0.1em]"
          style={{ color: plan.highlighted ? 'rgba(255,255,255,0.35)' : 'var(--color-text-muted)' }}
        >
          {plan.priceNote}
        </span>
      )}
    </div>

    {/* Features */}
    <ul className="space-y-3 mb-8 flex-1">
      {plan.features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3">
          {/* Check dash */}
          <span
            className="mt-[5px] w-3 h-px flex-shrink-0"
            style={{ background: plan.highlighted ? 'rgba(255,255,255,0.4)' : 'var(--color-accent)' }}
          />
          <span
            className="text-[13px] leading-[1.65]"
            style={{ color: plan.highlighted ? 'rgba(255,255,255,0.8)' : 'var(--color-text-secondary)' }}
          >
            {feature}
          </span>
        </li>
      ))}
    </ul>

    {/* CTA */}
    <button
      className="w-full py-3.5 px-6 font-sans font-semibold text-[13px] uppercase tracking-[0.12em] text-center transition-all duration-300 cursor-pointer"
      style={{
        background: plan.highlighted ? '#FFFFFF' : 'var(--color-primary)',
        color: plan.highlighted ? 'var(--color-accent)' : '#FFFFFF',
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        if (!plan.highlighted) btn.style.background = 'var(--color-accent)';
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        if (!plan.highlighted) btn.style.background = 'var(--color-primary)';
      }}
    >
      {plan.ctaLabel}
    </button>
  </div>
);

const Pricing = () => {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="pricing"
      ref={revealRef}
      className="reveal reveal-stagger bg-surface-elevated"
      style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
    >
      <div className="grid-editorial">
        {/* Header */}
        <div className="grid-full mb-12 md:mb-16">
          <div className="reveal-child flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <span className="label-overline block mb-4">Investment</span>
              <h2 className="text-primary">
                Simple, transparent pricing<span className="text-accent">.</span>
              </h2>
            </div>
            <p className="reveal-child text-sm text-text-secondary max-w-xs leading-[1.8] lg:text-right">
              No retainers. No hidden fees. You know exactly what you get and what it costs.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid-full grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: 'var(--color-border)' }}>
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* Trust note */}
        <div className="grid-full mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {['No retainer required', 'Direct founder access', 'Senior-only team', 'Cancel anytime'].map((item) => (
            <span
              key={item}
              className="text-[10px] font-sans uppercase tracking-[0.12em] text-text-muted flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-accent/60" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
