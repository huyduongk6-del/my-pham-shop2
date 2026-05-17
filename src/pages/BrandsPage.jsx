import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingBag, Star, ChevronRight, Sparkles } from 'lucide-react';
import { allProducts } from '../data/mockup';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/common/ProductCard';

const brandsData = [
  { id: 'CHANEL', name: 'CHANEL', koreanName: '샤넬', description: '시대를 초월한 클래식과 독보적인 우아함을 선사하는 브랜드.', image: '/images/brands/chanel.png' },
  { id: 'DIOR', name: 'DIOR', koreanName: '디올', description: '화사하고 관능적인 무드의 꾸뛰르 감성을 담아낸 아름다움.', image: '/images/brands/dior.png' },
  { id: 'YSL BEAUTY', name: 'YSL BEAUTY', koreanName: '입생로랑', description: '자유롭고 파격적인 카리스마를 뿜어내는 시크 럭셔리.', image: '/images/brands/ysl.png' },
  { id: 'GIORGIO ARMANI BEAUTY', name: 'GIORGIO ARMANI BEAUTY', koreanName: '아르마니', description: '비단처럼 매끄러운 텍스처로 조각해 낸 궁극의 광채.', image: '/images/brands/armani.png' },
  { id: 'ESTÉE LAUDER', name: 'ESTÉE LAUDER', koreanName: '에스티 로더', description: '갈색병의 신화를 이어가는 과학적 고기능 스킨케어의 정수.', image: '/images/brands/estee-lauder.png' },
  { id: 'LANCÔME', name: 'LANCÔME', koreanName: '랑콤', description: '프렌치 로즈의 깊은 생기와 우아한 행복을 전하는 가치.', image: '/images/brands/lancome.png' },
  { id: 'CLARINS', name: 'CLARINS', koreanName: '클라랑스', description: '풍부한 식물 추출물 과학으로 완성한 자연주의 케어.', image: '/images/brands/clarins.png' },
  { id: 'LA MER', name: 'LA MER', koreanName: '라 메르', description: '해양 추출 에너지인 미라클 브로스의 기적적인 치유력.', image: '/images/brands/la-mer.png' },
  { id: 'TOM FORD BEAUTY', name: 'TOM FORD BEAUTY', koreanName: '톰 포드', description: '감각적이고 대담하며 극도로 세련된 개인의 매력 조각.', image: '/images/brands/tom-ford.png' },
  { id: 'GUCCI BEAUTY', name: 'GUCCI BEAUTY', koreanName: '구찌', description: '레트로 빈티지 로맨티시즘을 현대 코스메틱으로 재해석.', image: '/images/brands/gucci.png' }
];

