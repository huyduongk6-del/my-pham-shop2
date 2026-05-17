import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Gift, Sparkles, Percent, Heart, Smile, Check, ArrowLeft, Clock } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const MemberBenefitPopup = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  // Mounting and display states
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Multi-step states: 'main' | 'benefit' | 'gift'
  const [popupStep, setPopupStep] = useState('main');
  
  // Clipboard state for coupon copy
  const [isCopied, setIsCopied] = useState(false);
  
  // Luxury loading state for claiming the benefit
  const [isClaimingBenefit, setIsClaimingBenefit] = useState(false);
  
  // Confetti and Timer states
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  
  const STORAGE_KEY = 'beauty_luxe_member_popup_closed_v1';
  const HIDE_DURATION_MS = 10 * 1000; // 10 Seconds (TEMPORARY FOR TESTING) - Change back to 24 * 60 * 60 * 1000 for prod
  const POPUP_DELAY_MS = 2500; // 2.5 seconds


  useEffect(() => {
    let timeoutId;
    
    try {
      const lastClosedTime = localStorage.getItem(STORAGE_KEY);
      const currentTime = Date.now();

      if (lastClosedTime) {
        const timePassed = currentTime - parseInt(lastClosedTime, 10);
        if (timePassed < HIDE_DURATION_MS) {
          return; // Do not show if closed within cooldown
        }
      }

      timeoutId = setTimeout(() => {
        setIsMounted(true);
        setTimeout(() => setIsVisible(true), 50);
      }, POPUP_DELAY_MS);

    } catch (error) {
      console.error("Error accessing localStorage for member popup:", error);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Listen for manual triggers from other components (like Sticky CTA)
  useEffect(() => {
    const handleManualOpen = () => {
      console.log("[Beauty Luxe Debug] Manual popup trigger received.");
      setIsMounted(true);
      setPopupStep('main'); // Always start at main
      setTimeout(() => setIsVisible(true), 50);
    };

    window.addEventListener('openMemberBenefitPopup', handleManualOpen);
    return () => window.removeEventListener('openMemberBenefitPopup', handleManualOpen);
  }, []);

  // Timer logic
  useEffect(() => {
    let timer;
    if (popupStep === 'benefit' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [popupStep, timeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const renderConfetti = () => {
    if (!showConfetti) return null;
    return Array.from({ length: 40 }).map((_, i) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 0.3;
      const duration = 1.5 + Math.random() * 1.5;
      const size = 6 + Math.random() * 4;
      return (
        <div
          key={`confetti-${i}`}
          className="confetti"
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            backgroundColor: i % 3 === 0 ? '#111111' : (i % 2 === 0 ? '#C49A6C' : '#FAF1E6')
          }}
        />
      );
    });
  };

  const handleCloseWithSave = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch (error) {
      console.error("Failed to write to localStorage:", error);
    }
    setTimeout(() => {
      setIsMounted(false);
      setPopupStep('main'); // Reset on unmount
    }, 350);
  };

  const handleCloseImmediately = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch (error) {
      console.error("Failed to write to localStorage:", error);
    }
    setTimeout(() => {
      setIsMounted(false);
      setPopupStep('main');
    }, 350);
  };

  const handleCopyCoupon = async () => {
    const couponCode = "BEAUTY10";
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(couponCode);
        setIsCopied(true);
        addToast('쿠폰 코드가 복사되었습니다. 결제 시 사용해주세요.', 'success');
        setTimeout(() => setIsCopied(false), 1500);
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch (err) {
      addToast('쿠폰 코드 복사에 실패했습니다.', 'error');
    }
  };

  const handleSelectGiftCard = () => {
    handleCloseWithSave();
    setTimeout(() => {
      navigate('/gift-set');
    }, 150);
  };

  const handleClaimBenefit = () => {
    console.log("[Beauty Luxe Debug] Clicked 'Claim Benefit' - starting transition...");
    if (isClaimingBenefit) {
      console.log("[Beauty Luxe Debug] Claim already active, blocked double-click.");
      return;
    }
    setIsClaimingBenefit(true);
    
    // Setup highly robust transition with safety delay of 950ms for maximum browser response speed
    setTimeout(() => {
      console.log("[Beauty Luxe Debug] Transitioning step to 'benefit' and clearing overlay.");
      setIsClaimingBenefit(false);
      setPopupStep('benefit');
      
      // Auto-save coupon to localStorage
      try {
        localStorage.setItem('saved_coupon', 'BEAUTY10');
      } catch (e) {
        console.error("Failed to auto-save coupon", e);
      }
      
      // Trigger confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }, 950);
  };


  const handleGoBack = () => {
    setPopupStep('main');
  };


  if (!isMounted) return null;

  return (
    <div 
      className={`fixed inset-0 z-[20000] flex items-center justify-center p-4 md:p-6 transition-opacity duration-350 ease-out select-none ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
        onClick={handleCloseImmediately}
      />

      {/* Main Popup Container */}
      <div 
        className={`relative w-full max-w-[560px] bg-[#FAF7F2] rounded-[24px] border border-[#E6DED2] overflow-hidden shadow-[0_25px_55px_rgba(0,0,0,0.18)] flex flex-col sm:flex-row transition-all duration-350 ease-out transform ${
          isVisible ? 'translate-y-0 scale-100' : 'translate-y-6 scale-[0.96]'
        }`}
      >
        
        {/* Close Button */}
        <button
          onClick={handleCloseImmediately}
          className="absolute top-4 right-4 z-30 p-1.5 rounded-full bg-white/60 backdrop-blur-md text-neutral-400 hover:text-[#111111] hover:bg-white border border-neutral-100 transition-colors cursor-pointer active:scale-95"
          aria-label="Close"
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        {/* Luxury Inner Loading Overlay */}
        {isClaimingBenefit && (
          <div className="absolute inset-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-[5px] flex flex-col items-center justify-center p-6 animate-fade-in">
            <div className="relative flex items-center justify-center mb-4">
              <div className="absolute inset-0 w-24 h-24 bg-[#C49A6C]/5 rounded-full blur-xl animate-pulse" />
              <Sparkles size={11} className="absolute -top-1.5 -right-2 text-[#C49A6C]/70 animate-bounce" />
              <Sparkles size={10} className="absolute top-6 -left-4 text-[#C49A6C]/50 animate-pulse" />
              <div className="relative w-14 h-14 rounded-full bg-[#FAF1E6] border border-[#C49A6C]/20 flex items-center justify-center text-[#C49A6C] scale-[0.95] animate-scale-up transform shadow-inner">
                <Gift size={22} className="animate-pulse" />
              </div>
            </div>
            <span className="text-[11px] font-black text-[#111111] tracking-wide">
              혜택을 준비하고 있습니다
            </span>
          </div>
        )}

        {/* ============================================
            STEP 1: MAIN SCREEN
            ============================================ */}
        {popupStep === 'main' && (
          <>
            {/* Left Side */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between z-10 animate-fade-in transition-all duration-300">
              <div>
                <span className="inline-block text-[9.5px] font-black text-[#C49A6C] tracking-[0.2em] uppercase mb-3">
                  BEAUTY LUXE MEMBER
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#111111] leading-snug tracking-wide mb-2.5">
                  신규 회원을 위한<br />특별 혜택
                </h2>
                <p className="text-[11px] sm:text-[12px] font-bold text-neutral-400 leading-relaxed mb-6">
                  첫 구매 시 사용할 수 있는 프리미엄 혜택을 받아보세요.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#FAF1E6] flex items-center justify-center text-[#C49A6C] flex-shrink-0">
                      <Percent size={12} strokeWidth={3} />
                    </div>
                    <span className="text-xs font-bold text-[#111111]">첫 구매 10% OFF</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#FAF1E6] flex items-center justify-center text-[#C49A6C] flex-shrink-0">
                      <Gift size={12} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-bold text-[#111111]">무료 선물 포장 제공</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#FAF1E6] flex items-center justify-center text-[#C49A6C] flex-shrink-0">
                      <Sparkles size={12} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-bold text-[#111111]">신상품 및 프로모션 우선 안내</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5 pt-1 w-full">
                <button 
                  onClick={handleClaimBenefit}
                  disabled={isClaimingBenefit}
                  className={`relative w-full py-3.5 bg-[#111111] text-white text-[11px] font-black tracking-[0.15em] uppercase rounded-xl overflow-hidden active:scale-[0.97] transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer flex items-center justify-center gap-2 ${
                    isClaimingBenefit ? 'opacity-95 pointer-events-none' : 'hover:bg-neutral-800'
                  }`}
                >
                  {isClaimingBenefit ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-shimmer" />
                      <Sparkles size={13} className="text-[#C49A6C] animate-spin-slow flex-shrink-0" />
                      <span>혜택 확인 중...</span>
                    </>
                  ) : (
                    '혜택 받기'
                  )}
                </button>

                <button 
                  onClick={() => setPopupStep('gift')}
                  className="w-full py-3.5 bg-white text-[#111111] border border-[#111111] text-[11px] font-black tracking-[0.15em] uppercase rounded-xl hover:bg-neutral-50 active:scale-[0.97] transition-all cursor-pointer"
                >
                  기프트 세트 보기
                </button>
                <button 
                  onClick={handleCloseImmediately}
                  className="w-full py-1.5 text-[10px] font-bold text-neutral-400 hover:text-[#111111] tracking-wider text-center transition-colors cursor-pointer"
                >
                  나중에 보기
                </button>
              </div>
            </div>

            {/* Right Visual Area */}
            <div className="hidden sm:flex w-[210px] bg-white border-l border-[#EEEEEE] relative items-center justify-center overflow-hidden select-none flex-shrink-0">
              <div className="absolute top-1/2 left-1/2 w-[260px] h-[260px] bg-[#FAF7F2] rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse-slow" />
              <div className="relative w-full h-full z-10 flex items-center justify-center p-4">
                <img 
                  src="/images/popup/member-gift.png" 
                  alt="Membership Gift" 
                  className="max-w-full max-h-full object-contain object-center animate-fade-in drop-shadow-md pointer-events-none"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallbackDiv = e.target.nextSibling;
                    if (fallbackDiv) fallbackDiv.style.display = 'flex';
                  }}
                />
                <div style={{ display: 'none' }} className="flex-col items-center text-center space-y-2">
                  <div className="text-4xl font-black text-dark leading-none tracking-tighter">10%</div>
                  <div className="text-xs font-black text-[#C49A6C] tracking-[0.15em] uppercase pb-2">OFF</div>
                  <div className="w-6 h-px bg-[#E6DED2] mx-auto" />
                  <div className="text-[9px] font-black text-neutral-400 tracking-[0.15em]">FREE WRAPPING</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ============================================
            STEP 2: BENEFIT CLAIMED (CONGRATULATIONS) SCREEN
            ============================================ */}
        {popupStep === 'benefit' && (
          <>
            {renderConfetti()}
            {/* Content Side */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between z-10 animate-slide-left transition-all duration-300">
              <div>
                {/* Branding Label */}
                <span className="inline-block text-[9.5px] font-black text-[#C49A6C] tracking-[0.2em] uppercase mb-3">
                  MEMBER ONLY BENEFIT
                </span>

                {/* Big Elegant Title */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111] leading-none tracking-tight">
                    축하합니다!
                  </h2>
                  <Sparkles size={16} className="text-[#C49A6C] animate-pulse" />
                </div>

                {/* Subtitle */}
                <h3 className="text-[12px] font-extrabold text-[#111111] tracking-tight leading-snug mb-0.5">
                  신규 회원 전용 혜택이 발급되었습니다.
                </h3>

                {/* Description */}
                <p className="text-[11px] font-bold text-neutral-400 leading-relaxed mb-4">
                  첫 구매 시 사용할 수 있는 프리미엄 쿠폰을 지금 확인해보세요.
                </p>

                {/* Luxury Coupon Box with Scaling, Entry Glow, & Copy-Success Interaction */}
                <div className={`animate-shine relative bg-[#111111] border border-dashed p-4 rounded-2xl text-center mb-5 select-text animate-scale-up animate-soft-glow transform overflow-hidden transition-all duration-500 ${
                  isCopied 
                  ? 'border-[#C49A6C] shadow-[0_0_25px_rgba(196,154,108,0.4)] scale-[1.015]' 
                  : 'border-[#C49A6C]/50 shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                }`}>
                  
                  {/* Background watermark or badge element */}
                  <div className="absolute -top-1 -right-1 w-16 h-16 bg-white/5 rounded-full blur-xl pointer-events-none" />
                  <span className="absolute top-2 right-3.5 px-2 py-0.5 rounded-full bg-[#C49A6C]/20 border border-[#C49A6C]/30 text-[#C49A6C] text-[8px] font-black tracking-wider uppercase">
                    10% OFF
                  </span>

                  <span className="block text-[25px] font-black text-white tracking-[0.25em] uppercase leading-none font-mono pt-2">
                    BEAUTY10
                  </span>
                  <div className="w-12 h-px bg-neutral-800 mx-auto my-2.5" />
                  <span className="block text-[9px] font-bold text-neutral-400 tracking-[0.15em] uppercase pb-0.5">
                    첫 구매 10% OFF
                  </span>
                </div>

                {/* Rules checklist */}
                <ul className="space-y-2 mb-5 bg-[#FAF1E6]/50 p-3 rounded-xl border border-[#FAF1E6]">
                  <li className="flex items-center gap-2 text-[11px] font-bold text-[#111111]">
                    <Check size={12} className="text-[#C49A6C] flex-shrink-0" strokeWidth={3} />
                    무료 선물 포장 제공
                  </li>
                  <li className="flex items-center gap-2 text-[11px] font-bold text-[#111111]">
                    <Check size={12} className="text-[#C49A6C] flex-shrink-0" strokeWidth={3} />
                    신상품 및 프로모션 우선 안내
                  </li>
                  <li className="flex items-center justify-between w-full pt-1 border-t border-[#C49A6C]/10 text-[11px] font-bold text-[#111111]">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-[#C49A6C] flex-shrink-0" strokeWidth={3} />
                      남은 혜택 시간
                    </div>
                    <span className="text-[#111111] font-mono font-black text-[13px] tracking-wider bg-white px-2 py-0.5 rounded-md shadow-sm border border-[#E6DED2]">{formatTime(timeLeft)}</span>
                  </li>
                </ul>
              </div>

              {/* Action buttons stack */}
              <div className="space-y-2 w-full">
                {/* Primary Copy Button */}
                <button 
                  onClick={handleCopyCoupon}
                  className={`w-full py-3 flex items-center justify-center gap-2 rounded-xl font-black text-[11px] tracking-[0.15em] uppercase transition-all duration-300 active:scale-[0.97] cursor-pointer shadow-sm ${
                    isCopied 
                    ? 'bg-[#C49A6C] text-white' 
                    : 'bg-[#111111] text-white hover:bg-neutral-800'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check size={14} strokeWidth={3} />
                      복사 완료
                    </>
                  ) : (
                    '코드 복사하기'
                  )}
                </button>

                {/* Discovery Pathway Button */}
                <button 
                  onClick={() => setPopupStep('gift')}
                  className="w-full py-3 bg-white text-[#111111] border border-[#111111] text-[11px] font-black tracking-[0.15em] uppercase rounded-xl hover:bg-neutral-50 active:scale-[0.97] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Gift size={13} />
                  기프트 세트 보기
                </button>

                {/* Terminate pathway */}
                <button 
                  onClick={handleCloseWithSave}
                  className="w-full py-1.5 text-[10px] font-bold text-neutral-500 hover:text-[#111111] tracking-wider text-center transition-colors cursor-pointer"
                >
                  쇼핑 계속하기
                </button>

                <p className="text-[9px] sm:text-[10px] font-bold text-neutral-400 text-center leading-none">
                  결제 단계에서 쿠폰 코드를 입력해 주세요.
                </p>

                <div className="flex justify-center pt-0.5">
                  <button 
                    onClick={handleGoBack}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 hover:text-[#111111] transition-colors cursor-pointer group"
                  >
                    <ArrowLeft size={11} className="transform group-hover:-translate-x-0.5 transition-transform" />
                    이전으로
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Panel */}
            <div className="hidden sm:flex w-[210px] bg-white border-l border-[#EEEEEE] relative items-center justify-center overflow-hidden select-none flex-shrink-0">
              <div className="absolute top-1/2 left-1/2 w-[260px] h-[260px] bg-[#FAF7F2] rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="relative w-full h-full z-10 flex items-center justify-center p-4">
                <img 
                  src="/images/popup/member-gift.png" 
                  alt="Gift box" 
                  className="max-w-full max-h-full object-contain opacity-50 drop-shadow-md pointer-events-none blur-[1px]"
                />
              </div>
            </div>
          </>
        )}

        {/* ============================================
            STEP 3: GIFT SET RECOMMENDATION SCREEN
            ============================================ */}
        {popupStep === 'gift' && (
          <div className="w-full p-6 sm:p-8 flex flex-col justify-between z-10 animate-fade-in transition-all duration-300 overflow-y-auto max-h-[90vh] sm:max-h-none">
            <div>
              <span className="inline-block text-[9.5px] font-black text-[#C49A6C] tracking-[0.2em] uppercase mb-3">
                GIFT CURATION
              </span>
              <h2 className="text-lg sm:text-xl font-black text-[#111111] leading-snug tracking-wide mb-1">
                기프트 세트 추천
              </h2>
              <p className="text-[11px] sm:text-[12px] font-bold text-neutral-400 leading-relaxed mb-4">
                어떤 선물을 찾고 계신가요?
              </p>

              {/* 2x2 Dynamic Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                
                {/* Card 1 */}
                <div 
                  onClick={handleSelectGiftCard}
                  className="bg-white border border-neutral-100 rounded-xl p-3 hover:border-[#C49A6C] cursor-pointer group transition-all flex flex-col justify-center active:scale-[0.98] hover:shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5.5 h-5.5 rounded-full bg-[#FAF1E6] text-[#C49A6C] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-colors">
                      <Gift size={11} />
                    </div>
                    <h3 className="text-xs font-black text-[#111111]">생일 선물</h3>
                  </div>
                  <p className="text-[10px] font-bold text-neutral-400 leading-relaxed">
                    특별한 하루를 위한 우아한 향수와 립 세트
                  </p>
                </div>

                {/* Card 2 */}
                <div 
                  onClick={handleSelectGiftCard}
                  className="bg-white border border-neutral-100 rounded-xl p-3 hover:border-[#C49A6C] cursor-pointer group transition-all flex flex-col justify-center active:scale-[0.98] hover:shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5.5 h-5.5 rounded-full bg-[#FAF1E6] text-[#C49A6C] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-colors">
                      <Heart size={11} />
                    </div>
                    <h3 className="text-xs font-black text-[#111111]">연인 선물</h3>
                  </div>
                  <p className="text-[10px] font-bold text-neutral-400 leading-relaxed">
                    로맨틱한 무드를 담은 프리미엄 기프트
                  </p>
                </div>

                {/* Card 3 */}
                <div 
                  onClick={handleSelectGiftCard}
                  className="bg-white border border-neutral-100 rounded-xl p-3 hover:border-[#C49A6C] cursor-pointer group transition-all flex flex-col justify-center active:scale-[0.98] hover:shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5.5 h-5.5 rounded-full bg-[#FAF1E6] text-[#C49A6C] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-colors">
                      <Sparkles size={11} />
                    </div>
                    <h3 className="text-xs font-black text-[#111111]">감사 선물</h3>
                  </div>
                  <p className="text-[10px] font-bold text-neutral-400 leading-relaxed">
                    고급스럽고 부담 없는 뷰티 선물
                  </p>
                </div>

                {/* Card 4 */}
                <div 
                  onClick={handleSelectGiftCard}
                  className="bg-white border border-neutral-100 rounded-xl p-3 hover:border-[#C49A6C] cursor-pointer group transition-all flex flex-col justify-center active:scale-[0.98] hover:shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5.5 h-5.5 rounded-full bg-[#FAF1E6] text-[#C49A6C] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-colors">
                      <Smile size={11} />
                    </div>
                    <h3 className="text-xs font-black text-[#111111]">셀프 기프트</h3>
                  </div>
                  <p className="text-[10px] font-bold text-neutral-400 leading-relaxed">
                    나를 위한 작은 럭셔리
                  </p>
                </div>

              </div>

              {/* Small benefit tagline */}
              <div className="flex justify-center items-center gap-1.5 text-[10px] font-bold text-[#C49A6C] mb-5">
                <Gift size={11} />
                <span>무료 선물 포장 제공</span>
              </div>
            </div>

            {/* Flexible Responsive Footer layout */}
            <div className="flex flex-col sm:flex-row gap-2.5 w-full items-center">
              
              {/* Mobile stacked, desktop dynamic buttons */}
              <div className="flex gap-2 w-full order-1 sm:order-2 flex-1">
                {/* Traversal Link Back to Benefit Step */}
                <button 
                  onClick={handleClaimBenefit}
                  disabled={isClaimingBenefit}
                  className={`relative flex-1 py-3 border text-[11px] font-black tracking-[0.1em] uppercase rounded-xl overflow-hidden active:scale-[0.97] transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                    isClaimingBenefit 
                    ? 'bg-[#111111] border-[#111111] text-white opacity-95 pointer-events-none' 
                    : 'bg-white text-[#111111] border-[#111111] hover:bg-neutral-50'
                  }`}
                >
                  {isClaimingBenefit ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-shimmer" />
                      <Sparkles size={12} className="text-[#C49A6C] animate-spin-slow flex-shrink-0" />
                      <span>혜택 확인 중...</span>
                    </>
                  ) : (
                    <>
                      <Percent size={12} />
                      혜택 받기
                    </>
                  )}
                </button>

                
                {/* Terminate pathway: Go to full catalog */}
                <button 
                  onClick={handleSelectGiftCard}
                  className="flex-1 py-3 bg-[#111111] text-white text-[11px] font-black tracking-[0.1em] uppercase rounded-xl hover:bg-neutral-800 active:scale-[0.97] transition-all cursor-pointer shadow-sm text-center"
                >
                  전체 기프트 세트 보기
                </button>
              </div>

              {/* Go back button */}
              <button 
                onClick={handleGoBack}
                className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-transparent text-neutral-400 hover:text-[#111111] text-[10px] font-bold uppercase rounded-xl active:scale-[0.97] transition-all cursor-pointer flex items-center justify-center gap-1.5 order-2 sm:order-1"
              >
                <ArrowLeft size={11} />
                이전으로
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MemberBenefitPopup;
