import React, { useState } from 'react';
import { Package } from 'lucide-react';

const ProductImage = ({ 
  src, 
  alt, 
  variant = 'card', 
  className = '', 
  imageClassName = '',
  fallbackText = '이미지 준비중'
}) => {
  const [imageError, setImageError] = useState(false);

  // Variant-based container styles
  const variants = {
    card: 'h-[170px] sm:h-[220px] md:h-[260px] lg:h-[280px] w-full',
    horizontal: 'w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0',
    editorial: 'h-[260px] md:h-[320px] w-full',
    detail: 'h-[340px] md:h-[560px] w-full',
  };

  const containerStyle = `relative bg-[#FAF7F2] rounded-xl flex items-center justify-center p-4 overflow-hidden border border-neutral-50 transition-colors group-hover:bg-[#F3EFE9] ${variants[variant] || variants.card} ${className}`;

  if (imageError || !src) {
    return (
      <div className={containerStyle}>
        <div className="flex flex-col items-center text-center space-y-2 opacity-30">
          <Package size={24} strokeWidth={1} />
          <div className="text-[10px] font-black tracking-[0.2em] uppercase">CHANEL</div>
          <span className="text-[9px] font-bold">{fallbackText}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={containerStyle}>
      <img
        src={src}
        alt={alt}
        className={`max-w-[85%] max-h-[85%] object-contain transform transition-transform duration-700 ease-out group-hover:scale-110 ${imageClassName}`}
        loading="lazy"
        onError={() => setImageError(true)}
      />
    </div>
  );
};

export default ProductImage;
