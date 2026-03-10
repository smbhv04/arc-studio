import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const Container: React.FC<ContainerProps> = ({ children, className = '', as: Tag = 'div' }) => {
  const Component = Tag as any;
  return (
    <Component className={`max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 ${className}`}>
      {children}
    </Component>
  );
};

export default Container;
