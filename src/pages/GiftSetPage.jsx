import React, { useEffect, useState } from 'react';
import { 
  Gift, Heart, Sparkles, Smile, ShoppingBag, Package, 
  MessageCircle, ShieldCheck, Truck, ChevronDown 
} from 'lucide-react';
import { giftProducts } from '../data/mockup';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/common/ProductCard';

const GiftSetPage = () => {
  const { addToCart, openCart } = useCart();
  const [openFaq, setOpenFaq] = useState(null);
  
  // Images load status tracking for hero
  const [heroImgError, setHeroImgError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    // Option mặc định "기프트 세트" như tài liệu yêu cầu
    const defaultOption = { label: "기프트 세트", price: product.price };
    addToCart(product, defaultOption, 1);
    openCart();
  };

  const handleViewDetail = (e) => {
    e.stopPropagation();
    alert("상세 페이지는 준비 중입니다.");
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Section 2 Data: Occasions
  const occasions = [
    {
      badge: "BIRTHDAY",
      title: "생일 선물",
      desc: "특별한 하루를 위한 향수와 립 조합",
      icon: <Gift size={24} className="text-[#C49A6C]" />
    },
    {
      badge: "LOVE",
      title: "연인 선물",
      desc: "로맨틱한 무드를 담은 프래그런스 세트",
      icon: <Heart size={24} className="text-[#C49A6C]" />
    },
    {
      badge: "THANKS",
      title: "감사 선물",
      desc: "고급스럽지만 부담 없는 뷰티 기프트",
      icon: <Sparkles size={24} className="text-[#C49A6C]" />
    },
    {
      badge: "SELF",
      title: "셀프 기프트",
      desc: "나를 위한 작은 럭셔리 루틴",
      icon: <Smile size={24} className="text-[#C49A6C]" />
    }
  ];

  // Section 5 Data: Process
  const processSteps = [
    {
      step: "STEP 01",
      title: "고객님의 취향 선택",
      desc: "향수, 립, 스킨케어 중 원하는 카테고리를 선택해 주세요."
    },
    {
      step: "STEP 02",
      title: "프리미엄 포장 선택",
      desc: "브랜드 무드에 어울리는 고급 포장 옵션을 확인하세요."
    },
    {
      step: "STEP 03",
      title: "빠른 배송으로 전달",
      desc: "소중한 분께 정성스럽게 준비된 선물을 전달합니다."
    }
  ];

  // Section 6 Data: Services
  const services = [
    {
      icon: <Package size={24} className="text-[#C49A6C]" />,
      title: "무료 선물 포장",
      desc: "기프트 세트 구매 시 고급 포장 서비스를 제공합니다."
    },
    {
      icon: <MessageCircle size={24} className="text-[#C49A6C]" />,
      title: "메시지 카드",
      desc: "소중한 마음을 담은 메시지 카드를 함께 준비할 수 있습니다."
    },
    {
      icon: <ShieldCheck size={24} className="text-[#C49A6C]" />,
      title: "정품 보장",
      desc: "Beauty Luxe는 정품 기준에 맞춘 상품만 안내합니다."
    },
    {
      icon: <Truck size={24} className="text-[#C49A6C]" />,
      title: "빠른 배송",
      desc: "선물 일정에 맞춰 빠르고 안전한 배송을 도와드립니다."
    }
  ];

  // Section 7 Data: FAQ
  const faqs = [
    {
      q: "선물 포장은 무료인가요?",
      a: "기프트 세트 상품은 기본적으로 프리미엄 포장 서비스를 제공합니다."
    },
    {
      q: "메시지 카드를 추가할 수 있나요?",
      a: "주문 시 요청사항에 메시지 내용을 남겨주시면 확인 후 준비해드립니다."
    },
    {
      q: "배송 기간은 얼마나 걸리나요?",
      a: "일반적으로 주문 확인 후 2~5일 이내 배송됩니다."
    },
    {
      q: "교환이나 반품이 가능한가요?",
      a: "상품 수령 후 7일 이내, 미사용 상품에 한해 교환 및 반품 안내가 가능합니다."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-dark">
      
      {/* ==========================================
          PHẦN 1: HERO TRANG GIFT SET
          ========================================== */}
      <section className="bg-[#FAF7F2] relative overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Left */}
            <div className="flex flex-col space-y-6 text-center lg:text-left animate-fade-in">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="px-3 py-1 bg-dark text-white text-[9px] font-black tracking-widest uppercase rounded">
                  FREE WRAPPING
                </span>
                <span className="px-3 py-1 border border-dark/30 text-dark text-[9px] font-black tracking-widest uppercase rounded">
                  PREMIUM GIFT
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs md:text-sm font-bold tracking-widest text-[#C49A6C]">
                  특별한 순간을 위한 프리미엄 뷰티 선물
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-dark tracking-widest uppercase leading-tight">
                  샤넬 기프트 세트
                </h1>
              </div>

              <p className="text-xs md:text-[13px] text-neutral-500 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                샤넬 향수, 립, 스킨케어를 조합한 럭셔리 기프트 컬렉션으로 소중한 사람에게 우아한 감동을 전해보세요.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center lg:justify-start">
                <button 
                  onClick={() => document.getElementById('collection-section').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-dark text-white font-bold text-xs tracking-widest uppercase rounded hover:bg-neutral-800 transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  선물 고르기
                </button>
                <button 
                  onClick={() => document.getElementById('service-section').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-dark bg-transparent text-dark font-bold text-xs tracking-widest uppercase rounded hover:bg-dark hover:text-white transition-all duration-300"
                >
                  포장 서비스 보기
                </button>
              </div>
            </div>

            {/* Image Right */}
            <div className="flex justify-center items-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-[#FAF7F2]">
                {(!heroImgError) ? (
                  <img 
                    src="/images/pages/gift-hero.png" 
                    alt="Chanel Gift Set Hero" 
                    className="w-full h-full object-cover transition-all duration-1000 hover:scale-105 select-none"
                    onError={() => setHeroImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center border border-[#E5DCCF] border-dashed rounded-2xl bg-[#FCFAF6] p-8">
                    <span className="text-[10px] tracking-[0.4em] font-black text-[#C49A6C] mb-3 uppercase">Luxury Beauty</span>
                    <span className="text-xl md:text-2xl font-black text-dark tracking-[0.25em] uppercase border-y border-dark/10 py-4 px-6">
                      CHANEL GIFT
                    </span>
                    <span className="text-[9px] text-neutral-400 mt-4 font-medium">PREMIUM LUXURY SET</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          PHẦN 2: GỢI Ý QUÀ THEO DỊP
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">GIFT OCCASION</span>
          <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-3 uppercase">
            상황별 기프트 추천
          </h2>
          <p className="text-[11px] md:text-xs text-neutral-400 font-semibold tracking-wider mt-2 leading-relaxed">
            선물하는 순간에 맞는 프리미엄 아이템을 골라보세요.
          </p>
          <div className="w-8 h-[2px] bg-[#C49A6C] mx-auto mt-5"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ, index) => (
            <div 
              key={index}
              className="bg-white border border-[#eeeeee] p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:border-[#C49A6C]/40 hover:-translate-y-1 group select-none"
            >
              <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-neutral-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                {occ.icon}
              </div>
              <span className="text-[9px] font-black tracking-widest text-[#C49A6C] border border-[#C49A6C]/20 px-2 py-0.5 rounded mb-3 uppercase">
                {occ.badge}
              </span>
              <h4 className="text-[15px] font-black text-dark tracking-wide mb-2">
                {occ.title}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-medium max-w-[160px]">
                {occ.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          PHẦN 4: HIỂN THỊ GIFT SET NỔI BẬT (Grid)
          ========================================== */}
      <section id="collection-section" className="bg-[#FCFAF8] py-20 md:py-28 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">EXCLUSIVE SELECTION</span>
            <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-3 uppercase">
              샤넬 기프트 컬렉션
            </h2>
            <p className="text-[11px] md:text-xs text-neutral-400 font-semibold tracking-wider mt-2">
              샤넬 하우스의 우아한 가치를 담은 선물 세트를 만나보세요.
            </p>
            <div className="w-8 h-[2px] bg-dark mx-auto mt-5"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {giftProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          PHẦN 5: QUY TRÌNH CHỌN QUÀ (Dark Editorial)
          ========================================== */}
      <section className="bg-[#111111] text-white py-20 md:py-24 overflow-hidden relative">
        {/* Decorative subtle grid background patterns */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 md:mb-20">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#C49A6C] uppercase">EDITORIAL GUIDE</span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-widest mt-3 uppercase">
              선물 준비는 이렇게 진행돼요
            </h2>
            <div className="w-8 h-[1px] bg-neutral-600 mx-auto mt-5"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {processSteps.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center relative">
                {/* Large faded step backdrop number */}
                <div className="text-4xl md:text-5xl font-black tracking-[0.15em] text-[#C49A6C]/90 mb-4 uppercase border-b border-neutral-800 pb-2 w-full">
                  {item.step}
                </div>
                <h4 className="text-[15px] font-black text-white mt-3 tracking-wide">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-medium max-w-[220px] mt-3">
                  {item.desc}
                </p>
                
                {/* Visual arrows between steps on wide screens */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-[25px] -right-8 lg:-right-12 text-neutral-800 font-black text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          PHẦN 6: THÊM SECTION GIFT SERVICE
          ========================================== */}
      <section id="service-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">OUR SERVICE</span>
          <h2 className="text-2xl md:text-3xl font-black text-dark tracking-widest mt-3 uppercase">
            프리미엄 기프트 서비스
          </h2>
          <p className="text-[11px] md:text-xs text-neutral-400 font-semibold tracking-wider mt-2 leading-relaxed">
            선물의 완성도를 높이는 Beauty Luxe 서비스
          </p>
          <div className="w-8 h-[2px] bg-[#C49A6C] mx-auto mt-5"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((srv, idx) => (
            <div key={idx} className="bg-[#FAF7F2]/60 rounded-2xl p-8 text-center flex flex-col items-center group hover:bg-[#FAF7F2] transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                {srv.icon}
              </div>
              <h4 className="text-sm font-black text-dark tracking-wide mb-3">
                {srv.title}
              </h4>
              <p className="text-[11px] md:text-xs text-neutral-500 leading-relaxed font-medium">
                {srv.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          PHẦN 7: THÊM FAQ NGẮN
          ========================================== */}
      <section className="bg-[#FCFAF8] py-16 md:py-24 border-t border-neutral-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-[9px] font-black tracking-[0.3em] text-[#C49A6C] uppercase">FAQ</span>
            <h2 className="text-xl md:text-2xl font-black text-dark tracking-widest mt-2 uppercase">
              기프트 세트 FAQ
            </h2>
            <div className="w-6 h-[2px] bg-dark mx-auto mt-4"></div>
          </div>

          <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200 bg-white rounded-xl overflow-hidden border shadow-[0_4px_15px_rgba(0,0,0,0.01)]">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="group">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left select-none transition-colors group-hover:bg-neutral-50/50"
                  >
                    <span className={`text-xs md:text-[13px] font-black tracking-wide transition-colors ${isOpen ? 'text-[#C49A6C]' : 'text-dark group-hover:text-dark'}`}>
                      Q. {faq.q}
                    </span>
                    <ChevronDown 
                      size={16} 
                      className={`text-neutral-400 transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 text-[#C49A6C]' : ''}`}
                    />
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden bg-neutral-50/40 ${
                    isOpen ? 'max-h-40 opacity-100 border-t border-neutral-100/50' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}>
                    <p className="p-6 text-[11px] md:text-xs text-neutral-500 font-medium leading-relaxed whitespace-pre-line">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default GiftSetPage;
