import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Star, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(product?.options?.[0] || null);

  if (!isOpen || !product) return null;

  const isLiked = isInWishlist(product.id);
  const currentPrice = selectedOption ? selectedOption.price : product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedOption, quantity);
    onClose();
  };

  const handleViewDetails = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-fade-in z-10">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-neutral-500 hover:text-dark shadow-sm border border-neutral-100"
        >
          <X size={18} />
        </button>

        {/* Left: Image Area */}
        <div className="md:w-1/2 bg-[#FAF7F2] p-8 flex items-center justify-center flex-shrink-0 relative group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain max-h-[300px] md:max-h-[500px] transition-transform duration-500 group-hover:scale-105"
          />
          {product.discountPercent && (
            <span className="absolute top-6 left-6 px-3 py-1 bg-dark text-white text-[10px] font-black uppercase tracking-wider rounded-sm shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Right: Info Area */}
        <div className="md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col custom-scrollbar">
          
          <div className="flex-grow space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-widest text-[#C49A6C] uppercase">
                {product.brand}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-dark tracking-wide leading-tight">
                {product.koreanName || product.name}
              </h2>
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                {product.name}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-yellow-400 text-[10px]">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" stroke="none" />
                ))}
              </div>
              <span className="text-neutral-400 font-bold ml-1">({product.reviews || 128})</span>
            </div>

            <div className="text-2xl font-black text-dark">
              {currentPrice}
            </div>

            <p className="text-xs text-neutral-500 font-medium leading-relaxed">
              {product.shortDescription || product.description?.substring(0, 100) + '...'}
            </p>

            {/* Options */}
            {product.options && product.options.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-2">용량 선택</span>
                <div className="flex flex-wrap gap-2">
                  {product.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedOption(opt)}
                      className={`px-4 py-2 border text-[11px] font-bold rounded-lg transition-all ${
                        selectedOption?.label === opt.label 
                          ? 'border-dark bg-dark text-white' 
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="pt-2">
               <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-2">수량</span>
               <div className="flex items-center justify-between border border-neutral-200 rounded-lg w-28 p-1">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-dark"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-xs font-black">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-dark"
                  >
                    <Plus size={12} />
                  </button>
                </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-8 flex gap-3 mt-auto">
            <button 
              onClick={() => toggleWishlist(product)}
              className={`w-12 h-12 flex-shrink-0 flex items-center justify-center border rounded-xl transition-all ${
                isLiked ? 'border-[#D8BFA3] bg-[#FAF7F2] text-[#D8BFA3]' : 'border-neutral-200 text-neutral-400 hover:text-dark'
              }`}
            >
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={handleAddToCart}
              className="flex-grow bg-dark text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-colors"
            >
              장바구니 담기
            </button>
          </div>
          
          <button 
            onClick={handleViewDetails}
            className="w-full mt-3 py-3 text-[10px] font-bold text-neutral-500 uppercase tracking-widest hover:text-dark transition-colors border border-transparent hover:border-neutral-200 rounded-xl"
          >
            상품 상세 보기
          </button>

        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
