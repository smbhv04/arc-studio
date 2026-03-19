'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let raf: number

    const initLenis = async () => {
      const Lenis = (await import('lenis')).default
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothTouch: false,
        touchMultiplier: 2,
      })

      lenisRef.current = lenis

      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)

      // Intercept anchor link clicks
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const anchor = target.closest('a[href^="#"]')
        if (anchor) {
          e.preventDefault()
          const href = anchor.getAttribute('href')
          if (href) {
            lenis.scrollTo(href, { offset: -80, duration: 1.2 })
          }
        }
      }

      document.addEventListener('click', handleClick)

      return () => {
        document.removeEventListener('click', handleClick)
        lenis.destroy()
        gsap.ticker.remove((time: number) => lenis.raf(time * 1000))
      }
    }

    let cleanup: (() => void) | undefined

    initLenis().then((fn) => {
      cleanup = fn
    })

    return () => {
      cleanup?.()
    }
  }, [])

  return <>{children}</>
}
