import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Sparkles, ArrowRight, Flame } from 'lucide-react';
import { allProducts } from '../data/mockup';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/common/ProductCard';
import ProductSkeleton from '../components/common/ProductSkeleton';

const PerfumePage = () => {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();
  
  const [activeTab, setActiveTab] = useState('전체');
  const [heroImgError, setHeroImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Filter strictly for Perfume items
  const perfumeProducts = useMemo(() => {
    return allProducts.filter(p => p.category === '향수' || p.subCategory === 'Fragrance');
  }, []);

  // Distinct brands available in perfumes for filters
  const tabMapping = useMemo(() => {
    const base = { '전체': 'All' };
    const existingBrands = Array.from(new Set(perfumeProducts.map(p => p.brand)));
    
    existingBrands.forEach(br => {
      base[br] = br;
    });
    return base;
  }, [perfumeProducts]);

  const filteredProducts = useMemo(() => {
    const val = tabMapping[activeTab];
    if (val === 'All') return perfumeProducts;
    return perfumeProducts.filter(p => p.brand === val);
  }, [activeTab, perfumeProducts, tabMapping]);

  const routineSteps = [
    {
      step: "STEP 01",
      title: "맥박 점 분사",
      desc: "체온이 높고 혈관이 가까운 손목 안쪽, 귀 뒷부분에 가볍게 터치합니다."
    },
    {
      step: "STEP 02",
      title: "문지르지 않기",
      desc: "분사 후 마찰을 주면 향의 입자가 깨지므로 가볍게 톡톡 두드리거나 자연 건조합니다."
    },
    {
      step: "STEP 03",
      title: "의류 레이어링",
      desc: "자켓 안쪽 면이나 스카프 끝자락에 가볍게 안개 분사하여 은은한 지속력을 더합니다."
    }
  ];

  const tips = [
    {
      title: "바디 로션과 매치하기",
      desc: "향을 바르기 전 무향이나 같은 라인의 바디 로션을 덧바르면 수분막이 향을 잡아 지속력이 2배 증가합니다."
    },
    {
      title: "헤어 브러시 활용법",
      desc: "머리카락에 직접 뿌리기보다 브러시에 소량 묻혀 머릿결을 빗어주면 찰랑일 때마다 향긋한 아우라가 풍깁니다."
    },
    {
      title: "상향식 분사 기술",
      desc: "향은 아래에서 위로 올라가는 성질이 있습니다. 발목이나 무릎 안쪽 레이어링으로 부담 없는 은은함을 연출해 보세요."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-dark font-sans">
      {/* HERO SECTION */}
      <section className="bg-[#FAF7F2] relative overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="flex flex-col space-y-6 text-center lg:text-left z-10">
              <div className="flex items-center justify-center lg:justify-start gap-3 select-none">
                <span className="px-3 py-1 bg-dark text-white text-[9px] font-black tracking-[0.15em] uppercase rounded">
                  CHANEL FRAGRANCE
                </span>
                <span className="px-3 py-1 border border-dark/30 text-dark text-[9px] font-black tracking-[0.15em] uppercase rounded flex items-center gap-1">
                  <Flame size={9} /> BEST ESSENCE
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#C49A6C]">
                  눈에 보이지 않는 완벽한 액세서리
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-dark tracking-widest uppercase leading-[1.15]">
                  샤넬 시그니처 향수
                </h1>
              </div>

              <p className="text-xs md:text-[13px] text-neutral-500 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                샤넬 N°5, 코코 마드모아젤, 샹스, 블루 드 샤넬 등 시대를 정의하는 샤넬 하우스의 전설적인 아이코닉 향수 셀렉션.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center lg:justify-start">
                <button 
                  onClick={() => document.getElementById('perfume-grid').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-dark text-white font-bold text-[11px] tracking-widest uppercase rounded hover:bg-neutral-800 transition-all duration-300 shadow-md active:scale-95"
                >
                  컬렉션 탐색
                </button>
                <button 
                  onClick={() => document.getElementById('fragrance-routine').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-dark bg-transparent text-dark font-bold text-[11px] tracking-widest uppercase rounded hover:bg-dark hover:text-white transition-all duration-300 active:scale-95"
                >
                  향수 연출법
                </button>
              </div>
            </div>

            {/* Image Frame */}
            <div className="flex justify-center items-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-[#FAF7F2] border border-neutral-200/30 shadow-sm">
                {!heroImgError ? (
                  <img 
                    src="/images/hero/hero-2.png" 
                    alt="Luxury Perfume Background" 
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    onError={() => setHeroImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#FAF7F2] p-8 text-center">
                    <span className="text-[10px] tracking-[0.3em] text-[#C49A6C] uppercase font-black mb-3">PREMIUM</span>
                    <h2 className="text-xl md:text-2xl font-black text-dark tracking-[0.2em] uppercase border-y border-dark/10 py-4 px-6">
                      FRAGRANCE
                    </h2>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN FILTER & GRID SECTION */}
      <section id="perfume-grid" className="bg-[#FCFAF8] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase block mb-2">THE SELECTION</span>
            <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest uppercase">향수 컬렉션</h2>
            <div className="w-8 h-[2px] bg-dark mx-auto mt-4"></div>
          </div>

          {/* Tabs */}
          {Object.keys(tabMapping).length > 2 && (
            <div className="mb-12 overflow-x-auto hide-scrollbar">
              <div className="flex justify-center space-x-1 border-b border-neutral-200/60 pb-[1px]">
                {Object.keys(tabMapping).map((tab) => {
                  const isCurrent = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 md:px-7 py-4 text-[10px] md:text-[11px] font-black tracking-widest uppercase transition-all border-b-2 outline-none whitespace-nowrap ${
                        isCurrent
                          ? 'border-dark text-dark'
                          : 'border-transparent text-neutral-400 hover:text-dark hover:border-neutral-300'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {isLoading 
                ? [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
                : filteredProducts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-2xl border border-neutral-100 max-w-md mx-auto select-none flex flex-col items-center">
              <p className="text-neutral-400 text-[11px] font-bold tracking-widest">등록된 향수가 존재하지 않습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* FRAGRANCE RITUAL */}
      <section id="fragrance-routine" className="bg-[#111111] text-white py-20 md:py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-[0.02] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 md:mb-16">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#C49A6C] uppercase block mb-2">FRAGRANCE RITUAL</span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-widest uppercase">향을 입는 우아한 기술</h2>
            <div className="w-8 h-[1px] bg-neutral-700 mx-auto mt-5"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {routineSteps.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative group">
                <div className="text-3xl md:text-4xl font-black tracking-[0.1em] text-[#C49A6C]/80 mb-3 uppercase border-b border-neutral-800 pb-2 w-full group-hover:text-[#C49A6C] transition-colors">
                  {item.step}
                </div>
                <h4 className="text-[15px] font-black text-white mt-2 tracking-wide">{item.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-medium max-w-[240px] mt-3">{item.desc}</p>
                {idx < 2 && <div className="hidden md:block absolute top-[20px] -right-8 text-neutral-700 font-black text-lg">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIPS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase block mb-2">PRO ADVICE</span>
          <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest uppercase">지속력을 높이는 비결</h2>
          <div className="w-8 h-[2px] bg-[#C49A6C] mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, idx) => (
            <div key={idx} className="bg-[#FAF7F2]/70 border border-[#eeeeee] rounded-2xl p-8 hover:bg-[#FAF7F2] transition-all flex flex-col">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-5 shadow-sm">
                <Sparkles size={16} className="text-[#C49A6C]" />
              </div>
              <h4 className="text-sm font-black text-dark tracking-wide mb-3">{tip.title}</h4>
              <p className="text-[11px] md:text-xs text-neutral-500 leading-relaxed font-medium">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PerfumePage;
