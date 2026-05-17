import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Sparkles } from 'lucide-react';

const StickyMobileCTA = () => {
  const navigate = useNavigate();

  const handleOpenPopup = () => {
    window.dispatchEvent(new Event('openMemberBenefitPopup'));
  };

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-[9999] animate-slide-up">
      <div className="bg-[#111111] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white/10 p-3 flex items-center justify-between gap-3">
        
        <div className="flex flex-col pl-2">
          <span className="text-[10px] font-black text-[#D8BFA3] tracking-widest uppercase mb-0.5 flex items-center gap-1">
            <Sparkles size={10} />
            신규 회원 혜택
          </span>
          <span className="text-white text-xs font-bold leading-none">
            첫 구매 10% OFF
          </span>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => navigate('/gift-set')}
            className="px-4 py-3 bg-transparent border border-white/20 text-white text-[11px] font-black rounded-xl active:bg-white/5 transition-all"
          >
            기프트 보기
          </button>
          <button 
            onClick={handleOpenPopup}
            className="px-5 py-3 bg-[#D8BFA3] text-[#111111] text-[11px] font-black rounded-xl active:bg-[#E8C7C2] transition-all flex items-center gap-1.5 shadow-lg shadow-black/20"
          >
            <Gift size={13} />
            혜택 받기
          </button>
        </div>

      </div>
      
      {/* Safe area padding for iPhones etc if needed, but the container has bottom-6 which is usually enough */}
    </div>
  );
};

export default StickyMobileCTA;
