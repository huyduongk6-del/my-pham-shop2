import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Quote, ArrowRight, BadgeCheck } from 'lucide-react';

const CustomerReviewPreview = () => {
  const navigate = useNavigate();

  const stats = [
    { value: "4.9 / 5.0", label: "평균 만족도" },
    { value: "300+", label: "누적 리뷰" },
    { value: "96%", label: "재구매 의사" }
  ];

  const reviews = [
    {
      id: 1,
      name: "김서연",
      initial: "김",
      product: "샤넬 N°5 오 드 빠르펭",
      image: "/images/chanel/chanel-5.png",
      content: "포장이 고급스럽고 선물용으로 정말 만족스러웠어요. 향도 오래 지속돼서 특별한 날 사용하기 좋습니다.",
      tag: "선물용 추천",
      date: "2026.05.15",
      verified: true
    },
    {
      id: 2,
      name: "이지은",
      initial: "이",
      product: "루쥬 코코 블룸",
      image: "/images/makeup/makeup-2.png",
      content: "컬러가 자연스럽고 데일리로 사용하기 좋아요. 패키지도 깔끔해서 사용할 때마다 기분이 좋아집니다.",
      tag: "데일리 립",
      date: "2026.05.12",
      verified: true
    },
    {
      id: 3,
      name: "박민지",
      initial: "박",
      product: "이드라 뷰티 마이크로 세럼",
      image: "/images/skincare/skincare-1.png",
      content: "피부에 가볍게 흡수되고 촉촉함이 오래가요. 첫 구매 혜택까지 받아서 더 만족스러웠습니다.",
      tag: "스킨케어 추천",
      date: "2026.05.10",
      verified: true
    }
  ];

  return (
    <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-100/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Standardized Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-14">
          <span className="text-[10px] md:text-[11px] font-black tracking-[0.3em] text-[#B9916A] uppercase mb-4 block">
            CUSTOMER REVIEW
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#111111] leading-tight tracking-tight">
            생생한 구매 후기
          </h2>
          <div className="w-12 h-[1.5px] bg-[#111111] mt-5 mb-4 rounded-full opacity-80"></div>
          <p className="text-[#777777] text-[12px] md:text-[14px] font-medium tracking-wide mt-1 max-w-2xl leading-relaxed">
            Beauty Luxe 고객님들이 직접 경험한 샤넬 뷰티의 프리미엄 가치
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 md:gap-20 mb-14 md:mb-16 border-y border-neutral-100 py-8 md:py-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-xl md:text-3xl font-black text-dark mb-1">{stat.value}</div>
              <div className="text-[11px] md:text-xs text-neutral-400 font-medium tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="relative bg-white border border-neutral-200/60 p-6 md:p-8 rounded-[24px] hover:border-[#D8BFA3]/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1.5 group flex flex-col justify-between"
            >
              {/* Background Quote Icon */}
              <div className="absolute top-6 right-6 text-[#FAF1E6] transform group-hover:scale-110 group-hover:text-[#F5E6D3] transition-all duration-500 ease-out pointer-events-none">
                <Quote size={54} strokeWidth={1} fill="currentColor" />
              </div>
              
              <div>
                {/* Reviewer Header */}
                <div className="flex items-center gap-3.5 mb-5 relative z-10">
                  <div className="w-11 h-11 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[15px] font-black text-[#111111] border border-[#E6DED2]">
                    {review.initial}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[13px] font-black text-[#111111]">{review.name}</span>
                      {review.verified && (
                        <div className="flex items-center gap-0.5 text-[#C49A6C]">
                          <BadgeCheck size={14} strokeWidth={2.5} />
                          <span className="text-[9px] font-black tracking-widest uppercase mt-0.5">인증</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-0.5 text-[#C49A6C]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-neutral-400 tracking-wider">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-[#333333] text-[13px] font-medium leading-[1.7] mb-6 relative z-10 min-h-[66px]">
                  "{review.content}"
                </p>
              </div>

              {/* Footer: Product Info & Tag */}
              <div className="mt-auto relative z-10">
                <div className="flex items-center gap-3 p-3 bg-[#FAF7F2]/50 rounded-xl border border-neutral-100 group-hover:bg-[#FAF7F2] transition-colors mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white overflow-hidden flex-shrink-0 border border-neutral-100 flex items-center justify-center">
                    <img src={review.image} alt={review.product} className="w-full h-full object-contain p-1" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest block mb-0.5">
                      PURCHASED
                    </span>
                    <p className="text-[11px] font-bold text-[#111111] line-clamp-1">{review.product}</p>
                  </div>
                </div>

                <span className="inline-block px-3.5 py-1.5 bg-white border border-[#E6DED2] text-[10px] font-black text-[#C49A6C] rounded-full tracking-wider shadow-sm">
                  {review.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-neutral-400 text-sm mb-6">더 많은 고객 후기를 확인해보세요.</p>
          <button 
            onClick={() => navigate('/best-seller')}
            className="group inline-flex items-center gap-2 px-10 py-4 bg-dark text-white text-sm font-bold rounded-full hover:bg-neutral-800 transition-all shadow-lg shadow-dark/5"
          >
            베스트셀러 보기
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default CustomerReviewPreview;
