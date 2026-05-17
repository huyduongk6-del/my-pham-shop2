import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, Copy, ShoppingBag, Calendar, CreditCard, 
  Package, Gift, ChevronRight, AlertCircle, Info
} from 'lucide-react';
import { formatPrice } from '../utils/price';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  // Read last order details from LocalStorage on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    try {
      const storedData = localStorage.getItem('beauty_luxe_last_order');
      if (storedData) {
        setOrder(JSON.parse(storedData));
      }
    } catch (err) {
      console.error("Failed to read order history from localStorage:", err);
    }
  }, []);

  // Action: Copy order ID to clipboard
  const handleCopyOrderId = () => {
    if (!order?.orderId) return;
    navigator.clipboard.writeText(order.orderId)
      .then(() => {
        setIsCopied(true);
        alert("주문번호가 복사되었습니다.");
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error("Failed to copy:", err);
      });
  };

  // EMPTY STATE: No Order Data found
  if (!order) {
    return (
      <div className="min-h-[70vh] bg-white flex flex-col items-center justify-center px-4 py-20 select-none">
        <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#EEEEEE] flex items-center justify-center text-neutral-400 mb-5 animate-fade-in">
          <AlertCircle size={28} strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-black text-[#111111] tracking-tight mb-2">
          주문 정보를 찾을 수 없습니다.
        </h2>
        <p className="text-neutral-400 text-xs font-bold mb-8 tracking-wide text-center max-w-[280px] leading-relaxed">
          주문이 완료되지 않았거나 주문 정보가 만료되었습니다.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-10 py-3.5 bg-[#111111] text-white text-[11px] font-black tracking-[0.2em] uppercase rounded hover:bg-neutral-800 transition-all cursor-pointer active:scale-95 shadow-sm"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2]/40 min-h-screen pt-8 pb-24 px-4 md:px-6 lg:px-8 select-none">
      
      {/* Global Layout Max Width */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* ============================================
            TOP SECTION: SUCCESS CELEBRATION HEADER
            ============================================ */}
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-8 md:p-12 text-center shadow-sm animate-fade-in flex flex-col items-center">
          {/* Premium Gold Ring Graphic */}
          <div className="relative w-16 h-16 bg-[#FAF7F2] text-[#C49A6C] border border-[#E6DED2] rounded-full flex items-center justify-center mb-6 shadow-inner">
            <div className="absolute inset-0 rounded-full border-2 border-[#C49A6C]/20 animate-ping" style={{ animationDuration: '3s' }} />
            <Check size={26} strokeWidth={3} className="animate-scale-up" />
          </div>

          <h1 className="text-[22px] md:text-[28px] font-black text-[#111111] tracking-tight mb-3">
            주문이 완료되었습니다
          </h1>
          
          <p className="text-[13px] font-black text-[#777777] tracking-wide mb-1">
            Beauty Luxe를 이용해 주셔서 감사합니다.
          </p>
          <p className="text-neutral-400 text-xs font-bold tracking-wide mb-8">
            주문 내역은 입력하신 이메일로 안내됩니다.
          </p>

          {/* Core ID Box Wrapper */}
          <div className="w-full max-w-md bg-[#FAF7F2]/70 border border-[#EEEEEE] rounded-xl p-4 md:p-5 grid grid-cols-2 divide-x divide-neutral-200/60 select-text">
            <div className="text-center px-3 flex flex-col justify-center items-center">
              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <Package size={11} /> 주문번호
              </span>
              <span className="text-xs md:text-sm font-black text-[#111111] tracking-tight font-mono flex items-center gap-1.5">
                {order.orderId}
                <button 
                  onClick={handleCopyOrderId}
                  className="text-neutral-300 hover:text-[#C49A6C] cursor-pointer transition-colors flex-shrink-0 select-none"
                  title="주문번호 복사"
                >
                  <Copy size={12} />
                </button>
              </span>
            </div>
            <div className="text-center px-3 flex flex-col justify-center items-center">
              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <Calendar size={11} /> 주문일자
              </span>
              <span className="text-xs md:text-sm font-black text-[#111111] tracking-tight">
                {order.orderDate}
              </span>
            </div>
          </div>
        </div>

        {/* ============================================
            MIDDLE SECTION: 2-COLUMN DUAL BLOCK (SHIPPING & PAYMENT)
            ============================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LEFT CARD: Shipping Info Recap */}
          <div className="bg-white border border-[#EEEEEE] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col">
            <h2 className="text-sm font-black text-[#111111] uppercase tracking-widest pb-4 border-b border-neutral-100 mb-6 flex items-center gap-1.5">
              배송 정보
            </h2>

            <div className="space-y-4 text-[12.5px]">
              <div className="flex flex-col md:flex-row md:gap-4 items-start">
                <span className="w-20 text-[11.5px] font-black text-neutral-400 flex-shrink-0">받는 분</span>
                <span className="font-extrabold text-[#111111]">{order.customer?.name}</span>
              </div>

              <div className="flex flex-col md:flex-row md:gap-4 items-start">
                <span className="w-20 text-[11.5px] font-black text-neutral-400 flex-shrink-0">연락처</span>
                <span className="font-extrabold text-[#111111] font-mono">{order.customer?.phone}</span>
              </div>

              {order.customer?.email && (
                <div className="flex flex-col md:flex-row md:gap-4 items-start">
                  <span className="w-20 text-[11.5px] font-black text-neutral-400 flex-shrink-0">이메일</span>
                  <span className="font-bold text-[#777777]">{order.customer.email}</span>
                </div>
              )}

              <div className="flex flex-col md:flex-row md:gap-4 items-start border-t border-dashed border-neutral-100 pt-3.5 mt-1">
                <span className="w-20 text-[11.5px] font-black text-neutral-400 flex-shrink-0">주소</span>
                <div className="font-bold text-[#111111] leading-relaxed">
                  <p className="text-[11.5px] font-black text-[#C49A6C] mb-0.5">[{order.customer?.postcode || '우편번호'}]</p>
                  <p>{order.customer?.address}</p>
                  <p className="text-[#777777] mt-0.5">{order.customer?.detailAddress}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:gap-4 items-start border-t border-dashed border-neutral-100 pt-3.5 mt-1">
                <span className="w-20 text-[11.5px] font-black text-neutral-400 flex-shrink-0">배송 메모</span>
                <span className="text-neutral-500 font-medium leading-relaxed italic">
                  {order.customer?.memo || "-"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT CARD: Payment Statistics Recap */}
          <div className="bg-white border border-[#EEEEEE] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-black text-[#111111] uppercase tracking-widest pb-4 border-b border-neutral-100 mb-6 flex items-center gap-1.5">
                결제 정보
              </h2>

              <div className="space-y-3.5 text-[12.5px]">
                <div className="flex justify-between items-center">
                  <span className="text-[11.5px] font-black text-neutral-400">결제 방법</span>
                  <span className="font-extrabold text-[#111111] px-2.5 py-0.5 bg-neutral-100 text-[11px] rounded">
                    {order.paymentMethod || '카드 결제'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[11.5px] font-black text-neutral-400">상품 금액</span>
                  <span className="font-extrabold text-[#111111]">{formatPrice(order.subtotal || 0)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[11.5px] font-black text-neutral-400">배송비</span>
                  <span className="font-extrabold text-[#111111]">
                    {order.shippingFee === 0 ? "무료" : `+${formatPrice(order.shippingFee || 0)}`}
                  </span>
                </div>

                {order.discount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-[11.5px] font-black text-[#C49A6C] flex items-center gap-1">
                      <Gift size={11} /> 할인 (BEAUTY10)
                    </span>
                    <span className="font-black text-[#C49A6C]">-{formatPrice(order.discount || 0)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-5 mt-6 flex justify-between items-center">
              <span className="text-xs font-black text-[#111111] tracking-widest uppercase">총 결제 금액</span>
              <span className="text-[24px] font-black text-[#111111] font-mono tracking-tight">
                {formatPrice(order.total || 0)}
              </span>
            </div>
          </div>

        </div>

        {/* ============================================
            PRODUCT RECAP PANEL: ORDER ITEMS
            ============================================ */}
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-sm font-black text-[#111111] uppercase tracking-widest pb-4 border-b border-neutral-100 mb-2">
            주문 상품 ({order.items?.length || 0}개)
          </h2>

          <div className="divide-y divide-neutral-100">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex py-5 gap-4 md:gap-6">
                {/* Image Frame */}
                <div className="w-16 h-16 bg-[#FAF7F2] rounded-lg border border-[#EEEEEE]/40 flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5">
                  <img 
                    src={item.image} 
                    alt={item.koreanName || item.name} 
                    className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm"
                  />
                </div>

                {/* Text Context */}
                <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-center min-w-0 gap-2">
                  <div className="min-w-0">
                    <span className="text-[8px] font-black text-[#C49A6C] tracking-[0.15em] block mb-0.5 uppercase">
                      {item.brand || "CHANEL"}
                    </span>
                    <h4 className="text-xs font-extrabold text-[#111111] tracking-tight truncate max-w-[320px] md:max-w-md mb-1.5">
                      {item.koreanName || item.name}
                    </h4>
                    
                    {/* Option and Quantity Info */}
                    <div className="flex items-center gap-2.5 text-[10px] text-[#777777] font-bold">
                      <span>수량: {item.quantity}</span>
                      {item.option && (
                        <>
                          <span className="text-neutral-200">|</span>
                          <span>옵션: {typeof item.option === 'object' ? item.option?.label : item.option}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Product Pricing */}
                  <div className="text-[12px] font-extrabold text-[#111111] tracking-wide md:text-right">
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================
            BOTTOM NOTICE: ORDER COMPLIANCE ADVISORY
            ============================================ */}
        <div className="bg-[#FAF7F2]/60 border border-[#E6DED2]/50 rounded-xl p-5 md:p-6 space-y-3">
          <div className="flex items-center gap-1.5 text-[11.5px] font-black text-[#111111] tracking-wider mb-1.5">
            <Info size={12} className="text-[#C49A6C]" />
            주문 안내
          </div>
          
          <ul className="space-y-1.5 text-[11px] font-bold text-neutral-500/80 list-disc pl-4 leading-relaxed">
            <li>주문 확인 후 상품 포장 및 발송 준비가 순차적으로 시작됩니다.</li>
            <li>배송 추적 및 배송 정보는 상품 출고 후 입력하신 이메일 및 연락처로 상세히 안내됩니다.</li>
            <li>교환 및 반품 신청은 상품 수령일로부터 7일 이내에 고객센터를 통해 가능합니다.</li>
            <li>Chanel 브랜드의 프리미엄 포장 서비스는 상품의 구성 및 사이즈에 따라 상이하게 제공될 수 있습니다.</li>
          </ul>
        </div>

        {/* ============================================
            FOOTER NAVIGATION COMMAND ACTIONS
            ============================================ */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => navigate('/')}
            className="px-12 py-4 bg-[#111111] text-white text-[11px] font-black tracking-[0.2em] uppercase rounded-xl hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag size={12} />
            계속 쇼핑하기
          </button>

          <button
            onClick={handleCopyOrderId}
            className="px-8 py-4 bg-white text-[#111111] border border-[#EEEEEE] text-[11px] font-black tracking-[0.15em] uppercase rounded-xl hover:bg-neutral-50 hover:border-neutral-300 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {isCopied ? <Check size={12} className="text-emerald-600" /> : <Copy size={11} />}
            주문번호 복사하기
          </button>
        </div>
        
        {/* Small subtext navigations */}
        <div className="flex justify-center">
          <button 
            onClick={() => navigate('/gift-set')}
            className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-[#C49A6C] hover:text-[#111111] transition-colors cursor-pointer group tracking-wider uppercase"
          >
            기프트 세트 더 보기
            <ChevronRight size={12} className="transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
      
    </div>
  );
};

export default OrderSuccessPage;
