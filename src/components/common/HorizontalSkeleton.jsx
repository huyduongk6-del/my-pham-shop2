import React from 'react';

const HorizontalSkeleton = () => {
  return (
    <div className="flex bg-white rounded-2xl border border-neutral-100 p-3 h-[120px] w-full animate-pulse gap-4 items-center">
      {/* Image Area */}
      <div className="w-24 h-24 bg-neutral-100 rounded-xl flex-shrink-0"></div>
      
      {/* Content Area */}
      <div className="flex flex-col flex-grow">
        <div className="w-12 h-2.5 bg-neutral-100 rounded mb-2"></div>
        <div className="w-2/3 h-3.5 bg-neutral-200 rounded mb-3"></div>
        <div className="w-1/3 h-4 bg-neutral-200 rounded"></div>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="w-16 h-2.5 bg-neutral-100 rounded"></div>
          <div className="w-8 h-8 bg-neutral-100 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalSkeleton;
