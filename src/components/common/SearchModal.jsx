import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { allProducts } from '../../data/mockup';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchQuery('');
      setResults([]);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const cleanQuery = query.toLowerCase().trim();
    const collapsedQuery = cleanQuery.replace(/\s+/g, '');

    let mappedCategories = [];
    const checkKeys = (keys) => keys.some(k => cleanQuery.includes(k) || collapsedQuery.includes(k));

    if (checkKeys(["perfume", "향수", "프래그런스"])) mappedCategories.push("향수");
    if (checkKeys(["lip", "립", "립스틱", "son"])) mappedCategories.push("립", "립스틱");
    if (checkKeys(["makeup", "메이크업", "foundation", "파운데이션", "mascara", "마스카라"])) mappedCategories.push("메이크업");
    if (checkKeys(["skincare", "스킨케어", "serum", "세럼", "cream", "크림", "cleanser", "클렌저"])) mappedCategories.push("스킨케어");
    if (checkKeys(["gift", "기프트", "선물", "gift set"])) mappedCategories.push("기프트");

    let mappedBrands = [];
    if (checkKeys(["샤넬", "chanel"])) mappedBrands.push("chanel");

    const filtered = allProducts.filter(prod => {
      const pName = prod.name.toLowerCase();
      const pKName = (prod.koreanName || "").toLowerCase();
      const pBrand = prod.brand.toLowerCase();
      const pCat = prod.category.toLowerCase();

      const collapsedPName = pName.replace(/\s+/g, '');
      const collapsedPKName = pKName.replace(/\s+/g, '');

      const nameMatch = pName.includes(cleanQuery) || collapsedPName.includes(collapsedQuery);
      const koreanNameMatch = pKName.includes(cleanQuery) || collapsedPKName.includes(collapsedQuery);
      const brandMatch = pBrand.includes(cleanQuery) || mappedBrands.some(br => pBrand.includes(br));
      const categoryMatch = pCat.includes(cleanQuery);
      const mappedMatch = mappedCategories.some(cat => prod.category.includes(cat));

      return nameMatch || koreanNameMatch || brandMatch || categoryMatch || mappedMatch;
    });

    setResults(filtered);
  };

  const handleSelectProduct = (id) => {
    navigate(`/product/${id}`);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col bg-white/95 backdrop-blur-md animate-fade-in">
      {/* Search Header */}
      <div className="w-full border-b border-neutral-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center relative">
          <Search size={24} className="text-neutral-400 absolute left-4 md:left-6" />
          <input
            ref={inputRef}
            type="text"
            placeholder="검색어를 입력하세요 (예: 넘버5, 세럼)"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-xl md:text-3xl font-black tracking-tight text-dark placeholder-neutral-300 outline-none pl-12 pr-12 md:pl-16 bg-transparent"
          />
          <button 
            onClick={onClose}
            className="absolute right-4 md:right-6 p-2 text-neutral-400 hover:text-dark transition-colors"
          >
            <X size={32} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-grow overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {searchQuery ? (
            results.length > 0 ? (
              <div>
                <h3 className="text-[11px] font-black tracking-widest text-[#C49A6C] uppercase mb-6">
                  추천 검색 결과 <span className="text-dark ml-2">({results.length})</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {results.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod.id)}
                      className="group cursor-pointer flex flex-col"
                    >
                      <div className="aspect-square bg-[#FAF7F2] rounded-2xl flex items-center justify-center p-4 mb-3 border border-transparent group-hover:border-[#C49A6C]/30 transition-all">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <span className="text-[9px] font-black tracking-widest text-[#C49A6C] uppercase">{prod.brand}</span>
                      <h4 className="text-[13px] font-black text-dark truncate mt-1 group-hover:text-[#C49A6C] transition-colors">{prod.koreanName || prod.name}</h4>
                      <p className="text-[10px] text-neutral-400 truncate mt-0.5">{prod.name}</p>
                      <p className="text-[11px] font-black text-dark mt-2">{prod.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <Search size={40} className="mx-auto text-neutral-200 mb-4" />
                <p className="text-lg font-bold text-neutral-400">"{searchQuery}"에 대한 검색 결과가 없습니다.</p>
                <p className="text-xs text-neutral-400 mt-2">다른 검색어로 다시 시도해보세요.</p>
              </div>
            )
          ) : (
            <div>
              <h3 className="text-[11px] font-black tracking-widest text-[#C49A6C] uppercase mb-6">
                인기 검색어
              </h3>
              <div className="flex flex-wrap gap-2">
                {['샤넬 향수', 'N°5', '루쥬 알뤼르', '가브리엘', '레 베쥬', '수블리마지'].map((tag, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSearch(tag)}
                    className="px-5 py-2.5 bg-[#FAF7F2] text-dark text-xs font-bold rounded-full hover:bg-dark hover:text-white transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
