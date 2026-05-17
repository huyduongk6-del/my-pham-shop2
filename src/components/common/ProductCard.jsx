import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductImage from './ProductImage';
import QuickViewModal from '../product/QuickViewModal';

const ProductCard = ({ product }) => {
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = React.useState(false);
  const { id, brand, name, price, rating, reviews, image } = product;
  const isLiked = isInWishlist(id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultOption = (product.options && product.options.length > 0) ? product.options[0] : null;
    addToCart(product, defaultOption, 1);
    openCart();
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-[#D8BFA3]/30 transition-all duration-500 hover:-translate-y-1.5 h-full overflow-hidden">
      {/* Favorite Heart Button */}
      <button 
        onClick={handleFavorite}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-neutral-300 hover:text-[#C49A6C] transition-all active:scale-90 border border-neutral-50 shadow-sm"
      >
        <Heart 
          size={14} 
          className={`${isLiked ? 'fill-rose-beige text-rose-beige' : ''} transition-all duration-300`} 
        />
      </button>

      {/* Standardized Image Component with Shimmer & Quick Action Overlay */}
      <div className="relative overflow-hidden w-full bg-[#FAF7F2]">
        <Link to={`/product/${id}`} className="block w-full">
          <div className="relative group-hover:brightness-105 transition-all duration-500">
            <ProductImage 
              src={image} 
              alt={name} 
              variant="card"
              className="rounded-t-2xl border-none transition-transform duration-700 group-hover:scale-105"
            />
            {/* Shimmer Effect */}
            <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-[-20deg] group-hover:animate-shimmer pointer-events-none"></div>
          </div>
        </Link>
        
        {/* Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-none flex justify-center">
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsQuickViewOpen(true);
            }}
            className="pointer-events-auto bg-white/90 backdrop-blur text-dark text-[10px] font-black tracking-widest px-6 py-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:bg-dark hover:text-white transition-colors uppercase border border-white/50 flex items-center gap-1.5"
          >
            <Eye size={12} />
            빠른 보기
          </button>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="flex flex-col p-5 flex-grow">
        {/* Brand */}
        <span className="text-[9px] font-black tracking-[0.2em] text-[#B9916A] uppercase block leading-tight mb-1.5">
          {brand}
        </span>
        
        {/* Product Name */}
        <Link to={`/product/${id}`}>
          <h3 className="text-[13px] md:text-[14px] font-bold text-[#111111] line-clamp-2 min-h-[40px] tracking-tight leading-snug hover:text-[#C49A6C] transition-colors duration-300">
            {product.koreanName || name}
          </h3>
        </Link>
        
        {/* Price */}
        <p className="text-[15px] font-black text-[#111111] mt-2.5 tracking-tight">
          {price}
        </p>

        {/* Bottom Section: Rating & CTA */}
        <div className="mt-auto pt-4 space-y-3">
          {/* Ratings */}
          <div className="flex items-center space-x-1.5 text-[10px] text-neutral-400 font-bold">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={10} 
                  fill={i < rating ? "currentColor" : "none"} 
                  className={i < rating ? "text-yellow-400" : "text-neutral-200"}
                />
              ))}
            </div>
            <span className="opacity-60">({reviews})</span>
          </div>

          {/* Add to Bag Button */}
          <button 
            onClick={handleAddToCart}
            className="w-full inline-flex items-center justify-center px-5 py-2.5 bg-[#111111] text-white rounded-xl text-[10px] font-black tracking-wider uppercase hover:bg-neutral-800 active:scale-[0.96] transition-all duration-300 gap-2 shadow-sm"
          >
            <ShoppingBag size={13} />
            <span>장바구니 담기</span>
          </button>
        </div>
      </div>

      {/* Quick View Modal rendered conditionally */}
      <QuickViewModal 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </div>
  );
};

export default ProductCard;
