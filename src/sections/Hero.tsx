import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import AnimatedGradientBackground from '../components/AnimatedGradientBackground';

const Hero = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const subRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        headRef.current,
        { opacity: 0, x: -30, y: 0 },
        { opacity: 1, x: 0, duration: 1.8, delay: 0.4 }
      )
      .fromTo(
        subRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1.2 },
        '-=1.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-surface"
    >
      {/* ── ANIMATED AURA BACKGROUND ─────── */}
      <AnimatedGradientBackground />
      
      {/* Layered Vignettes for Depth & Contrast */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black via-black/80 to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-[40vw] max-w-[800px] bg-gradient-to-r from-black/60 to-transparent z-[1] pointer-events-none" />

      {/* ── CONTENT ──────────────────────────── */}
      <div className="relative z-10 w-full h-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24 flex flex-col justify-between pt-32 pb-12 md:pb-16 xl:pb-20">
        
        {/* Main Content Area */}
        <div className="flex-grow flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-24">
          
          {/* Left Column - Headline */}
          <div ref={headRef} className="flex-grow flex flex-col items-start w-full lg:w-auto mt-20 lg:mt-0">
            <span className="text-white/80 font-sans font-medium text-[20px] md:text-[24px] mb-4">
              Design Agency
            </span>
            <h1 className="flex flex-col text-left leading-[0.9] tracking-[-0.03em] font-serif text-white">
              <span className="text-[5rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem]">ARC</span>
              <span className="font-sans font-bold text-[4rem] md:text-[7rem] lg:text-[9.5rem] xl:text-[11.5rem] tracking-[-0.04em]">STUDIO</span>
            </h1>
          </div>

          {/* Right Column - Subheadline */}
          <div ref={subRef} className="lg:max-w-[420px] xl:max-w-[500px] flex flex-col items-start lg:mt-32">
            <h2 className="text-white font-sans font-bold text-[28px] md:text-[36px] xl:text-[42px] leading-[1.1] mb-6 tracking-[-0.01em]">
              Crafting Digital Experiences That Drive Results.
            </h2>
            <p className="text-white/70 text-[16px] md:text-[18px] font-medium leading-[1.6]">
              We merge strategic thinking with world-class aesthetic to build premium websites, apps, and brand identities for ambitious companies.
            </p>
          </div>
        </div>

        {/* ── BOTTOM NUMBERED STRIP ── */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 pt-16 mt-auto">
          <div className="flex flex-col gap-2 relative group cursor-pointer">
            <div className="absolute -top-16 left-0 w-full h-[1px] bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            <span className="text-accent font-sans font-bold text-[14px] tracking-wide">#01</span>
            <span className="text-white/80 font-sans font-medium text-[16px]">Digital Strategy</span>
          </div>
          
          <div className="flex flex-col gap-2 relative group cursor-pointer">
            <div className="absolute -top-16 left-0 w-full h-[1px] bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            <span className="text-accent font-sans font-bold text-[14px] tracking-wide">#02</span>
            <span className="text-white/80 font-sans font-medium text-[16px]">Brand Identity</span>
          </div>
          
          <div className="flex flex-col gap-2 relative group cursor-pointer">
            <div className="absolute -top-16 left-0 w-full h-[1px] bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            <span className="text-accent font-sans font-bold text-[14px] tracking-wide">#03</span>
            <span className="text-white/80 font-sans font-medium text-[16px]">UI/UX Design</span>
          </div>
          
          <div className="flex flex-col gap-2 relative group cursor-pointer">
            <div className="absolute -top-16 left-0 w-full h-[1px] bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            <span className="text-accent font-sans font-bold text-[14px] tracking-wide">#04</span>
            <span className="text-white/80 font-sans font-medium text-[16px]">Web Development</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
