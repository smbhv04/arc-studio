'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [shouldShow, setShouldShow] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Skip preloader on return visits
    if (sessionStorage.getItem('arc_visited')) {
      setShouldShow(false)
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      sessionStorage.setItem('arc_visited', '1')
      setShouldShow(false)
      return
    }

    const runPreloader = async () => {
      const gsap = (await import('gsap')).default

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('arc_visited', '1')
          const el = document.getElementById('preloader')
          if (el) el.style.display = 'none'
          // Trigger hero animations
          window.dispatchEvent(new CustomEvent('preloader-complete'))
        },
      })

      // PHASE 1 — ARC letters enter (0ms → 500ms)
      tl.fromTo(
        '.preloader-arc .preloader-letter',
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'expo.out', stagger: 0.08 },
        0
      )

      // PHASE 2 — Rule draws (500ms → 900ms)
      tl.fromTo(
        '.preloader-rule',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.4, ease: 'expo.out' },
        0.5
      )

      // Counter animation
      tl.to(
        { val: 0 },
        {
          val: 100,
          duration: 1.3,
          ease: 'none',
          onUpdate: function () {
            const counter = document.querySelector('.preloader-counter')
            if (counter) counter.textContent = `${Math.round((this as any).targets()[0].val)}%`
          },
        },
        0.5
      )

      // PHASE 3 — STUDIO letters enter (900ms → 1300ms)
      tl.fromTo(
        '.preloader-studio .preloader-letter',
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'expo.out', stagger: 0.08 },
        0.9
      )

      // PHASE 4 — Rule expands + flash (1300ms → 1700ms)
      tl.to('.preloader-rule', {
        height: '100vh',
        backgroundColor: '#FF4D1C',
        duration: 0.2,
        ease: 'expo.in',
      }, 1.3)

      tl.to('.preloader-text', {
        color: '#080808',
        scale: 1.04,
        duration: 0.15,
        ease: 'expo.out',
      }, 1.5)

      // PHASE 5 — Wipe reveal (1700ms → 2100ms)
      tl.to('#preloader', {
        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        duration: 0.4,
        ease: 'expo.in',
      }, 1.7)
    }

    runPreloader()
  }, [])

  if (!shouldShow) return null

  return (
    <div
      id="preloader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#080808',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      }}
    >
      <div className="preloader-text" style={{ textAlign: 'center', position: 'relative' }}>
        {/* ARC */}
        <div className="preloader-arc" style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
          {'ARC'.split('').map((letter, i) => (
            <span
              key={i}
              className="preloader-letter"
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: '80px',
                fontWeight: 400,
                color: 'var(--color-white)',
                display: 'inline-block',
                opacity: 0,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Rule line */}
        <div
          className="preloader-rule"
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
            margin: '16px 0',
          }}
        />

        {/* STUDIO */}
        <div className="preloader-studio" style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
          {'STUDIO'.split('').map((letter, i) => (
            <span
              key={i}
              className="preloader-letter"
              style={{
                fontFamily: 'var(--font-sans), system-ui, sans-serif',
                fontSize: '80px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: 'var(--color-white)',
                display: 'inline-block',
                opacity: 0,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Counter */}
      <div
        className="preloader-counter"
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          fontFamily: 'var(--font-sans), system-ui, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.12em',
          color: 'var(--color-text-tertiary)',
        }}
      >
        0%
      </div>
    </div>
  )
}
