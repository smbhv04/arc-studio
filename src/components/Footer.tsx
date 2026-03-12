import Button from './Button';

const Footer = () => {
  return (
    <footer className="relative bg-surface-dark text-surface pt-16 md:pt-24 pb-12 md:pb-16 overflow-hidden">
      
      {/* ── INTERACTIVE FLOWER BACKGROUND ── */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden opacity-100 pointer-events-none">
        <iframe 
          src="/flower.html" 
          className="w-full h-full border-none pointer-events-auto" 
          title="Interactive Flower Background"
          scrolling="no"
        />
        {/* Subtle vignette over the iframe to blend it into the dark footer */}
        <div className="absolute inset-0 bg-surface-dark/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-surface-dark pointer-events-none opacity-60" />
      </div>

      <div className="grid-editorial relative z-10">
        {/* Column 1 — Brand */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-5 md:gap-6 mb-10 md:mb-0">
          <a href="/" className="text-xl md:text-2xl font-serif tracking-tight text-surface pointer-events-auto">
            ARC
          </a>
          <p className="text-[13px] md:text-sm leading-relaxed max-w-xs text-surface/70">
            High-performance websites and web applications for growing brands and early-stage products.
          </p>
          <ul className="text-[10px] md:text-[11px] text-surface/50 space-y-1.5 md:space-y-2 uppercase tracking-[0.1em]">
            {['Clear Scope', 'Structured Process', 'Performance-First', 'Limited Clients'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent/30 rounded-full" />
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Column 2 — Expertise */}
        <div className="col-span-6 md:col-span-3 flex flex-col gap-6 md:gap-8 mb-10 md:mb-0">
          <div className="flex flex-col gap-3 md:gap-4">
            <h4 className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] text-surface/60">
              Expertise
            </h4>
            <ul className="flex flex-col gap-2.5 md:gap-3 text-[13px] md:text-sm text-surface/70">
              {[
                ['#services', 'Website Design & Dev'],
                ['#services', 'Web App Development'],
                ['#process', 'Technical SEO'],
                ['#process', 'Product Strategy'],
              ].map(([href, label]) => (
                <li key={label}>
                  <a href={href} className="hover:text-accent transition-colors duration-300 pointer-events-auto">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 3 — CTA + Social */}
        <div className="col-span-6 md:col-span-4 flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-3 md:gap-4">
            <h4 className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] text-surface/60">
              Next step
            </h4>
            <p className="text-[13px] md:text-sm leading-relaxed text-surface/70">
              Ready to build something that performs?
            </p>
            <Button
              variant="outline"
              size="md"
              className="border-surface/15 text-surface hover:bg-accent hover:text-white hover:border-accent w-fit pointer-events-auto"
            >
              See if we're a fit
            </Button>
          </div>

          <div className="flex flex-col gap-3 md:gap-4 mt-auto">
            <h4 className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] text-surface/60">
              Connect
            </h4>
            <div className="flex gap-4 md:gap-5">
              {['Twitter', 'LinkedIn', 'Dribbble'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[11px] md:text-xs text-surface/50 hover:text-accent transition-colors duration-300 uppercase tracking-[0.08em] pointer-events-auto"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 pt-8 md:pt-10 mt-8 md:mt-10 border-t border-surface/[0.06] flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-[10px] md:text-[11px] text-surface/40 tracking-wide">
            © {new Date().getFullYear()} ARC Studio. All rights reserved.
          </p>
          <div className="flex gap-5 md:gap-6">
            <a href="#" className="text-[10px] md:text-[11px] text-surface/40 hover:text-surface transition-colors duration-300 pointer-events-auto">
              Privacy Policy
            </a>
            <a href="#" className="text-[10px] md:text-[11px] text-surface/40 hover:text-surface transition-colors duration-300 pointer-events-auto">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
