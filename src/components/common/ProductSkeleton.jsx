import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-neutral-100 p-4 h-[380px] w-full animate-pulse">
      {/* Image Area */}
      <div className="w-full h-48 bg-neutral-100 rounded-xl mb-4"></div>
      
      {/* Brand */}
      <div className="w-16 h-3 bg-neutral-100 rounded mb-3"></div>
      
      {/* Title */}
      <div className="w-3/4 h-4 bg-neutral-200 rounded mb-2"></div>
      <div className="w-1/2 h-4 bg-neutral-100 rounded mb-4"></div>
      
      {/* Price */}
      <div className="w-1/3 h-5 bg-neutral-200 rounded mb-4 mt-auto"></div>
      
      {/* Rating & Button */}
      <div className="flex flex-col gap-3 mt-auto">
        <div className="w-20 h-3 bg-neutral-100 rounded"></div>
        <div className="w-full h-10 bg-neutral-100 rounded-xl"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
