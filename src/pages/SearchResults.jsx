import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { allProducts } from '../data/mockup';
import { ChevronRight, Search, Home } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // Category filter tab state
  const [activeTab, setActiveTab] = useState('전체');

  // Tab list options
  const tabs = [
    { label: '전체', value: '전체' },
    { label: '향수', value: '향수' },
    { label: '립', value: '립' },
    { label: '메이크업', value: '메이크업' },
    { label: '스킨케어', value: '스킨케어' },
    { label: '기프트', value: '기프트' }
  ];

  // Scroll to top when page loads or query changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab('전체'); // Reset tab filter on new query
  }, [query]);

  // Unified Search Logic with intelligent aliases and space normalization
  const baseSearchResults = useMemo(() => {
    if (!query.trim()) return [];

    // 1. Standardize & normalize query input
    const cleanQuery = query.toLowerCase().trim();
    const collapsedQuery = cleanQuery.replace(/\s+/g, '');

    // 2. Map search aliases to target internal categories
    let mappedCategories = [];
    const checkKeyword = (words) => words.some(w => cleanQuery.includes(w) || collapsedQuery.includes(w));

    if (checkKeyword(["perfume", "향수", "프래그런스"])) mappedCategories.push("향수");
    if (checkKeyword(["lip", "립", "립스틱", "son"])) mappedCategories.push("립", "립스틱");
    if (checkKeyword(["makeup", "메이크업", "foundation", "파운데이션", "mascara", "마스카라"])) mappedCategories.push("메이크업");
    if (checkKeyword(["skincare", "스킨케어", "serum", "세럼", "cream", "크림", "cleanser", "클렌저"])) mappedCategories.push("스킨케어");
    if (checkKeyword(["gift", "기프트", "선물", "gift set"])) mappedCategories.push("기프트");

    // 3. Scan the Chanel product pool
    return allProducts.filter(prod => {
      const pName = prod.name.toLowerCase();
      const pKName = (prod.koreanName || "").toLowerCase();
      const pBrand = prod.brand.toLowerCase();
      const pCat = prod.category.toLowerCase();

      // Collapsed versions for spacing-tolerant matches (e.g. "per fume" -> "perfume")
      const collapsedPName = pName.replace(/\s+/g, '');
      const collapsedPKName = pKName.replace(/\s+/g, '');

      const nameMatch = pName.includes(cleanQuery) || collapsedPName.includes(collapsedQuery);
      const koreanNameMatch = pKName.includes(cleanQuery) || collapsedPKName.includes(collapsedQuery);
      const brandMatch = pBrand.includes(cleanQuery);
      const categoryMatch = pCat.includes(cleanQuery);
      const mappedMatch = mappedCategories.some(cat => prod.category.includes(cat));

      return nameMatch || koreanNameMatch || brandMatch || categoryMatch || mappedMatch;
    });
  }, [query]);

  // Apply Active Tab Filter on search result
  const finalResults = useMemo(() => {
    if (activeTab === '전체') return baseSearchResults;
    
    return baseSearchResults.filter(prod => {
      const prodCat = prod.category;
      if (activeTab === '립') return prodCat.includes('립');
      return prodCat.includes(activeTab);
    });
  }, [baseSearchResults, activeTab]);


  return (
    <div className="min-h-screen bg-[#FCFBF9] pt-6 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex items-center space-x-2 text-[11px] font-bold text-neutral-400 select-none">
          <Link to="/" className="hover:text-dark flex items-center gap-1 transition-colors"><Home size={11}/> 홈</Link>
          <ChevronRight size={10} />
          <span className="text-dark">검색 결과</span>
        </div>
      </div>

      {/* Page Header Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center">
        <h2 className="text-2xl md:text-[32px] font-black text-dark uppercase tracking-[0.1em]">
          검색 결과
        </h2>
        <div className="h-1 w-10 bg-dark mx-auto mt-4 mb-6"></div>

        {query ? (
          <p className="text-xs md:text-sm text-neutral-500 font-medium tracking-wide mb-2">
            <strong className="text-dark font-black select-all">'{query}'</strong>에 대한 검색 결과입니다.
          </p>
        ) : (
          <p className="text-xs md:text-sm text-neutral-500 font-medium tracking-wide mb-2">
            검색어를 입력해 주세요.
          </p>
        )}

        {baseSearchResults.length > 0 && (
          <span className="inline-block bg-dark text-white text-[9px] font-black tracking-widest px-3 py-1 rounded-full mt-1 uppercase">
            총 {baseSearchResults.length}개 상품
          </span>
        )}
      </div>

      {/* Content Body Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {baseSearchResults.length > 0 ? (
          <>
            {/* Filter Tabs Navigation */}
            <div className="flex items-center justify-center border-b border-neutral-200/60 mb-10 overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 select-none">
              <div className="flex space-x-1 md:space-x-2 pb-[1px]">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.value;
                  // Count items matching this tab to only show relevant ones if desired, or keep static
                  return (
                    <button
                      key={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                      className={`px-5 md:px-8 py-3 text-[11px] font-bold tracking-widest transition-all border-b-2 whitespace-nowrap outline-none ${
                        isActive
                          ? 'border-dark text-dark bg-white md:bg-transparent shadow-[0_4px_10px_rgba(0,0,0,0.02)] md:shadow-none'
                          : 'border-transparent text-neutral-400 hover:text-dark hover:border-neutral-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filtered Grid Content */}
            {finalResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {finalResults.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center flex flex-col items-center justify-center max-w-md mx-auto bg-white border border-[#EEEEEE] rounded-2xl p-8 shadow-sm">
                <Search size={40} className="text-neutral-200 mb-4 stroke-1" />
                <h4 className="text-sm font-extrabold text-dark tracking-wide">이 카테고리에서는 결과가 없습니다.</h4>
                <p className="text-[11px] text-neutral-400 font-medium tracking-wide mt-2 mb-6">전체 탭에서 확인하시거나 다른 검색어를 시도해보세요.</p>
                <button
                  onClick={() => setActiveTab('전체')}
                  className="px-6 py-2.5 bg-dark text-white text-[10px] font-black tracking-widest uppercase rounded-lg active:scale-95 transition-all"
                >
                  전체 결과 보기
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State Container - When no total results exist */
          <div className="py-28 px-4 text-center flex flex-col items-center justify-center max-w-lg mx-auto bg-white border border-[#EEEEEE] rounded-3xl p-10 shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
            <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center mb-6 border border-neutral-100">
              <Search size={24} className="text-neutral-400 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-black text-dark tracking-wider uppercase">
              검색 결과가 없습니다.
            </h3>
            <p className="text-xs text-neutral-400 font-medium tracking-wide leading-relaxed mt-3 mb-8">
              다른 키워드로 다시 검색해 보세요. <br />
              입력한 검색어의 철자가 맞는지 확인해 주세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <Link 
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-dark hover:bg-neutral-800 text-white rounded-xl text-[11px] font-black tracking-widest uppercase shadow-md active:scale-95 transition-all duration-300 sm:w-auto"
              >
                <Home size={12} />
                <span>홈으로 돌아가기</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
