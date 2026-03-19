'use client'

import { useEffect, useRef } from 'react'

const PHASES = [
  {
    num: '01',
    duration: '2 weeks',
    title: 'Discover & Define',
    body: "We study your business as though we're pitching to your most valuable client. Competitive landscape, buyer psychology, positioning gaps, and conversion opportunities — before a single pixel is placed. You get a written strategy document, not just a mood board.",
    deliverables: ['Competitive analysis', 'Positioning brief', 'Sitemap & wireframes', 'Copy strategy document'],
  },
  {
    num: '02',
    duration: '4–6 weeks',
    title: 'Build & Refine',
    body: "Design and development happen in parallel. You see working progress every week — not a big reveal that wastes months and leaves no time for iteration. Feedback rounds are structured so decisions are made fast and respected.",
    deliverables: ['Weekly working previews', 'Design system documentation', 'Responsive build', 'Performance optimization'],
  },
  {
    num: '03',
    duration: 'Ongoing',
    title: 'Launch & Grow',
    body: "Launch is the beginning, not the end. Every project includes 60 days of post-launch monitoring, bug fixing, and conversion analysis. We treat your results as our reputation — because they are.",
    deliverables: ['Performance monitoring', '60-day support window', 'Analytics setup', 'Conversion baseline report'],
  },
]

export default function Process() {
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

      // Entry animations
      gsap.fromTo(section.querySelectorAll('.process-animate'), {
        opacity: 0, y: 32,
      }, {
        opacity: 1, y: 0,
        duration: 0.8, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 82%' },
      })

      // Phase blocks stagger
      gsap.fromTo(section.querySelectorAll('.process-phase'), {
        opacity: 0, y: 40,
      }, {
        opacity: 1, y: 0,
        duration: 0.8, ease: 'expo.out', stagger: 0.15,
        scrollTrigger: { trigger: section.querySelector('.process-phases'), start: 'top 80%' },
      })

      // Timeline dot travel
      const line = section.querySelector('.timeline-progress') as HTMLElement
      if (line) {
        gsap.fromTo(line, { scaleY: 0 }, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section.querySelector('.process-phases'),
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.5,
          },
        })
      }

      // Callout entry
      gsap.fromTo(section.querySelector('.process-callout'), {
        opacity: 0, y: 24,
      }, {
        opacity: 1, y: 0,
        duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: section.querySelector('.process-callout'), start: 'top 85%' },
      })
    }

    initAnimations()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="section section-border-top">
      <div className="container">
        <p className="process-animate eyebrow" style={{ marginBottom: '24px' }}>THE PROCESS</p>

        <h2 className="process-animate" style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '80px',
        }}>
          Three phases.{' '}
          <em style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
          }}>
            Zero ambiguity.
          </em>
        </h2>

        <div className="process-phases" style={{
          display: 'grid',
          gridTemplateColumns: '48px 1fr',
          gap: '0 40px',
        }}>
          {/* Timeline line */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '1px',
              height: '100%',
              backgroundColor: 'var(--color-border)',
              position: 'absolute',
              top: 0,
            }} />
            <div
              className="timeline-progress"
              style={{
                width: '1px',
                height: '100%',
                backgroundColor: 'var(--color-orange)',
                position: 'absolute',
                top: 0,
                transformOrigin: 'top',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {/* Phases */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {PHASES.map((phase) => (
              <div key={phase.num} className="process-phase">
                {/* Duration badge */}
                <span style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  color: 'var(--color-orange)',
                  backgroundColor: 'var(--color-orange-dim)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '4px 12px',
                  marginBottom: '16px',
                }}>
                  {phase.duration}
                </span>

                <h3 style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 600,
                  marginBottom: '16px',
                }}>
                  {phase.title}
                </h3>

                <p style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: '24px',
                  maxWidth: '580px',
                }}>
                  {phase.body}
                </p>

                <ul style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px 24px',
                }}>
                  {phase.deliverables.map((d, i) => (
                    <li key={i} style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <span style={{
                        width: '3px',
                        height: '3px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-text-tertiary)',
                        flexShrink: 0,
                      }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Callout */}
        <div className="process-callout" style={{
          marginTop: '80px',
          textAlign: 'center',
          padding: '32px',
          border: '1px solid var(--color-border-strong)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <p style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
          }}>
            Most projects are live within 8 weeks of kickoff.
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .process-phases {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .process-phases > div:first-child {
            display: none !important;
          }
          ul {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
