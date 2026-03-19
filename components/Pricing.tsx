'use client'

const TIERS = [
  {
    name: 'Presence',
    description: 'For businesses that need a polished, professional web foundation that performs.',
    price: '$4,800',
    features: [
      'Strategy & discovery session',
      'Up to 6 custom pages',
      'Conversion-optimized copywriting',
      'Mobile-responsive design',
      'Core Web Vitals optimization',
      '30-day post-launch support',
    ],
    cta: 'Get a quote',
    ctaStyle: 'secondary' as const,
    featured: false,
  },
  {
    name: 'Authority',
    description: 'For brands ready to compete at the highest level in their market.',
    price: '$9,600',
    features: [
      'Everything in Presence',
      'Up to 12 custom pages',
      'Full brand voice & tone guide',
      'Advanced animations & interactions',
      'SEO foundation & metadata strategy',
      'Analytics & conversion tracking setup',
      '60-day post-launch support',
    ],
    cta: 'Start your project',
    ctaStyle: 'primary' as const,
    featured: true,
  },
  {
    name: 'Enterprise',
    description: 'For established businesses that need a complete digital presence built to scale.',
    price: 'Custom',
    features: [
      'Everything in Authority',
      'Unlimited pages & custom scope',
      'Custom web application features',
      'Ongoing retainer options',
      'Dedicated project manager',
      'SLA-backed support',
    ],
    cta: "Let's talk scope →",
    ctaStyle: 'ghost' as const,
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section section-border-top">
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: '24px' }}>INVESTMENT</p>

        <h2 style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '24px',
        }}>
          Transparent pricing for{' '}
          <em style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
          }}>
            serious businesses.
          </em>
        </h2>

        <p style={{
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.75,
          maxWidth: '540px',
          marginBottom: '64px',
        }}>
          We price our web design services based on the value we create, not the hours we log. Every engagement includes strategic discovery, conversion copywriting, and post-launch support — because a website without those things is just an expensive brochure.
        </p>

        <div className="grid-editorial">
          {TIERS.map((tier) => (
            <div key={tier.name} className="col-span-4" style={{
              backgroundColor: 'var(--color-surface-1)',
              border: '1px solid var(--color-border)',
              borderTop: tier.featured ? '2px solid var(--color-orange)' : '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              position: 'relative',
              boxShadow: tier.featured ? '0 0 80px var(--color-orange-glow)' : 'none',
            }}>
              {/* Featured badge */}
              {tier.featured && (
                <span style={{
                  position: 'absolute',
                  top: '-1px',
                  right: '24px',
                  transform: 'translateY(-50%)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--color-orange)',
                  color: '#080808',
                }}>
                  MOST POPULAR
                </span>
              )}

              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 600,
                marginBottom: '8px',
              }}>
                {tier.name}
              </h3>

              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.72,
                marginBottom: '24px',
                minHeight: '48px',
              }}>
                {tier.description}
              </p>

              <div style={{ marginBottom: '32px' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Starting at</span>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-3xl)',
                  color: 'var(--color-white)',
                  fontWeight: 400,
                  marginTop: '4px',
                }}>
                  {tier.price}
                </p>
              </div>

              <ul style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '32px',
              }}>
                {tier.features.map((feature, i) => (
                  <li key={i} style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}>
                    <span style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      border: '1px solid var(--color-border-strong)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '10px',
                      color: 'var(--color-orange)',
                    }}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {tier.ctaStyle === 'ghost' ? (
                <a href="#contact" className="ghost-link" style={{ fontSize: 'var(--text-sm)' }}>
                  {tier.cta}
                </a>
              ) : (
                <a
                  href="#contact"
                  className={`btn ${tier.ctaStyle === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  {tier.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '48px',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.04em',
          color: 'var(--color-text-tertiary)',
        }}>
          All projects include: Strategy · Copywriting · Performance optimization · Post-launch support
        </p>
      </div>

      <style jsx>{`
      `}</style>
    </section>
  )
}
