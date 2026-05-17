import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Package, Truck, ArrowRight } from 'lucide-react';

const BeautyLuxeStory = () => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const trustPoints = [
    {
      icon: <ShieldCheck size={20} strokeWidth={1.5} />,
      title: '정품 기준 안내',
      desc: '신뢰할 수 있는 상품 정보 제공'
    },
    {
      icon: <Package size={20} strokeWidth={1.5} />,
      title: '프리미엄 포장',
      desc: '선물용으로 어울리는 고급 패키지'
    },
    {
      icon: <Truck size={20} strokeWidth={1.5} />,
      title: '빠른 배송',
      desc: '주문 확인 후 안전한 배송 안내'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2]/50 overflow-hidden select-none border-t border-neutral-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Luxury Editorial Image */}
          <div className="lg:col-span-5 relative group order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-[28px] overflow-hidden border border-[#EEEEEE] bg-white shadow-sm transition-all duration-700">
              {!imageError ? (
                <img
                  src="/images/home/beauty-story.png"
                  alt="Beauty Luxe Story Editorial Presentation"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAF7F2] text-center p-10 relative">
                  {/* Artistic letterpress placeholder */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] lg:text-[5vw] font-black text-[#F0E8DC] leading-none uppercase tracking-tighter select-none font-serif opacity-60">
                    Beauty
                  </div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-px bg-[#D8BFA3] mb-6" />
                    <span className="text-[11px] tracking-[0.3em] text-[#C49A6C] font-black uppercase mb-2">BRAND STORY</span>
                    <h3 className="text-[18px] font-black font-serif text-[#111111] tracking-tight">BEAUTY LUXE STORY</h3>
                    <p className="text-[10px] font-bold text-neutral-400 mt-3">프리미엄 에디토리얼 서비스</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Floating mini deco circle */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-[#FAF7F2] border border-[#E6DED2] flex items-center justify-center shadow-sm z-20 hidden lg:flex select-none">
              <span className="text-[8px] font-black text-[#C49A6C] tracking-[0.2em] uppercase text-center leading-none">BEAUTY<br/>LUXE</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Copy Context */}
          <div className="lg:col-span-7 flex flex-col space-y-8 order-1 lg:order-2">
            
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mx-auto lg:mx-0">
                <span className="h-[1px] w-6 bg-[#C49A6C]" />
                <span className="text-[10px] md:text-[11px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">
                  BEAUTY LUXE STORY
                </span>
              </div>
              
              <h2 className="text-3xl md:text-[42px] font-black text-[#111111] leading-[1.15] tracking-tight font-serif lg:max-w-[90%]">
                샤넬 뷰티를 더 우아하게<br className="hidden md:block" /> 만나는 공간
              </h2>
              
              <div className="space-y-4 text-[13.5px] md:text-[14.5px] font-bold text-[#777777] leading-relaxed lg:max-w-[85%]">
                <p>
                  Beauty Luxe는 샤넬의 프리미엄 뷰티 아이템을 감각적인 큐레이션으로 소개합니다. 
                  향수, 메이크업, 스킨케어까지 매일의 루틴을 더 특별하게 만들어보세요.
                </p>
                <p className="text-[12px] md:text-[13px] font-medium text-neutral-400 tracking-wide leading-relaxed">
                  섬세한 무드, 정제된 컬러, 프리미엄 서비스를 통해 고객의 쇼핑 경험을 한층 더 우아하게 완성합니다.
                </p>
              </div>
            </div>

            {/* 3 Trust Points Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E6DED2]/40 max-w-[600px]">
              {trustPoints.map((point, index) => (
                <div key={index} className="flex sm:flex-col gap-3.5 sm:gap-2 items-center sm:items-start text-center sm:text-left bg-white/50 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-neutral-100 sm:border-none">
                  <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E6DED2] flex items-center justify-center text-[#C49A6C] shadow-inner flex-shrink-0">
                    {point.icon}
                  </div>
                  <div className="space-y-0.5 min-w-0 text-left sm:text-left flex-1 sm:flex-initial">
                    <h4 className="text-[12px] font-extrabold text-[#111111] tracking-wide truncate">
                      {point.title}
                    </h4>
                    <p className="text-[10.5px] font-medium text-neutral-400 leading-tight line-clamp-2">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Row CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-6">
              <button
                onClick={() => navigate('/about')}
                className="px-9 py-4 bg-[#111111] text-white text-[11px] font-black tracking-[0.2em] uppercase rounded-xl hover:bg-neutral-800 active:scale-[0.97] transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
              >
                스토리 보기
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <button
                onClick={() => navigate('/gift-set')}
                className="px-9 py-4 bg-transparent text-[#111111] border border-[#111111] text-[11px] font-black tracking-[0.2em] uppercase rounded-xl hover:bg-[#FAF7F2] active:scale-[0.97] transition-all flex items-center justify-center cursor-pointer"
              >
                기프트 세트 보기
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BeautyLuxeStory;
