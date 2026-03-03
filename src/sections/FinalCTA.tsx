import { useScrollReveal } from '../hooks/useScrollReveal';
import Button from '../components/Button';

const FinalCTA = () => {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={revealRef}
      className="reveal reveal-stagger bg-surface"
      style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
    >
      <div className="grid-editorial">
        <div className="grid-full flex flex-col items-center text-center px-4 md:px-0">
          {/* Transformation restatement */}
          <h2
            className="reveal-child font-serif text-primary leading-[1.08] tracking-[-0.025em] max-w-3xl text-balance"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw + 0.5rem, 3.5rem)' }}
          >
            Stop spending on repairs<span className="text-accent">.</span>
            <br />
            Start investing in{' '}
            <em className="italic">infrastructure</em>
            <span className="text-accent">.</span>
          </h2>

          <p className="reveal-child mt-6 md:mt-8 text-text-secondary text-[clamp(0.9375rem,1vw+0.5rem,1.0625rem)] leading-[1.75] max-w-md">
            If you need clarity, speed, and technical excellence — we should talk.
          </p>

          {/* CTA */}
          <div className="reveal-child mt-8 md:mt-12 flex flex-col items-center gap-4 md:gap-5">
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
              <Button size="lg" variant="primary">
                Get my free audit
              </Button>
              <span className="text-sm text-text-muted">or</span>
              <a
                href="mailto:hello@arcstudio.com"
                className="text-accent font-medium hover:underline underline-offset-4 decoration-1 decoration-accent/30 transition-all duration-300 hover:decoration-accent text-sm md:text-base"
              >
                Email us directly
              </a>
            </div>
            <span className="text-[10px] md:text-[11px] text-text-muted uppercase tracking-[0.12em]">
              No commitment · Free strategy call · 15 minutes
            </span>
          </div>

          {/* Trust signifiers */}
          <div className="reveal-child mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 gap-y-2 md:gap-y-3">
            {['Clear Scope', 'No Bloated Timelines', 'Senior-Only Team', 'Direct Founder Access'].map(
              (item) => (
                <span
                  key={item}
                  className="text-[10px] md:text-[11px] font-sans uppercase tracking-[0.1em] text-text-muted/60 flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-accent/30" />
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
