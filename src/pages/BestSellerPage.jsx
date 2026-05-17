import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Trophy, Award, ShieldCheck, Package, Truck, RotateCcw, TrendingUp, ArrowRight } from 'lucide-react';
import { bestSellerProducts } from '../data/mockup';
import { useCart } from '../context/CartContext';
import ProductImage from '../components/common/ProductImage';
import HorizontalSkeleton from '../components/common/HorizontalSkeleton';

const BestSellerPage = () => {
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

  // Cart execution hook
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    // Since these are pointer records, setup standard defaults to prevent CartContext schema failures
    const defaultOption = (product.options && product.options.length > 0) 
      ? product.options[0] 
      : { label: "기본", price: product.price };
      
    addToCart(product, defaultOption, 1);
    openCart();
  };

  // Filter logic matching string categories perfectly
  const filteredProducts = useMemo(() => {
    if (activeTab === '전체') return bestSellerProducts;
    return bestSellerProducts.filter(item => item.category === activeTab);
  }, [activeTab]);

  // Extract Top 3 for the special showcase row (Always extracted from overall overall, or filtered? Part 3 implies the Top 3 overall season winners)
  const top3Winners = useMemo(() => {
    return bestSellerProducts.slice(0, 3);
  }, []);

  // Category Highlight items
  const highlightCategories = [
    {
      title: "향수 베스트",
      desc: "글로벌 아이코닉 프래그런스 컬렉션",
      btn: "향수 보기",
      action: () => {
        setActiveTab('향수');
        document.getElementById('ranking-section').scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      title: "메이크업 베스트",
      desc: "립, 베이스, 아이 메이크업 인기 제품",
      btn: "메이크업 보기",
      action: () => navigate('/makeup')
    },
    {
      title: "스킨케어 베스트",
      desc: "프리미엄 루틴을 위한 스킨케어",
      btn: "스킨케어 보기",
      action: () => navigate('/skincare')
    },
    {
      title: "기프트 베스트",
      desc: "특별한 순간을 위한 프리미엄 기프트 세트",
      btn: "기프트 보기",
      action: () => navigate('/gift-set')
    }
  ];

  // Trust items
  const trustItems = [
    {
      title: "정품 기준 안내",
      desc: "Beauty Luxe는 정품 기준에 맞춘 상품 정보만 제공합니다.",
      icon: <ShieldCheck size={28} strokeWidth={1.5} className="text-[#C49A6C]" />
    },
    {
      title: "프리미엄 포장",
      desc: "선물용으로도 어울리는 고급 포장 서비스를 제공합니다.",
      icon: <Package size={28} strokeWidth={1.5} className="text-[#C49A6C]" />
    },
    {
      title: "빠른 배송",
      desc: "주문 확인 후 빠르고 안전하게 배송을 도와드립니다.",
      icon: <Truck size={28} strokeWidth={1.5} className="text-[#C49A6C]" />
    },
    {
      title: "7일 교환 안내",
      desc: "조건에 따라 7일 이내 교환 안내가 가능합니다.",
      icon: <RotateCcw size={28} strokeWidth={1.5} className="text-[#C49A6C]" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-dark font-sans">

      {/* ==================================================
          PHẦN 1: NÂNG CẤP HERO TRANG BEST SELLER
          ================================================== */}
      <section className="bg-[#FAF7F2] relative overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left content */}
            <div className="flex flex-col space-y-6 text-center lg:text-left z-10">
              <div className="flex items-center justify-center lg:justify-start gap-3 select-none">
                <span className="px-3 py-1 bg-dark text-white text-[9px] font-black tracking-[0.15em] uppercase rounded">
                  BEST SELLER
                </span>
                <span className="px-3 py-1 border border-dark/30 text-dark text-[9px] font-black tracking-[0.15em] uppercase rounded">
                  CUSTOMER PICK
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#C49A6C]">
                  가장 사랑받는 샤넬 시그니처 베스트 아이템
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-dark tracking-widest uppercase leading-[1.15]">
                  샤넬 베스트셀러
                </h1>
              </div>

              <p className="text-xs md:text-[13px] text-neutral-500 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                향수, 메이크업, 스킨케어까지 샤넬을 사랑하는 고객들이 가장 많이 선택한 베스트 제품을 만나보세요.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center lg:justify-start">
                <button 
                  onClick={() => document.getElementById('top3-section').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-dark text-white font-bold text-xs tracking-widest uppercase rounded hover:bg-neutral-800 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)] active:scale-95"
                >
                  베스트셀러 보기
                </button>
                <button 
                  onClick={() => document.getElementById('ranking-section').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-dark bg-transparent text-dark font-bold text-xs tracking-widest uppercase rounded hover:bg-dark hover:text-white transition-all duration-300 active:scale-95"
                >
                  카테고리별 보기
                </button>
              </div>
            </div>

            {/* Right image banner */}
            <div className="flex justify-center items-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-[#FAF7F2]">
                {!heroImgError ? (
                  <img 
                    src="/images/pages/best-seller-hero.png" 
                    alt="Chanel Best Seller Grand Display" 
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    onError={() => setHeroImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center border border-[#E2D6C5] border-dashed bg-[#FAF7F2] p-8 text-center">
                    <Trophy size={32} strokeWidth={1} className="text-[#C49A6C] mb-4 animate-bounce" />
                    <h2 className="text-xl md:text-2xl font-black text-dark tracking-[0.2em] uppercase border-y border-dark/10 py-4 px-6">
                      CHANEL BEST SELLER
                    </h2>
                    <span className="text-[9px] text-neutral-400 tracking-widest font-bold mt-4 uppercase select-none">PREMIUM SELECTION</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          PHẦN 3: SECTION TOP 3 BEST SELLER
          ================================================== */}
      <section id="top3-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-white">
        <div className="text-center mb-14 md:mb-20 select-none">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#C49A6C] uppercase flex items-center justify-center gap-2">
            <Award size={14} /> SEASON WINNERS
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-3 uppercase">
            TOP 3 베스트셀러
          </h2>
          <p className="text-[11px] text-neutral-400 tracking-widest font-medium mt-2 uppercase">
            이번 시즌 가장 많은 사랑을 받은 베스트 아이템
          </p>
          <div className="w-8 h-[2px] bg-[#C49A6C] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-end">
          {top3Winners.map((prod, idx) => {
            const isRank1 = idx === 0;
            const displayRank = `0${prod.rank}`;

            return (
              <div 
                key={prod.id}
                onClick={() => navigate(`/product/${prod.id}`)}
                className={`group relative flex flex-col bg-white rounded-3xl border overflow-hidden cursor-pointer transition-all duration-500 ${
                  isRank1 
                    ? 'lg:order-2 border-[#C49A6C] hover:shadow-[0_25px_60px_rgba(196,154,108,0.08)] lg:scale-105 z-20' 
                    : 'lg:order-1 border-neutral-100 hover:border-neutral-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] z-10'
                }`}
              >
                {/* Big Ranking Num in bg */}
                <div className="absolute top-4 right-6 text-[80px] md:text-[100px] font-black tracking-tighter leading-none text-neutral-100 group-hover:text-neutral-200/70 transition-colors select-none pointer-events-none">
                  {displayRank}
                </div>

                {/* Thumbnail container */}
                <ProductImage 
                  src={prod.image} 
                  alt={prod.name} 
                  variant="card"
                  className={`rounded-none border-none p-8 ${
                    isRank1 ? 'bg-[#FCFAF6] group-hover:bg-[#FAF5EB]' : 'bg-[#FCFCFC] group-hover:bg-[#FAF7F2]'
                  }`}
                />
                  <div className="absolute top-5 left-5 z-20 flex items-center gap-1 bg-dark text-white text-[9px] font-black tracking-widest px-3 py-1 rounded shadow-sm">
                    <TrendingUp size={10} />
                    <span>{prod.badge}</span>
                  </div>

                  {/* Content info */}
                  <div className="p-8 flex-grow flex flex-col">
                    <span className="text-[9px] font-black tracking-[0.2em] text-[#C49A6C] uppercase">{prod.brand}</span>
                    <h3 className={`font-black text-dark tracking-wide mt-2 group-hover:text-[#C49A6C] transition-colors line-clamp-1 ${
                      isRank1 ? 'text-[17px]' : 'text-[15px]'
                    }`}>
                      {prod.koreanName}
                    </h3>
                    <p className="text-[10px] text-neutral-400 italic font-semibold truncate mb-3 mt-0.5">{prod.name}</p>
                  
                  {/* Special cumulative sales display */}
                  <div className="inline-flex items-center gap-1.5 text-[10.5px] font-black text-dark/80 tracking-wider bg-neutral-50 rounded-full px-3.5 py-1.5 w-fit mb-4">
                    <TrendingUp size={11} className="text-[#C49A6C]" />
                    <span>누적 판매 {prod.salesCount.toLocaleString()}+</span>
                  </div>

                  <div className="flex items-center gap-1 mb-4 text-[10px] text-neutral-400 font-bold">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill="currentColor" />
                      ))}
                    </div>
                    <span className="ml-1 opacity-85">({prod.reviewsCount || prod.reviews || 0})</span>
                  </div>

                  <div className="mt-auto pt-5 border-t border-neutral-100 flex items-center justify-between">
                    <span className={`font-black text-dark tracking-wider ${isRank1 ? 'text-lg' : 'text-base'}`}>
                      {prod.price}
                    </span>
                  </div>

                  {/* Cart Trigger buttons */}
                  <div className="mt-6 grid grid-cols-1 gap-2">
                    <button 
                      onClick={(e) => handleAddToCart(e, prod)}
                      className={`w-full py-3 font-bold text-xs tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                        isRank1 
                          ? 'bg-dark text-white hover:bg-neutral-800 shadow-md' 
                          : 'bg-neutral-900 text-white hover:bg-neutral-800'
                      }`}
                    >
                      <ShoppingBag size={13} />
                      <span>장바구니 담기</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${prod.id}`);
                      }}
                      className="w-full py-3 border border-neutral-200 hover:border-dark text-neutral-500 hover:text-dark text-[10.5px] font-black tracking-widest uppercase rounded-lg bg-transparent transition-all active:scale-[0.98]"
                    >
                      자세히 보기
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          PHẦN 4 + 5: CATEGORY FILTER TABS + RANKING LIST
          ================================================== */}
      <section id="ranking-section" className="bg-[#FCFAF8] py-20 md:py-28 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16 select-none">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">OFFICIAL RANKING</span>
            <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-3 uppercase">
              전체 베스트셀러 랭킹
            </h2>
            <p className="text-[11px] text-neutral-400 font-bold tracking-widest mt-2 uppercase">
              카테고리별 인기 뷰티 제품을 확인해보세요.
            </p>
            <div className="w-8 h-[2px] bg-dark mx-auto mt-5"></div>
          </div>

          {/* Level 4 Filter Tabs */}
          <div className="flex items-center justify-center overflow-x-auto hide-scrollbar mb-12 border-b border-neutral-200/40 pb-[1px] max-w-lg mx-auto select-none">
            <div className="flex space-x-1 sm:space-x-2">
              {['전체', '향수', '메이크업', '스킨케어', '기프트'].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 sm:px-7 py-3 text-[11px] font-black tracking-widest uppercase transition-all border-b-2 outline-none whitespace-nowrap ${
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

          {/* Level 5 Ranking List Row Frame */}
          <div className="space-y-4 md:space-y-5">
            {isLoading ? (
              [...Array(5)].map((_, i) => <HorizontalSkeleton key={i} />)
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => {
                const displayRank = String(prod.rank).padStart(2, '0');
                const isTopTier = prod.rank <= 3;

                return (
                  <div 
                    key={prod.id}
                    onClick={() => navigate(`/product/${prod.id}`)}
                    className="group bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-300 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 cursor-pointer relative"
                  >

                    <div className="flex-shrink-0 flex items-center justify-center min-w-[60px]">
                      <span className={`text-2xl md:text-3xl font-black tracking-tighter select-none transition-colors ${
                        isTopTier ? 'text-[#C49A6C]' : 'text-neutral-300 group-hover:text-dark'
                      }`}>
                        {displayRank}
                      </span>
                    </div>

                    <div className="flex-shrink-0 relative group-hover:scale-105 transition-transform duration-500">
                      <ProductImage 
                        src={prod.image} 
                        alt={prod.name} 
                        variant="horizontal" 
                        className="rounded-xl"
                      />
                      <span className="absolute -top-1.5 -left-1.5 bg-dark text-white font-black tracking-widest text-[7.5px] px-2 py-0.5 rounded scale-95">
                        {prod.badge}
                      </span>
                    </div>


                    <div className="flex-grow text-center md:text-left min-w-0">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5 select-none">
                        <span className="text-[8px] font-black tracking-widest text-[#C49A6C] uppercase">
                          {prod.brand}
                        </span>
                        <span className="text-[8px] text-neutral-300">•</span>
                        <span className="text-[8px] text-neutral-400 font-bold uppercase tracking-wider">
                          {prod.category} / {prod.subCategory}
                        </span>
                      </div>
                      <h3 className="text-[15px] font-black text-dark group-hover:text-[#C49A6C] transition-colors leading-snug truncate">
                        {prod.koreanName}
                      </h3>
                      <p className="text-[10.5px] text-neutral-400 italic font-semibold truncate leading-relaxed">
                        {prod.name}
                      </p>
                      <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-[9px] text-neutral-400 font-bold">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={9} fill="currentColor" />
                          ))}
                        </div>
                        <span>({prod.reviewsCount || prod.reviews || 0})</span>
                        <span className="text-neutral-200">|</span>
                        <span className="text-neutral-500">누적 {prod.salesCount}+</span>
                      </div>
                    </div>

                    {/* Right: Price and CTA Buttons */}
                    <div className="flex-shrink-0 w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 border-neutral-50 pt-4 md:pt-0 min-w-[160px]">
                      <span className="text-base md:text-[17px] font-black text-dark tracking-wide">
                        {prod.price}
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${prod.id}`);
                          }}
                          className="p-2 border border-neutral-200 hover:border-dark text-neutral-500 hover:text-dark bg-transparent rounded-lg transition-all active:scale-95"
                          title="자세히 보기"
                        >
                          <ArrowRight size={14} />
                        </button>
                        <button
                          onClick={(e) => handleAddToCart(e, prod)}
                          className="px-4 py-2 bg-dark hover:bg-neutral-800 text-white font-bold text-[10px] tracking-widest uppercase flex items-center gap-1.5 rounded-lg transition-all active:scale-95 shadow-sm"
                        >
                          <ShoppingBag size={11} />
                          <span>담기</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="py-24 text-center bg-white rounded-2xl border border-neutral-100 select-none">
                <p className="text-neutral-400 text-[11px] font-bold tracking-wide uppercase">
                  선택하신 필터에 해당하는 베스트셀러 상품이 없습니다.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ==================================================
          PHẦN 6: BEST CATEGORY HIGHLIGHT
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center mb-12 md:mb-16 select-none">
          <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">QUICK NAVIGATE</span>
          <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-3 uppercase">
            카테고리별 베스트
          </h2>
          <p className="text-[11px] text-neutral-400 font-semibold tracking-widest mt-2 uppercase">
            원하는 카테고리의 인기 상품을 빠르게 확인하세요.
          </p>
          <div className="w-8 h-[2px] bg-[#C49A6C] mx-auto mt-5"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlightCategories.map((cat, idx) => (
            <div 
              key={idx}
              onClick={cat.action}
              className="bg-[#FAF7F2]/40 hover:bg-white border border-neutral-100 hover:border-[#C49A6C] rounded-2xl p-8 flex flex-col items-start text-left h-full transition-all duration-500 hover:-translate-y-1 cursor-pointer group"
            >
              <span className="text-[8px] font-black tracking-[0.25em] text-[#C49A6C] uppercase block mb-2 border-b border-[#C49A6C]/20 pb-1.5">
                CATEGORY {idx + 1}
              </span>
              <h4 className="text-[15px] font-black text-dark tracking-wide mb-2">
                {cat.title}
              </h4>
              <p className="text-[11px] text-neutral-400 leading-relaxed mb-8 flex-grow">
                {cat.desc}
              </p>
              <div className="inline-flex items-center gap-1.5 text-dark font-black text-[10px] tracking-widest uppercase mt-auto group-hover:text-[#C49A6C] transition-colors">
                <span>{cat.btn}</span>
                <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          PHẦN 7: CUSTOMER TRUST SECTION (Dark Themed)
          ================================================== */}
      <section className="bg-[#111111] text-white overflow-hidden relative border-t border-neutral-900">
        {/* Faint noise grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-[0.02] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          <div className="text-center mb-12 select-none">
            <span className="text-[9px] font-bold tracking-[0.35em] text-[#C49A6C] uppercase">BEAUTY LUXE COMMITMENT</span>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-[0.2em] mt-2.5 uppercase">
              고객들이 선택한 이유
            </h2>
            <div className="w-8 h-[1px] bg-neutral-800 mx-auto mt-5"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {trustItems.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center group select-none">
                <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center mb-4 group-hover:border-[#C49A6C] transition-colors duration-500">
                  {item.icon}
                </div>
                <h4 className="text-xs md:text-[13px] font-black text-white tracking-wide mb-2">
                  {item.title}
                </h4>
                <p className="text-[10.5px] text-neutral-400 leading-relaxed font-medium max-w-[200px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default BestSellerPage;
