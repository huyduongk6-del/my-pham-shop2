import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Sparkles, Heart, ArrowRight, Eye } from 'lucide-react';
import { allProducts } from '../../data/mockup';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductImage from '../common/ProductImage';

const TodaysChanelPick = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageErrors, setImageErrors] = useState({});
  
  // 1. Define our 3 target editorial picks
  const editorialPicks = [
    {
      id: 1,
      targetId: 'chanel-perfume-1',
      categoryLabel: '오늘의 향수',
      fallbackTitle: '샤넬 N°5 오 드 빠르펭',
      fallbackDesc: '우아하고 클래식한 무드를 위한 시그니처 향수',
      fallbackImage: '/images/home/pick-perfume.png',
      accentColor: '#C49A6C'
    },
    {
      id: 2,
      targetId: 'chanel-makeup-1',
      categoryLabel: '오늘의 립',
      fallbackTitle: '루쥬 코코 블룸',
      fallbackDesc: '부드럽고 생기 있는 컬러로 완성하는 데일리 립',
      fallbackImage: '/images/home/pick-lip.png',
      accentColor: '#E29696' // Soft Rose Accent
    },
    {
      id: 3,
      targetId: 'chanel-skincare-1',
      categoryLabel: '오늘의 스킨케어',
      fallbackTitle: '이드라 뷰티 마이크로 세럼',
      fallbackDesc: '촉촉하고 맑은 피부를 위한 프리미엄 세럼',
      fallbackImage: '/images/home/pick-skincare.png',
      accentColor: '#8FBAD8' // Soft Light Blue Accent
    }
  ];

  // Handler: Resolve dynamic product links
  const handleResolveProduct = (targetId) => {
    const found = allProducts.find(p => p.id === targetId);
    return found || null;
  };

  // Handler: Add item to cart securely with safety notifications
  const handleCartAction = (e, targetId) => {
    e.stopPropagation();
    const product = handleResolveProduct(targetId);
    if (product) {
      // Find default option if available
      const opt = product.options && product.options.length > 0 ? product.options[0] : null;
      addToCart(product, opt, 1);
      alert(`${product.koreanName || product.name}을(를) 장바구니에 담았습니다.`);
    } else {
      alert("장바구니 담기 오류: 제품을 찾을 수 없습니다.");
    }
  };

  // Handler: Click navigation
  const handleNavigateToDetail = (targetId) => {
    const product = handleResolveProduct(targetId);
    if (product) {
      navigate(`/product/${product.id}`);
    } else {
      // Safe fallback to generic page
      navigate('/best-seller');
    }
  };

  // Image error toggle
  const handleImgError = (pickId) => {
    setImageErrors(prev => ({ ...prev, [pickId]: true }));
  };

  return (
    <section className="py-16 md:py-24 bg-white border-t border-neutral-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Standardized Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <span className="text-[10px] md:text-[11px] font-black tracking-[0.3em] text-[#B9916A] uppercase mb-4 block">
            TODAY'S CHANEL PICK
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#111111] leading-tight tracking-tight">
            오늘의 샤넬 추천
          </h2>
          <div className="w-12 h-[1.5px] bg-[#111111] mt-5 mb-4 rounded-full opacity-80"></div>
          <p className="text-[#777777] text-[12px] md:text-[14px] font-medium tracking-wide mt-1 max-w-2xl leading-relaxed">
            샤넬 뷰티 전문가가 제안하는 오늘 최고의 프리미엄 셀렉션
          </p>
        </div>

        {/* 3-Card Responsive Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          
          {editorialPicks.map((pick, index) => {
            const realProduct = handleResolveProduct(pick.targetId);
            const isMiddle = index === 1; // Middle card highlighting
            
            // Determine Display Specs
            const finalTitle = realProduct?.koreanName || pick.fallbackTitle;
            const finalDesc = realProduct?.shortDescription || pick.fallbackDesc;
            const finalImage = pick.fallbackImage || realProduct?.image;
            
            return (
              <div 
                key={pick.id}
                onClick={() => handleNavigateToDetail(pick.targetId)}
                className={`relative group cursor-pointer bg-white rounded-[28px] border border-[#EEEEEE] overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 flex flex-col ${
                  isMiddle ? 'lg:scale-[1.02] lg:-translate-y-1 border-[#E6DED2]/60 bg-[#FAF7F2]/20 shadow-[#D8BFA3]/5' : ''
                }`}
              >
                {/* Card Flag Tag */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3.5 py-1.5 bg-[#111111] text-white text-[9.5px] font-black tracking-widest uppercase rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: pick.accentColor }} />
                    {pick.categoryLabel}
                  </span>
                </div>

                {/* Favorite deco icon */}
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    if (realProduct) toggleWishlist(realProduct);
                    else alert('제품 정보를 찾을 수 없습니다.');
                  }}
                  className={`absolute top-5 right-5 z-10 w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition-all shadow-sm border ${
                    realProduct && isInWishlist(realProduct.id) 
                      ? 'bg-[#FAF7F2] border-[#D8BFA3]/50 text-[#D8BFA3]' 
                      : 'bg-white/80 backdrop-blur-[2px] border-[#EEEEEE] text-neutral-400 hover:text-rose-500 hover:bg-white'
                  }`}
                >
                  <Heart size={13} fill={realProduct && isInWishlist(realProduct.id) ? "currentColor" : "none"} />
                </button>

                {/* Standardized Editorial Image */}
                <ProductImage 
                  src={finalImage} 
                  alt={finalTitle} 
                  variant="editorial"
                  className="rounded-none border-none p-8"
                  imageClassName="mix-blend-multiply drop-shadow-sm"
                />

                {/* Card Details Payload Info */}
                <div className="flex-1 flex flex-col p-6 md:p-8 text-center">
                  <span className="text-[9px] font-black text-[#C49A6C] tracking-[0.2em] block uppercase mb-2 font-serif">
                    {realProduct?.brand || "CHANEL"}
                  </span>
                  
                  <h3 className="text-[15px] font-black text-[#111111] tracking-tight mb-2 group-hover:text-[#C49A6C] transition-colors leading-snug">
                    {finalTitle}
                  </h3>
                  
                  <p className="text-[11.5px] font-bold text-neutral-400 leading-relaxed mb-6 max-w-[240px] mx-auto line-clamp-2 min-h-[36px]">
                    {finalDesc}
                  </p>

                  {/* Mini Price Display */}
                  {realProduct && (
                    <div className="text-[13.5px] font-black text-[#111111] tracking-wide font-mono mb-6 mt-auto pb-4 border-b border-dashed border-neutral-100">
                      {realProduct.price}
                    </div>
                  )}

                  {/* Action Command Buttons */}
                  <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:gap-2 select-none">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleNavigateToDetail(pick.targetId); }}
                      className="flex-1 py-3.5 px-4 bg-[#111111] text-white text-[10.5px] font-black tracking-widest uppercase rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
                    >
                      <Eye size={12} /> 자세히 보기
                    </button>

                    <button
                      onClick={(e) => handleCartAction(e, pick.targetId)}
                      className="py-3.5 px-4.5 bg-transparent text-[#111111] border border-[#EEEEEE] text-[10.5px] font-black uppercase rounded-xl hover:bg-[#FAF7F2] hover:border-neutral-300 transition-all flex items-center justify-center flex-shrink-0 active:scale-[0.96]"
                      title="장바구니 담기"
                    >
                      <ShoppingBag size={13} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* View all curated best sellers CTA */}
        <div className="mt-16 md:mt-20 flex justify-center">
          <button 
            onClick={() => navigate('/best-seller')}
            className="group inline-flex items-center gap-2 text-[11.5px] font-black tracking-widest text-[#111111] border-b-2 border-[#111111] pb-1 hover:text-[#C49A6C] hover:border-[#C49A6C] transition-all uppercase"
          >
            전체 베스트셀러 탐색하기
            <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default TodaysChanelPick;
