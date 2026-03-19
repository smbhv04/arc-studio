'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  {
    value: '8',
    suffix: ' seconds',
    label: 'The average time a visitor decides whether to trust a website.',
  },
  {
    value: '75',
    suffix: '%',
    label: 'Of users judge a company\'s credibility based on its website design alone.',
  },
  {
    value: '2.35',
    suffix: '×',
    label: 'Average conversion rate difference between top-quartile and median websites.',
  },
]

const PAIN_POINTS = [
  'You\'ve invested in redesigns that changed the look, not the results.',
  'Your best clients found you despite your website, not because of it.',
  'Every week without a high-converting website is revenue that doesn\'t come back.',
]

export default function ProblemSection() {
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
      gsap.fromTo(section.querySelectorAll('.problem-animate'), {
        opacity: 0,
        y: 32,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
        },
      })

      // CountUp animation for stats
      section.querySelectorAll('.stat-number').forEach((el) => {
        const raw = el.getAttribute('data-value') || '0'
        const isDecimal = raw.includes('.')
        const target = parseFloat(raw)

        gsap.fromTo({ val: 0 }, { val: target }, {
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          onUpdate: function () {
            const current = (this as any).targets()[0].val
            el.textContent = isDecimal ? current.toFixed(2) : Math.round(current).toString()
          },
        })
      })

      // Stats stagger
      gsap.fromTo(section.querySelectorAll('.stat-item'), {
        opacity: 0,
        y: 40,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: section.querySelector('.stats-column'),
          start: 'top 80%',
        },
      })
    }

    initAnimations()
  }, [])

  return (
    <section ref={sectionRef} id="the-problem" className="section section-border-top">
      <div className="container">
        <p className="problem-animate eyebrow" style={{ marginBottom: '24px' }}>THE REALITY</p>

        <div className="grid-editorial" style={{ alignItems: 'start' }}>
          {/* Left column */}
          <div className="grid-7-left">
            <h2 className="problem-animate" style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '32px',
            }}>
              Your website is the most{' '}
              <em style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
              }}>
                expensive underperformer
              </em>{' '}
              on your team.
            </h2>

            <p className="problem-animate" style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.75,
              marginBottom: '40px',
              maxWidth: '520px',
            }}>
              Most business websites share the same fatal flaw: they were designed to look impressive in a presentation, not to perform in the real world. Visitors arrive, scan for 8 seconds, and leave without taking action. Meanwhile, your competitors — often with inferior products — close deals you never knew were possible, because their web design works.
            </p>

            <ul className="problem-animate" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {PAIN_POINTS.map((point, i) => (
                <li key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-orange)',
                    flexShrink: 0,
                    marginTop: '10px',
                  }} />
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.72,
                  }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — Stats */}
          <div className="stats-column grid-5-right" style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingTop: '8px' }}>
            {STATS.map((stat, i) => (
              <div key={i} className="stat-item" style={{
                paddingBottom: i < STATS.length - 1 ? '48px' : 0,
                borderBottom: i < STATS.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '12px' }}>
                  <span
                    className="stat-number"
                    data-value={stat.value}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-3xl)',
                      color: 'var(--color-white)',
                      fontWeight: 400,
                    }}
                  >
                    0
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-3xl)',
                    color: 'var(--color-white)',
                    fontWeight: 400,
                  }}>
                    {stat.suffix}
                  </span>
                </div>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.72,
                  maxWidth: '360px',
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
      `}</style>
    </section>
  )
}
