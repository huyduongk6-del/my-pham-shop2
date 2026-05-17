import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../common/Button';
import { heroSlides } from '../../data/mockup';

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const slideCount = heroSlides.length;

  // Hàm chuyển slide kế tiếp
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600);
  }, [slideCount, isAnimating]);

  // Hàm chuyển slide trước đó
  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  }, [slideCount, isAnimating]);

  // Bấm vào chấm tròn pagination
  const goToSlide = (index) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Tự động chuyển slide (Autoplay) mỗi 5 giây
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeSlide = heroSlides[current];

  return (
    <section className="relative w-full bg-[#FAF7F2] overflow-hidden min-h-[500px] md:h-[580px] lg:h-[640px] flex items-center">
      
      {/* Background subtle light overlays - Minimalist Korean style */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/30 to-transparent opacity-70"></div>
      </div>

      {/* Container Layout Slide */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-12 xl:px-8 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12 py-12 md:py-0 z-10 relative">
        
        {/* LEFT COLUMN: TYPOGRAPHY (Clean sans-serif style) */}
        <div 
          key={`text-${current}`} 
          className="flex flex-col items-center text-center md:items-start md:text-left space-y-5 md:space-y-7 transition-all duration-700"
        >
          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[#B9916A] block select-none animate-fade-in">
            {activeSlide.subtitle}
          </span>
          <h2 className="text-3xl md:text-[42px] lg:text-[52px] xl:text-[58px] font-black tracking-tight text-[#111111] leading-[1.1] min-h-[80px] md:min-h-[auto] animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
            {activeSlide.title}
          </h2>
          <p className="text-[12px] md:text-[14px] text-[#777777] max-w-md font-medium tracking-wide leading-relaxed animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            {activeSlide.description}
          </p>
          <div className="pt-4 animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
            <button 
              className="inline-flex items-center space-x-3 bg-[#111111] text-white hover:bg-neutral-800 tracking-[0.2em] text-[11px] font-black uppercase py-4.5 px-10 rounded-full shadow-lg shadow-black/5 transform active:scale-95 transition-all duration-300 group"
            >
              <span>{activeSlide.buttonText}</span>
              <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: PRODUCT HERO IMAGE */}
        <div 
          key={`image-${current}`} 
          className="relative w-full h-[300px] md:h-[480px] lg:h-[580px] flex items-center justify-center animate-fade-in transition-all duration-700"
        >
          <div 
            className="relative w-full h-full flex items-center justify-center group"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-[2000ms]"></div>
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="w-[85%] h-[85%] object-contain transform hover:scale-[1.03] transition-transform duration-[1500ms] ease-out drop-shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
              loading="eager"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23AAAAAA' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E";
                e.target.className = "w-16 h-16 opacity-30 object-contain mix-blend-normal animate-pulse";
              }}
            />
          </div>
        </div>

      </div>

      {/* Minimalist Arrow Navigations */}
      <button 
        onClick={prevSlide}
        disabled={isAnimating}
        aria-label="Prev Slide"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-dark hover:text-[#C49A6C] active:scale-90 transition-all z-20 cursor-pointer disabled:opacity-50 border border-neutral-100"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>

      <button 
        onClick={nextSlide}
        disabled={isAnimating}
        aria-label="Next Slide"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-dark hover:text-[#C49A6C] active:scale-90 transition-all z-20 cursor-pointer disabled:opacity-50 border border-neutral-100"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>

      {/* Modern Progress Bar Pagination */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-dark tracking-widest">
            0{current + 1}
          </span>
          <div className="flex items-center space-x-1.5 bg-white/50 backdrop-blur-[4px] px-2 py-1.5 rounded-full border border-neutral-200/30">
            {heroSlides.map((_, idx) => {
              const isActive = current === idx;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 cursor-pointer bg-neutral-300/80"
                  style={{ width: isActive ? '32px' : '8px' }}
                >
                  {isActive && (
                    <div 
                      className="absolute top-0 left-0 h-full bg-dark w-full"
                      style={{ 
                        animation: 'progress 5s linear forwards',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <span className="text-[10px] font-bold text-neutral-400 tracking-widest">
            0{slideCount}
          </span>
        </div>
      </div>
      
      <style>{`
        @keyframes progress {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>

    </section>
  );
};

export default HeroBanner;
