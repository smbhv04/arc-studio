import { useState, useEffect } from 'react';
import Button from './Button';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? 'bg-surface/85 backdrop-blur-2xl border-b border-primary/[0.04] shadow-[var(--shadow-xs)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-16 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="text-xl md:text-2xl font-serif tracking-tight text-primary relative z-50">
          ARC
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {['Services', 'Work', 'Process', 'About'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-[14px] font-sans font-medium text-text-secondary hover:text-primary transition-colors duration-300 group"
            >
              {item}
              <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Button size="sm" variant="primary">
            Get in touch
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-primary transition-all duration-300 origin-center ${
              mobileOpen ? 'rotate-45 translate-y-[3.25px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-primary transition-all duration-300 origin-center ${
              mobileOpen ? '-rotate-45 -translate-y-[3.25px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-surface z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-start justify-center h-full px-6 sm:px-8 gap-6">
          {['Services', 'Work', 'Process', 'About'].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className={`text-[clamp(2rem,8vw,3.5rem)] font-serif text-primary transition-all duration-500 ${
                mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: mobileOpen ? `${150 + i * 60}ms` : '0ms' }}
            >
              {item}
            </a>
          ))}
          <div
            className={`mt-6 transition-all duration-500 ${
              mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: mobileOpen ? '400ms' : '0ms' }}
          >
            <Button size="lg" onClick={() => setMobileOpen(false)}>
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
