import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Package, BadgePercent, RotateCcw, ArrowRight } from 'lucide-react';

const ShoppingBenefit = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <ShieldCheck size={28} className="text-[#D8BFA3]" />,
      title: "정품 기준 안내",
      description: "신뢰할 수 있는 상품 정보와 기준에 맞춘 샤넬 뷰티 셀렉션을 제공합니다."
    },
    {
      icon: <Package size={28} className="text-[#D8BFA3]" />,
      title: "프리미엄 선물 포장",
      description: "기프트에 어울리는 고급 포장 서비스로 특별한 순간을 완성합니다."
    },
    {
      icon: <BadgePercent size={28} className="text-[#D8BFA3]" />,
      title: "신규 회원 10% 혜택",
      description: "첫 구매 고객을 위한 멤버십 혜택과 프로모션 안내를 제공합니다."
    },
    {
      icon: <RotateCcw size={28} className="text-[#D8BFA3]" />,
      title: "7일 교환 안내",
      description: "상품 수령 후 조건에 따라 교환 및 반품 안내를 도와드립니다."
    }
  ];

  const handleOpenPopup = () => {
    window.dispatchEvent(new Event('openMemberBenefitPopup'));
  };

  return (
    <section className="bg-[#111111] py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.03] to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Standardized Header for Black Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] md:text-[11px] font-black tracking-[0.3em] text-[#D8BFA3] uppercase mb-4 block">
            SHOPPING BENEFIT
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Beauty Luxe 프리미엄 서비스
          </h2>
          <div className="w-12 h-[1.5px] bg-[#D8BFA3] mt-5 mb-4 rounded-full opacity-60 mx-auto"></div>
          <p className="text-[#AFAFAF] text-[13px] md:text-[15px] font-medium tracking-wide mt-1 max-w-2xl leading-relaxed">
            샤넬 뷰티 쇼핑을 더 안심하고 우아하게 경험할 수 있도록 준비했습니다.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              className="bg-[#181818] border border-white/10 p-8 rounded-[24px] hover:border-[#D8BFA3]/40 transition-all duration-300 group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-[#888888] text-sm leading-relaxed group-hover:text-[#AFAFAF] transition-colors">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Area */}
        <div className="flex flex-col items-center border-t border-white/5 pt-16">
          <p className="text-[#AFAFAF] text-sm mb-8">
            지금 회원 혜택과 프리미엄 서비스를 확인해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleOpenPopup}
              className="px-10 py-4 bg-[#D8BFA3] text-[#111111] text-sm font-black rounded-full hover:bg-[#E8C7C2] transition-all transform hover:-translate-y-1 shadow-lg shadow-black/20"
            >
              멤버십 혜택 보기
            </button>
            <button 
              onClick={() => navigate('/gift-set')}
              className="px-10 py-4 bg-transparent border border-white/20 text-white text-sm font-black rounded-full hover:bg-white/5 hover:border-white/40 transition-all transform hover:-translate-y-1 flex items-center gap-2"
            >
              기프트 세트 보기
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ShoppingBenefit;
