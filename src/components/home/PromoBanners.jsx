import React from 'react';
import { ChevronRight } from 'lucide-react';
import { promoBanners } from '../../data/mockup';

const PromoBanners = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promoBanners.map((banner) => (
          <div
            key={banner.id}
            className="relative overflow-hidden rounded-[24px] p-7 h-40 md:h-44 flex items-center group cursor-pointer bg-[#FAF7F2]/60 border border-neutral-100 transition-all duration-500 hover:border-[#D8BFA3]/40 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1"
          >
            
            {/* Text Content - Obsidian Black & Curated Fonts */}
            <div className="flex flex-col justify-center z-10 flex-1 space-y-1.5 pr-4">
              <span className="text-[9px] font-bold text-[#C49A6C] tracking-[0.2em] uppercase">
                {banner.title}
              </span>
              <h3 className="text-xs md:text-[13px] font-black text-dark tracking-wide uppercase leading-tight pr-2">
                {banner.headline}
              </h3>
              <div className="pt-2.5">
                <button className="inline-flex items-center space-x-1.5 text-[9px] font-bold text-white bg-dark hover:bg-neutral-800 px-3.5 py-1.5 rounded transition-all duration-300 shadow-sm uppercase tracking-widest">
                  <span>{banner.cta}</span>
                  <ChevronRight size={9} />
                </button>
              </div>
            </div>

            {/* Right Floating Image Area */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center z-10 overflow-hidden bg-white/40 rounded-xl p-1 border border-white/20">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-contain rounded transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23AAAAAA' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='8' width='18' height='14' rx='2' ry='2'/%3E%3C/svg%3E";
                  e.target.className = "w-10 h-10 opacity-30 object-contain mix-blend-normal";
                }}
              />
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoBanners;
