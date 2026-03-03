
import Container from '../components/Container';
import Button from '../components/Button';

const WhyCTA = () => {
  return (
    <section id="about" className="py-24 bg-arc-white relative overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16 mb-24">
          <div className="max-w-xl">
            <h2 className="text-4xl font-serif font-light mb-8">
              Why ARC Studio?
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Investment vs. Cost</h3>
                <p className="text-arc-charcoal/60 leading-relaxed">
                  Cheap websites cost more in the long run: lost leads, broken layouts, and expensive rebuilds. We build assets that appreciate in value.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Senior-Only Execution</h3>
                <p className="text-arc-charcoal/60 leading-relaxed">
                  You work directly with the builders. No account managers, no communication gaps, no junior designers learning on your dime.
                </p>
              </div>
            </div>
          </div>
          
          {/* Visual element or quote could go here */}
          <div className="w-full lg:w-auto p-8 bg-arc-gray/50 rounded-sm italic font-serif text-xl leading-relaxed text-arc-charcoal/80">
            "Finally an agency that gets the difference between 'clean' and 'empty'."
            <div className="mt-4 text-sm font-sans not-italic text-arc-charcoal/50 uppercase tracking-wide">
              — Sarah Jenkins, Arch. Studio Founder
            </div>
          </div>
        </div>

        {/* FAQ Section for SEO */}
        <div id="faq" className="mb-24 max-w-3xl border-t border-arc-charcoal/10 pt-16">
          <h3 className="text-xl font-medium mb-8">Common Questions</h3>
          <div className="grid gap-8">
            <div>
              <h4 className="font-medium text-arc-charcoal mb-2">What makes a high-performance website?</h4>
              <p className="text-arc-charcoal/60 text-sm leading-relaxed">It's more than just speed. It's semantic code, optimized assets, accessible UX, and a structure that Google's crawlers love. We prioritize all of these.</p>
            </div>
            <div>
              <h4 className="font-medium text-arc-charcoal mb-2">Do you handle technical SEO?</h4>
              <p className="text-arc-charcoal/60 text-sm leading-relaxed">Yes. We build with <strong className="font-medium text-arc-charcoal/80">technical SEO</strong> in mind from day one. Proper heading structures, schema markup, and Core Web Vitals optimization are standard.</p>
            </div>
            <div>
              <h4 className="font-medium text-arc-charcoal mb-2">How long does web application development take?</h4>
              <p className="text-arc-charcoal/60 text-sm leading-relaxed">For a typical MVP or V1 product, we aim for 4–6 weeks. Complex applications vary, but we work in agile sprints to ship value quickly.</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pt-16 border-t border-arc-charcoal/5">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 max-w-3xl mx-auto">
             Stop spending on "repairs." <br/> Start investing in infrastructure.
          </h2>
          <p className="text-lg text-arc-charcoal/60 mb-10 max-w-xl mx-auto">
            If you need clarity, speed, and technical excellence, we should talk.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button size="lg">Start your project</Button>
            <span className="text-sm text-arc-charcoal/40">or</span>
            <a href="mailto:hello@arcstudio.com" className="text-arc-charcoal font-medium hover:underline decoration-1 underline-offset-4">
              Email us directly
            </a>
          </div>

          {/* Trust Signifiers */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-medium uppercase tracking-wider text-arc-charcoal/40">
            <span>• Clear Scope</span>
            <span>• No Bloated Timelines</span>
            <span>• Direct Founder Access</span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyCTA;
