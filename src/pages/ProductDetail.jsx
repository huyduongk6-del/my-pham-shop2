import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, Star, ShoppingBag, ShieldCheck, Truck, 
  RotateCcw, Gift, Plus, Minus, ChevronDown, ChevronRight, ArrowLeft, Edit3
} from 'lucide-react';
import { allProducts } from '../data/mockup';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { parsePrice, formatPrice } from '../utils/price';
import ProductCard from '../components/common/ProductCard';
import RecentlyViewedSection from '../components/common/RecentlyViewedSection';
import ProductGallery from '../components/product/ProductGallery';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();
  
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const isLiked = isInWishlist(id);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Reset and Load logic
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const foundProduct = allProducts.find((p) => p.id.toString() === id.toString());
    
    if (foundProduct) {
      setProduct(foundProduct);
      setQuantity(1);
      
      // Set default option
      if (foundProduct.options && foundProduct.options.length > 0) {
        setSelectedOption(foundProduct.options[0]);
      } else {
        setSelectedOption(null);
      }

      // Recommended products logic: pull 4 items. First same category, then fill with others.
      const sameCat = allProducts.filter(
        (p) => p.id.toString() !== foundProduct.id.toString() && p.category === foundProduct.category
      );
      
      let combined = [...sameCat];
      if (combined.length < 4) {
        const diffCat = allProducts.filter(
          (p) => p.id.toString() !== foundProduct.id.toString() && p.category !== foundProduct.category
        );
        combined = [...combined, ...diffCat].slice(0, 4);
      } else {
        combined = combined.slice(0, 4);
      }
      setRecommendedProducts(combined);

    } else {
      setProduct(null);
    }
  }, [id]);

  // Record Recently Viewed
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product?.id]);

  // Handle Sticky Bar Scroll Visibility
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolled down 400px (past main details usually)
      if (window.scrollY > 400) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Price formatter mapping using common util
  const formatCurrentPrice = (num) => {
    return formatPrice(num);
  };

  // Compute Total Sum dynamically
  const currentBasePrice = selectedOption ? parsePrice(selectedOption.price) : (product ? parsePrice(product.price) : 0);
  const totalPrice = currentBasePrice * quantity;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, selectedOption, quantity);
    openCart();
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, selectedOption, quantity);
    navigate('/checkout');
  };

  const handleWishlist = () => {
    if (!product) return;
    toggleWishlist(product);
  };

  const handleWriteReview = () => {
    alert("리뷰 기능은 준비 중입니다.");
  };

  // Error / Fallback screen
  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white text-center px-4 py-20">
        <div className="w-20 h-20 bg-[#FAF7F2] rounded-full flex items-center justify-center mb-6 text-neutral-400">
          <ShoppingBag size={32} strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-black text-dark tracking-wider mb-2 uppercase">
          상품을 찾을 수 없습니다.
        </h2>
        <p className="text-xs text-neutral-400 font-medium mb-8 max-w-sm">
          요청하신 상품 정보를 불러올 수 없거나 존재하지 않는 제품 코드입니다.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 bg-dark text-white px-8 py-3.5 rounded-md text-xs font-bold tracking-widest uppercase transition-transform hover:scale-105 active:scale-95 shadow-md"
        >
          <ArrowLeft size={14} />
          <span>홈으로 돌아가기</span>
        </Link>
      </div>
    );
  }

  const accordionItems = [
    { 
      title: "제품 설명", 
      content: <p className="text-neutral-500 text-xs md:text-[13px] leading-relaxed font-medium">{product.description}</p> 
    },
    { 
      title: "주요 특징", 
      content: (
        <ul className="space-y-2 text-neutral-500 text-xs md:text-[13px] font-medium">
          {product.benefits?.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49A6C] mt-1.5 flex-shrink-0"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    },
    { 
      title: "사용 방법", 
      content: (
        <ul className="space-y-2 text-neutral-500 text-xs md:text-[13px] font-medium">
          {product.howToUse?.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="font-bold text-[#C49A6C] text-[11px]">0{index + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    },
    { 
      title: "추천 대상", 
      content: (
        <ul className="space-y-2 text-neutral-500 text-xs md:text-[13px] font-medium">
          {product.suitableFor?.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="text-[#C49A6C] text-xs">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    },
    { 
      title: "배송 및 교환", 
      content: (
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs md:text-[13px] font-medium text-neutral-500">
          <div className="font-bold text-dark">제조국 (Origin)</div>
          <div>{product.details?.origin}</div>
          <div className="font-bold text-dark">제품 구분</div>
          <div>{product.details?.type}</div>
          <div className="font-bold text-dark">배송 안내</div>
          <div>{product.details?.shipping}</div>
          <div className="font-bold text-dark">교환 정책</div>
          <div>{product.details?.exchange}</div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <nav className="flex items-center space-x-2 text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-wider select-none">
          <Link to="/" className="hover:text-dark transition-colors">홈</Link>
          <ChevronRight size={10} className="text-neutral-300" />
          <span>{product.brand}</span>
          <ChevronRight size={10} className="text-neutral-300" />
          <span className="text-dark truncate max-w-[200px] md:max-w-none">{product.koreanName || product.name}</span>
        </nav>
      </div>

      {/* 2. MAIN PRODUCT PRESENTATION & ACTIONS BLOCK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16">
          
          {/* 2A. Product Image Container (Left) */}
          <div className="lg:col-span-6 xl:col-span-7">
            <ProductGallery product={product} />
          </div>

          {/* 2B. Configuration & Order Controls (Right) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col space-y-6">
            
            {/* Title & Basic Meta */}
            <div className="space-y-4">
              <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] text-[#C49A6C] uppercase block leading-none mt-1">
                {product.brand}
              </span>

              <div className="space-y-1">
                <h1 className="text-xl md:text-2xl xl:text-3xl font-black text-dark leading-tight tracking-wide">
                  {product.koreanName || product.name}
                </h1>
                {product.koreanName && (
                  <p className="text-xs md:text-sm text-neutral-400 font-medium italic tracking-wide">
                    {product.name}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-4 text-[11px] font-bold text-neutral-400 border-b border-neutral-100 pb-4">
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  <span className="text-dark pl-0.5">({product.reviews})</span>
                </div>
                <span className="text-neutral-200">|</span>
                <span className="uppercase text-neutral-500 tracking-wider font-black">
                  {selectedOption ? selectedOption.label : (product.volume || "N/A")}
                </span>
              </div>

              {/* Dynamic Unit Price Section */}
              <div className="pt-2 flex items-baseline flex-wrap gap-x-3 gap-y-1">
                {product.originalPrice && (
                  <span className="text-sm md:text-base text-neutral-400 font-bold line-through tracking-wide select-none">
                    {product.originalPrice}
                  </span>
                )}
                <span className="text-2xl md:text-3xl font-black text-dark tracking-wider">
                  {selectedOption ? selectedOption.price : product.price}
                </span>
                {product.discountPercent && (
                  <span className="px-2 py-0.5 bg-[#FAF0E6] text-[#C49A6C] font-black text-[10px] tracking-wider uppercase rounded select-none">
                    {product.discountPercent}% OFF
                  </span>
                )}
                <span className="text-[11px] text-neutral-400 font-bold pl-1">
                  * 부가세 포함
                </span>
              </div>

              <p className="text-xs md:text-[13px] text-neutral-500 leading-relaxed font-medium pt-1">
                {product.shortDescription}
              </p>
            </div>

            {/* ============================================================== */}
            {/* PHẦN 1: THÊM 상품 옵션 (Product Options Panel) */}
            {/* ============================================================== */}
            <div className="pt-5 border-t border-neutral-100 space-y-5">
              
              {/* Option variant selector */}
              {product.options && product.options.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-dark tracking-wider uppercase">
                    상품 옵션
                  </h3>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-neutral-500 uppercase">
                      용량 선택
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {product.options.map((opt, index) => {
                        const isSelected = selectedOption?.label === opt.label;
                        return (
                          <button
                            key={index}
                            onClick={() => setSelectedOption(opt)}
                            className={`py-3 px-3 border rounded-lg text-xs font-bold text-center transition-all duration-300 ${
                              isSelected
                                ? 'bg-white text-dark border-dark border-2 shadow-sm scale-[1.02]'
                                : 'bg-white text-neutral-500 border-[#eeeeee] hover:border-neutral-300 hover:text-dark'
                            }`}
                          >
                            <div className="truncate">{opt.label}</div>
                            <div className={`text-[9.5px] mt-0.5 font-bold ${isSelected ? 'text-[#C49A6C]' : 'text-neutral-400'}`}>
                              {opt.price}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Quantity Picker Widget */}
              <div className="space-y-3 pt-1">
                <label className="text-[11px] font-black text-dark tracking-wider uppercase">
                  수량
                </label>
                <div className="flex items-center justify-between border border-neutral-200 rounded-lg w-32 p-1.5 bg-white select-none">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-dark transition-colors active:scale-90"
                  >
                    <Minus size={12} strokeWidth={2.5} />
                  </button>
                  <span className="text-[13px] font-black text-dark">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-dark transition-colors active:scale-90"
                  >
                    <Plus size={12} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Final Computed Total Amount (총 상품 금액) */}
              <div className="bg-[#FAF7F2] border border-neutral-100/60 rounded-xl p-4 flex items-center justify-between mt-6 animate-fade-in select-none">
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-neutral-500 uppercase tracking-wider">
                    총 상품 금액 (총 {quantity}개)
                  </span>
                  <span className="text-[9px] text-neutral-400 font-bold mt-0.5">
                    수량 및 선택 옵션이 자동 계산되었습니다
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl md:text-2xl font-black text-dark tracking-wide">
                    {formatCurrentPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Master CTAs Panel */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-white border-2 border-dark text-dark hover:bg-neutral-50 font-bold text-xs tracking-widest uppercase rounded-lg py-4 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} />
                  <span>장바구니 담기</span>
                </button>

                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-dark text-white border-2 border-dark hover:bg-neutral-800 font-bold text-xs tracking-widest uppercase rounded-lg py-4 transition-all duration-300 active:scale-95 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                >
                  바로 구매하기
                </button>

                <button 
                  onClick={handleWishlist}
                  className={`w-14 rounded-lg border border-neutral-200 flex items-center justify-center transition-all duration-300 active:scale-90 ${
                    isLiked ? 'bg-[#FAF7F2] border-[#D8BFA3]/50 text-[#D8BFA3]' : 'bg-white text-neutral-300 hover:text-dark hover:border-neutral-300'
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "animate-heart-pop" : ""} />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 3. Quick Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-[#FAF7F2] border border-neutral-100 rounded-2xl py-6 px-4 md:px-8 select-none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2.5 p-2">
              <ShieldCheck size={20} className="text-[#C49A6C] flex-shrink-0" />
              <div className="md:text-left text-center">
                <span className="text-xs md:text-[13px] font-black text-dark block">정품 보장</span>
                <span className="text-[10px] text-neutral-400 font-bold hidden md:block">공식 수입 및 엄격한 정품 보장</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2.5 p-2 border-l border-neutral-200/30">
              <Truck size={20} className="text-[#C49A6C] flex-shrink-0" />
              <div className="md:text-left text-center">
                <span className="text-xs md:text-[13px] font-black text-dark block">무료 배송</span>
                <span className="text-[10px] text-neutral-400 font-bold hidden md:block">전 지역 특별 안전 배송</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2.5 p-2 border-l border-neutral-200/30">
              <RotateCcw size={20} className="text-[#C49A6C] flex-shrink-0" />
              <div className="md:text-left text-center">
                <span className="text-xs md:text-[13px] font-black text-dark block">7일 교환 가능</span>
                <span className="text-[10px] text-neutral-400 font-bold hidden md:block">신속하고 간편한 교환/반품</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2.5 p-2 border-l border-neutral-200/30">
              <Gift size={20} className="text-[#C49A6C] flex-shrink-0" />
              <div className="md:text-left text-center">
                <span className="text-xs md:text-[13px] font-black text-dark block">프리미엄 포장</span>
                <span className="text-[10px] text-neutral-400 font-bold hidden md:block">익스클루시브 기프트 래핑</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ACCORDIONS DETAILS AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-neutral-100 mt-10">
        <div className="border-t border-neutral-200 divide-y divide-neutral-100">
          {accordionItems.map((item, index) => {
            const isOpen = activeAccordion === index;
            return (
              <div key={index} className="py-4">
                <button
                  onClick={() => setActiveAccordion(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between py-2 text-left group select-none"
                >
                  <span className={`text-xs md:text-sm font-black tracking-wider uppercase transition-colors ${
                    isOpen ? 'text-dark' : 'text-neutral-500 group-hover:text-dark'
                  }`}>
                    {item.title}
                  </span>
                  <ChevronDown 
                    size={14} 
                    className={`text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-dark' : ''}`} 
                  />
                </button>
                <div className={`transition-all duration-500 overflow-hidden ${
                  isOpen ? 'max-h-[500px] opacity-100 mt-4 pb-2' : 'max-h-0 opacity-0'
                }`}>
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* PHẦN 2: THÊM 고객 리뷰 (Customer Reviews Dashboard) */}
      {/* ============================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-base md:text-lg font-black text-dark tracking-widest uppercase flex items-center gap-2.5">
              <span className="w-1.5 h-4 bg-[#C49A6C] rounded-full"></span>
              고객 리뷰
            </h2>
            <p className="text-xs text-neutral-400 font-semibold tracking-wide mt-1.5">
              실제 구매 고객들의 후기를 확인해보세요.
            </p>
          </div>
          <button 
            onClick={handleWriteReview}
            className="inline-flex items-center gap-2 bg-white border border-neutral-200 text-dark px-5 py-2.5 rounded-md text-xs font-bold tracking-wider hover:bg-neutral-50 active:scale-95 transition-all"
          >
            <Edit3 size={12} />
            <span>리뷰 작성하기</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 2A. Stats overview left */}
          <div className="lg:col-span-4 bg-[#FAF7F2] rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center border border-neutral-100 text-center select-none">
            <span className="text-4xl md:text-5xl font-black text-dark leading-none">
              4.9
            </span>
            <div className="flex text-yellow-400 mt-3 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" stroke="none" />
              ))}
            </div>
            <span className="text-[11px] font-bold text-neutral-400">
              전체 리뷰 {product.reviews || 128}개
            </span>
            
            {/* Mini distribution lines */}
            <div className="w-full space-y-2 mt-6 max-w-xs">
              {[
                { star: 5, pct: '92%' },
                { star: 4, pct: '6%' },
                { star: 3, pct: '2%' },
                { star: 2, pct: '0%' },
                { star: 1, pct: '0%' }
              ].map((item, i) => (
                <div key={i} className="flex items-center text-[10px] font-black text-neutral-500">
                  <span className="w-6">{item.star}점</span>
                  <div className="flex-grow h-1.5 bg-neutral-200/50 rounded-full mx-2.5 overflow-hidden">
                    <div className="h-full bg-dark rounded-full" style={{ width: item.pct }}></div>
                  </div>
                  <span className="w-6 text-right">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2B. Review card list right */}
          <div className="lg:col-span-8 space-y-5">
            {product.reviewList && product.reviewList.length > 0 ? (
              product.reviewList.map((rev) => (
                <div 
                  key={rev.id} 
                  className="bg-white border border-neutral-100 rounded-xl p-5 md:p-6 shadow-[0_4px_15px_rgba(0,0,0,0.01)] hover:border-neutral-200 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-50 pb-3 mb-3.5 gap-2 select-none">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E8DCC9] flex items-center justify-center text-[10.5px] font-black text-[#8A6D48] uppercase">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[11.5px] font-extrabold text-dark tracking-wide">{rev.name}</div>
                        <div className="flex text-yellow-400 text-[9px] mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={9} fill={i < rev.rating ? 'currentColor' : 'none'} className={i < rev.rating ? 'text-yellow-400' : 'text-neutral-200'} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0 justify-between sm:justify-start">
                      <span className="text-[10px] text-neutral-400 font-bold">{rev.date}</span>
                      {rev.option && (
                        <span className="text-[9.5px] text-[#C49A6C] font-black tracking-wide uppercase mt-0.5">
                          구매 옵션: {rev.option}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs md:text-[13px] font-medium text-neutral-600 leading-relaxed">
                    {rev.content}
                  </p>

                  {rev.tags && rev.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {rev.tags.map((tg, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-[#FAF7F2] text-neutral-500 border border-neutral-100/60 text-[9.5px] font-bold tracking-wide">
                          #{tg}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-14 border border-dashed border-neutral-200 rounded-xl text-neutral-400 text-xs font-bold uppercase select-none">
                등록된 고객 리뷰가 존재하지 않습니다.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* PHẦN 3: THÊM 추천 상품 (Recommended Products Widget) */}
      {/* ============================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-100 mt-10">
        <div className="text-center sm:text-left mb-10">
          <h3 className="text-base md:text-lg font-black text-dark tracking-widest uppercase flex items-center gap-2.5">
            <span className="w-1.5 h-4 bg-dark rounded-full"></span>
            추천 상품
          </h3>
          <p className="text-xs text-neutral-400 font-semibold tracking-wide mt-1.5">
            함께 만나보면 더 좋은 프리미엄 컬렉션
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {recommendedProducts.map((rec) => (
            <ProductCard key={rec.id} product={rec} />
          ))}
        </div>
      </div>
      
      {/* gần đây đã xem - Recently Viewed */}
      <div className="border-t border-neutral-100 bg-[#FAF7F2]/30">
        <RecentlyViewedSection 
          limit={4} 
          title="최근 본 상품" 
          subtitle="고객님이 최근에 확인하신 샤넬 제품들입니다."
        />
      </div>

      {/* Sticky Add-to-Cart Bar (Desktop & Mobile) */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-[9000] transform transition-transform duration-500 ease-in-out ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Product Info (Hidden on very small screens) */}
          <div className="hidden sm:flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 bg-[#FAF7F2] rounded-md p-1 border border-neutral-100 flex-shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-black text-[#C49A6C] uppercase tracking-widest">{product.brand}</div>
              <div className="text-xs font-black text-dark truncate leading-tight tracking-wide">{product.koreanName || product.name}</div>
              {selectedOption && (
                <div className="text-[9px] text-neutral-500 font-bold uppercase mt-0.5">옵션: {selectedOption.label}</div>
              )}
            </div>
          </div>

          {/* Pricing & Controls */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-4 md:gap-6 flex-shrink-0">
            <div className="flex flex-col sm:items-end">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest hidden sm:block">총 상품 금액 ({quantity}개)</span>
              <span className="text-lg md:text-xl font-black text-dark tracking-wide">{formatCurrentPrice(totalPrice)}</span>
            </div>
            
            <div className="flex gap-2.5">
              <button 
                onClick={handleWishlist}
                className={`w-12 h-12 rounded-lg border border-neutral-200 flex items-center justify-center transition-all duration-300 active:scale-90 ${
                  isLiked ? 'bg-[#FAF7F2] border-[#D8BFA3]/50 text-[#D8BFA3]' : 'bg-white text-neutral-400 hover:text-dark'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "animate-heart-pop" : ""} />
              </button>
              
              <button 
                onClick={handleAddToCart}
                className="bg-dark text-white font-bold text-[11px] tracking-widest uppercase rounded-lg px-6 md:px-10 h-12 flex items-center justify-center hover:bg-neutral-800 active:scale-95 transition-all shadow-md"
              >
                장바구니 담기
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProductDetail;
