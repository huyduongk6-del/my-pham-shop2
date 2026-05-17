import React from 'react';
import { ArrowRight } from 'lucide-react';
import HorizontalProductCard from '../common/HorizontalProductCard';
import { bestSellers } from '../../data/mockup';

const BestSellers = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-white">
      
      {/* Clean Minimalist Header Container */}
      <div className="flex flex-col items-center text-center mb-12">
        <span className="text-[10px] md:text-[11px] font-black tracking-[0.3em] text-[#B9916A] uppercase mb-4 block">
          CHANEL BEST SELLER
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-[#111111] leading-tight tracking-tight">
          샤넬 베스트셀러
        </h2>
        <div className="w-12 h-[1.5px] bg-[#111111] mt-5 mb-4 rounded-full opacity-80 mx-auto"></div>
        <p className="text-[#777777] text-[12px] md:text-[14px] font-medium tracking-wide mt-1 max-w-2xl leading-relaxed">
          가장 사랑받는 샤넬 프리미엄 뷰티 아이템
        </p>
        
        <a 
          href="/best-seller" 
          className="group inline-flex items-center space-x-1.5 text-[11px] font-black tracking-[0.1em] text-dark hover:text-[#C49A6C] transition-colors mt-8 uppercase border-b border-dark/20 pb-0.5"
        >
          <span>전체보기</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Grid of Horizontal Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bestSellers.map((product) => (
          <HorizontalProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  );
};

export default BestSellers;
