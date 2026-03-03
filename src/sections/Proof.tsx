
import Container from '../components/Container';

const Project = ({ title, category, className = '' }: { title: string, category: string, className?: string }) => (
  <div className={`group cursor-pointer ${className}`}>
    <div className="aspect-[4/3] bg-arc-gray mb-6 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-arc-charcoal/5 group-hover:bg-arc-charcoal/0 transition-colors duration-500" />
      {/* Placeholder for image */}
      <span className="text-arc-charcoal/20 font-serif text-4xl italic">
        {title}
      </span>
    </div>
    <div className="flex justify-between items-baseline">
      <h3 className="text-xl font-medium text-arc-charcoal">{title}</h3>
      <span className="text-sm text-arc-charcoal/40 uppercase tracking-wider">{category}</span>
    </div>
  </div>
);

const Proof = () => {
  return (
    <section id="work" className="py-24 bg-arc-white">
      <Container>
        <div className="mb-16 flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-serif font-light max-w-xl">
              Selected work
            </h2>
            <p className="text-xs text-arc-charcoal/40 uppercase tracking-widest mt-1">
              Every project is built for performance, not decoration.
            </p>
          </div>
          <a href="#" className="hidden md:block text-sm border-b border-arc-charcoal/20 pb-1 hover:border-arc-charcoal transition-colors">
            View all projects
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <Project 
            title="Maison & Co." 
            category="Custom Website Design"
          />
          <div className="md:col-start-1 md:row-start-2 max-w-sm">
             <p className="text-sm text-arc-charcoal/60 leading-relaxed border-l-2 border-arc-charcoal/10 pl-4">
               <strong className="block text-arc-charcoal font-medium mb-1">The Challenge</strong>
               Maison's previous site was slow and generic, failing to reflect their premium status.
               <br/><br/>
               <strong className="block text-arc-charcoal font-medium mb-1">The Outcome</strong>
               We built a custom, high-performance site that improved page load speed by 3x and increased qualified inquiries by 40%.
             </p>
          </div>

          <Project 
            title="Vibes.ai" 
            category="Web Application" 
            className="md:mt-24" 
          />
          <div className="md:col-start-2 md:row-start-3 max-w-sm ml-auto">
             <p className="text-sm text-arc-charcoal/60 leading-relaxed border-l-2 border-arc-charcoal/10 pl-4">
               <strong className="block text-arc-charcoal font-medium mb-1">The Challenge</strong>
               Founders needed a complex MVP built fast to secure funding, without accruing technical debt.
               <br/><br/>
               <strong className="block text-arc-charcoal font-medium mb-1">The Outcome</strong>
               We delivered a scalable web application in 4 weeks. The stable build helped them secure pre-seed funding immediately.
             </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Proof;
