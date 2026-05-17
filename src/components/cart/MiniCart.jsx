import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/price';

const MiniCart = () => {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    clearCart,
    cartCount,
    cartTotal
  } = useCart();
  const { isAuthenticated, currentUser } = useAuth();

  // Determine the currency format basis from existing products, otherwise fallback
  const currencyRef = cartItems.length > 0 ? cartItems[0].price : "";

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }
    closeCart();
    navigate("/checkout");
  };

  const handleClearCart = () => {
    if (window.confirm("장바구니를 비우시겠습니까?")) {
      clearCart();
    }
  };

  return (
    <>
      {/* Global Screen Overlay Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/35 z-[9999] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Slide-Out Right Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[92%] sm:w-[420px] bg-white z-[10000] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Title Bar Segment */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-black text-[#111111] tracking-widest uppercase">
              장바구니
            </h2>
            <span className="px-2.5 py-0.5 bg-[#FAF7F2] border border-neutral-100 text-[#777777] text-[10px] font-black rounded-full">
              총 {cartCount}개 상품
            </span>
          </div>
          <button 
            onClick={closeCart}
            className="p-1.5 rounded-full text-[#777777] hover:text-[#111111] transition-colors hover:bg-[#FAF7F2]"
            aria-label="Close shopping cart"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Auth Prompt Section */}
        <div className="bg-[#FAF7F2] px-6 py-3 border-b border-neutral-100/50">
          {isAuthenticated ? (
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-[#C49A6C] tracking-widest uppercase">
                {currentUser.name}님의 장바구니에 저장됩니다.
              </span>
              <button 
                onClick={() => { closeCart(); navigate('/mypage'); }}
                className="text-[9px] font-black text-[#111111] border-b border-dark/20 pb-0.5"
              >
                마이페이지
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-neutral-400 tracking-widest uppercase">
                로그인하면 장바구니를 계정에 저장할 수 있습니다.
              </span>
              <button 
                onClick={() => { closeCart(); navigate('/login'); }}
                className="text-[10px] font-black text-[#111111] bg-white px-3 py-1 rounded shadow-sm border border-neutral-100 hover:bg-neutral-50 transition-all"
              >
                로그인
              </button>
            </div>
          )}
        </div>

        {/* Main Body Area for Item Scrolling */}
        <div className="flex-1 overflow-y-auto px-6">
          {cartItems.length === 0 ? (
            /* Clean Empty Cart Visual Context */
            <div className="h-full flex flex-col items-center justify-center text-center py-10 select-none">
              <div className="w-16 h-16 bg-[#FAF7F2] text-neutral-300 rounded-full flex items-center justify-center mb-5 border border-neutral-50">
                <ShoppingBag size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-[13.5px] font-black text-[#111111] tracking-wide mb-1">
                장바구니가 비어 있습니다.
              </h3>
              <p className="text-[11px] text-[#777777] font-bold mb-8">
                마음에 드는 럭셔리 뷰티 제품을 담아보세요.
              </p>
              <button 
                onClick={closeCart}
                className="border border-[#111111] bg-white text-[#111111] text-[11px] font-black tracking-widest px-8 py-3.5 hover:bg-[#111111] hover:text-white transition-colors duration-300 uppercase rounded-sm shadow-sm"
              >
                쇼핑 계속하기
              </button>
            </div>
          ) : (
            /* Scrollable Layout of Selected Items */
            <div className="divide-y divide-neutral-100 py-2">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex py-5 gap-4 animate-fade-in">
                  {/* Ivory Thumbnail Background */}
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-[#FAF7F2] border border-neutral-50 flex items-center justify-center p-2 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-[90%] h-[90%] object-contain drop-shadow-sm" 
                      loading="lazy"
                    />
                  </div>

                  {/* Data Grid Details Column */}
                  <div className="flex-grow flex flex-col justify-between py-0.5 min-w-0">
                    <div>
                      <span className="text-[8.5px] font-black text-[#D8BFA3] tracking-[0.15em] block uppercase mb-0.5">
                        {item.brand}
                      </span>
                      <h4 className="text-xs font-extrabold text-[#111111] leading-tight tracking-wide truncate mb-1">
                        {item.koreanName}
                      </h4>
                      
                      {item.option && (
                        <div className="mb-2">
                          <span className="text-[9.5px] text-[#777777] font-bold tracking-wide bg-[#FAF7F2] inline-block px-2 py-0.5 rounded border border-neutral-100/50 select-none">
                            옵션: {typeof item.option === 'object' ? item.option?.label : item.option}
                          </span>
                        </div>
                      )}

                      <div className="text-[12.5px] font-black text-[#111111] tracking-wide">
                        {item.price}
                      </div>
                    </div>

                    {/* Interaction Hub: Quantities & Trashes */}
                    <div className="flex items-center justify-between mt-3 pt-0.5">
                      {/* Incrementer panel */}
                      <div className="flex items-center border border-neutral-200 rounded bg-white shadow-sm">
                        <button 
                          onClick={() => decreaseQuantity(item.cartItemId)}
                          className={`w-6 h-6 flex items-center justify-center text-[#777777] hover:text-[#111111] active:scale-90 transition-transform ${item.quantity <= 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={9} strokeWidth={3} />
                        </button>
                        <span className="text-[10.5px] font-black px-2.5 text-[#111111] min-w-[20px] text-center select-none">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => increaseQuantity(item.cartItemId)}
                          className="w-6 h-6 flex items-center justify-center text-[#777777] hover:text-[#111111] active:scale-90 transition-transform"
                        >
                          <Plus size={9} strokeWidth={3} />
                        </button>
                      </div>

                      {/* Pure deletion command */}
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          removeFromCart(item.cartItemId);
                        }}
                        className="text-[10px] font-black text-[#777777] hover:text-red-500 flex items-center gap-1 transition-colors uppercase tracking-wide"
                      >
                        <Trash2 size={11} strokeWidth={2} />
                        <span>삭제</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fixed Action Bar Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-neutral-100 px-6 py-5 bg-[#FAF7F2]/30 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-black text-[#777777] uppercase tracking-widest">
                총 상품 금액
              </span>
              <span className="text-xl font-black text-[#111111] tracking-wide">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <div className="space-y-2">
              <button 
                onClick={handleCheckout}
                className="w-full py-4 bg-[#111111] text-white text-[11px] font-black tracking-[0.15em] uppercase rounded hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
              >
                결제하기
              </button>
              
              <button 
                onClick={handleClearCart}
                className="w-full py-2 text-[10.5px] font-bold text-[#777777] hover:text-[#111111] transition-colors uppercase tracking-widest text-center"
              >
                장바구니 비우기
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MiniCart;
