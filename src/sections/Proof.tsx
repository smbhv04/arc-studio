import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Project = ({
  title,
  category,
  challenge,
  outcome,
  className = '',
}: {
  title: string;
  category: string;
  challenge: string;
  outcome: string;
  className?: string;
}) => (
  <div className={`group cursor-pointer reveal ${className}`}>
    <div className="aspect-[4/3] bg-surface-elevated mb-6 flex items-center justify-center overflow-hidden relative rounded-sm">
      <div className="absolute inset-0 bg-primary/[0.03] group-hover:bg-primary/0 transition-colors duration-500" />
      <span className="text-primary/10 font-serif text-4xl italic">{title}</span>
    </div>
    <div className="flex justify-between items-baseline mb-4">
      <h3 className="text-[1.0625rem] font-medium text-primary">{title}</h3>
      <span className="text-[11px] text-text-muted uppercase tracking-[0.12em]">{category}</span>
    </div>
    <div className="border-l border-border pl-4 space-y-3">
      <p className="text-[13px] text-text-secondary leading-relaxed">
        <strong className="block text-primary font-medium mb-0.5">The Challenge</strong>
        {challenge}
      </p>
      <p className="text-[13px] text-text-secondary leading-relaxed">
        <strong className="block text-primary font-medium mb-0.5">The Outcome</strong>
        {outcome}
      </p>
    </div>
  </div>
);

const Proof = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    if (!reveals) return;
    const triggers = Array.from(reveals).map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
        },
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-[clamp(5rem,10vw,9rem)] bg-surface">
      <div className="grid-editorial">
        {/* Section header — full width */}
        <div className="grid-full flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-20 reveal">
          <div>
            <span className="text-[11px] font-medium text-text-muted uppercase tracking-[0.12em] mb-4 block">
              Selected Work
            </span>
            <h2 className="font-serif text-primary">
              Projects built for<br />performance, not decoration
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 text-sm text-text-secondary border-b border-border pb-1 hover:border-primary hover:text-primary transition-colors mt-4 md:mt-0"
          >
            View all projects →
          </a>
        </div>

        {/* Project 1 — columns 1–7 */}
        <div className="grid-7">
          <Project
            title="Maison & Co."
            category="Custom Website Design"
            challenge="Maison's previous site was slow and generic, failing to reflect their premium market position."
            outcome="We built a custom, high-performance site that improved page load speed by 3× and increased qualified inquiries by 40%."
          />
        </div>

        {/* Project 2 — columns 8–12 (offset down slightly for visual rhythm) */}
        <div className="grid-5 md:mt-24">
          <Project
            title="Vibes.ai"
            category="Web Application"
            challenge="Founders needed a complex MVP built fast to secure funding, without accruing technical debt."
            outcome="We delivered a scalable web application in 4 weeks. The stable build helped them secure pre-seed funding immediately."
          />
        </div>
      </div>
    </section>
  );
};

export default Proof;
