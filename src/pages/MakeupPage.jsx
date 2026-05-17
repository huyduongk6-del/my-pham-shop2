import { useState, useMemo, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { makeupProducts } from '../data/mockup';
import ProductCard from '../components/common/ProductCard';

const MakeupPage = () => {
  const [activeTab, setActiveTab] = useState('전체');
  const [heroImgError, setHeroImgError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Tab mapping helper
  const tabMapping = {
    '전체': 'All',
    '립': 'Lip',
    '파운데이션': 'Foundation',
    '마스카라': 'Mascara',
    '파우더': 'Powder',
    '아이': 'Eye',
    '하이라이터': 'Highlighter'
  };

  // Interactive Filtering logic
  const filteredProducts = useMemo(() => {
    const categoryKey = tabMapping[activeTab];
    if (categoryKey === 'All') return makeupProducts;
    
    return makeupProducts.filter(p => p.subCategory === categoryKey);
  }, [activeTab]);


  // Data 1: Looks
  const lookCards = [
    {
      id: "01",
      badge: "DAILY CLEAN LOOK",
      title: "데일리 클린 룩",
      desc: "자연스럽고 맑은 피부 표현과 은은한 립 컬러"
    },
    {
      id: "02",
      badge: "SOFT FEMININE LOOK",
      title: "소프트 페미닌 룩",
      desc: "부드러운 컬러감으로 완성하는 우아한 분위기"
    },
    {
      id: "03",
      badge: "CLASSIC LUXURY LOOK",
      title: "클래식 럭셔리 룩",
      desc: "선명한 립과 정돈된 베이스로 완성하는 시그니처 무드"
    },
    {
      id: "04",
      badge: "EVENING MOOD LOOK",
      title: "이브닝 무드 룩",
      desc: "특별한 날을 위한 깊고 고급스러운 메이크업"
    }
  ];

  // Data 2: Routine Steps
  const routineSteps = [
    {
      step: "STEP 01",
      title: "피부 표현",
      desc: "가볍고 자연스러운 파운데이션으로 피부결을 정돈합니다."
    },
    {
      step: "STEP 02",
      title: "립 컬러",
      desc: "룩의 분위기를 결정하는 시그니처 립 컬러를 선택합니다."
    },
    {
      step: "STEP 03",
      title: "아이 포인트",
      desc: "마스카라와 포인트 메이크업으로 또렷한 인상을 완성합니다."
    }
  ];

  // Data 3: Tips
  const tips = [
    {
      title: "얇게 레이어링하기",
      desc: "파운데이션은 한 번에 많이 바르기보다 얇게 여러 번 레이어링하면 자연스럽습니다."
    },
    {
      title: "립 컬러를 중심으로 선택하기",
      desc: "립 컬러에 맞춰 베이스와 아이 메이크업의 강도를 조절해보세요."
    },
    {
      title: "마무리 파우더는 가볍게",
      desc: "피부 표현을 해치지 않도록 필요한 부위에만 가볍게 사용하세요."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-dark font-sans">

      {/* ==================================================
          PHẦN 1: HERO TRANG MAKEUP
          ================================================== */}
      <section className="bg-[#FAF7F2] relative overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left side text content */}
            <div className="flex flex-col space-y-6 text-center lg:text-left z-10">
              <div className="flex items-center justify-center lg:justify-start gap-3 select-none">
                <span className="px-3 py-1 bg-dark text-white text-[9px] font-black tracking-[0.15em] uppercase rounded">
                  CHANEL MAKEUP
                </span>
                <span className="px-3 py-1 border border-dark/30 text-dark text-[9px] font-black tracking-[0.15em] uppercase rounded">
                  DAILY BEAUTY
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#C49A6C]">
                  우아한 무드를 완성하는 샤넬 메이크업
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-dark tracking-widest uppercase leading-[1.15]">
                  샤넬 메이크업
                </h1>
              </div>

              <p className="text-xs md:text-[13px] text-neutral-500 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                립, 파운데이션, 마스카라까지 샤넬 고유의 클래식한 메이크업 라인으로 매일의 분위기를 완성해보세요.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center lg:justify-start">
                <button 
                  onClick={() => document.getElementById('makeup-collection').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-dark text-white font-bold text-xs tracking-widest uppercase rounded hover:bg-neutral-800 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)] active:scale-95"
                >
                  메이크업 보기
                </button>
                <button 
                  onClick={() => document.getElementById('makeup-routine').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-dark bg-transparent text-dark font-bold text-xs tracking-widest uppercase rounded hover:bg-dark hover:text-white transition-all duration-300 active:scale-95"
                >
                  추천 루틴 보기
                </button>
              </div>
            </div>

            {/* Right side image content */}
            <div className="flex justify-center items-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-[#FAF7F2]">
                {!heroImgError ? (
                  <img 
                    src="/images/pages/makeup-hero.png" 
                    alt="Chanel Makeup Showcase Banner" 
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    onError={() => setHeroImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center border border-[#E2D6C5] border-dashed bg-[#FAF7F2] p-8 text-center">
                    <span className="text-[10px] tracking-[0.3em] text-[#C49A6C] uppercase font-black mb-3">EXCLUSIVE</span>
                    <h2 className="text-xl md:text-2xl font-black text-dark tracking-[0.2em] uppercase border-y border-dark/10 py-4 px-6">
                      CHANEL MAKEUP
                    </h2>
                    <span className="text-[9px] text-neutral-400 tracking-wider font-bold mt-4 uppercase">PREMIUM BEAUTY COLLECT</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          PHẦN 2: THÊM SECTION MAKEUP LOOKS
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">MAKEUP ESSENCE</span>
          <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-3 uppercase">
            무드별 메이크업 추천
          </h2>
          <p className="text-[11px] md:text-xs text-neutral-400 font-semibold tracking-wider mt-2 leading-relaxed">
            오늘의 분위기에 맞는 프리미엄 메이크업을 선택해보세요.
          </p>
          <div className="w-8 h-[2px] bg-[#C49A6C] mx-auto mt-5"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lookCards.map((card, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#eeeeee] p-8 rounded-2xl flex flex-col items-start justify-between h-full transition-all duration-300 hover:border-[#C49A6C] group select-none"
            >
              <div className="w-full">
                <div className="text-3xl font-black text-[#F5EFE6] group-hover:text-[#C49A6C]/20 transition-colors font-serif leading-none mb-4">
                  {card.id}
                </div>
                <span className="text-[9px] font-black tracking-widest text-[#C49A6C] block mb-2.5">
                  {card.badge}
                </span>
                <h4 className="text-[15px] font-black text-dark tracking-wide mb-3 group-hover:text-dark">
                  {card.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>
              
              <div className="mt-8 flex items-center text-[#C49A6C] font-black text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                <span>DISCOVER</span>
                <ArrowRight size={10} className="ml-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          PHẦN 3: MAKEUP ROUTINE 3 BƯỚC (Dark Mode)
          ================================================== */}
      <section id="makeup-routine" className="bg-[#111111] text-white py-20 md:py-28 overflow-hidden relative border-y border-neutral-900">
        {/* Subtle visual backdrop layout lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-[0.02] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 md:mb-20">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#C49A6C] uppercase">BEAUTY ROUTINE</span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-widest mt-3 uppercase">
              데일리 메이크업 루틴
            </h2>
            <p className="text-[11px] text-neutral-400 tracking-widest font-medium mt-2 uppercase">
              3단계로 완성하는 우아한 데일리 메이크업
            </p>
            <div className="w-8 h-[1px] bg-neutral-700 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {routineSteps.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative group">
                <div className="text-4xl md:text-5xl font-black tracking-[0.1em] text-[#C49A6C]/90 mb-4 uppercase border-b border-neutral-800 pb-2 w-full transition-colors group-hover:text-[#C49A6C]">
                  {item.step}
                </div>
                <h4 className="text-[16px] font-black text-white mt-3 tracking-wide">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-medium max-w-[220px] mt-3.5">
                  {item.desc}
                </p>
                
                {idx < 2 && (
                  <div className="hidden md:block absolute top-[25px] -right-8 lg:-right-12 text-neutral-700 font-black text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          PHẦN 5 + 6: FILTER TABS + PRODUCT GRID
          ================================================== */}
      <section id="makeup-collection" className="bg-[#FCFAF8] py-20 md:py-28 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Grid Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">THE COLLECTION</span>
            <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-3 uppercase">
              메이크업 컬렉션
            </h2>
            <p className="text-[11px] md:text-xs text-neutral-400 font-semibold tracking-wider mt-2 uppercase">
              립부터 베이스까지, 당신의 무드를 완성하는 아이템
            </p>
            <div className="w-8 h-[2px] bg-dark mx-auto mt-5"></div>
          </div>

          {/* Tabs Container */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center md:justify-center overflow-x-auto hide-scrollbar border-b border-neutral-200/50 select-none">
              <div className="flex space-x-1 sm:space-x-2 pb-[1px]">
                {Object.keys(tabMapping).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 sm:px-7 py-3.5 text-[11px] font-black tracking-widest uppercase transition-all border-b-2 outline-none whitespace-nowrap ${
                        isActive
                          ? 'border-dark text-dark font-black'
                          : 'border-transparent text-neutral-400 hover:text-dark hover:border-neutral-300 font-bold'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Result Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-2xl border border-neutral-100 max-w-md mx-auto select-none shadow-sm">
              <Sparkles size={24} className="mx-auto text-neutral-300 mb-4" />
              <p className="text-neutral-400 text-[11px] font-bold tracking-wide uppercase">
                선택하신 카테고리에 등록된 상품이 없습니다.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* ==================================================
          PHẦN 7: THÊM SECTION MAKEUP TIPS
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">PRO TIPS</span>
          <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-3 uppercase">
            메이크업 팁
          </h2>
          <p className="text-[11px] md:text-xs text-neutral-400 font-semibold tracking-wider mt-2 leading-relaxed uppercase">
            프리미엄 메이크업을 더 자연스럽고 오래 유지하는 방법
          </p>
          <div className="w-8 h-[2px] bg-[#C49A6C] mx-auto mt-5"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, idx) => (
            <div key={idx} className="bg-[#FAF7F2]/60 border border-neutral-100 rounded-2xl p-8 transition-all hover:bg-[#FAF7F2] group flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform">
                  <Sparkles size={16} className="text-[#C49A6C]" />
                </div>
                <h4 className="text-sm font-black text-dark tracking-wide mb-3">
                  {tip.title}
                </h4>
                <p className="text-[11px] md:text-xs text-neutral-500 leading-relaxed font-medium">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default MakeupPage;
