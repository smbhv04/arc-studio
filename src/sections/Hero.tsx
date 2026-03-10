import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import AnimatedGradientBackground from '../components/AnimatedGradientBackground';
import { GooeyText } from '../components/GooeyText';

const Hero = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const subRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        headRef.current,
        { opacity: 0, scale: 0.98, y: 24 },
        { opacity: 1, scale: 1, y: 0, duration: 1.8, delay: 0.4 }
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=1.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* ── ANIMATED AURA BACKGROUND ─────── */}
      <AnimatedGradientBackground />
      
      {/* Layered Vignettes for Depth & Contrast */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black to-transparent z-[1] pointer-events-none" />

      {/* ── CONTENT ──────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1200px] px-6 md:px-12 flex flex-col items-center text-center">

        {/* Overline */}
        <div className="mb-8 overflow-hidden">
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <div className="w-6 h-px bg-white/20" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.45em] text-white/40">
              Design · Engineering · Strategy
            </span>
            <div className="w-6 h-px bg-white/20" />
          </motion.div>
        </div>

        {/* Headline */}
        <div
          ref={headRef}
          className="w-full flex flex-col items-center justify-center mb-10"
        >
          <div className="text-white font-serif tracking-[-0.03em] leading-[1.05] flex flex-col items-center">
            <span className="text-[3.2rem] md:text-[5.5rem] lg:text-[7rem] text-balance max-w-4xl">
              Websites & apps that
            </span>
            <div className="h-[4rem] md:h-[7rem] lg:h-[9rem] flex items-center justify-center">
              <GooeyText
                texts={["convert", "scale", "perform", "win"]}
                morphTime={1.4}
                cooldownTime={2.2}
                textClassName="font-serif text-accent tracking-[-0.03em] leading-[1] text-[3.8rem] md:text-[6.5rem] lg:text-[8.5rem]"
              />
            </div>
          </div>
        </div>

        {/* Sub & CTA */}
        <div
          ref={subRef}
          className="max-w-xl flex flex-col items-center"
        >
          <p className="text-white/45 text-[15px] md:text-lg font-normal leading-[1.65] mb-12 text-balance">
            We design and build high-performance digital products for startups 
            and growing brands — fast to ship, built to last.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            {/* Primary – white */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-white text-black font-sans font-bold text-[12px] uppercase tracking-[0.18em] px-10 py-5 transition-all duration-300 hover:bg-white/90 hover:scale-[1.03]"
            >
              Start a Project
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {/* Secondary – ghost */}
            <a
              href="#work"
              className="text-white/35 hover:text-white font-sans font-medium text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 py-3 border-b border-white/10 hover:border-white/30"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
