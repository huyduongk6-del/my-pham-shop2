import React from 'react';
import { ArrowRight } from 'lucide-react';

const CategoryHero = ({ 
  title, 
  subtitle, 
  description, 
  image, 
  buttonText = "자세히 보기", 
  onButtonClick,
  bgColor = "bg-[#FAF7F2]"
}) => {
  
  const handleScrollToContent = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      // Default smooth scroll to next content block
      window.scrollTo({ top: window.innerHeight * 0.7, behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative overflow-hidden ${bgColor} border-b border-neutral-100/50 select-none`}>
      {/* Premium Soft Radial Decorative Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/60 filter blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#E8DCC9]/30 filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Elegant Typography */}
          <div className="flex flex-col items-start text-left relative z-10 max-w-xl mx-auto lg:mx-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[1px] w-6 bg-[#C49A6C]"></span>
              <span className="text-[10px] md:text-xs font-bold text-[#C49A6C] tracking-[0.2em] uppercase">
                CHANEL BEAUTY
              </span>
            </div>

            <h1 className="text-3xl md:text-[42px] lg:text-[52px] font-black text-dark leading-tight tracking-wider mb-4">
              {title}
            </h1>

            {subtitle && (
              <p className="text-sm md:text-base font-bold text-[#C49A6C] tracking-wide mb-3">
                {subtitle}
              </p>
            )}

            {description && (
              <p className="text-[11px] md:text-[13px] text-neutral-500 font-medium leading-relaxed tracking-wide max-w-md mb-8">
                {description}
              </p>
            )}

            <button
              onClick={handleScrollToContent}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-dark text-white rounded-md text-[10px] font-black tracking-[0.2em] hover:bg-neutral-800 active:scale-95 transition-all shadow-md"
            >
              <span>{buttonText}</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Column: Immersive Premium Imagery */}
          <div className="relative flex items-center justify-center z-0 h-64 md:h-80 lg:h-auto lg:aspect-[4/3]">
            {/* Decorative Frame behind Image */}
            <div className="absolute inset-4 md:inset-8 border border-[#E8DCC9] rounded-2xl transform translate-x-2 translate-y-2 opacity-60"></div>
            
            <div className="w-full h-full bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] flex items-center justify-center relative group">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                onError={(e) => {
                  e.target.onerror = null;
                  // Graceful Premium ivory fallback layout with logo
                  e.target.parentNode.innerHTML = `
                    <div class="absolute inset-0 bg-gradient-to-tr from-[#FDFCFB] to-[#E2D1C3]/30 flex flex-col items-center justify-center p-8 text-center">
                      <span class="text-[11px] tracking-[0.25em] font-black text-[#C49A6C]/50 mb-4 uppercase">CHANEL</span>
                      <div class="w-16 h-16 rounded-full border-2 border-[#C49A6C]/20 flex items-center justify-center opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C49A6C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      </div>
                      <p class="text-[9px] font-bold text-neutral-300 tracking-widest uppercase mt-4">K-Style Luxury Collection</p>
                    </div>
                  `;
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
