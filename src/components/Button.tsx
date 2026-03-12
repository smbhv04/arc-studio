import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'dark-outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center gap-3 font-sans font-semibold tracking-wide
    transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    group/btn relative overflow-hidden cursor-pointer whitespace-nowrap
  `;

  const variants = {
    primary: `
      bg-accent text-white
      hover:bg-accent-hover hover:shadow-[0_8px_30px_rgba(255,77,0,0.3)]
      active:scale-[0.98]
      focus-visible:ring-accent
    `,
    outline: `
      border border-primary/15 text-primary bg-transparent
      hover:border-primary/40
      active:scale-[0.98]
      focus-visible:ring-primary
    `,
    'dark-outline': `
      border border-white/20 text-white bg-transparent
      hover:border-white/50 hover:bg-white/5
      active:scale-[0.98]
      focus-visible:ring-white
    `,
    ghost: `
      text-primary bg-transparent
      hover:text-accent
      active:scale-[0.98]
      focus-visible:ring-primary
    `,
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-[14px]',
    md: 'px-7 py-3.5 text-[16px]',
    lg: 'px-9 py-4 text-[18px]',
  };

  const arrow = (
    <svg
      className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow}
    </>
  );

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.replace(/\s+/g, ' ').trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};

export default Button;
