'use client'

import { useEffect, useRef, useState } from 'react'

const FAQ_ITEMS = [
  {
    question: 'How long does a web design project take?',
    answer: "Most of our projects are live in 6 to 10 weeks from kickoff. The variable isn't our speed — it's how quickly feedback can move through your team. We structure every project to make approvals fast and decisions final, so nothing stalls at your end either.",
  },
  {
    question: 'Do you work with clients outside your location?',
    answer: "Every client we work with is remote, by design. We've built our process around async-first communication and weekly video check-ins that are faster and more focused than most in-person agency meetings. Geography has never been a constraint on the quality of our work.",
  },
  {
    question: 'What makes your web design agency different from others?',
    answer: "Most agencies design first and ask about your business second. We reverse that. Before any design work begins, we've mapped your competitive positioning, your buyer's psychology, and the specific conversion moments your website needs to create. The design follows the strategy — not the other way around.",
  },
  {
    question: 'Do you write the copy, or do I need to provide it?',
    answer: "We write everything. Conversion copywriting is included in every engagement because we've seen too many beautifully designed websites fail due to weak messaging. Our designers and copywriters work in parallel, which is why the words and visuals feel unified rather than assembled from separate briefs.",
  },
  {
    question: 'What happens after my website launches?',
    answer: 'Every project includes a post-launch window of either 30 or 60 days (depending on your tier) during which we monitor performance, fix anything unexpected, and identify early conversion improvements. After that window, ongoing retainer arrangements are available for clients who want continuous optimization.',
  },
]

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const initAnimations = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      if (!section) return

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      gsap.fromTo(section.querySelectorAll('.faq-animate'), {
        opacity: 0, y: 32,
      }, {
        opacity: 1, y: 0,
        duration: 0.8, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 82%' },
      })

      gsap.fromTo(section.querySelectorAll('.faq-item'), {
        opacity: 0, y: 24,
      }, {
        opacity: 1, y: 0,
        duration: 0.6, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: section.querySelector('.faq-list'), start: 'top 80%' },
      })
    }

    initAnimations()
  }, [])

  const toggleItem = async (index: number) => {
    const newIndex = openIndex === index ? null : index

    // Animate height
    const content = document.getElementById(`faq-content-${index}`)
    if (!content) {
      setOpenIndex(newIndex)
      return
    }

    const gsap = (await import('gsap')).default

    if (openIndex === index) {
      // Close
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'expo.out',
        onComplete: () => setOpenIndex(null),
      })
    } else {
      // Close previous
      if (openIndex !== null) {
        const prev = document.getElementById(`faq-content-${openIndex}`)
        if (prev) {
          gsap.to(prev, { height: 0, opacity: 0, duration: 0.3, ease: 'expo.out' })
        }
      }
      // Open new
      setOpenIndex(index)
      gsap.set(content, { height: 'auto', opacity: 1 })
      const h = content.offsetHeight
      gsap.fromTo(content, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.4, ease: 'expo.out' })
    }
  }

  return (
    <section ref={sectionRef} id="faq" className="section section-border-top">
      <div className="container">
        <div className="grid-editorial">
          <div className="grid-center-8">
            <p className="faq-animate eyebrow" style={{ marginBottom: '24px' }}>COMMON QUESTIONS</p>

            <h2 className="faq-animate" style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '64px',
            }}>
              Things worth knowing{' '}
              <em style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
              }}>
                before we talk.
              </em>
            </h2>

            <div className="faq-list" style={{ display: 'flex', flexDirection: 'column' }}>
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="faq-item"
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  <button
                    onClick={() => toggleItem(i)}
                    aria-expanded={openIndex === i}
                    aria-controls={`faq-content-${i}`}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '24px 0',
                      textAlign: 'left',
                      gap: '24px',
                    }}
                  >
                    <h3 style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}>
                      {item.question}
                    </h3>
                    <span style={{
                      fontSize: '20px',
                      color: 'var(--color-text-tertiary)',
                      transition: 'transform 400ms cubic-bezier(0.16,1,0.3,1)',
                      transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                      flexShrink: 0,
                      lineHeight: 1,
                    }}>
                      +
                    </span>
                  </button>

                  <div
                    id={`faq-content-${i}`}
                    role="region"
                    style={{
                      overflow: 'hidden',
                      height: openIndex === i ? 'auto' : 0,
                      opacity: openIndex === i ? 1 : 0,
                    }}
                  >
                    <p style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.75,
                      paddingBottom: '24px',
                      maxWidth: '640px',
                    }}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
