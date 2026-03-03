import { useScrollReveal } from '../hooks/useScrollReveal';

interface ProjectData {
  title: string;
  category: string;
  year: string;
  outcome: string;
  gradient: string;
}

const projects: ProjectData[] = [
  {
    title: 'Maison & Co.',
    category: 'Website Design',
    year: '2025',
    outcome: '+40% qualified inquiries',
    gradient: 'from-[#E8E4DF] to-[#D8D3CC]',
  },
  {
    title: 'Vibes.ai',
    category: 'Web Application',
    year: '2025',
    outcome: 'Pre-seed secured in 3 weeks',
    gradient: 'from-[#E0DDD8] to-[#D0CBC4]',
  },
  {
    title: 'Arch. Studio',
    category: 'Brand + Website',
    year: '2024',
    outcome: '3x page load improvement',
    gradient: 'from-[#DDD8D3] to-[#CCC6BF]',
  },
  {
    title: 'Nōva Interiors',
    category: 'E-Commerce',
    year: '2024',
    outcome: '+65% conversion rate',
    gradient: 'from-[#E5E0DA] to-[#D5CEC6]',
  },
];

const ProjectCard = ({
  project,
  className = '',
}: {
  project: ProjectData;
  className?: string;
}) => (
  <div className={`group cursor-pointer ${className}`}>
    {/* Image area */}
    <div
      className={`relative aspect-[4/3] bg-gradient-to-br ${project.gradient} rounded-sm overflow-hidden mb-4 md:mb-5 transition-all duration-500`}
    >
      {/* Typography as placeholder visual */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[6rem] sm:text-[8rem] lg:text-[10rem] font-serif text-primary/[0.05] leading-none select-none transition-transform duration-700 group-hover:scale-110">
          {project.title.charAt(0)}
        </span>
      </div>

      {/* Hover overlay with metrics */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.05] transition-all duration-500 flex items-end p-4 md:p-6">
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-medium text-primary/70 bg-surface/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            {project.outcome}
          </span>
        </div>
      </div>
    </div>

    {/* Meta */}
    <div className="flex items-baseline justify-between gap-4">
      <div className="min-w-0">
        <h3 className="text-sm md:text-base font-sans font-medium text-primary group-hover:text-accent transition-colors duration-300 truncate">
          {project.title}
        </h3>
        <span className="text-[11px] md:text-xs text-text-muted mt-0.5 block">{project.category}</span>
      </div>
      <span className="text-[10px] md:text-[11px] font-mono text-text-muted/50 tabular-nums flex-shrink-0">
        {project.year}
      </span>
    </div>
  </div>
);

const SelectedWork = () => {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="work"
      ref={revealRef}
      className="reveal reveal-stagger bg-surface"
      style={{ paddingTop: 'var(--spacing-section)', paddingBottom: 'var(--spacing-section)' }}
    >
      <div className="grid-editorial">
        {/* Header */}
        <div className="grid-full flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16 lg:mb-20">
          <div className="reveal-child">
            <span className="block text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-text-muted mb-3 md:mb-4">
              Selected work
            </span>
            <h2 className="font-serif text-primary">
              Built for performance<span className="text-accent">,</span>
              <br className="hidden md:block" />
              not decoration<span className="text-accent">.</span>
            </h2>
          </div>
          <a
            href="#"
            className="reveal-child hidden md:inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent group/link transition-colors duration-300 mt-4 md:mt-0"
          >
            View all projects
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Staggered project grid */}
        <div className="grid-7">
          <ProjectCard project={projects[0]} className="reveal-child" />
        </div>
        <div className="grid-5 md:mt-20">
          <ProjectCard project={projects[1]} className="reveal-child" />
        </div>
        <div className="grid-5-left md:mt-8">
          <ProjectCard project={projects[2]} className="reveal-child" />
        </div>
        <div className="grid-7-right md:-mt-8">
          <ProjectCard project={projects[3]} className="reveal-child" />
        </div>

        {/* Mobile "View all" link */}
        <div className="grid-full md:hidden mt-8">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-300"
          >
            View all projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
