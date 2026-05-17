import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ProductImage from './ProductImage';
import QuickViewModal from '../product/QuickViewModal';

const HorizontalProductCard = ({ product }) => {
  const { addToCart, openCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = React.useState(false);
  const { id, brand, name, price, rating, reviews, image } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultOption = (product.options && product.options.length > 0) ? product.options[0] : null;
    addToCart(product, defaultOption, 1);
    openCart();
  };

  return (
    <div className="group relative flex bg-white rounded-2xl border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-[#D8BFA3]/30 transition-all duration-500 hover:-translate-y-1 p-3 items-center gap-4">
      {/* Horizontal Image Section */}
      <div className="relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl">
        <Link to={`/product/${id}`}>
          <div className="group-hover:brightness-105 transition-all duration-500">
            <ProductImage 
              src={image} 
              alt={name} 
              variant="horizontal" 
              className="rounded-xl border-none transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Quick View Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/5 rounded-xl">
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsQuickViewOpen(true);
            }}
            className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-dark hover:bg-dark hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0"
            aria-label="Quick View"
          >
            <Eye size={14} />
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col flex-grow min-w-0 pr-2">
        <span className="text-[8px] font-black tracking-[0.2em] text-[#B9916A] uppercase mb-1">
          {brand}
        </span>
        
        <Link to={`/product/${id}`}>
          <h3 className="text-[12px] font-bold text-[#111111] line-clamp-1 hover:text-[#C49A6C] transition-colors duration-300">
            {product.koreanName || name}
          </h3>
        </Link>
        
        <p className="text-[13px] font-black text-[#111111] mt-1 tracking-tight">
          {price}
        </p>

        <div className="flex items-center justify-between mt-3">
          {/* Rating */}
          <div className="flex items-center space-x-1 text-[9px] text-neutral-400 font-bold">
            <Star size={9} fill="#fbbf24" className="text-yellow-400" />
            <span>{rating} ({reviews})</span>
          </div>

          {/* Minimalist Cart Icon Button */}
          <button 
            onClick={handleAddToCart}
            className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center hover:bg-neutral-800 transition-all active:scale-90 shadow-sm"
          >
            <ShoppingBag size={13} />
          </button>
        </div>
      </div>

      <QuickViewModal 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </div>
  );
};

export default HorizontalProductCard;
