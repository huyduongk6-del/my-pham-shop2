import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import { allProducts } from '../../data/mockup';
import { useCart } from '../../context/CartContext';
import ProductImage from '../common/ProductImage';
import ProductCard from '../common/ProductCard';

const ChanelCollection = () => {
  const { addToCart, openCart } = useCart();
  const [activeTab, setActiveTab] = useState("전체");
  
  // Category tabs for Chanel collection filtering
  const tabs = ["전체", "향수", "립", "메이크업", "스킨케어", "기프트"];

  const filteredProducts = activeTab === "전체" 
    ? allProducts.slice(0, 12) 
    : allProducts.filter(product => {
        if (activeTab === "향수") return product.category === "향수";
        if (activeTab === "립") return product.subCategory === "Lip";
        if (activeTab === "메이크업") return product.category === "메이크업";
        if (activeTab === "스킨케어") return product.category === "스킨케어";
        if (activeTab === "기프트") return product.category === "기프트";
        return true;
      });

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    const defaultOption = (product.options && product.options.length > 0) ? product.options[0] : { label: "기본", price: product.price };
    
    addToCart(product, defaultOption, 1);
    openCart();
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 border-t border-neutral-100/70 bg-white">
      {/* Standardized Header */}
      <SectionTitle 
        label="CHANEL COLLECTION"
        title="샤넬 컬렉션" 
        subtitle="샤넬 고유의 정체성과 아이코닉한 감성을 담아낸 오리지널 컬렉션"
      />

      {/* Tab Filters */}
      <div className="flex items-center justify-start sm:justify-center space-x-2.5 overflow-x-auto pb-5 no-scrollbar mb-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-md text-[10px] sm:text-[11px] font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300 border ${
                isActive
                  ? "bg-dark text-white border-dark shadow-sm scale-105"
                  : "bg-white text-neutral-400 border-neutral-100 hover:border-neutral-300 hover:text-dark"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Responsive Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Fallback */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 text-neutral-400 text-xs font-bold tracking-widest border border-dashed border-neutral-200 rounded-xl mt-8">
          해당 카테고리에 등록된 상품이 없습니다
        </div>
      )}
    </section>
  );
};

export default ChanelCollection;
