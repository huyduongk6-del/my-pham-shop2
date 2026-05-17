import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import { categories } from '../../data/mockup';

const Categories = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
      <SectionTitle 
        label="CHANEL CATEGORY"
        title="샤넬 카테고리" 
        subtitle="원하는 샤넬 뷰티 카테고리를 선택하여 더 많은 제품을 만나보세요" 
      />

      {/* Navigation Arrows */}
      <button 
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-4 lg:left-0 top-[60%] -translate-y-1/2 w-10 h-10 bg-white rounded-full items-center justify-center shadow-md border border-neutral-100 text-neutral-400 hover:text-[#C49A6C] hover:shadow-lg transition-all z-20"
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>

      <button 
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-4 lg:right-0 top-[60%] -translate-y-1/2 w-10 h-10 bg-white rounded-full items-center justify-center shadow-md border border-neutral-100 text-neutral-400 hover:text-[#C49A6C] hover:shadow-lg transition-all z-20"
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>

      {/* Categories Flex/Grid wrapper - Smooth snap-scroll with elegant light cards */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-8 pt-4 no-scrollbar snap-x px-1 md:px-8 lg:px-12 scroll-smooth"
      >
        {categories.map((cat, idx) => (
          <div 
            key={cat.id || idx} 
            className="group cursor-pointer flex-shrink-0 w-40 sm:w-44 md:w-52 snap-start flex flex-col items-center"
          >
            {/* Elegant Light Card Box */}
            <div className="w-full aspect-square rounded-[24px] bg-[#FAF7F2] flex items-center justify-center p-6 border border-neutral-100/50 transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] group-hover:border-[#D8BFA3]/40 relative overflow-hidden">
              
              {/* Soft Highlight on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Product Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-[1500ms] group-hover:scale-110 ease-out z-10 mix-blend-multiply"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23AAAAAA' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E";
                  e.target.className = "w-12 h-12 opacity-30 object-contain mix-blend-normal";
                }}
              />
            </div>

            {/* Category Label Below */}
            <div className="mt-5 flex flex-col items-center text-center transform transition-transform duration-500 group-hover:-translate-y-1">
              <span className="text-[9px] font-black tracking-[0.25em] text-[#D8BFA3] uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                DISCOVER
              </span>
              <span className="text-[11px] md:text-xs font-black tracking-widest text-[#111111] uppercase leading-tight group-hover:text-[#C49A6C] transition-colors duration-300">
                {cat.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