const BrandsPage = () => {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [activeBrand, setActiveBrand] = useState(searchParams.get('brand') || 'CHANEL');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Sync with URL params when activeBrand changes
  const handleBrandSelect = (brandId) => {
    setActiveBrand(brandId);
    setSearchParams({ brand: brandId });
    
    // Scroll smooth down to products panel
    const element = document.getElementById('brand-products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => p.brand === activeBrand);
  }, [activeBrand]);

  const activeBrandDetails = useMemo(() => {
    return brandsData.find(b => b.id === activeBrand) || brandsData[0];
  }, [activeBrand]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const defaultOption = (product.options && product.options.length > 0)
      ? product.options[0]
      : { label: '기본', price: product.price };
    
    addToCart(product, defaultOption, 1);
    openCart();
  };

  return (
    <div className="min-h-screen bg-white text-dark font-sans">
      {/* HERO SECTION */}
      <section className="bg-[#FAF7F2] border-b border-neutral-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#C49A6C_0.8px,transparent_0.8px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center relative z-10">
          <span className="text-[10px] md:text-[11px] font-black tracking-[0.35em] text-[#C49A6C] uppercase block mb-3">
            LUXURY BRANDS SELECT
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-dark tracking-[0.12em] uppercase leading-tight mb-4">
            럭셔리 뷰티 브랜드
          </h1>
          <p className="text-sm md:text-base text-neutral-500 font-bold tracking-widest uppercase mb-6">
            세계적인 프리미엄 코스메틱 브랜드를 한곳에서
          </p>
          <p className="text-[11px] md:text-xs text-neutral-400 font-medium leading-relaxed max-w-xl mx-auto mb-10 px-4">
            샤넬, 디올, 입생로랑, 아르마니, 에스티 로더 등 엄선된 글로벌 최정상급 프리미엄 뷰티 브랜드를 깊이 있게 만나보세요.
          </p>
          
          <button 
            onClick={() => document.getElementById('brands-grid').scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-dark text-white text-[11px] font-black tracking-[0.2em] uppercase rounded hover:bg-neutral-800 transition-all shadow-md active:scale-95"
          >
            브랜드 둘러보기
          </button>
        </div>
      </section>

      {/* BRAND GRID */}
      <section id="brands-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[9px] font-black tracking-widest text-neutral-400 uppercase block mb-2">OUR PORTFOLIO</span>
          <h2 className="text-2xl md:text-3xl font-black tracking-widest uppercase text-dark">브랜드 리스트</h2>
          <div className="w-8 h-[2px] bg-[#C49A6C] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {brandsData.map((brand) => {
            const isSelected = activeBrand === brand.id;
            return (
              <div
                key={brand.id}
                onClick={() => handleBrandSelect(brand.id)}
                className={`group relative border bg-white rounded-2xl p-8 flex flex-col justify-between h-[220px] cursor-pointer transition-all duration-500 ${
                  isSelected 
                    ? 'border-dark shadow-[0_15px_40px_rgba(0,0,0,0.05)] translate-y-[-4px]' 
                    : 'border-[#EEEEEE] hover:border-[#C49A6C] hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Decorative background letter */}
                  <div className="absolute top-4 right-6 text-6xl md:text-7xl font-black text-neutral-50/70 font-serif select-none group-hover:text-neutral-100/80 transition-colors leading-none z-0">
                    {brand.name.charAt(0)}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg md:text-xl font-black text-dark tracking-widest font-serif leading-none uppercase">
                        {brand.name}
                      </h3>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#C49A6C] animate-pulse"></span>
                      )}
                    </div>
                    <span className="text-[10px] font-black text-[#C49A6C] tracking-widest block mb-4">
                      {brand.koreanName}
                    </span>
                    <p className="text-[11px] leading-relaxed text-neutral-400 font-medium max-w-[85%]">
                      {brand.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center text-xs font-black tracking-widest uppercase mt-6 transition-all duration-300 group-hover:text-[#C49A6C]">
                  <span className={`text-[10px] tracking-[0.2em] ${isSelected ? 'text-[#C49A6C]' : 'text-dark'}`}>
                    제품 보기
                  </span>
                  <ChevronRight size={12} className={`ml-1 transition-transform ${isSelected ? 'translate-x-1 text-[#C49A6C]' : 'group-hover:translate-x-1'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BRAND PRODUCTS SHOWCASE */}
      <section id="brand-products" className="bg-[#FCFAF8] border-t border-neutral-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 pb-8 mb-12">
            <div className="mb-4 md:mb-0">
              <span className="text-[9px] font-black tracking-widest text-[#C49A6C] uppercase block mb-1">ACTIVE BRAND</span>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl md:text-3xl font-black tracking-widest uppercase text-dark leading-none">
                  {activeBrandDetails.name}
                </h2>
                <span className="text-xs font-bold bg-dark text-white px-2.5 py-0.5 rounded tracking-wider select-none">
                  {filteredProducts.length} Items
                </span>
              </div>
              <p className="text-[11px] md:text-xs text-neutral-400 font-medium tracking-wide mt-2.5">
                {activeBrandDetails.koreanName}의 시그니처 라인업을 만나보세요.
              </p>
            </div>

            <div className="text-[10px] font-black text-[#C49A6C] tracking-widest uppercase flex items-center gap-1 hover:underline cursor-pointer select-none">
              <span>ALL PREMIUM BRANDS</span>
              <Sparkles size={12} />
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-2xl border border-neutral-100 max-w-md mx-auto select-none shadow-sm flex flex-col items-center">
              <Sparkles size={24} className="text-neutral-300 mb-4 animate-pulse" />
              <p className="text-neutral-400 text-[11px] font-bold tracking-widest uppercase px-4">
                이 브랜드에 등록된 상품이 곧 입고될 예정입니다.
              </p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default BrandsPage;
