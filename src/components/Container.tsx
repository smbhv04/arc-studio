import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const Container: React.FC<ContainerProps> = ({ children, className = '', as: Tag = 'div' }) => {
  return (
    <Tag className={`max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 ${className}`}>
      {children}
    </Tag>
  );
};

export default Container;
