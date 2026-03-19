'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(true)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Detect touch device
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches

    if (isTouchDevice) {
      setIsTouch(true)
      return
    }

    setIsTouch(false)
    document.body.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1'
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }

    // Hover state management
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isLink = target.closest('a, button, [role="button"]')
      const isCard = target.closest('[data-cursor="view"]')

      if (isCard) {
        if (dotRef.current) dotRef.current.style.opacity = '0'
        if (ringRef.current) {
          ringRef.current.style.width = '80px'
          ringRef.current.style.height = '80px'
          ringRef.current.style.borderColor = 'var(--color-orange)'
        }
      } else if (isLink) {
        if (dotRef.current) dotRef.current.style.opacity = '0'
        if (ringRef.current) {
          ringRef.current.style.width = '56px'
          ringRef.current.style.height = '56px'
          ringRef.current.style.borderColor = 'var(--color-orange)'
        }
      } else {
        if (dotRef.current) dotRef.current.style.opacity = '1'
        if (ringRef.current) {
          ringRef.current.style.width = '40px'
          ringRef.current.style.height = '40px'
          ringRef.current.style.borderColor = 'rgba(255, 255, 255, 0.5)'
        }
      }
    }

    // Ring lerp animation
    const animate = () => {
      const ring = ringRef.current
      if (ring) {
        const w = parseFloat(ring.style.width || '40') || 40
        ringPos.current.x += (mousePos.current.x - ringPos.current.x - w / 2) * 0.12
        ringPos.current.y += (mousePos.current.y - ringPos.current.y - w / 2) * 0.12
        ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousemove', handleElementHover)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', handleElementHover)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-white)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'opacity 200ms',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 320ms cubic-bezier(0.16,1,0.3,1), height 320ms cubic-bezier(0.16,1,0.3,1), border-color 320ms cubic-bezier(0.16,1,0.3,1)',
          willChange: 'transform',
        }}
      />
    </>
  )
}
