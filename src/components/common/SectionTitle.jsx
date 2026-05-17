import React from 'react';

const SectionTitle = ({ label, title, subtitle, showLine = true, className = '', align = 'center' }) => {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  
  return (
    <div className={`flex flex-col ${alignClass} mb-10 md:mb-14 ${className} animate-fade-in`}>
      {label && (
        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-[#B9916A] uppercase mb-3 block">
          {label}
        </span>
      )}
      
      <h2 className="text-2xl md:text-4xl font-black text-[#111111] leading-tight tracking-tight">
        {title}
      </h2>
      
      {showLine && (
        <div className={`w-12 h-[1.5px] bg-[#111111] mt-5 mb-4 rounded-full opacity-80 ${align === 'center' ? 'mx-auto' : ''}`}></div>
      )}
      
      {subtitle && (
        <p className="text-[#777777] text-[12px] md:text-[14px] font-medium tracking-wide mt-1 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
