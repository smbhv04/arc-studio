import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Button from '../components/Button';

interface ServiceData {
  number: string;
  title: string;
  outcome: string;
  details: string[];
  investment: string;
  cta: string;
}

const services: ServiceData[] = [
  {
    number: '01',
    title: 'Strategic Website Design & Build',
    outcome: 'A high-performance site that positions you as the market leader — built for conversion, not decoration.',
    details: [
      'Strategic architecture built for conversion, not just aesthetics',
      'Technical SEO baked into every page structure',
      'CMS integration so your team can manage content, not code',
      'Sub-second load times — faster retention, better rankings',
    ],
    investment: 'Engagements from ₹75k · 50/50 structure',
    cta: 'Get my site audit',
  },
  {
    number: '02',
    title: 'Scalable Web Application Development',
    outcome: 'Production-grade applications that scale from MVP to Series A — without the technical debt.',
    details: [
      'Architecture designed for growth, not throwaway prototypes',
      'Auth, data handling, and security done right from day one',
      'Modular codebase for faster iteration cycles',
      'CI/CD pipelines for reliable, automated deployment',
    ],
    investment: 'Engagements from ₹1.5L · Milestone-based',
    cta: 'Plan my product build',
  },
];

const ServiceItem = ({
  service,
  isOpen,
  onToggle,
  index,
}: {
  service: ServiceData;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => (
  <div
    className={`reveal-child border-t border-primary/[0.06] transition-all duration-500 ${
      index === services.length - 1 ? 'border-b' : ''
    }`}
  >
    {/* Accordion Header */}
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-6 md:py-8 lg:py-10 text-left group cursor-pointer"
    >
      <div className="flex items-baseline gap-4 md:gap-6 lg:gap-10 min-w-0">
        <span className="text-[11px] font-mono text-text-muted/40 tabular-nums flex-shrink-0">
          {service.number}
        </span>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-primary group-hover:text-accent transition-colors duration-300 truncate">
          {service.title}
        </h3>
      </div>
      <div
        className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center flex-shrink-0 ml-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-primary/30">
          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </button>

    {/* Accordion Content */}
    <div
      className={`overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="pb-8 md:pb-10 lg:pb-14 pl-8 md:pl-14 lg:pl-[calc(11px+2.5rem+2.5rem)]">
        <p className="text-text-secondary text-[clamp(0.9375rem,1vw+0.5rem,1.0625rem)] leading-[1.75] mb-6 md:mb-8 max-w-lg">
          {service.outcome}
        </p>
        <div className="space-y-2.5 md:space-y-3 mb-8 md:mb-10">
          {service.details.map((detail, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-accent/40 mt-2.5 flex-shrink-0" />
              <span className="text-sm text-text-secondary leading-relaxed">{detail}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
          <Button variant="primary" size="md">
            {service.cta}
          </Button>
          <span className="text-[10px] md:text-[11px] text-text-muted uppercase tracking-[0.1em]">
            {service.investment}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const Services = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="services"
      ref={revealRef}
      className="reveal reveal-stagger bg-surface"
      style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
    >
      <div className="grid-editorial">
        <div className="grid-full">
          {/* Section Header */}
          <div className="reveal-child flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 md:mb-16 lg:mb-20">
            <div>
              <span className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-text-muted mb-3 md:mb-4">
                What we do
              </span>
              <h2 className="font-serif text-primary max-w-xl">
                Execution is everything<span className="text-accent">.</span>
              </h2>
            </div>
            <p className="reveal-child mt-4 lg:mt-0 text-sm text-text-secondary max-w-sm leading-relaxed lg:text-right">
              We don't act as a revolving door. We partner with founders who
              understand that digital infrastructure is an investment, not a cost.
            </p>
          </div>

          {/* Accordion Services */}
          {services.map((service, i) => (
            <ServiceItem
              key={i}
              service={service}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
