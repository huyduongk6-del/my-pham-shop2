import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

const BeautyDiary = () => {
  const revealRef = useScrollReveal();

  const posts = [
    { id: 1, img: '/images/chanel/chanel-8.png', likes: 1240, comments: 45, tag: '#CHANELBEAUTY' },
    { id: 2, img: '/images/chanel/chanel-1-4.png', likes: 856, comments: 23, tag: '#ROUGEALLURE' },
    { id: 3, img: '/images/chanel/chanel-10.png', likes: 2104, comments: 89, tag: '#CHANELSKINCARE' },
    { id: 4, img: '/images/home/pick-lip.png', likes: 932, comments: 34, tag: '#LESBEIGES' },
    { id: 5, img: '/images/chanel/chanel-2-4.png', likes: 1540, comments: 67, tag: '#CHANELFRAGRANCE' },
    { id: 6, img: '/images/gifts/gift-1.png', likes: 721, comments: 12, tag: '#GIFTFORHER' }
  ];

  return (
    <section 
      ref={revealRef}
      className="reveal-wrapper py-16 md:py-24 bg-white border-t border-neutral-100/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[10px] md:text-[11px] font-black tracking-[0.3em] text-[#B9916A] uppercase mb-4 block delay-100">
            BEAUTY DIARY
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#111111] leading-tight tracking-tight delay-200">
            매일의 뷰티 무드를 담다
          </h2>
          <div className="w-12 h-[1.5px] bg-[#111111] mt-5 mb-4 rounded-full opacity-80 mx-auto delay-300"></div>
          <p className="text-[#777777] text-[12px] md:text-[14px] font-medium tracking-wide mt-1 max-w-2xl leading-relaxed delay-400">
            #BeautyLuxeKorea 해시태그와 함께 당신만의 샤넬 뷰티 모먼트를 공유해주세요.
          </p>
        </div>

        {/* Instagram Style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 delay-500">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="group relative aspect-square bg-[#FAF7F2] overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img 
                src={post.img} 
                alt={post.tag}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/600x600/FAF7F2/C49A6C?text=${post.tag.replace('#', '')}`;
                }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center text-white">
                <div className="flex items-center gap-6 mb-3 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex items-center gap-2 group/icon">
                    <Heart size={22} className="transition-transform group-hover/icon:scale-110 group-hover/icon:text-[#C49A6C]" fill="currentColor" />
                    <span className="text-[13px] font-bold tracking-wide">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2 group/icon">
                    <MessageCircle size={22} className="transition-transform group-hover/icon:scale-110 group-hover/icon:text-[#C49A6C]" fill="currentColor" />
                    <span className="text-[13px] font-bold tracking-wide">{post.comments}</span>
                  </div>
                </div>
                <span className="text-[11px] font-black tracking-[0.2em] text-white/90 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75">
                  {post.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action */}
        <div className="flex justify-center mt-12 delay-500">
          <button className="px-8 py-3.5 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors duration-300 rounded-full text-[11px] font-black tracking-[0.2em] uppercase">
            인스타그램 팔로우
          </button>
        </div>

      </div>
    </section>
  );
};

export default BeautyDiary;
