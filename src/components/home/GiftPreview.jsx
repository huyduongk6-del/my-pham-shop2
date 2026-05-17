import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Heart, Sparkles, ArrowRight } from 'lucide-react';

const GiftPreview = () => {
  const navigate = useNavigate();

  const occasions = [
    {
      icon: <Gift size={20} className="text-neutral-700" />,
      title: "생일 선물",
      text: "특별한 하루를 위한 향수와 립 세트"
    },
    {
      icon: <Heart size={20} className="text-neutral-700" />,
      title: "연인 선물",
      text: "로맨틱한 무드를 담은 프리미엄 기프트"
    },
    {
      icon: <Sparkles size={20} className="text-neutral-700" />,
      title: "감사 선물",
      text: "고급스럽고 부담 없는 뷰티 선물"
    }
  ];

  return (
    <section className="bg-[#FAF7F2] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="space-y-6 text-center lg:text-left">
              <span className="text-[10px] md:text-[11px] font-black tracking-[0.3em] text-[#B9916A] uppercase mb-4 block">
                CHANEL GIFT MOMENT
              </span>
              <h2 className="text-3xl md:text-[42px] font-black text-[#111111] leading-[1.15] tracking-tight">
                소중한 분을 위한<br />완벽한 샤넬 기프트
              </h2>
              <div className="w-12 h-[1.5px] bg-[#111111] my-6 mx-auto lg:mx-0 rounded-full opacity-80"></div>
              <p className="text-[#777777] text-[13px] md:text-[15px] font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                특별한 날을 더욱 빛나게 해줄 샤넬의 프리미엄 기프트 세트를 만나보세요. 
                전문가의 손길이 닿은 고급스러운 선물 포장 서비스가 함께 제공됩니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-12 mt-10 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/gift-set')}
                className="px-8 py-4 bg-dark text-white text-sm font-bold rounded-full hover:bg-neutral-800 transition-all transform hover:-translate-y-1"
              >
                기프트 세트 보기
              </button>
              <button 
                onClick={() => navigate('/gift-set')}
                className="px-8 py-4 bg-transparent border border-dark text-dark text-sm font-bold rounded-full hover:bg-dark hover:text-white transition-all transform hover:-translate-y-1"
              >
                선물 추천 받기
              </button>
            </div>

            {/* Occasion Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {occasions.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => navigate('/gift-set')}
                  className="bg-white/50 border border-neutral-100 p-5 rounded-[24px] cursor-pointer group hover:bg-white hover:shadow-sm transition-all"
                >
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold text-dark mb-1">{item.title}</h3>
                  <p className="text-[11px] text-neutral-500 leading-tight">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative group">
            <div className="aspect-[16/9] lg:aspect-[4/5] rounded-[32px] overflow-hidden bg-neutral-100">
              <img 
                src="/images/home/gift-preview.png" 
                alt="CHANEL GIFT MOMENT" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/800x1000/FAF7F2/111111?text=CHANEL+GIFT+MOMENT";
                }}
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E8C7C2]/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-dark/5 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GiftPreview;
