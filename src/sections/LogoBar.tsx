const LogoBar = () => {
  const clients = [
    'Maison & Co.',
    'Vibes.ai',
    'Arch. Studio',
    'Nōva Interiors',
    'Prism Labs',
    'Zenith Capital',
    'Ember Studios',
    'Flux Design',
  ];

  return (
    <section className="py-6 md:py-8 border-y border-primary/[0.05] overflow-hidden bg-surface">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-surface to-transparent z-10" />

        {/* Marquee track */}
        <div className="animate-marquee flex items-center gap-10 md:gap-16 whitespace-nowrap">
          {[...clients, ...clients, ...clients].map((name, i) => (
            <span
              key={i}
              className="text-[11px] md:text-[13px] font-sans font-medium uppercase tracking-[0.15em] text-primary/20 flex-shrink-0 select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoBar;
