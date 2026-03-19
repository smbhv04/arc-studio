'use client'

import { useEffect, useRef } from 'react'

const PROJECTS = [
  {
    title: 'E-commerce Conversion Redesign',
    type: 'D2C Fashion Brand',
    category: 'E-commerce',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #2d1400 40%, #0f0f0f 100%)',
    span: 'full',
  },
  {
    title: 'SaaS Marketing Website',
    type: 'B2B Software Company',
    category: 'SaaS',
    gradient: 'linear-gradient(135deg, #000d1a 0%, #001a2d 40%, #0a0a0f 100%)',
    span: 'half',
  },
  {
    title: 'Professional Services Website',
    type: 'Consulting Firm',
    category: 'Services',
    gradient: 'linear-gradient(135deg, #0d001a 0%, #1a0028 40%, #0a0a0f 100%)',
    span: 'half',
  },
]

export default function Work() {
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

      gsap.fromTo(section.querySelectorAll('.work-animate'), {
        opacity: 0, y: 32,
      }, {
        opacity: 1, y: 0,
        duration: 0.8, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 82%' },
      })

      gsap.fromTo(section.querySelectorAll('.work-card'), {
        opacity: 0, y: 40, rotation: -0.8,
      }, {
        opacity: 1, y: 0, rotation: 0,
        duration: 0.8, ease: 'expo.out', stagger: 0.12,
        scrollTrigger: { trigger: section.querySelector('.work-grid'), start: 'top 80%' },
      })
    }

    initAnimations()
  }, [])

  return (
    <section ref={sectionRef} id="our-work" className="section section-border-top">
      <div className="container">
        <p className="work-animate eyebrow" style={{ marginBottom: '24px' }}>SELECTED WORK</p>

        <h2 className="work-animate" style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '64px',
        }}>
          Recent work.
        </h2>

        <div className="work-grid grid-editorial">
          {PROJECTS.map((project, i) => (
            <article
              key={i}
              className={`work-card ${project.span === 'full' ? 'col-span-12' : 'col-span-6'}`}
              data-cursor="view"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid var(--color-border)',
              }}
            >
              {/* Image placeholder with gradient */}
              <div style={{
                aspectRatio: project.span === 'full' ? '16/9' : '4/3',
                background: project.gradient,
                position: 'relative',
                transition: 'transform 360ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
                className="work-card-image"
              >
                {/* Noise texture overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.4,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                  backgroundSize: '128px 128px',
                  pointerEvents: 'none',
                }} />

                {/* Category tag */}
                <span style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  padding: '4px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-pill)',
                  color: 'var(--color-text-secondary)',
                  backdropFilter: 'blur(8px)',
                  backgroundColor: 'rgba(8,8,8,0.5)',
                }}>
                  {project.category}
                </span>
              </div>

              {/* Card info */}
              <div style={{
                padding: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
                <div>
                  <h3 style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-tertiary)',
                  }}>
                    {project.type}
                  </p>
                </div>
                <span className="work-arrow" style={{
                  fontSize: '20px',
                  color: 'var(--color-text-tertiary)',
                  transition: 'all 360ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: 'translateX(-8px)',
                  opacity: 0,
                }}>
                  →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom text */}
        <p style={{
          textAlign: 'center',
          marginTop: '48px',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-tertiary)',
        }}>
          More work available on request.{' '}
          <a href="#contact" style={{ color: 'var(--color-text-secondary)', transition: 'color 200ms' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-white)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
          >
            Get in touch →
          </a>
        </p>
      </div>

      <style jsx>{`
      `}</style>
    </section>
  )
}
