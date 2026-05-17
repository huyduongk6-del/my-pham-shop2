import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, Wallet, Smartphone, ShoppingBag, 
  Check, ArrowLeft, ChevronRight, MapPin, Sparkles, X, Lock,
  ShieldCheck, Truck, Calendar, User, Phone, Mail, Building
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/price';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { isAuthenticated, currentUser } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment

  const [form, setForm] = useState({
    name: currentUser?.name || '',
    phone: '',
    email: currentUser?.email || '',
    postcode: '',
    address: '',
    detailAddress: '',
    memo: ''
  });

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      setForm(prev => ({
        ...prev,
        name: prev.name || currentUser.name,
        email: prev.email || currentUser.email
      }));
    }
  }, [isAuthenticated, currentUser]);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState({ text: '', type: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      alert('필수 정보를 모두 입력해 주세요.');
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deliveryFee = cartTotal >= 100000 || cartTotal === 0 ? 0 : 3000;

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    if (couponInput.trim().toUpperCase() === 'BEAUTY10') {
      const discount = Math.round(cartTotal * 0.1);
      setAppliedDiscount(discount);
      setCouponMessage({ text: '쿠폰이 적용되었습니다.', type: 'success' });
    } else {
      setAppliedDiscount(0);
      setCouponMessage({ text: '사용할 수 없는 쿠폰입니다.', type: 'error' });
    }
  };

  const finalTotal = cartTotal + deliveryFee - appliedDiscount;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (currentStep === 1) return; // Must be on step 2
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setCurrentStep(1);
      alert('필수 정보를 입력해 주세요.');
      return;
    }
    
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const rand = Math.floor(1000 + Math.random() * 9000);
    const orderId = `BL${yyyy}${mm}${dd}-${rand}`;
    const orderDate = `${yyyy}.${mm}.${dd}`;

    const paymentMethodLabel = paymentMethod === 'card' ? '카드 결제' : paymentMethod === 'kakao' ? '카카오페이' : '무통장 입금';

    const lastOrder = {
      orderId, orderDate, customer: { ...form }, items: [...cartItems],
      subtotal: cartTotal, shippingFee: deliveryFee, discount: appliedDiscount,
      total: finalTotal, paymentMethod: paymentMethodLabel,
      couponCode: appliedDiscount > 0 ? 'BEAUTY10' : null
    };

    try {
      localStorage.setItem('beauty_luxe_last_order', JSON.stringify(lastOrder));
    } catch (error) {
      console.error(error);
    }
    clearCart();
    navigate('/order-success');
  };

  // Estimated Delivery
  const deliveryDateObj = new Date();
  deliveryDateObj.setDate(deliveryDateObj.getDate() + 2);
  const deliveryDays = ['일', '월', '화', '수', '목', '금', '토'];
  const formattedDeliveryDate = `${deliveryDateObj.getMonth() + 1}월 ${deliveryDateObj.getDate()}일 (${deliveryDays[deliveryDateObj.getDay()]})`;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-white flex flex-col items-center justify-center px-4 py-20">
        <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border border-[#E6DED2] flex items-center justify-center text-[#D8BFA3] mb-6 shadow-sm">
          <ShoppingBag size={32} strokeWidth={1.5} />
        </div>
        <h2 className="text-[22px] font-black text-[#111111] tracking-wide mb-2 uppercase">주문할 상품이 없습니다.</h2>
        <p className="text-neutral-400 text-sm font-bold mb-8 text-center">마음에 드는 샤넬 제품을 장바구니에 담아보세요.</p>
        <button onClick={() => navigate('/')} className="px-10 py-4 bg-[#111111] text-white text-[11px] font-black tracking-[0.2em] uppercase rounded hover:bg-neutral-800 transition-all shadow-md active:scale-[0.98]">쇼핑 계속하기</button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2]/40 min-h-screen pt-6 pb-24 px-4 md:px-8 lg:px-16 select-none">
      <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-[11px] font-bold text-neutral-400 uppercase mb-6 tracking-wider">
        <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors">홈</button>
        <ChevronRight size={10} className="mt-[1px]" />
        <span className="text-[#111111] font-black">안전 결제</span>
      </div>

      <div className="max-w-6xl mx-auto text-center md:text-left mb-8">
        <h1 className="text-2xl md:text-[32px] font-black text-[#111111] tracking-tight mb-2 leading-tight">안전 결제</h1>
        <p className="text-[12px] md:text-[13px] font-bold text-neutral-400 tracking-wide">프리미엄 뷰티 럭스와 cùng하는 안전한 쇼핑</p>
      </div>

      {/* STEPPER UI */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center justify-center md:justify-start gap-4">
          <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-[#111111]' : 'text-neutral-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${currentStep >= 1 ? 'bg-[#111111] text-white shadow-md' : 'bg-neutral-200'}`}>1</div>
            <span className="text-sm font-black tracking-wide">배송 정보</span>
          </div>
          <div className={`h-px w-12 sm:w-24 ${currentStep >= 2 ? 'bg-[#111111]' : 'bg-neutral-200'} transition-all`}></div>
          <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-[#111111]' : 'text-neutral-300'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${currentStep >= 2 ? 'bg-[#111111] text-white shadow-md' : 'bg-neutral-200'}`}>2</div>
            <span className="text-sm font-black tracking-wide">결제 수단</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {!isAuthenticated && currentStep === 1 && (
            <div className="bg-white border border-[#E8DCC9]/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FAF7F2] rounded-full flex items-center justify-center text-[#D8BFA3] group-hover:scale-110 transition-transform"><Sparkles size={20} /></div>
                <div className="text-center sm:text-left">
                  <p className="text-[13px] font-black text-[#111111] tracking-tight">로그인하고 더 편리하게 주문하세요</p>
                  <p className="text-[11px] font-bold text-neutral-400 mt-0.5">회원가입 시 첫 구매 10% 할인 쿠폰이 증정됩니다.</p>
                </div>
              </div>
              <button onClick={() => navigate('/login')} className="px-6 py-2.5 bg-[#111111] text-white text-[11px] font-black tracking-widest uppercase rounded-lg hover:bg-neutral-800 transition-all">로그인 / 회원가입</button>
            </div>
          )}

          {currentStep === 1 ? (
            <div className="bg-white border border-[#EEEEEE] rounded-2xl p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] animate-fade-in">
              <div className="flex items-center gap-3 border-b border-neutral-100 pb-5 mb-8">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#D8BFA3] flex items-center justify-center"><MapPin size={16} /></div>
                <h2 className="text-lg font-black text-[#111111] tracking-wide">배송지 정보 입력</h2>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[#111111] transition-colors" />
                    <input type="text" name="name" value={form.name} onChange={handleInputChange} placeholder="이름 (필수)" className="w-full pl-11 pr-4 py-4 text-[13.5px] text-[#111111] bg-white border border-[#E5E5E5] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl transition-all font-bold placeholder:font-medium placeholder:text-neutral-400" />
                  </div>
                  <div className="relative group">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[#111111] transition-colors" />
                    <input type="tel" name="phone" value={form.phone} onChange={handleInputChange} placeholder="연락처 (필수)" className="w-full pl-11 pr-4 py-4 text-[13.5px] text-[#111111] bg-white border border-[#E5E5E5] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl transition-all font-bold placeholder:font-medium placeholder:text-neutral-400" />
                  </div>
                </div>
                <div className="relative group">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[#111111] transition-colors" />
                  <input type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="이메일 주소" className="w-full pl-11 pr-4 py-4 text-[13.5px] text-[#111111] bg-white border border-[#E5E5E5] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl transition-all font-bold placeholder:font-medium placeholder:text-neutral-400" />
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex gap-3">
                    <div className="relative group flex-1">
                      <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[#111111] transition-colors" />
                      <input type="text" name="postcode" value={form.postcode} onChange={handleInputChange} placeholder="우편번호 (필수)" className="w-full pl-11 pr-4 py-4 text-[13.5px] text-[#111111] bg-white border border-[#E5E5E5] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl transition-all font-bold placeholder:font-medium placeholder:text-neutral-400" />
                    </div>
                    <button type="button" onClick={() => alert("주소 검색")} className="px-6 py-4 border border-[#111111] bg-white text-[#111111] hover:bg-[#111111] hover:text-white text-[12px] font-black tracking-widest uppercase rounded-xl transition-all duration-300">우편번호 찾기</button>
                  </div>
                  <input type="text" name="address" value={form.address} onChange={handleInputChange} placeholder="기본 주소 (필수)" className="w-full px-5 py-4 text-[13.5px] text-[#111111] bg-white border border-[#E5E5E5] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl transition-all font-bold placeholder:font-medium placeholder:text-neutral-400" />
                  <input type="text" name="detailAddress" value={form.detailAddress} onChange={handleInputChange} placeholder="상세 주소" className="w-full px-5 py-4 text-[13.5px] text-[#111111] bg-white border border-[#E5E5E5] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl transition-all font-bold placeholder:font-medium placeholder:text-neutral-400" />
                </div>
                <div className="pt-2">
                  <textarea name="memo" rows="2" value={form.memo} onChange={handleInputChange} placeholder="배송 요청사항을 남겨주세요 (선택)" className="w-full px-5 py-4 text-[13.5px] text-[#111111] bg-white border border-[#E5E5E5] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl transition-all resize-none font-bold placeholder:font-medium placeholder:text-neutral-400" />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button onClick={handleNextStep} className="px-10 py-4.5 bg-[#111111] text-white text-[14px] font-black tracking-[0.1em] uppercase rounded-xl hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-[0_8px_20px_rgba(0,0,0,0.1)] flex items-center gap-2">결제 단계로 이동 <ChevronRight size={16} /></button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#EEEEEE] rounded-2xl p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] animate-fade-in">
              <div className="flex items-center gap-3 border-b border-neutral-100 pb-5 mb-8">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#D8BFA3] flex items-center justify-center"><CreditCard size={16} /></div>
                <h2 className="text-lg font-black text-[#111111] tracking-wide">결제 수단 선택</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label onClick={() => setPaymentMethod('card')} className={`relative border-2 flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all group ${paymentMethod === 'card' ? 'border-[#111111] bg-neutral-50 shadow-sm' : 'border-[#EEEEEE] hover:border-neutral-300'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${paymentMethod === 'card' ? 'bg-[#111111] text-white' : 'bg-neutral-100 text-neutral-400'}`}><CreditCard size={20} /></div>
                  <span className={`text-[13px] font-black tracking-wider uppercase ${paymentMethod === 'card' ? 'text-[#111111]' : 'text-neutral-500'}`}>신용/체크카드</span>
                  {paymentMethod === 'card' && <div className="absolute top-3 right-3 w-5 h-5 bg-[#111111] text-white rounded-full flex items-center justify-center"><Check size={12} strokeWidth={3} /></div>}
                </label>
                <label onClick={() => setPaymentMethod('kakao')} className={`relative border-2 flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all group ${paymentMethod === 'kakao' ? 'border-[#FFEB00] bg-[#FFEB00]/5 shadow-sm' : 'border-[#EEEEEE] hover:border-neutral-300'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${paymentMethod === 'kakao' ? 'bg-[#FFEB00] text-[#3C1E1E]' : 'bg-neutral-100 text-neutral-400'}`}><Smartphone size={20} /></div>
                  <span className={`text-[13px] font-black tracking-wider uppercase ${paymentMethod === 'kakao' ? 'text-[#3C1E1E]' : 'text-neutral-500'}`}>카카오페이</span>
                  {paymentMethod === 'kakao' && <div className="absolute top-3 right-3 w-5 h-5 bg-[#FFEB00] text-[#3C1E1E] rounded-full flex items-center justify-center"><Check size={12} strokeWidth={3} /></div>}
                </label>
                <label onClick={() => setPaymentMethod('bank')} className={`relative border-2 flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all group ${paymentMethod === 'bank' ? 'border-[#111111] bg-neutral-50 shadow-sm' : 'border-[#EEEEEE] hover:border-neutral-300'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${paymentMethod === 'bank' ? 'bg-[#111111] text-white' : 'bg-neutral-100 text-neutral-400'}`}><Wallet size={20} /></div>
                  <span className={`text-[13px] font-black tracking-wider uppercase ${paymentMethod === 'bank' ? 'text-[#111111]' : 'text-neutral-500'}`}>무통장 입금</span>
                  {paymentMethod === 'bank' && <div className="absolute top-3 right-3 w-5 h-5 bg-[#111111] text-white rounded-full flex items-center justify-center"><Check size={12} strokeWidth={3} /></div>}
                </label>
              </div>
              <div className="mt-8 flex justify-start">
                <button onClick={() => setCurrentStep(1)} className="inline-flex items-center gap-2 text-[13px] font-bold text-neutral-400 hover:text-[#111111] transition-colors"><ArrowLeft size={14} /> 이전 단계로</button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-white border border-[#E8DCC9]/50 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
            <h2 className="text-base font-black text-[#111111] tracking-widest uppercase pb-5 border-b border-neutral-100 mb-5 flex items-center gap-2"><ShoppingBag size={18} className="text-[#D8BFA3]" /> 주문 상품</h2>
            <div className="max-h-[320px] overflow-y-auto pr-2 divide-y divide-neutral-100 custom-scrollbar mb-6">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex py-4 gap-3.5 first:pt-0">
                  <div className="w-14 h-14 bg-[#FAF7F2] rounded-lg flex-shrink-0 border border-[#FAF7F2] flex items-center justify-center p-1.5">
                    <img src={item.image} alt={item.name} className="w-[95%] h-[95%] object-contain mix-blend-multiply drop-shadow-sm" />
                  </div>
                  <div className="flex-1 min-w-0 py-0.5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[11.5px] font-extrabold text-[#111111] leading-tight tracking-tight truncate">{item.koreanName}</h4>
                      <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1 text-[10px] font-bold text-neutral-400 tracking-wide">
                        <span>수량: {item.quantity}</span>
                        {item.option && <><span className="text-neutral-200">|</span><span>옵션: {typeof item.option === 'object' ? item.option?.label : item.option}</span></>}
                      </div>
                    </div>
                    <div className="text-[11px] font-black text-[#111111] tracking-wide mt-1">{item.price}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#FAF7F2]/50 p-4 rounded-xl border border-[#FAF7F2] mb-6">
              <label className="block text-[11px] font-black text-[#111111] uppercase tracking-wider mb-2">쿠폰 코드</label>
              <div className="flex gap-2">
                <input type="text" value={couponInput} onChange={(e) => { setCouponInput(e.target.value); if (couponMessage.text) setCouponMessage({ text: '', type: '' }); }} placeholder="쿠폰 코드를 입력하세요" className="flex-1 px-3 py-2.5 bg-white border border-[#EEEEEE] focus:border-[#111111] focus:outline-none rounded-lg text-xs font-bold transition-all placeholder:font-medium placeholder:text-neutral-300 uppercase tracking-wider" />
                <button type="button" onClick={handleApplyCoupon} className="px-4 py-2.5 bg-[#111111] text-white text-[11px] font-black tracking-wider uppercase rounded-lg hover:bg-neutral-800 transition-all active:scale-[0.97] shadow-sm">적용</button>
              </div>
              {couponMessage.text && <p className={`text-[10px] font-bold mt-2 flex items-center gap-1 tracking-tight ${couponMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-500'}`}>{couponMessage.type === 'success' ? <Check size={10} strokeWidth={3} /> : <X size={10} strokeWidth={3} />}{couponMessage.text}</p>}
            </div>

            <div className="border-t border-neutral-100 pt-4 space-y-2.5 mb-6">
              <div className="flex justify-between items-center text-[12px] font-bold tracking-wide text-neutral-500"><span>상품 금액</span><span className="text-[#111111]">{formatPrice(cartTotal)}</span></div>
              <div className="flex justify-between items-center text-[12px] font-bold tracking-wide text-neutral-500"><span>배송비</span><span className={deliveryFee === 0 ? 'text-emerald-600 font-black text-[11px] tracking-wider bg-emerald-50 px-2 py-0.5 rounded' : 'text-[#111111]'}>{deliveryFee === 0 ? '무료' : formatPrice(deliveryFee)}</span></div>
              {appliedDiscount > 0 && <div className="flex justify-between items-center text-[12px] font-black tracking-wide text-[#D8BFA3]"><span>할인 (쿠폰 적용)</span><span>-{formatPrice(appliedDiscount)}</span></div>}
              <div className="flex justify-between items-end pt-5 mt-2 border-t border-neutral-200">
                <span className="text-[15px] font-black text-[#111111] tracking-wider mb-1">총 결제 금액</span>
                <span className="text-[28px] md:text-[32px] font-black text-[#C49A6C] tracking-tight leading-none font-mono">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button onClick={handlePlaceOrder} className={`w-full mt-4 py-5 text-white text-[15px] md:text-[16px] font-black tracking-[0.1em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${currentStep === 2 ? 'bg-[#111111] hover:bg-neutral-800 shadow-[0_10px_20px_rgba(0,0,0,0.1)] active:scale-[0.98]' : 'bg-[#E5E5E5] text-neutral-400 cursor-not-allowed shadow-none'}`}>
              <Lock size={18} className="mb-0.5 opacity-80" />
              <span>{currentStep === 2 ? '안전하게 결제하기' : '배송 정보를 입력해주세요'}</span>
            </button>
            
            {/* Trust Badges & Estimated Delivery */}
            <div className="mt-6 pt-5 border-t border-dashed border-neutral-200">
              <div className="bg-[#FAF7F2]/60 border border-[#FAF7F2] rounded-xl p-3 mb-5 flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#C49A6C] shadow-sm"><Calendar size={14} /></div>
                <div>
                  <div className="text-[10px] font-bold text-neutral-400 tracking-wider">도착 예정일</div>
                  <div className="text-[12px] font-black text-[#111111]">{formattedDeliveryDate} 배송 예정</div>
                </div>
              </div>
              <div className="flex justify-center gap-6">
                <div className="flex flex-col items-center gap-1.5"><ShieldCheck size={20} className="text-[#C49A6C]" /><span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">안전 결제</span></div>
                <div className="flex flex-col items-center gap-1.5"><Truck size={20} className="text-[#C49A6C]" /><span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">무료 배송</span></div>
                <div className="flex flex-col items-center gap-1.5"><Sparkles size={20} className="text-[#C49A6C]" /><span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">정품 보장</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
