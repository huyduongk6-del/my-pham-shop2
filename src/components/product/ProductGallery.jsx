import React, { useState, useEffect } from 'react';

/**
 * ProductGallery Component
 * Features: 
 * - Main Image with Hover Zoom
 * - Thumbnail Gallery
 * - Responsive Design (Desktop & Mobile)
 * - Fallback for missing images
 * - Premium Korean Aesthetic
 */
const ProductGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState('');
  
  // Get gallery images or fallback to the main image
  const galleryImages = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  // Reset selected image when product changes
  useEffect(() => {
    if (galleryImages.length > 0) {
      setSelectedImage(galleryImages[0]);
    }
  }, [product.id]);

  // Fallback image handler
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23CCCCCC' stroke-width='1'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-size='3' fill='%23999999' font-family='sans-serif'%3ECHANEL%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' font-size='2' fill='%23BBBBBB' font-family='sans-serif'%3E이미지 준비중%3C/text%3E%3C/svg%3E";
  };

  return (
    <div className="flex flex-col space-y-4 md:space-y-6">
      {/* 1. Main Image Container */}
      <div className="relative w-full aspect-square md:h-[520px] md:aspect-auto rounded-[28px] bg-[#FAF7F2] border border-neutral-100 overflow-hidden group cursor-zoom-in">
        <img 
          src={selectedImage || product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-8 md:p-12 transition-transform duration-500 ease-out group-hover:scale-105"
          onError={handleImageError}
        />
        
        {/* Optional Brand Overlay for empty/fallback state */}
        {!selectedImage && !product.image && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-300">
            <span className="text-sm font-black tracking-widest uppercase mb-1">CHANEL</span>
            <span className="text-[10px] font-medium">이미지 준비중</span>
          </div>
        )}
      </div>

      {/* 2. Thumbnails List */}
      {galleryImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:justify-start">
          {galleryImages.map((img, index) => {
            const isActive = selectedImage === img;
            return (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-[14px] bg-[#FAF7F2] border-2 transition-all duration-300 overflow-hidden ${
                  isActive 
                    ? 'border-[#111111] shadow-sm scale-95' 
                    : 'border-[#EEEEEE] hover:border-neutral-300'
                }`}
              >
                <img 
                  src={img} 
                  alt={`${product.name} thumbnail ${index + 1}`} 
                  className="w-full h-full object-contain p-2"
                  onError={handleImageError}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
