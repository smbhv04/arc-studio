import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const faqs = [
  {
    question: 'What makes a "high-performance" website?',
    answer:
      "It's more than speed. It's semantic code, optimized assets, accessible UX, and a structure that search engines love. We optimise Core Web Vitals, heading hierarchy, schema markup, and page architecture — not just the design layer.",
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Website design & build: 4–6 weeks. Web applications (MVP/V1): 4–8 weeks depending on complexity. We work in structured sprints with clear milestones — no open-ended timelines.',
  },
  {
    question: 'Do you handle technical SEO?',
    answer:
      'Yes. Technical SEO is built into every project from day one. Proper heading structures, semantic HTML, schema markup, sitemap generation, and Core Web Vitals optimization are standard — not add-ons.',
  },
  {
    question: 'What does "limited availability" mean?',
    answer:
      'We intentionally limit the number of projects we take on each month to maintain quality. This means we can give your project focused, senior-level attention instead of spreading thin across dozens of clients.',
  },
  {
    question: "What if I'm not sure what I need?",
    answer:
      "That's exactly what the initial strategy call is for. We'll audit your current situation, clarify the scope, and tell you honestly whether we're the right fit — before any commitment.",
  },
];

const FAQItem = ({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border-t border-primary/[0.06]">
    <button
      onClick={onToggle}
      className="w-full flex items-start justify-between py-5 md:py-6 text-left group cursor-pointer"
    >
      <h4 className="text-[14px] md:text-[15px] font-sans font-medium text-primary pr-6 md:pr-8 group-hover:text-accent transition-colors duration-300 leading-snug">
        {faq.question}
      </h4>
      <div
        className={`w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-primary/30">
          <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" />
          <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </button>
    <div
      className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen ? 'max-h-[300px] opacity-100 pb-5 md:pb-6' : 'max-h-0 opacity-0'
      }`}
    >
      <p className="text-[13px] md:text-sm text-text-secondary leading-[1.75] max-w-lg pr-8 md:pr-12">
        {faq.answer}
      </p>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={revealRef}
      className="reveal reveal-stagger bg-surface"
      style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
    >
      <div className="grid-editorial items-start">
        {/* LEFT — Heading */}
        <div className="grid-7 mb-8 md:mb-0">
          <div className="reveal-child lg:sticky lg:top-32">
            <span className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-text-muted mb-3 md:mb-4">
              Common questions
            </span>
            <h2 className="font-serif text-primary max-w-md">
              Let's clear things up<span className="text-accent">.</span>
            </h2>
            <p className="mt-4 md:mt-6 text-sm text-text-secondary leading-relaxed max-w-sm">
              Honest answers to the questions we hear most. If yours isn't here,{' '}
              <a
                href="mailto:hello@arcstudio.com"
                className="text-accent font-medium hover:underline underline-offset-4 decoration-1"
              >
                just ask
              </a>
              .
            </p>
          </div>
        </div>

        {/* RIGHT — Accordion */}
        <div className="grid-5">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
          {/* Bottom border */}
          <div className="border-t border-primary/[0.06]" />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
