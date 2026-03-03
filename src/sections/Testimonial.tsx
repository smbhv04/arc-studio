import { useScrollReveal } from '../hooks/useScrollReveal';

const Testimonial = () => {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={revealRef}
      className="reveal reveal-stagger"
      style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
    >
      <div className="grid-editorial">
        <div className="grid-full flex flex-col items-center text-center">
          {/* Quote mark */}
          <div className="reveal-child mb-6 md:mb-8">
            <svg width="36" height="28" viewBox="0 0 40 32" fill="none" className="text-accent/20">
              <path
                d="M0 32V20.8C0 9.07 7.2 2.13 18 0l1.5 3.2C12.3 5.07 8.7 9.87 8.1 16H18v16H0zm22 0V20.8C22 9.07 29.2 2.13 40 0l1.5 3.2c-7.2 1.87-10.8 6.67-11.4 12.8H40v16H22z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Quote text */}
          <blockquote className="reveal-child max-w-3xl px-4 md:px-0">
            <p
              className="font-serif text-primary leading-[1.15] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw + 0.5rem, 2.75rem)' }}
            >
              Finally, an agency that understands the difference between
              <em className="italic"> 'clean'</em> and
              <em className="italic"> 'empty.'</em>{' '}
              <span className="text-text-muted">
                They built us a site that actually converts.
              </span>
            </p>
          </blockquote>

          {/* Attribution */}
          <div className="reveal-child mt-8 md:mt-10 flex flex-col items-center gap-1">
            <span className="text-sm font-sans font-semibold text-primary">
              Sarah Jenkins
            </span>
            <span className="text-[11px] md:text-xs text-text-muted uppercase tracking-[0.1em]">
              Founder, Arch. Studio · Inquiries up 40%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
