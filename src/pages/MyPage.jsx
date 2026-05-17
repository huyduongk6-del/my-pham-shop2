import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { User, Mail, Calendar, ShoppingBag, LogOut, ChevronRight, ArrowRight, Camera, Heart, Crown } from 'lucide-react';
import { formatPrice } from '../utils/price';
import RecentlyViewedSection from '../components/common/RecentlyViewedSection';

const MyPage = () => {
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated, updateProfile } = useAuth();
  const { cartCount, cartTotal, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const fileInputRef = React.useRef(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="w-full max-w-[400px] bg-white rounded-[24px] border border-[#EEEEEE] p-10 text-center shadow-sm">
          <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-300">
            <User size={30} />
          </div>
          <h2 className="text-xl font-black text-dark tracking-tight mb-2">
            로그인이 필요합니다
          </h2>
          <p className="text-[13px] font-medium text-neutral-400 mb-8">
            회원 전용 기능을 이용하시려면 로그인을 해주세요.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-4 bg-[#111111] text-white text-[11px] font-black tracking-[0.2em] uppercase rounded-xl hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-md"
          >
            로그인하러 가기
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        updateProfile({ profilePicture: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-10 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-[32px] font-black text-dark tracking-tight mb-2">마이페이지</h1>
          <p className="text-[14px] font-bold text-neutral-400">회원 정보와 장바구니를 확인해보세요.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: User Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[24px] border border-[#EEEEEE] p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-neutral-50">
                <div 
                  onClick={triggerFileInput}
                  className="w-16 h-16 rounded-full bg-[#E8DCC9] flex items-center justify-center text-2xl font-black text-[#8A6D48] border-2 border-white shadow-sm uppercase relative group cursor-pointer overflow-hidden"
                >
                  {currentUser.profilePicture ? (
                    <img 
                      src={currentUser.profilePicture} 
                      alt={currentUser.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{currentUser.name.charAt(0)}</span>
                  )}
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera size={20} className="text-white" />
                  </div>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-black text-dark tracking-tight">{currentUser.name}님</h2>
                  <span className="text-[10px] font-black text-[#C49A6C] tracking-widest uppercase">Premium Member</span>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF7F2] flex items-center justify-center text-neutral-400">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest leading-none mb-1">이메일</p>
                    <p className="text-[13.5px] font-bold text-dark">{currentUser.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF7F2] flex items-center justify-center text-neutral-400">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest leading-none mb-1">가입일</p>
                    <p className="text-[13.5px] font-bold text-dark">{currentUser.createdAt}</p>
                  </div>
                </div>
              </div>

              {/* VIP Progress Bar */}
              <div className="mt-8 pt-6 border-t border-neutral-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Crown size={14} className="text-[#C49A6C]" />
                    <span className="text-xs font-black text-dark uppercase tracking-widest">VIP 멤버십 진행도</span>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400">PLATINUM까지</span>
                </div>
                
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-[#C49A6C] rounded-full w-[70%]"></div>
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-neutral-400">현재: 350,000원</span>
                  <span className="text-[#C49A6C]">150,000원 추가 결제시 승급</span>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-neutral-50">
                <button
                  onClick={handleLogout}
                  className="w-full py-3.5 bg-white border border-neutral-200 text-neutral-400 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 text-[11px] font-black tracking-[0.2em] uppercase rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={14} />
                  로그아웃
                </button>
              </div>
            </div>
          </div>

          {/* Right: Cart Summary & Quick Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Cart Summary Card */}
            <div className="bg-[#111111] rounded-[24px] p-8 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.05] to-transparent pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingBag size={18} className="text-[#D8BFA3]" />
                  <h3 className="text-sm font-black tracking-widest uppercase">나의 장바구니</h3>
                </div>

                <div className="flex items-end justify-between mb-8">
                  <div>
                    <p className="text-[11px] font-bold text-neutral-400 mb-1">현재 담긴 상품</p>
                    <p className="text-3xl font-black">{cartCount}개</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-neutral-400 mb-1">총 상품 금액</p>
                    <p className="text-2xl font-black text-[#D8BFA3] tracking-wide">{formatPrice(cartTotal)}</p>
                  </div>
                </div>

                <button
                  onClick={openCart}
                  className="w-full py-4 bg-[#D8BFA3] text-[#111111] text-[11px] font-black tracking-[0.2em] uppercase rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2"
                >
                  장바구니 보기
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Quick Menu List */}
            <div className="bg-white rounded-[24px] border border-[#EEEEEE] overflow-hidden shadow-sm">
              <div className="divide-y divide-neutral-50">
                {[
                  { title: '주문 내역', desc: '주문하신 상품의 배송 상태를 확인하세요.', path: null },
                  { title: '위시리스트', desc: `관심 상품으로 등록한 아이템 목록입니다. (${wishlistCount}개)`, path: '/wishlist' },
                  { title: '쿠폰함', desc: '사용 가능한 회원 전용 할인 쿠폰입니다.', path: null },
                  { title: '1:1 문의', desc: '도움이 필요하시면 언제든 문의해 주세요.', path: null }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => item.path ? navigate(item.path) : alert('해당 기능은 준비 중입니다.')}
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-neutral-50 transition-colors group text-left"
                  >
                    <div>
                      <h4 className="text-[14px] font-black text-dark mb-0.5 group-hover:text-[#C49A6C] transition-colors">{item.title}</h4>
                      <p className="text-[11px] font-bold text-neutral-400">{item.desc}</p>
                    </div>
                    <ChevronRight size={18} className="text-neutral-200 group-hover:text-dark group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 최근 본 상품 - Recently Viewed (MyPage) */}
        <RecentlyViewedSection 
          limit={4} 
          showClearButton={true} 
          title="최근 본 상품"
          subtitle="최근 확인한 상품을 다시 확인해보세요."
          emptyMessage="최근 본 상품이 없습니다."
          className="mt-12"
        />
      </div>
    </div>
  );
};

export default MyPage;
