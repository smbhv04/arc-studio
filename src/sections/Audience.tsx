const Audience = () => {
  return (
    <section className="py-[clamp(5rem,10vw,9rem)] bg-surface border-t border-primary/[0.05]">
      <div className="grid-editorial items-start">
        {/* Section label — full width */}
        <div className="grid-full mb-10 md:mb-16">
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-[0.12em]">
            Who We Serve
          </span>
        </div>

        {/* Who We Work With — 7 columns */}
        <div className="grid-7 reveal">
          <h2 className="font-serif text-primary mb-8 md:mb-10">
            Who we work with
          </h2>
          <ul className="space-y-10">
            <li className="group border-t border-border pt-6">
              <h3 className="text-[1.0625rem] font-medium text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                Growing Brands &amp; Studios
              </h3>
              <p className="text-text-secondary leading-[1.75] text-sm max-w-md">
                You've outgrown your current site. It feels slow, looks generic, and doesn't convert high-value leads. You need a{' '}
                <strong className="font-semibold text-primary">high-performance website</strong> that positions you as the market leader.
              </p>
            </li>
            <li className="group border-t border-border pt-6">
              <h3 className="text-[1.0625rem] font-medium text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                Early-Stage SaaS Founders
              </h3>
              <p className="text-text-secondary leading-[1.75] text-sm max-w-md">
                You need to launch fast, but can't afford a buggy product. You need scalable{' '}
                <strong className="font-semibold text-primary">web application development</strong> that balances speed with architectural solidity.
              </p>
            </li>
          </ul>
        </div>

        {/* Who We Don't — 5 columns */}
        <div className="grid-5 reveal">
          <h2 className="font-serif text-primary/30 mb-8 md:mb-10">
            Who we don't
          </h2>
          <ul className="space-y-10">
            <li className="border-t border-border/50 pt-6">
              <h3 className="text-[1.0625rem] font-medium text-primary/30 mb-3">
                Feature-bloat Chasers
              </h3>
              <p className="text-text-muted leading-[1.75] text-sm max-w-xs">
                If you prioritize "more features" over "better experience" before launch, we aren't the right partner.
              </p>
            </li>
            <li className="border-t border-border/50 pt-6">
              <h3 className="text-[1.0625rem] font-medium text-primary/30 mb-3">
                "Let's Experiment" Projects
              </h3>
              <p className="text-text-muted leading-[1.75] text-sm max-w-xs">
                We are builders, not R&amp;D labs. We work best when the vision is clear and the goal is to ship.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Audience;
