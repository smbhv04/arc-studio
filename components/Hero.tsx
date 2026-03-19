'use client'

import { useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'

const AnimatedGradientBackground = dynamic(() => import('./AnimatedGradientBackground'), { ssr: false })

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headRef     = useRef<HTMLDivElement>(null)
  const subRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: any;
    
    const runAnimations = async () => {
      const gsap = (await import('gsap')).default
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

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
        )
      }, sectionRef)
    }

    if (sessionStorage.getItem('arc_visited')) {
      runAnimations()
    } else {
      window.addEventListener('preloader-complete', runAnimations, { once: true })
      // Fallback for dev
      const timer = setTimeout(runAnimations, 3500)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('preloader-complete', runAnimations)
        if (ctx) ctx.revert()
      }
    }

    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="hero-section">
      {/* ── ANIMATED AURA BACKGROUND ─────── */}
      <AnimatedGradientBackground />
      
      {/* Layered Vignettes for Depth & Contrast */}
      <div className="vignette vignette-bottom" />
      <div className="vignette vignette-top" />
      <div className="vignette vignette-left" />

      {/* ── CONTENT ──────────────────────────── */}
      <div className="hero-container">
        
        {/* Main Content Area */}
        <div className="hero-main-flex">
          
          {/* Left Column - Headline */}
          <div ref={headRef} className="hero-left">
            <span className="hero-eyebrow">
              Design Agency
            </span>
            <h1 className="hero-title">
              <span className="hero-arc">ARC</span>
              <span className="hero-studio">STUDIO</span>
            </h1>
          </div>

          {/* Right Column - Subheadline */}
          <div ref={subRef} className="hero-right">
            <h2 className="hero-subline">
              Crafting Digital Experiences That Drive Results.
            </h2>
            <p className="hero-body">
              We merge strategic thinking with world-class aesthetic to build premium websites, apps, and brand identities for ambitious companies.
            </p>
          </div>
        </div>

        {/* ── BOTTOM NUMBERED STRIP ── */}
        <div className="hero-strip">
          <div className="strip-item">
            <div className="strip-line" />
            <span className="strip-num">#01</span>
            <span className="strip-label">Digital Strategy</span>
          </div>
          
          <div className="strip-item">
            <div className="strip-line" />
            <span className="strip-num">#02</span>
            <span className="strip-label">Brand Identity</span>
          </div>
          
          <div className="strip-item">
            <div className="strip-line" />
            <span className="strip-num">#03</span>
            <span className="strip-label">UI/UX Design</span>
          </div>
          
          <div className="strip-item">
            <div className="strip-line" />
            <span className="strip-num">#04</span>
            <span className="strip-label">Web Development</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: var(--color-black); /* fallback */
        }
        .vignette {
          position: absolute;
          z-index: 1;
          pointer-events: none;
        }
        .vignette-bottom {
          left: 0; right: 0; bottom: 0; height: 384px; /* h-96 */
          background: linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.8), transparent);
        }
        .vignette-top {
          left: 0; right: 0; top: 0; height: 192px; /* h-48 */
          background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
        }
        .vignette-left {
          top: 0; bottom: 0; left: 0; width: 40vw; max-width: 800px;
          background: linear-gradient(to right, rgba(0,0,0,0.6), transparent);
        }

        .hero-container {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 128px 24px 48px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hero-main-flex {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          gap: 48px;
        }

        .hero-left {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          margin-top: 80px;
        }

        .hero-eyebrow {
          color: rgba(255, 255, 255, 0.8);
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 20px;
          margin-bottom: 16px;
        }

        .hero-title {
          display: flex;
          flex-direction: column;
          text-align: left;
          line-height: 0.9;
          letter-spacing: -0.03em;
          color: var(--color-white);
          margin: 0;
          padding: 0;
        }

        .hero-arc {
          font-family: var(--font-serif);
          font-size: 5rem;
        }

        .hero-studio {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 4rem;
          letter-spacing: -0.04em;
        }

        .hero-right {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }

        .hero-subline {
          color: var(--color-white);
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 28px;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.01em;
        }

        .hero-body {
          color: rgba(255, 255, 255, 0.7);
          font-size: 16px;
          font-family: var(--font-sans);
          font-weight: 500;
          line-height: 1.6;
          margin: 0;
        }

        .hero-strip {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 32px;
          padding-top: 64px;
          margin-top: auto;
        }

        .strip-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
          cursor: pointer;
        }
        
        .strip-item:hover .strip-line {
          transform: scaleX(1);
        }

        .strip-line {
          position: absolute;
          top: -64px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--color-orange);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 500ms ease;
        }

        .strip-num {
          color: var(--color-orange);
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.04em;
        }

        .strip-label {
          color: rgba(255, 255, 255, 0.8);
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 16px;
        }

        /* ── RESPONSIVE BREAKPOINTS (mapping Tailwind configs) ── */
        
        /* md */
        @media (min-width: 768px) {
          .hero-container {
            padding: 128px 48px 64px 48px;
          }
          .hero-eyebrow {
            font-size: 24px;
          }
          .hero-arc {
            font-size: 8rem;
          }
          .hero-studio {
            font-size: 7rem;
          }
          .hero-subline {
            font-size: 36px;
          }
          .hero-body {
            font-size: 18px;
          }
          .hero-strip {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 16px;
          }
        }

        /* lg */
        @media (min-width: 1024px) {
          .hero-main-flex {
            flex-direction: row;
            align-items: center;
            gap: 96px;
          }
          .hero-left {
            width: auto;
            margin-top: 0;
          }
          .hero-arc {
            font-size: 10rem;
          }
          .hero-studio {
            font-size: 9.5rem;
          }
          .hero-right {
            max-width: 420px;
            margin-top: 128px;
          }
        }

        /* xl */
        @media (min-width: 1280px) {
          .hero-container {
            padding: 128px 96px 80px 96px;
          }
          .hero-arc {
            font-size: 12rem;
          }
          .hero-studio {
            font-size: 11.5rem;
          }
          .hero-right {
            max-width: 500px;
          }
          .hero-subline {
            font-size: 42px;
          }
        }
      `}</style>
    </section>
  )
}
