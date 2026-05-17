import React from 'react';
import { Sparkles, Gift, Sun, Droplet, ArrowRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';

const picks = [
  {
    id: 1,
    title: "데일리 엘레강스",
    description: "매일 우아한 무드를 연출하는 데일리 아이템",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "기프트 포 허",
    description: "그녀를 위한 최고의 품격 있는 선물 제안",
    icon: Gift,
  },
  {
    id: 3,
    title: "소프트 메이크업",
    description: "자연스럽고 세련된 내추럴 메이크업 솔루션",
    icon: Sun,
  },
  {
    id: 4,
    title: "프리미엄 스킨케어",
    description: "피부 깊숙이 선사하는 고품격 스킨 리추얼",
    icon: Droplet,
  },
];

const KoreanCuratedPicks = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-white">
      <SectionTitle 
        label="EDITOR'S PICK"
        title="에디터스 픽" 
        subtitle="전문 에디터가 엄선한 샤넬 뷰티의 럭셔리 큐레이션 컬렉션" 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {picks.map((pick) => {
          const IconComponent = pick.icon;
          
          return (
            <div 
              key={pick.id}
              className="group relative overflow-hidden rounded-[24px] p-7 bg-[#FAF7F2]/50 border border-neutral-100/80 hover:border-[#D8BFA3]/40 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[160px] hover:-translate-y-1.5"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#C49A6C] shadow-sm mb-4 transition-transform group-hover:scale-110 duration-500">
                  <IconComponent size={17} strokeWidth={1.5} />
                </div>

                <h3 className="text-xs md:text-[13px] font-black text-dark tracking-[0.08em] uppercase mb-1.5 group-hover:text-[#B08454] transition-colors">
                  {pick.title}
                </h3>
                
                <p className="text-[10.5px] text-neutral-400 font-medium leading-relaxed pr-4">
                  {pick.description}
                </p>
              </div>

              <div className="flex justify-end mt-4">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-dark opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-500 shadow-sm border border-neutral-50">
                  <ArrowRight size={11} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default KoreanCuratedPicks;
