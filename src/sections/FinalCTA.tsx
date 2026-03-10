import { useScrollReveal } from '../hooks/useScrollReveal';

const FinalCTA = () => {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={revealRef}
      className="reveal reveal-stagger bg-surface-dark relative overflow-hidden"
      style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
    >
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="grid-editorial relative z-10">
        <div className="grid-full flex flex-col items-start">

          {/* Overline */}
          <div className="reveal-child flex items-center gap-3 mb-10 md:mb-14">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            <span
              className="text-[10px] font-sans font-semibold uppercase tracking-[0.18em]"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              2 spots remaining in April
            </span>
          </div>

          {/* Main headline */}
          <h2
            className="reveal-child font-serif leading-[0.97] tracking-[-0.04em]"
            style={{
              fontSize: 'clamp(2.5rem, 7vw + 0.5rem, 9rem)',
              color: '#FFFFFF',
              maxWidth: '14ch',
            }}
          >
            Stop patching.
            <br />
            Start{' '}
            <em className="italic" style={{ color: 'var(--color-accent)' }}>investing</em>
            .
          </h2>

          {/* Divider */}
          <div
            className="reveal-child w-full mt-12 md:mt-16 mb-12 md:mb-16"
            style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }}
          />

          {/* Bottom row */}
          <div className="reveal-child w-full flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p
              className="text-sm leading-[1.8] max-w-sm"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              If you need clarity, speed, and technical excellence —
              <strong style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}> we should talk</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-accent text-white font-sans font-semibold text-[13px] uppercase tracking-[0.12em] px-7 py-4 transition-all duration-300 hover:bg-accent-hover"
              >
                Book a free call
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="mailto:hello@arcstudio.in"
                className="text-[13px] font-sans font-medium transition-colors duration-300"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.3)')}
              >
                hello@arcstudio.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
