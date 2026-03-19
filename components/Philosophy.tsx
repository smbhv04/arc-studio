'use client'

import { useEffect, useRef } from 'react'

const PRINCIPLES = [
  {
    num: '01',
    title: 'Strategy-led design',
    body: 'Every visual decision we make connects back to your business objectives. Aesthetics serve the strategy, not the other way around.',
  },
  {
    num: '02',
    title: 'Copy that converts',
    body: "Your words do more selling than your visuals. We write copy that speaks directly to your buyer's hesitations and motivates action.",
  },
  {
    num: '03',
    title: 'Performance as standard',
    body: "A beautiful website that loads slowly or ranks nowhere is a beautiful failure. We build for Google's Core Web Vitals from day one.",
  },
]

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const initAnimations = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      if (!section) return

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      // Eyebrow + heading entry
      gsap.fromTo(section.querySelectorAll('.philosophy-animate'), {
        opacity: 0, y: 32,
      }, {
        opacity: 1, y: 0,
        duration: 0.8, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 82%' },
      })

      // Pull quote — word-by-word animation
      const quote = section.querySelector('.pull-quote')
      if (quote) {
        const text = quote.textContent || ''
        const words = text.split(' ')
        quote.innerHTML = words.map(w => `<span class="quote-word" style="display:inline-block;opacity:0;transform:translateY(12px)">${w}&nbsp;</span>`).join('')

        gsap.to(quote.querySelectorAll('.quote-word'), {
          opacity: 1, y: 0,
          duration: 0.5, ease: 'expo.out', stagger: 0.025,
          scrollTrigger: { trigger: quote, start: 'top 80%' },
        })
      }

      // Cards stagger up
      gsap.fromTo(section.querySelectorAll('.principle-card'), {
        opacity: 0, y: 40, rotation: -0.8,
      }, {
        opacity: 1, y: 0, rotation: 0,
        duration: 0.8, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: section.querySelector('.principles-grid'), start: 'top 80%' },
      })
    }

    initAnimations()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="section section-border-top">
      <div className="container">
        
        <div className="grid-editorial" style={{ marginBottom: '80px', alignItems: 'flex-end' }}>
          <div className="grid-7-left">
            <p className="philosophy-animate eyebrow" style={{ marginBottom: '24px', letterSpacing: '0.14em' }}>OUR APPROACH</p>
            <h2 className="philosophy-animate" style={{
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
            }}>
              We don&apos;t ship websites.{' '}
              <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 }}>
                We ship outcomes.
              </em>
            </h2>
          </div>
          <div className="grid-5-right">
            <p className="philosophy-animate" style={{
              fontSize: '17px',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              letterSpacing: '-0.01em',
            }}>
              The difference between a website that converts and one that doesn&apos;t isn&apos;t the color palette. It&apos;s whether every decision was made with your customer&apos;s psychology in mind.
            </p>
          </div>
        </div>

        {/* Principle cards */}
        <div className="principles-grid grid-editorial">
          {PRINCIPLES.map((p) => (
            <article key={p.num} className="principle-card col-span-4" style={{
              backgroundColor: 'var(--color-surface-1)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '36px 32px',
            }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--color-orange)',
                fontSize: '16px',
                letterSpacing: '-0.01em',
                display: 'block',
                marginBottom: '20px',
              }}>
                {p.num}
              </span>
              <h3 style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                marginBottom: '12px',
              }}>
                {p.title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.72,
                letterSpacing: '-0.005em',
              }}>
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{``}</style>
    </section>
  )
}
