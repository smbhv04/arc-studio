
import Container from '../components/Container';

const Audience = () => {
  return (
    <section className="py-20 bg-arc-white border-t border-arc-charcoal/5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Who We Work With */}
          <div className="md:pr-8">
            <h2 className="text-3xl font-serif font-light mb-8 text-arc-charcoal">
              Who we work with
            </h2>
            <ul className="space-y-12">
              <li className="group">
                <h3 className="text-xl font-medium mb-3 group-hover:text-arc-charcoal/80 transition-colors">
                  Growing Brands & Studios
                </h3>
                <p className="text-arc-charcoal/60 leading-relaxed max-w-sm">
                  You’ve outgrown your current site. It feels slow, looks generic, and doesn't convert high-value leads. You need a <strong className="text-arc-charcoal font-normal">high-performance website</strong> that positions you as the market leader.
                </p>
              </li>
              <li className="group">
                <h3 className="text-xl font-medium mb-3 group-hover:text-arc-charcoal/80 transition-colors">
                  Early-Stage SaaS Founders
                </h3>
                <p className="text-arc-charcoal/60 leading-relaxed max-w-sm">
                  You need to launch fast, but can't afford a buggy product. You need scalable <strong className="text-arc-charcoal font-normal">web application development</strong> that balances speed with architectural solidity.
                </p>
              </li>
            </ul>
          </div>

          {/* Who We Don't */}
          <div className="md:pl-12 lg:pl-20 md:border-l border-arc-charcoal/10">
            <h2 className="text-3xl font-serif font-light mb-8 text-arc-charcoal/40">
              Who we don't
            </h2>
            <ul className="space-y-12">
              <li>
                <h3 className="text-xl font-medium mb-3 text-arc-charcoal/40">
                  Feature-bloat Chasers
                </h3>
                <p className="text-arc-charcoal/40 leading-relaxed max-w-sm">
                  If you prioritize "more features" over "better experience" before launch, we aren't the right partner.
                </p>
              </li>
              <li>
                <h3 className="text-xl font-medium mb-3 text-arc-charcoal/40">
                  "Let's Experiment" Projects
                </h3>
                <p className="text-arc-charcoal/40 leading-relaxed max-w-sm">
                  We are builders, not R&D labs. We work best when the vision is clear and the goal is to ship.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Audience;
