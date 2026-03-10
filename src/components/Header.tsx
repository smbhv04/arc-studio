import { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // When on video hero (not scrolled), use white text. When scrolled over white sections, black text.
  const onDark = !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-black/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div
        className="max-w-[1600px] mx-auto flex items-center justify-between h-16 md:h-20"
        style={{ paddingLeft: 'clamp(1.25rem, 5vw, 6rem)', paddingRight: 'clamp(1.25rem, 5vw, 6rem)' }}
      >
        {/* Logo */}
        <a
          href="/"
          className="text-xl md:text-2xl font-serif tracking-tight relative z-50 transition-colors duration-300"
          style={{ color: mobileOpen ? 'var(--color-primary)' : onDark ? '#FFFFFF' : 'var(--color-primary)' }}
        >
          ARC<span style={{ color: 'var(--color-accent)' }}>.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {['Services', 'Work', 'Process', 'Pricing'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-[13px] font-sans font-medium transition-colors duration-300 group"
              style={{ color: onDark ? 'rgba(255,255,255,0.55)' : 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = onDark ? '#FFFFFF' : 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = onDark ? 'rgba(255,255,255,0.55)' : 'var(--color-text-secondary)';
              }}
            >
              {item}
              <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA button — desktop */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-sans font-semibold text-[12px] uppercase tracking-[0.14em] px-5 py-3 transition-all duration-300"
            style={{
              background: onDark ? 'rgba(255,255,255,0.1)' : 'var(--color-primary)',
              color: '#FFFFFF',
              backdropFilter: onDark ? 'blur(8px)' : undefined,
              border: onDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-accent)'; }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = onDark ? 'rgba(255,255,255,0.1)' : 'var(--color-primary)';
            }}
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] transition-all duration-300 origin-center ${
              mobileOpen ? 'rotate-45 translate-y-[3.25px] bg-primary' : onDark ? 'bg-white' : 'bg-primary'
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] transition-all duration-300 origin-center ${
              mobileOpen ? '-rotate-45 -translate-y-[3.25px] bg-primary' : onDark ? 'bg-white' : 'bg-primary'
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu — full-screen editorial overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 flex flex-col justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="flex flex-col gap-2 px-6 sm:px-8"
        >
          {['Services', 'Work', 'Process', 'Pricing'].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className={`font-serif text-primary block transition-all duration-500 py-2 ${
                mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                fontSize: 'clamp(2.5rem, 10vw, 4.5rem)',
                letterSpacing: '-0.04em',
                lineHeight: '1.05',
                transitionDelay: mobileOpen ? `${100 + i * 60}ms` : '0ms',
              }}
            >
              {item}
            </a>
          ))}

          <div
            className={`mt-8 transition-all duration-500 ${
              mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: mobileOpen ? '380ms' : '0ms' }}
          >
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-3 bg-accent text-white font-sans font-semibold text-[13px] uppercase tracking-[0.12em] px-6 py-4 transition-all duration-300 hover:bg-accent-hover"
            >
              Get in touch
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
