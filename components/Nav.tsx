'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Work', href: '#our-work' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY

      if (y > 80) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      if (y > lastScrollY.current && y > 200) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      lastScrollY.current = y
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '20px 0',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          transform: hidden && !mobileOpen ? 'translateY(-100%)' : 'translateY(0)',
          backgroundColor: scrolled ? 'rgba(8, 8, 8, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          {/* Logo */}
          <Link href="/" aria-label="ARC Studio — Home" style={{ display: 'flex', alignItems: 'baseline', gap: '1px', zIndex: 101 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 400, color: 'var(--color-white)', letterSpacing: '-0.02em' }}>
              ARC
            </span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 400, color: 'var(--color-orange)' }}>.</span>
          </Link>

          {/* Center links — desktop */}
          <div className="nav-center" style={{
            display: 'flex',
            gap: '32px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-secondary)',
                  transition: 'color 200ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-white)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA — desktop */}
          <a
            href="#contact"
            className="nav-cta"
            style={{
              zIndex: 101,
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(255,255,255,0.22)',
              padding: '9px 20px',
              borderRadius: '4px',
              background: 'rgba(10,10,10,0.5)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transition: 'all 260ms cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-orange)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-orange)';
              (e.currentTarget as HTMLElement).style.color = '#000';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(10,10,10,0.5)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)';
            }}
          >
            Get in touch
          </a>

          {/* Hamburger — mobile */}
          <button
            className="nav-hamburger"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '6px',
              zIndex: 101,
              width: '24px',
              height: '24px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span style={{
              display: 'block',
              width: '20px',
              height: '1px',
              backgroundColor: 'var(--color-white)',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              transform: mobileOpen ? 'rotate(45deg) translateY(3.5px)' : 'none',
            }} />
            <span style={{
              display: 'block',
              width: '20px',
              height: '1px',
              backgroundColor: 'var(--color-white)',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              opacity: mobileOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block',
              width: '20px',
              height: '1px',
              backgroundColor: 'var(--color-white)',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              transform: mobileOpen ? 'rotate(-45deg) translateY(-3.5px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="mobile-menu"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          backgroundColor: '#080808',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '32px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'var(--color-text-primary)',
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMobileOpen(false)}
          className="btn btn-glass"
          style={{ marginTop: '20px' }}
        >
          Get in touch
        </a>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .nav {
            padding: 16px 20px !important;
          }
          .nav-center {
            display: none !important;
          }
          .nav-cta {
            display: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  )
}
