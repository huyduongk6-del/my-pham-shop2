import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

const ScrollRevealWrapper = ({ children, animation = 'fade-up', threshold = 0.15 }) => {
  const revealRef = useScrollReveal({ threshold });

  return (
    <div ref={revealRef} className={`reveal-wrapper reveal-${animation}`}>
      {children}
    </div>
  );
};

export default ScrollRevealWrapper;
