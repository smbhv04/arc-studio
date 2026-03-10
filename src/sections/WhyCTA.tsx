import Button from '../components/Button';

const WhyCTA = () => {
  return (
    <section id="about" className="py-[clamp(5rem,10vw,9rem)] bg-surface relative overflow-hidden">
      <div className="grid-editorial items-start">

        {/* Section label */}
        <div className="grid-full mb-10 md:mb-16">
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-[0.12em]">
            Why ARC Studio
          </span>
        </div>

        {/* Left — Why reasons — 7 columns */}
        <div className="grid-7 mb-12 md:mb-0">
          <h2 className="font-serif text-primary mb-10">
            Why ARC Studio?
          </h2>
          <div className="space-y-8">
            <div className="border-t border-border pt-6">
              <h3 className="text-[1.0625rem] font-medium text-primary mb-2">Investment vs. Cost</h3>
              <p className="text-text-secondary leading-[1.75] text-sm max-w-md">
                Cheap websites cost more in the long run: lost leads, broken layouts, and expensive rebuilds. We build assets that appreciate in value.
              </p>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="text-[1.0625rem] font-medium text-primary mb-2">Senior-Only Execution</h3>
              <p className="text-text-secondary leading-[1.75] text-sm max-w-md">
                You work directly with the builders. No account managers, no communication gaps, no junior designers learning on your dime.
              </p>
            </div>
            <div className="border-t border-border pt-6">
              <h3 className="text-[1.0625rem] font-medium text-primary mb-2">Built for Results</h3>
              <p className="text-text-secondary leading-[1.75] text-sm max-w-md">
                Every decision — layout, copy structure, performance budget — is made with one question: will this convert?
              </p>
            </div>
          </div>
        </div>

        {/* Right — Quote — 5 columns */}
        <div className="grid-5 flex flex-col justify-between gap-10">
          <blockquote
            className="p-8 rounded-xl italic font-serif text-[1.125rem] leading-[1.65] text-primary/75"
            style={{
              background: 'var(--color-surface-elevated)',
              borderLeft: '3px solid var(--color-accent)',
            }}
          >
            "Finally an agency that gets the difference between 'clean' and 'empty'."
            <footer className="mt-5 text-[11px] font-sans not-italic text-text-muted uppercase tracking-[0.12em]">
              — Sarah Jenkins, Arch. Studio Founder
            </footer>
          </blockquote>
        </div>

        {/* FAQ — full width */}
        <div id="faq" className="grid-full mt-20 md:mt-28 border-t border-border pt-12 md:pt-16">
          <div className="grid-editorial px-0" style={{ padding: 0 }}>
            <div className="grid-full mb-8">
              <h3 className="font-serif text-primary text-[1.375rem]">Common Questions</h3>
            </div>
            <div className="grid-7">
              <div className="space-y-8">
                <div className="border-t border-border pt-6">
                  <h4 className="font-medium text-primary mb-2">What makes a high-performance website?</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    It's more than just speed. It's semantic code, optimized assets, accessible UX, and a structure that Google's crawlers love. We prioritize all of these.
                  </p>
                </div>
                <div className="border-t border-border pt-6">
                  <h4 className="font-medium text-primary mb-2">Do you handle technical SEO?</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Yes. We build with <strong className="font-medium text-primary">technical SEO</strong> in mind from day one. Proper heading structures, schema markup, and Core Web Vitals optimization are standard.
                  </p>
                </div>
                <div className="border-t border-border pt-6">
                  <h4 className="font-medium text-primary mb-2">How long does web application development take?</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    For a typical MVP or V1 product, we aim for 4–6 weeks. Complex applications vary, but we work in agile sprints to ship value quickly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA — full width */}
        <div className="grid-full mt-20 md:mt-28 border-t border-border pt-12 md:pt-16 flex flex-col items-center text-center">
          <h2 className="font-serif text-primary leading-[1.08] tracking-[-0.025em] max-w-3xl text-balance mb-6 md:mb-8">
            Stop spending on "repairs."<br />Start investing in infrastructure.
          </h2>
          <p className="text-text-secondary text-[clamp(0.9375rem,1vw+0.5rem,1.0625rem)] leading-[1.75] max-w-md mb-8 md:mb-10">
            If you need clarity, speed, and technical excellence, we should talk.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <Button size="lg" variant="primary">Start your project</Button>
            <a
              href="mailto:hello@arcstudio.com"
              className="text-sm text-text-secondary hover:text-primary underline underline-offset-4 decoration-border hover:decoration-primary transition-colors"
            >
              Email us directly
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted">
            <span>• Clear Scope</span>
            <span>• No Bloated Timelines</span>
            <span>• Direct Founder Access</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyCTA;
