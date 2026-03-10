import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Clean, simple reveal of the massive headline
      tl.fromTo(
        headRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, delay: 0.2 }
      )
      // Reveal the subline and CTA
      .fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=1.0'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] flex flex-col overflow-hidden bg-black"
    >
      {/* ── IMAGE BACKGROUND ─────────────────── */}
      <img
        src="/hero-bg.jpg"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.8 }}
      />

      {/* Vignette to ensure text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)',
        }}
      />
      
      {/* Top gradient for Header visibility */}
      <div 
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)' }}
      />

      {/* ── CONTENT ──────────────────────────── */}
      {/* We use a grid to perfectly match the editorial layout: 
          Top: tags, Middle: huge headline, Bottom: subline & scroll */}
      <div className="relative z-10 flex-1 flex flex-col grid-editorial h-full pb-8 md:pb-12 pt-32">
        
        {/* Top area */}
        <div className="grid-full flex justify-between items-start">
          {/* Empty left (logo is in header) */}
          <div />
          {/* Right tags */}
          <div className="text-right hidden md:block">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-white/50">
              STRATEGY / DESIGN / BUILD
            </span>
          </div>
        </div>

        {/* Center area: Massive Headline */}
        <div className="grid-full flex-1 flex items-center justify-center md:justify-start">
          <h1
            ref={headRef}
            className="font-serif text-white tracking-[-0.03em] leading-[0.9] text-center md:text-left text-balance"
            style={{ 
              fontSize: 'clamp(4rem, 11vw, 13rem)',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            Built to<br className="hidden md:block"/> convert<span style={{ color: 'var(--color-accent)' }}>.</span>
          </h1>
        </div>

        {/* Bottom area: Sub & Scroll */}
        <div 
          ref={subRef} 
          className="grid-full flex flex-col md:flex-row md:items-end justify-between gap-8 mt-auto"
        >
          {/* Left: Subline & CTA */}
          <div className="max-w-md">
            <p className="text-white/70 text-sm md:text-base leading-[1.6] mb-6">
              High-performance websites and web applications for growing brands. 
              We don't aim for the middle.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-accent text-black font-sans font-bold text-[12px] uppercase tracking-[0.15em] px-7 py-4 transition-transform duration-300 hover:scale-[1.02]"
            >
              Start a project
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right: Scroll Indicator */}
          <div className="hidden md:flex flex-col items-center gap-4">
            <span
              className="text-[9px] font-sans font-semibold uppercase tracking-[0.25em] text-white/40"
              style={{ writingMode: 'vertical-lr' }}
            >
              SCROLL
            </span>
            <div className="w-px h-16 bg-white/15 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 bg-accent"
                style={{ height: '30%', animation: 'scrollLine 2s ease-in-out infinite' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { top: -30%; }
          100% { top: 130%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
