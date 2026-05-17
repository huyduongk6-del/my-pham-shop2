import { useState, useMemo, useEffect } from 'react';
import { Sparkles, Droplets, Shield, Leaf, ArrowRight } from 'lucide-react';
import { skincareProducts } from '../data/mockup';
import ProductCard from '../components/common/ProductCard';
import ProductSkeleton from '../components/common/ProductSkeleton';

const SkincarePage = () => {

  const [activeTab, setActiveTab] = useState('전체');
  const [activeConcern, setActiveConcern] = useState('전체');
  const [heroImgError, setHeroImgError] = useState(false);
  const [storyImgError, setStoryImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Category Tab mappings
  const tabMapping = {
    '전체': 'All',
    '세럼': 'Serum',
    '크림': 'Cream',
    '클렌저': 'Cleanser',
    '선스크린': 'Sunscreen'
  };

  // Skin Concern mappings
  const concernMapping = {
    '전체': 'All',
    '수분': 'Hydration',
    '생기': 'Glow',
    '탄력': 'Firming',
    '편안함': 'Comfort'
  };

  // Interactive Filtering (Dual Filter: Tab + Concern)
  const filteredProducts = useMemo(() => {
    const catKey = tabMapping[activeTab];
    const concernKey = concernMapping[activeConcern];

    return skincareProducts.filter(prod => {
      const matchCat = (catKey === 'All') || (prod.subCategory === catKey);
      const matchConcern = (concernKey === 'All') || (prod.concern === concernKey);
      return matchCat && matchConcern;
    });
  }, [activeTab, activeConcern]);


  const handleQuickConcernFilter = (concernLabel) => {
    setActiveConcern(concernLabel);
    document.getElementById('skincare-collection').scrollIntoView({ behavior: 'smooth' });
  };

  // Data 1: 4-Step Ritual
  const ritualSteps = [
    {
      step: "STEP 01",
      title: "클렌징",
      desc: "하루 동안 쌓인 노폐물을 부드럽게 정돈하는 첫 단계입니다."
    },
    {
      step: "STEP 02",
      title: "세럼",
      desc: "피부에 수분감과 생기를 더하는 집중 케어 단계입니다."
    },
    {
      step: "STEP 03",
      title: "크림",
      desc: "피부를 편안하게 감싸고 보습감을 오래 유지해줍니다."
    },
    {
      step: "STEP 04",
      title: "스페셜 케어",
      desc: "특별한 날을 위한 프리미엄 케어로 피부에 우아한 광채를 더합니다."
    }
  ];

  // Data 2: Skin Concern Directory
  const concerns = [
    {
      id: "수분",
      title: "수분 부족",
      desc: "건조하고 당김이 느껴지는 피부를 위한 촉촉한 케어",
      keyword: "HYDRATION",
      icon: <Droplets size={24} strokeWidth={1.5} className="text-[#C49A6C]" />
    },
    {
      id: "생기",
      title: "생기 부족",
      desc: "칙칙해 보이는 피부에 맑은 생기를 더하는 루틴",
      keyword: "GLOW",
      icon: <Sparkles size={24} strokeWidth={1.5} className="text-[#C49A6C]" />
    },
    {
      id: "탄력",
      title: "탄력 케어",
      desc: "피부 탄력과 밀도감을 위한 프리미엄 케어",
      keyword: "FIRMING",
      icon: <Shield size={24} strokeWidth={1.5} className="text-[#C49A6C]" />
    },
    {
      id: "편안함",
      title: "민감한 피부",
      desc: "부담 없이 편안하게 사용하는 부드러운 케어",
      keyword: "COMFORT",
      icon: <Leaf size={24} strokeWidth={1.5} className="text-[#C49A6C]" />
    }
  ];

  // Data 3: Tips
  const tips = [
    {
      title: "세럼은 가볍게 흡수시키기",
      desc: "손바닥으로 부드럽게 감싸듯 흡수시키면 피부에 편안하게 밀착됩니다."
    },
    {
      title: "크림은 마지막 단계에 사용하기",
      desc: "스킨케어 마지막 단계에서 크림을 사용해 보습감을 오래 유지해보세요."
    },
    {
      title: "아침에는 선케어를 더하기",
      desc: "아침 루틴에는 선스크린을 함께 사용해 피부를 보호하는 것이 좋습니다."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-dark font-sans">

      {/* ==================================================
          PHẦN 1: NÂNG CẤP HERO TRANG SKINCARE
          ================================================== */}
      <section className="bg-[#FAF7F2] relative overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left: Text Info */}
            <div className="flex flex-col space-y-6 text-center lg:text-left z-10">
              <div className="flex items-center justify-center lg:justify-start gap-3 select-none">
                <span className="px-3 py-1 bg-dark text-white text-[9px] font-black tracking-[0.15em] uppercase rounded">
                  CHANEL SKINCARE
                </span>
                <span className="px-3 py-1 border border-dark/30 text-dark text-[9px] font-black tracking-[0.15em] uppercase rounded">
                  DAILY RITUAL
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#C49A6C]">
                  매일의 피부를 위한 샤넬 스킨케어 루틴
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-dark tracking-widest uppercase leading-[1.15]">
                  샤넬 스킨케어
                </h1>
              </div>

              <p className="text-xs md:text-[13px] text-neutral-500 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                클렌저, 세럼, 크림까지 샤넬 하우스의 프리미엄 스킨케어로 피부에 편안한 균형과 우아한 생기를 더해보세요.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center lg:justify-start">
                <button 
                  onClick={() => document.getElementById('skincare-collection').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-dark text-white font-bold text-xs tracking-widest uppercase rounded hover:bg-neutral-800 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)] active:scale-95"
                >
                  스킨케어 보기
                </button>
                <button 
                  onClick={() => document.getElementById('skincare-ritual').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-dark bg-transparent text-dark font-bold text-xs tracking-widest uppercase rounded hover:bg-dark hover:text-white transition-all duration-300 active:scale-95"
                >
                  루틴 추천 보기
                </button>
              </div>
            </div>

            {/* Right: Banner Image */}
            <div className="flex justify-center items-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-[#FAF7F2]">
                {!heroImgError ? (
                  <img 
                    src="/images/pages/skincare-hero.png" 
                    alt="Chanel Skincare Premium Display" 
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    onError={() => setHeroImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center border border-[#E2D6C5] border-dashed bg-[#FAF7F2] p-8 text-center">
                    <span className="text-[10px] tracking-[0.3em] text-[#C49A6C] uppercase font-black mb-3">EXCLUSIVE</span>
                    <h2 className="text-xl md:text-2xl font-black text-dark tracking-[0.2em] uppercase border-y border-dark/10 py-4 px-6">
                      CHANEL SKINCARE
                    </h2>
                    <span className="text-[9px] text-neutral-400 tracking-wider font-bold mt-4 uppercase">THE LUXURY BALANCING</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          PHẦN 2: THÊM SECTION SKINCARE RITUAL (Dark Style)
          ================================================== */}
      <section id="skincare-ritual" className="bg-[#111111] text-white py-20 md:py-28 overflow-hidden relative border-y border-neutral-900">
        {/* Background grid dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-[0.02] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 md:mb-20">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#C49A6C] uppercase">BEAUTY RITUAL</span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-widest mt-3 uppercase">
              데일리 스킨케어 리추얼
            </h2>
            <p className="text-[11px] text-neutral-400 tracking-widest font-medium mt-2 uppercase">
              피부 컨디션을 위한 4단계 데일리 루틴
            </p>
            <div className="w-8 h-[1px] bg-neutral-700 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {ritualSteps.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group relative">
                <div className="text-3xl md:text-4xl font-black tracking-[0.1em] text-[#C49A6C]/90 mb-4 uppercase border-b border-neutral-800 pb-3 w-full transition-colors group-hover:text-[#C49A6C]">
                  {item.step}
                </div>
                <h4 className="text-[15px] font-black text-white mt-2 tracking-wide">
                  {item.title}
                </h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-medium max-w-[200px] mt-3.5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          PHẦN 3: THÊM SECTION SKIN CONCERN / NHU CẦU DA
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">SKIN CONCERN</span>
          <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-3 uppercase">
            피부 고민별 추천
          </h2>
          <p className="text-[11px] md:text-xs text-neutral-400 font-semibold tracking-wider mt-2 leading-relaxed">
            피부 상태에 맞는 프리미엄 스킨케어를 선택해보세요.
          </p>
          <div className="w-8 h-[2px] bg-[#C49A6C] mx-auto mt-5"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {concerns.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => handleQuickConcernFilter(item.id)}
              className="bg-white border border-[#eeeeee] p-8 rounded-2xl flex flex-col items-start h-full transition-all duration-300 hover:border-[#C49A6C] cursor-pointer group"
            >
              <div className="w-12 h-12 bg-[#FAF7F2] rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform border border-neutral-50">
                {item.icon}
              </div>
              <span className="text-[8.5px] font-black tracking-widest text-[#C49A6C] block mb-2 uppercase">
                {item.keyword}
              </span>
              <h4 className="text-[15px] font-black text-dark tracking-wide mb-3">
                {item.title}
              </h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-medium mb-6 flex-grow">
                {item.desc}
              </p>
              <div className="flex items-center text-dark font-bold text-[9.5px] tracking-widest uppercase mt-auto">
                <span>제품 추천</span>
                <ArrowRight size={10} className="ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          PHẦN 5 + 6: FILTER TABS + PRODUCT GRID
          ================================================== */}
      <section id="skincare-collection" className="bg-[#FCFAF8] py-20 md:py-28 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Grid Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">SKINCARE SELECTION</span>
            <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-3 uppercase">
              스킨케어 컬렉션
            </h2>
            <p className="text-[11px] md:text-xs text-neutral-400 font-semibold tracking-wider mt-2 uppercase">
              세럼, 크림, 클렌저로 완성하는 프리미엄 루틴
            </p>
            <div className="w-8 h-[2px] bg-dark mx-auto mt-5"></div>
          </div>

          {/* Dual filter section */}
          <div className="max-w-4xl mx-auto mb-12 space-y-6 select-none">
            {/* Level 1: Category Tabs */}
            <div className="flex items-center justify-center overflow-x-auto hide-scrollbar border-b border-neutral-200/40 pb-[1px]">
              <div className="flex space-x-1 sm:space-x-2">
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

            {/* Level 2: Concern Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-[9.5px] text-neutral-400 font-black tracking-widest mr-2 uppercase">고민 타입:</span>
              {Object.keys(concernMapping).map((con) => {
                const isSel = activeConcern === con;
                return (
                  <button
                    key={con}
                    onClick={() => setActiveConcern(con)}
                    className={`px-4 py-1.5 rounded-full text-[10.5px] font-bold tracking-wider transition-all ${
                      isSel
                        ? 'bg-dark text-white shadow-sm'
                        : 'bg-white border border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-dark'
                    }`}
                  >
                    {con}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Render */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {isLoading 
                ? [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
                : filteredProducts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-2xl border border-neutral-100 max-w-md mx-auto select-none shadow-sm">
              <Sparkles size={24} className="mx-auto text-neutral-300 mb-4" />
              <p className="text-neutral-400 text-[11px] font-bold tracking-wide uppercase px-4">
                선택하신 필터에 등록된 스킨케어 상품이 없습니다.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* ==================================================
          PHẦN 7: THÊM SECTION SKINCARE TIPS
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">RITUAL TIPS</span>
          <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-3 uppercase">
            스킨케어 팁
          </h2>
          <p className="text-[11px] md:text-xs text-neutral-400 font-semibold tracking-wider mt-2 leading-relaxed uppercase">
            프리미엄 스킨케어를 더 효과적으로 사용하는 방법
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

      {/* ==================================================
          PHẦN 8: THÊM SECTION PREMIUM INGREDIENT STORY (Magazine Grid)
          ================================================== */}
      <section className="bg-[#FAF7F2] border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Left Column: Editorial Image */}
            <div className="aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden relative border border-neutral-200/30 shadow-sm bg-white">
              {!storyImgError ? (
                <img 
                  src="/images/pages/skincare-story.png" 
                  alt="Skincare premium ingredient storytelling layout" 
                  className="w-full h-full object-cover transition-all duration-[1500ms] hover:scale-105"
                  onError={() => setStoryImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center border border-[#E2D6C5] border-dashed bg-[#FAF7F2]/30">
                  <span className="text-[10px] tracking-[0.3em] text-[#C49A6C] font-black uppercase mb-3">ART OF LIFE</span>
                  <h3 className="text-lg font-serif font-black text-dark border-y border-dark/10 py-4 px-6">
                    THE CAMELLIA FORCE
                  </h3>
                </div>
              )}
            </div>

            {/* Right Column: Editorial Text */}
            <div className="flex flex-col space-y-6 lg:pl-6 text-center lg:text-left select-none">
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase block">
                  THE SOUL OF BEAUTY
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-2 uppercase">
                  스킨케어의 철학
                </h2>
              </div>

              <h3 className="text-[15px] font-black text-[#C49A6C] italic tracking-wide mt-2">
                "피부에 닿는 순간까지 우아하게"
              </h3>

              <p className="text-[11.5px] md:text-xs text-neutral-500 leading-relaxed font-medium max-w-lg mx-auto lg:mx-0">
                당신의 스킨케어 리추얼은 매일 반복되는 루틴을 하나의 휴식으로 만들어줍니다.
                깨끗한 제형감, 우아한 향, 고급스러운 패키지로 피부와 감성을 함께 케어하세요.
              </p>

              <div className="pt-4">
                <div className="inline-block border-b border-dark pb-1 text-[10.5px] font-black tracking-widest text-dark uppercase cursor-pointer hover:text-[#C49A6C] hover:border-[#C49A6C] transition-colors">
                  LEARN MORE ABOUT INGREDIENTS
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default SkincarePage;
