import React, { useState, useMemo, useEffect } from 'react';
import { Tag, Percent, Gift, Truck, UserPlus, Bell, ArrowRight, ChevronDown, AlertCircle } from 'lucide-react';
import { saleProducts } from '../data/mockup';
import ProductCard from '../components/common/ProductCard';

const SalePage = () => {
  const [activeTab, setActiveTab] = useState('전체');
  const [sortBy, setSortBy] = useState('추천순');
  const [heroImgError, setHeroImgError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  // Filtering and Sorting pipelines
  const finalDisplayProducts = useMemo(() => {
    let list = [...saleProducts];

    // Category Filter based on predefined mockup keys
    if (activeTab !== '전체') {
      const categoryMap = {
        '향수': 'Perfume',
        '메이크업': 'Makeup',
        '스킨케어': 'Skincare',
        '기프트': 'Gift'
      };
      list = list.filter(item => item.category === categoryMap[activeTab]);
    }

    // Sort Select implementation
    if (sortBy === '할인율 높은순') {
      list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    } else if (sortBy === '낮은 가격순') {
      list.sort((a, b) => {
        const valA = parseInt(a.price.replace(/[^0-9]/g, ''), 10);
        const valB = parseInt(b.price.replace(/[^0-9]/g, ''), 10);
        return valA - valB;
      });
    } else if (sortBy === '높은 가격순') {
      list.sort((a, b) => {
        const valA = parseInt(a.price.replace(/[^0-9]/g, ''), 10);
        const valB = parseInt(b.price.replace(/[^0-9]/g, ''), 10);
        return valB - valA;
      });
    }
    // '추천순' keeps original array indexing

    return list;
  }, [activeTab, sortBy]);

  // Core promos data
  const promoBanners = [
    {
      badge: "MEMBER ONLY",
      title: "회원 전용 15% 혜택",
      desc: "신규 및 기존 회원을 위한 특별한 프리미엄 뷰티 혜택을 확인하세요.",
      btn: "혜택 확인",
      icon: <Percent size={22} className="text-[#C49A6C]" />
    },
    {
      badge: "FREE WRAPPING",
      title: "프리미엄 선물 포장",
      desc: "기프트 세트 및 일부 상품 구매 시 고급 포장 서비스를 제공합니다.",
      btn: "포장 보기",
      icon: <Gift size={22} className="text-[#C49A6C]" />
    },
    {
      badge: "FREE DELIVERY",
      title: "무료 배송 혜택",
      desc: "일정 금액 이상 구매 시 무료 배송 혜택을 제공합니다.",
      btn: "배송 안내",
      icon: <Truck size={22} className="text-[#C49A6C]" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-dark font-sans">

      {/* ==================================================
          PHẦN 1: NÂNG CẤP HERO TRANG SALE
          ================================================== */}
      <section className="bg-[#FAF7F2] border-b border-neutral-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Text block */}
            <div className="flex flex-col text-center lg:text-left z-10">
              <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-5 select-none">
                <span className="bg-dark text-white text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded">
                  SPECIAL BENEFIT
                </span>
                <span className="border border-dark/20 text-dark text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded">
                  LIMITED OFFER
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-xs md:text-sm font-bold tracking-[0.25em] text-[#C49A6C] uppercase">
                  한정 기간 제공되는 샤넬 뷰티 프로모션
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-dark tracking-widest uppercase leading-tight">
                  샤넬 스페셜 혜택
                </h1>
              </div>

              <p className="text-xs md:text-[13px] text-neutral-500 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
                선별된 샤넬 향수, 메이크업, 스킨케어와 기프트 세트를 특별한 혜택으로 만나보세요.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => document.getElementById('sale-grid-section').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-dark text-white text-xs font-bold tracking-widest uppercase rounded hover:bg-neutral-800 transition-all duration-300 active:scale-95 shadow-sm"
                >
                  혜택 상품 보기
                </button>
                <button
                  onClick={() => document.getElementById('membership-section').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-dark bg-transparent text-dark text-xs font-bold tracking-widest uppercase rounded hover:bg-dark hover:text-white transition-all duration-300 active:scale-95"
                >
                  멤버십 혜택 보기
                </button>
              </div>
            </div>

            {/* Right Image block */}
            <div className="flex justify-center items-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-[#FAF7F2]">
                {!heroImgError ? (
                  <img 
                    src="/images/pages/sale-hero.png" 
                    alt="Chanel Premium Special Benefit Hero Showcase" 
                    className="w-full h-full object-cover transition-all duration-1000 hover:scale-105"
                    onError={() => setHeroImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center border border-[#E2D5C2] border-dashed p-8 bg-[#FAF7F2]">
                    <div className="p-4 bg-white rounded-full shadow-sm mb-4 border border-[#FAF5ED]">
                      <Tag size={28} className="text-[#C49A6C] animate-pulse" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-dark tracking-[0.25em] uppercase py-2 border-y border-dark/10 text-center">
                      CHANEL SPECIAL BENEFIT
                    </h2>
                    <span className="text-[8.5px] text-neutral-400 font-black tracking-widest mt-4 uppercase select-none">OFFER VALID FOR A LIMITED TIME</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          PHẦN 2: SECTION PROMOTION HIGHLIGHTS
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16 select-none">
          <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">PROMOTION ROUNDUP</span>
          <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-3 uppercase">
            진행 중인 혜택
          </h2>
          <p className="text-[11px] text-neutral-400 font-bold tracking-widest mt-2 uppercase">
            Beauty Luxe에서 준비한 글로벌 프리미엄 혜택
          </p>
          <div className="w-8 h-[2px] bg-[#C49A6C] mx-auto mt-5"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {promoBanners.map((promo, idx) => (
            <div 
              key={idx}
              className="bg-white border border-neutral-100 hover:border-[#C49A6C]/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.02)] transition-all duration-500 rounded-2xl p-8 md:p-10 flex flex-col items-center text-center select-none relative group h-full"
            >
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] group-hover:bg-[#C49A6C] group-hover:text-white transition-all duration-500 flex items-center justify-center text-[#C49A6C] mb-6 border border-neutral-50 shadow-sm">
                {React.cloneElement(promo.icon, { 
                  className: "group-hover:text-white transition-colors" 
                })}
              </div>
              
              <span className="text-[8.5px] font-black tracking-[0.2em] text-[#C49A6C] uppercase block mb-2.5">
                {promo.badge}
              </span>
              <h3 className="text-base md:text-[17px] font-black text-dark mb-3 tracking-wide leading-snug">
                {promo.title}
              </h3>
              <p className="text-[11px] text-neutral-400 font-medium leading-relaxed mb-8 flex-grow max-w-[220px]">
                {promo.desc}
              </p>
              
              <button className="text-[10.5px] font-black tracking-widest text-dark uppercase border-b-2 border-dark pb-1.5 hover:text-[#C49A6C] hover:border-[#C49A6C] transition-all mt-auto group-hover:translate-y-[-2px]">
                {promo.btn}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          PHẦN 4 + 5: SALE FILTER TABS + PRODUCT GRID
          ================================================== */}
      <section id="sale-grid-section" className="bg-[#FCFAF8] py-20 md:py-28 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 md:mb-16 gap-6">
            <div className="text-center lg:text-left select-none">
              <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">LIMITED STOCK SELECTION</span>
              <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-3 uppercase">
                스페셜 혜택 상품
              </h2>
              <p className="text-[11px] text-neutral-400 font-bold tracking-widest mt-2 uppercase">
                한정 기간 동안 만날 수 있는 프리미엄 뷰티 혜택
              </p>
            </div>

            {/* Sorting selector */}
            <div className="flex items-center justify-center lg:justify-end space-x-2 select-none">
              <label className="text-[10px] font-black text-neutral-400 tracking-widest uppercase">
                정렬
              </label>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-neutral-200 rounded-lg pl-4 pr-10 py-2.5 text-[10.5px] font-black tracking-wider uppercase text-dark focus:outline-none focus:border-[#C49A6C] cursor-pointer transition-colors"
                >
                  <option>추천순</option>
                  <option>할인율 높은순</option>
                  <option>낮은 가격순</option>
                  <option>높은 가격순</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-neutral-400">
                  <ChevronDown size={12} />
                </div>
              </div>
            </div>
          </div>

          {/* Level 4 Category Filter Tabs */}
          <div className="flex items-center justify-center lg:justify-start overflow-x-auto hide-scrollbar mb-12 border-b border-neutral-200/40 pb-[1px] max-w-md select-none">
            <div className="flex space-x-1 md:space-x-2">
              {['전체', '향수', '메이크업', '스킨케어', '기프트'].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 sm:px-6 py-3 text-[11px] font-black tracking-widest uppercase transition-all border-b-2 outline-none whitespace-nowrap ${
                      isActive
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

          {/* Level 5 Product Cards Grid */}
          {finalDisplayProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {finalDisplayProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white border border-neutral-100 rounded-2xl select-none">
              <AlertCircle size={24} className="mx-auto text-neutral-300 mb-3" />
              <p className="text-[11px] text-neutral-400 font-black tracking-widest uppercase">
                현재 선택한 항목에 해당하는 할인 혜택 상품이 존재하지 않습니다.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* ==================================================
          PHẦN 7: LIMITED TIME BANNER
          ================================================== */}
      <section className="bg-[#FAF7F2] overflow-hidden border-y border-[#EFEAE2] relative py-14 md:py-16 select-none">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full border border-dark/[0.02] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
              
              {/* Simulated D-07 simulated countdown circle */}
              <div className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dark rounded-full flex-shrink-0">
                <span className="text-xs font-black tracking-widest text-dark uppercase leading-none">D-07</span>
                <span className="text-[7px] font-black text-neutral-400 uppercase tracking-widest mt-1">DAYS LEFT</span>
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-black tracking-[0.3em] text-[#C49A6C] uppercase block">
                  LIMITED TIME OFFER
                </span>
                <h3 className="text-xl md:text-2xl font-black text-dark tracking-wider uppercase leading-tight">
                  이번 주 한정 프리미엄 뷰티 혜택
                </h3>
                <p className="text-[11px] text-neutral-500 font-semibold tracking-wide uppercase">
                  인기 제품은 재고 상황에 따라 조기 종료될 수 있습니다.
                </p>
              </div>
            </div>

            <button 
              onClick={() => document.getElementById('sale-grid-section').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 bg-dark hover:bg-neutral-800 text-white text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 active:scale-95 flex items-center gap-2 shadow-sm"
            >
              <span>지금 확인하기</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          PHẦN 6: MEMBER BENEFIT SECTION (Dark Theme)
          ================================================== */}
      <section id="membership-section" className="bg-[#111111] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-[0.015] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 relative z-10">
          <div className="text-center mb-14 md:mb-16 select-none">
            <span className="text-[9px] font-black tracking-[0.35em] text-[#C49A6C] uppercase block">EXCLUSIVE MEMBERSHIP</span>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-widest mt-3 uppercase">
              멤버십 혜택
            </h2>
            <p className="text-[11px] text-neutral-500 tracking-wider font-semibold mt-2 uppercase">
              Beauty Luxe 회원만을 위한 추가 혜택
            </p>
            <div className="w-8 h-[1px] bg-neutral-800 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {[
              { title: "신규 회원 혜택", desc: "첫 구매 시 사용 가능한 특별 할인 혜택", icon: <UserPlus size={24} /> },
              { title: "무료 포장 서비스", desc: "기프트 구매 시 프리미엄 포장 서비스 제공", icon: <Gift size={24} /> },
              { title: "빠른 배송 안내", desc: "주문 확인 후 안전하고 빠른 배송 지원", icon: <Truck size={24} /> },
              { title: "우선 혜택 알림", desc: "새로운 브랜드 컬렉션과 프로모션 소식 안내", icon: <Bell size={24} /> }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="bg-neutral-950/60 border border-neutral-900 hover:border-[#C49A6C]/40 transition-colors duration-500 p-8 rounded-2xl text-center group select-none"
              >
                <div className="w-12 h-12 bg-[#1A1A1A] border border-neutral-800 group-hover:border-[#C49A6C]/50 rounded-full flex items-center justify-center mx-auto mb-5 text-[#C49A6C] transition-all duration-500">
                  {benefit.icon}
                </div>
                <h4 className="text-sm font-black text-white tracking-wide mb-2.5">
                  {benefit.title}
                </h4>
                <p className="text-[10.5px] text-neutral-400 leading-relaxed font-medium max-w-[200px] mx-auto">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          PHẦN 8: NOTICE SECTION
          ================================================== */}
      <section className="bg-white border-t border-neutral-100 py-12 md:py-16 select-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-6 bg-[#FCFCFC] border border-neutral-50 rounded-2xl p-6 md:p-8">
            <div className="w-10 h-10 rounded-full bg-neutral-100/50 flex items-center justify-center text-neutral-400 flex-shrink-0">
              <AlertCircle size={16} />
            </div>
            
            <div className="flex-grow">
              <h4 className="text-xs md:text-[13px] font-black text-dark tracking-widest uppercase mb-4">혜택 안내</h4>
              <ul className="space-y-2 text-[10px] md:text-[11px] text-neutral-400 font-bold leading-relaxed list-disc list-inside tracking-wide">
                <li>프로모션은 재고 상황에 따라 조기 종료될 수 있습니다.</li>
                <li>일부 상품은 할인 대상에서 제외될 수 있습니다.</li>
                <li>기프트 포장 및 무료 배송 혜택은 조건에 따라 달라질 수 있습니다.</li>
                <li>정품 보장 및 기본 배송 정책은 동일하게 적용됩니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SalePage;
