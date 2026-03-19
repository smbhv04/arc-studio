'use client'

import { useEffect, useRef } from 'react'

export default function FinalCTA() {
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

      // Word-by-word headline
      const headline = section.querySelector('.cta-headline')
      if (headline) {
        const text = headline.innerHTML
        // Split each text node's words but preserve HTML tags
        const words = text.replace(/<[^>]*>/g, (match: string) => `|||${match}|||`).split(' ')
        headline.innerHTML = words.map(w => {
          if (w.includes('|||')) {
            return w.replace(/\|\|\|/g, '')
          }
          return `<span class="cta-word" style="display:inline-block;opacity:0;transform:translateY(12px)">${w}&nbsp;</span>`
        }).join('')

        gsap.to(headline.querySelectorAll('.cta-word'), {
          opacity: 1, y: 0,
          duration: 0.5, ease: 'expo.out', stagger: 0.03,
          scrollTrigger: { trigger: headline, start: 'top 80%' },
        })
      }

      // Sub elements
      gsap.fromTo(section.querySelectorAll('.cta-animate'), {
        opacity: 0, y: 24,
      }, {
        opacity: 1, y: 0,
        duration: 0.6, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 60%' },
      })
    }

    initAnimations()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section"
      style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: 'var(--color-black)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Ambient gradient orb */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(255,77,0,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div className="grid-editorial">
          <div className="grid-center-10" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <p className="cta-animate eyebrow" style={{ marginBottom: '28px', letterSpacing: '0.14em' }}>
              LET&apos;S WORK TOGETHER
            </p>

            <h2 className="cta-headline" style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: '-0.035em',
              marginBottom: '28px',
            }}>
              Ready to build a website that actually{' '}
              <em style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--color-orange)',
              }}>earns</em>{' '}
              its keep?
            </h2>

            <p className="cta-animate" style={{
              fontSize: '17px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              letterSpacing: '-0.01em',
              marginBottom: '48px',
              maxWidth: '520px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              We take on a limited number of new projects each quarter to ensure every client gets our full attention. If you&apos;re serious about your web presence, let&apos;s talk.
            </p>

            <div className="cta-animate" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap',
            }}>
              <a
                href="mailto:hello@arcstudio.co"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--color-orange)',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  padding: '16px 36px',
                  borderRadius: '100px',
                  transition: 'all 280ms cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = 'none')}
              >
                Start your project →
              </a>
              <a href="#" className="ghost-link" style={{ fontSize: '14px', letterSpacing: '-0.01em' }}>
                Or book a free 30-min call
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes drift {
          0% { transform: translate(-50%, -50%) translate(0px, 0px); }
          100% { transform: translate(-50%, -50%) translate(16px, -16px); }
        }
      `}</style>
    </section>
  )
}
