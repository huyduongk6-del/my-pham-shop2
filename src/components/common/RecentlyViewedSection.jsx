import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Eye, Trash2, Heart } from 'lucide-react';
import { useRecentlyViewed } from '../../context/RecentlyViewedContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/price';

const RecentlyViewedSection = ({ 
  title = "최근 본 상품", 
  subtitle = "최근 확인한 샤넬 제품을 다시 만나보세요.", 
  limit = 4, 
  showClearButton = false,
  emptyMessage = "최근 본 상품이 없습니다.",
  className = ""
}) => {
  const navigate = useNavigate();
  const { recentlyViewedItems, clearRecentlyViewed, recentlyViewedCount } = useRecentlyViewed();
  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (recentlyViewedItems.length === 0) {
    if (showClearButton) {
      return (
        <div className={`py-16 text-center bg-white rounded-3xl border border-[#EEEEEE] ${className}`}>
          <p className="text-neutral-400 text-[13px] font-medium">{emptyMessage}</p>
        </div>
      );
    }
    return null;
  }

  const itemsToShow = recentlyViewedItems.slice(0, limit);

  const handleClear = () => {
    if (window.confirm("최근 본 상품을 모두 삭제하시겠습니까?")) {
      clearRecentlyViewed();
    }
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, null, 1);
    openCart();
  };

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-[20px] md:text-[24px] font-black text-dark tracking-tight uppercase flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#D8BFA3] rounded-full"></span>
              {title}
            </h2>
            <p className="text-[12px] md:text-[13px] text-neutral-400 font-bold mt-1">
              {subtitle}
            </p>
          </div>
          
          {showClearButton && (
            <button 
              onClick={handleClear}
              className="flex items-center gap-1.5 text-[11px] font-black text-neutral-300 hover:text-rose-500 transition-colors uppercase tracking-widest"
            >
              <Trash2 size={13} />
              전체 삭제
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {itemsToShow.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-2xl border border-[#EEEEEE] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col relative"
            >
              {/* Heart Icon Overlay */}
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
                className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-sm border ${
                  isInWishlist(product.id)
                    ? 'bg-[#FAF7F2] border-[#D8BFA3]/50 text-[#D8BFA3]'
                    : 'bg-white/80 backdrop-blur-md border-neutral-100 text-neutral-300 hover:text-rose-500'
                }`}
              >
                <Heart size={14} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>

              {/* Product Image Area */}
              <Link 
                to={`/product/${product.id}`}
                className="aspect-[4/5] bg-[#FAF7F2] flex items-center justify-center p-6 overflow-hidden relative"
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-500"></div>
              </Link>

              {/* Product Info Area */}
              <div className="p-4 md:p-5 flex flex-col flex-grow">
                <div className="mb-2">
                  <span className="text-[9px] font-black text-[#D8BFA3] tracking-widest uppercase block mb-0.5">{product.brand}</span>
                  <h3 className="text-[12px] md:text-[13px] font-extrabold text-[#111111] leading-tight tracking-tight h-10 line-clamp-2">
                    {product.koreanName || product.name}
                  </h3>
                </div>

                <div className="mt-auto">
                  <p className="text-[14px] font-black text-[#111111] mb-4">{product.price}</p>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full py-3 bg-[#111111] text-white text-[9px] font-black tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all rounded-lg"
                    >
                      <ShoppingBag size={13} />
                      장바구니 담기
                    </button>
                    
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full py-2.5 border border-neutral-200 text-[#111111] text-[9px] font-black tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-neutral-50 transition-all rounded-lg"
                    >
                      <Eye size={13} />
                      자세히 보기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RecentlyViewedSection;
