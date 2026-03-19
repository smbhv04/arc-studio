'use client'

import Link from 'next/link'

const FOOTER_LINKS = [
  { label: 'Work', href: '#our-work' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--color-surface-1)',
      borderTop: '1px solid var(--color-border)',
      padding: '64px 48px 32px',
    }}>
      <div className="container">
        <div className="grid-editorial" style={{ marginBottom: '64px' }}>
          {/* Left — Brand */}
          <div className="col-span-4">
            <Link href="/" aria-label="ARC Studio — Home" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '4px', marginBottom: '20px' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '20px', color: 'var(--color-white)' }}>
                ARC
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '14px', letterSpacing: '0.04em', color: 'var(--color-white)' }}>
                STUDIO
              </span>
            </Link>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.72,
              maxWidth: '280px',
              marginBottom: '20px',
            }}>
              Premium web design agency for businesses that compete on quality.
            </p>
            <p style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-tertiary)',
            }}>
              © 2025 ARC Studio
            </p>
          </div>

          {/* Center — Navigation */}
          <nav className="col-span-4" aria-label="Footer navigation">
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      transition: 'color 200ms',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right — Contact */}
          <div className="col-span-4" style={{ textAlign: 'right' }}>
            <a
              href="mailto:hello@arcstudio.co"
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-primary)',
                display: 'block',
                marginBottom: '8px',
                transition: 'color 200ms',
              }}
            >
              hello@arcstudio.co
            </a>
            <p style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-tertiary)',
            }}>
              Response within 24 hours
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
      `}</style>
    </footer>
  )
}
