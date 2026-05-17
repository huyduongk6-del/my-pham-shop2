import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, User, Eye, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated, currentUser } = useAuth();

  const handleAddToCart = (product) => {
    addToCart(product, null, 1);
    // Optional: show a mini toast or feedback
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-10 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-[32px] font-black text-dark tracking-tight mb-2 uppercase">위시리스트</h1>
          <p className="text-[14px] font-bold text-neutral-400">관심 있는 샤넬 제품을 모아보세요.</p>
        </div>

        {/* Login Suggestion for Guests */}
        {!isAuthenticated && (
          <div className="mb-8 bg-white border border-[#EEEEEE] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FAF7F2] rounded-full flex items-center justify-center text-[#C49A6C]">
                <User size={20} />
              </div>
              <div className="text-center md:text-left">
                <p className="text-[13px] font-black text-[#111111]">로그인하면 위시리스트를 계정에 저장할 수 있습니다.</p>
                <p className="text-[11px] font-bold text-neutral-400 mt-0.5">여러 기기에서 선호하는 제품을 확인하세요.</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-[#111111] text-white text-[11px] font-black tracking-widest uppercase rounded hover:bg-neutral-800 transition-all"
            >
              로그인
            </button>
          </div>
        )}

        {isAuthenticated && (
          <div className="mb-8 flex items-center gap-2 px-1">
            <span className="text-[12px] font-black text-[#C49A6C] tracking-widest uppercase">{currentUser.name}님의 위시리스트</span>
            <div className="h-[1px] flex-grow bg-[#EEEEEE]"></div>
            <span className="text-[11px] font-black text-neutral-300 uppercase">{wishlistCount} ITEMS</span>
          </div>
        )}

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-[32px] border border-[#EEEEEE] py-24 px-6 text-center shadow-sm">
            <div className="w-20 h-20 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-200">
              <Heart size={32} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-black text-dark tracking-tight mb-2">위시리스트가 비어 있습니다.</h2>
            <p className="text-[13px] font-medium text-neutral-400 mb-10 max-w-xs mx-auto leading-relaxed">
              마음에 드는 샤넬 제품을 위시리스트에 담아 나만의 컬렉션을 완성해보세요.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-10 py-4 bg-[#111111] text-white text-[11px] font-black tracking-[0.2em] uppercase rounded-sm hover:bg-neutral-800 transition-all shadow-lg"
            >
              쇼핑 계속하기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistItems.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl border border-[#EEEEEE] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col relative"
              >
                {/* Remove Button Overlay */}
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-400 hover:text-rose-500 hover:bg-white transition-all shadow-sm"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={14} />
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                </Link>

                {/* Product Info Area */}
                <div className="p-4 md:p-5 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="text-[10px] font-black text-[#D8BFA3] tracking-widest uppercase block mb-0.5">{product.brand}</span>
                    <h3 className="text-[13px] font-extrabold text-[#111111] leading-tight tracking-tight h-10 line-clamp-2">
                      {product.koreanName || product.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex text-amber-400">
                      <Star size={10} fill="currentColor" />
                    </div>
                    <span className="text-[10px] font-black text-[#111111]">{product.rating}</span>
                    <span className="text-[9px] font-bold text-neutral-300">({product.reviewsCount || product.reviews || 0})</span>
                  </div>

                  <div className="mt-auto">
                    <p className="text-[15px] font-black text-[#111111] mb-4">{product.price}</p>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full py-3 bg-[#111111] text-white text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all rounded"
                      >
                        <ShoppingBag size={14} />
                        장바구니 담기
                      </button>
                      
                      <Link
                        to={`/product/${product.id}`}
                        className="w-full py-2.5 border border-neutral-200 text-[#111111] text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-neutral-50 transition-all rounded"
                      >
                        <Eye size={14} />
                        자세히 보기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default WishlistPage;
