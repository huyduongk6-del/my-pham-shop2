import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { saleProducts } from '../../data/mockup';
import useScrollReveal from '../../hooks/useScrollReveal';

const FlashDeal = () => {
  const navigate = useNavigate();
  const revealRef = useScrollReveal();
  
  // Countdown Timer Logic (e.g., 24 hours from now)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  // Select 2 items for flash deal preview
  const featuredDeals = saleProducts.slice(0, 2);

  return (
    <section 
      ref={revealRef}
      className="reveal-wrapper reveal-fade-up py-16 md:py-24 bg-[#111111] text-white relative overflow-hidden"
    >
      {/* Background Decors */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#C49A6C]/10 to-transparent pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#C49A6C]/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text & Timer */}
          <div className="lg:col-span-5 flex flex-col space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 select-none delay-100">
              <Sparkles size={14} className="text-[#C49A6C]" />
              <span className="text-[10px] md:text-[11px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">
                LIMITED TIME OFFER
              </span>
            </div>
            
            <h2 className="text-3xl md:text-[42px] font-black text-white leading-[1.15] tracking-tight delay-200">
              타임 세일<br />스페셜 혜택
            </h2>
            
            <p className="text-[13px] md:text-[14px] font-medium text-neutral-400 tracking-wide leading-relaxed lg:max-w-[85%] delay-300">
              한정된 시간 동안만 제공되는 특별한 가격으로 샤넬 프리미엄 뷰티 아이템을 만나보세요.
            </p>

            {/* Countdown Box */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 delay-400">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-3 min-w-[70px] backdrop-blur-sm">
                  <span className="text-2xl font-black text-[#C49A6C] font-mono leading-none">{formatNumber(timeLeft.hours)}</span>
                  <span className="text-[9px] text-neutral-400 font-bold uppercase mt-1 tracking-widest">Hours</span>
                </div>
                <span className="text-xl font-black text-white/50 mb-4">:</span>
                <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-3 min-w-[70px] backdrop-blur-sm">
                  <span className="text-2xl font-black text-[#C49A6C] font-mono leading-none">{formatNumber(timeLeft.minutes)}</span>
                  <span className="text-[9px] text-neutral-400 font-bold uppercase mt-1 tracking-widest">Mins</span>
                </div>
                <span className="text-xl font-black text-white/50 mb-4">:</span>
                <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-3 min-w-[70px] backdrop-blur-sm">
                  <span className="text-2xl font-black text-[#C49A6C] font-mono leading-none">{formatNumber(timeLeft.seconds)}</span>
                  <span className="text-[9px] text-neutral-400 font-bold uppercase mt-1 tracking-widest">Secs</span>
                </div>
              </div>
            </div>

            <div className="pt-6 delay-500">
              <button 
                onClick={() => navigate('/sale')}
                className="inline-flex items-center space-x-3 bg-[#C49A6C] text-[#111111] hover:bg-[#D8BFA3] tracking-[0.2em] text-[11px] font-black uppercase py-4 px-10 rounded-full shadow-[0_0_20px_rgba(196,154,108,0.3)] transform active:scale-95 transition-all duration-300 group"
              >
                <span>할인 상품 전체보기</span>
                <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Featured Products */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 delay-300">
              {featuredDeals.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white/5 border border-white/10 rounded-[24px] p-5 flex flex-col items-center cursor-pointer hover:bg-white/10 transition-all group"
                >
                  <div className="w-full relative aspect-square rounded-[16px] bg-white overflow-hidden flex items-center justify-center mb-5">
                    <span className="absolute top-3 left-3 bg-[#C49A6C] text-white text-[10px] font-black px-2 py-1 rounded tracking-widest z-10">
                      {product.discountPercent}% OFF
                    </span>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-[80%] h-[80%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-[13px] font-bold text-white text-center line-clamp-1 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-neutral-500 line-through">{product.price}</span>
                    <span className="text-[14px] font-black text-[#C49A6C]">{product.salePrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FlashDeal;
