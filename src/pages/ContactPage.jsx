import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageSquare, ChevronDown, ChevronUp, CheckCircle, AlertCircle } from 'lucide-react';
import CategoryHero from '../components/category/CategoryHero';

const ContactPage = () => {
  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '상품 상담',
    message: ''
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Form submit logic
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("필수 정보를 입력해 주세요."); // "Please fill out required info."
      return;
    }

    alert("문의가 접수되었습니다."); // "Inquiry has been submitted."
    setFormData({
      name: '',
      email: '',
      phone: '',
      type: '상품 상담',
      message: ''
    });
  };

  // FAQ accordion states
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "정품인가요?",
      a: "Beauty Luxe는 정품 보장 정책을 기준으로 상품을 안내합니다. 모든 제품은 공식 유통 채널을 통해 안전하게 제공되는 정식 수입 정품입니다."
    },
    {
      q: "배송은 얼마나 걸리나요?",
      a: "일반적으로 결제 및 주문 확인이 완료된 시점으로부터 약 2~5영업일 이내 배송됩니다. 도서산간 지역 및 택배사 파업 등의 특이 사유 시 지연될 수 있습니다."
    },
    {
      q: "선물 포장이 가능한가요?",
      a: "기프트 세트 및 단독 명품 뷰티 컬렉션 구매 고객님께 전용 프리미엄 선물 상자 포장 서비스를 제공합니다. 일반 단품 상품의 경우 주문 단계에서 옵션 체크 시 포장 서비스가 적용될 수 있습니다."
    },
    {
      q: "교환이나 반품이 가능한가요?",
      a: "전자상거래법에 따라 상품 수령 후 7일 이내 교환 및 반품 신청이 가능합니다. 단, 위생 상품 특성상 포장 라벨(씰) 개봉 및 실사용 후에는 교환/반품이 제한될 수 있으므로 주의를 부탁드립니다."
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const contactOptions = [
    "상품 상담",
    "배송 문의",
    "교환 및 반품",
    "기프트 서비스",
    "기타"
  ];

  return (
    <div className="min-h-screen bg-[#FCFBF9] pb-20">
      <CategoryHero
        title="고객문의"
        subtitle="궁금한 점이 있으시면 언제든 문의해 주세요"
        description="상품 상담, 배송, 교환 및 기프트 서비스 관련 문의를 도와드립니다."
        image="/images/pages/contact-hero.png"
        buttonText="문의하기"
      />

      {/* Helper Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 select-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-neutral-100 p-8 rounded-3xl text-center hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF7F2] flex items-center justify-center text-dark mb-5">
              <MessageSquare size={20} strokeWidth={1.5} />
            </div>
            <h4 className="text-sm font-black text-dark mb-3 tracking-wide">상품 상담</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">샤넬 제품 선택이 고민되신다면 1:1 전문 뷰티 상담을 신속하게 도와 드립니다.</p>
          </div>

          <div className="bg-white border border-neutral-100 p-8 rounded-3xl text-center hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF7F2] flex items-center justify-center text-dark mb-5">
              <Mail size={20} strokeWidth={1.5} />
            </div>
            <h4 className="text-sm font-black text-dark mb-3 tracking-wide">배송 문의</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">주문 및 발송 처리에 관한 실시간 상태 및 수령 예정일 조회를 확인해 드립니다.</p>
          </div>

          <div className="bg-white border border-neutral-100 p-8 rounded-3xl text-center hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF7F2] flex items-center justify-center text-dark mb-5">
              <Phone size={20} strokeWidth={1.5} />
            </div>
            <h4 className="text-sm font-black text-dark mb-3 tracking-wide">교환 및 반품</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">상품 손상 또는 단순 변심 시 발생하는 교환, 환불 및 반품 절차와 포장 안내를 도와 드립니다.</p>
          </div>
        </div>
      </div>

      {/* Split Content: Form & FAQ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
        
        {/* Column 1: Interactive Form */}
        <div className="bg-white rounded-3xl border border-[#EEEEEE] p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.01)]">
          <div className="mb-8">
            <h3 className="text-lg font-black text-dark tracking-widest uppercase">1:1 문의하기</h3>
            <div className="h-[1px] w-8 bg-[#C49A6C] mt-3 mb-2"></div>
            <p className="text-[10px] text-neutral-400 font-medium">*표시는 필수 입력 항목입니다.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 font-sans">
            {/* Name Input */}
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-2 pl-1">
                이름 *
              </label>
              <input
                type="text"
                required
                placeholder="이름을 입력해 주세요"
                className="w-full px-4 py-3 bg-[#FCFBF9] border border-neutral-200/60 rounded-xl text-xs text-dark outline-none focus:border-dark focus:bg-white transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Email & Phone side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-2 pl-1">
                  이메일 *
                </label>
                <input
                  type="email"
                  required
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 bg-[#FCFBF9] border border-neutral-200/60 rounded-xl text-xs text-dark outline-none focus:border-dark focus:bg-white transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-2 pl-1">
                  연락처
                </label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 bg-[#FCFBF9] border border-neutral-200/60 rounded-xl text-xs text-dark outline-none focus:border-dark focus:bg-white transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Inquiry Type Select Box */}
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-2 pl-1">
                문의 유형
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 bg-[#FCFBF9] border border-neutral-200/60 rounded-xl text-xs text-dark outline-none appearance-none focus:border-dark focus:bg-white transition-all pr-10"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  {contactOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-2 pl-1">
                문의 내용 *
              </label>
              <textarea
                rows={5}
                required
                placeholder="문의하실 세부 내용을 상세히 작성해 주시면 빠른 확인 후 메일로 답변 드리겠습니다."
                className="w-full px-4 py-3 bg-[#FCFBF9] border border-neutral-200/60 rounded-xl text-xs text-dark outline-none focus:border-dark focus:bg-white transition-all resize-none leading-relaxed"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-dark hover:bg-neutral-800 text-white text-[11px] font-black tracking-[0.2em] uppercase rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
            >
              <span>문의 보내기</span>
            </button>
          </form>
        </div>

        {/* Column 2: Elegant FAQ Accordions */}
        <div>
          <div className="mb-10">
            <span className="text-[9px] font-black tracking-[0.25em] text-[#C49A6C] uppercase">SUPPORT</span>
            <h3 className="text-xl md:text-2xl font-black text-dark tracking-widest uppercase mt-1">자주 묻는 질문</h3>
            <p className="text-[11px] text-neutral-400 font-medium mt-2 tracking-wide">자주 접수되는 핵심 문의 내역을 사전에 확인해 보세요.</p>
          </div>

          <div className="space-y-4 select-none">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`border border-neutral-100 rounded-2xl bg-white transition-all duration-300 overflow-hidden ${
                    isOpen ? 'shadow-md border-neutral-200/70' : 'hover:border-neutral-200'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-3 pr-4">
                      <span className={`text-[10px] font-black tracking-widest ${isOpen ? 'text-[#C49A6C]' : 'text-neutral-400'}`}>Q.</span>
                      <span className="text-xs md:text-[13px] font-black text-dark tracking-wide">
                        {faq.q}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp size={16} className="text-neutral-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-neutral-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-40 border-t border-neutral-50' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 py-5 bg-[#FCFBF9]/80 text-[11px] text-neutral-500 font-medium leading-relaxed tracking-wide flex gap-3">
                      <span className="text-[#C49A6C] font-black text-[10px]">A.</span>
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ContactPage;
