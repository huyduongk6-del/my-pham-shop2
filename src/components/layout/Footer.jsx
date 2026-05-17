import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-[#111111] text-neutral-400 pt-16 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-neutral-800">
          
          {/* 1. Brand / Slogan Column */}
          <div className="space-y-5 flex flex-col items-start">
            <div className="flex flex-col justify-center select-none group">
              <h3 className="text-xl md:text-2xl font-black tracking-[0.15em] text-white uppercase leading-none">
                Beauty<span className="font-normal text-neutral-300">Luxe</span>
              </h3>
              <p className="text-[8.5px] tracking-[0.22em] font-bold text-[#C49A6C] uppercase leading-none mt-1.5">
                K-Style Premium Beauty
              </p>
            </div>
            
            <p className="text-xs text-neutral-500 leading-relaxed font-medium pr-6">
              샤넬 공식 수입 정품과 럭셔리 프리미엄 뷰티의 가치를 선사합니다. 모던한 서울 라이프스타일과 샤넬의 시간을 초월한 우아함을 잇는 프리미엄 부티크 공간.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-1">
              <a href="#" className="w-8 h-8 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:border-neutral-600 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:border-neutral-600 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:border-neutral-600 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
            </div>
          </div>

          {/* 2. Brand links */}
          <div>
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.15em] mb-6 flex items-center">
              <span className="w-1 h-3 bg-[#C49A6C] rounded-full mr-2"></span>
              브랜드 소개
            </h4>
            <ul className="space-y-3.5 text-xs font-medium">
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all duration-300">스토리 및 비전</a></li>
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all duration-300">오프라인 매장 안내</a></li>
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all duration-300">채용 안내</a></li>
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all duration-300">협업 및 제휴 문의</a></li>
            </ul>
          </div>

          {/* 3. Customer Support */}
          <div>
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.15em] mb-6 flex items-center">
              <span className="w-1 h-3 bg-[#C49A6C] rounded-full mr-2"></span>
              고객 지원
            </h4>
            <ul className="space-y-3.5 text-xs font-medium">
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all duration-300">개인정보 처리방침</a></li>
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all duration-300">배송 조회 및 요율</a></li>
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all duration-300">교환 및 반품 규정</a></li>
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all duration-300">자주 묻는 질문(FAQ)</a></li>
            </ul>
          </div>

          {/* 4. Contact Information */}
          <div>
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.15em] mb-6 flex items-center">
              <span className="w-1 h-3 bg-[#C49A6C] rounded-full mr-2"></span>
              연락처 정보
            </h4>
            <ul className="space-y-4 text-xs font-medium">
              <li className="flex items-start space-x-2.5">
                <MapPin size={13} className="text-[#C49A6C] mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">서울특별시 송파구 올림픽로 300 롯데월드타워 100층</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone size={13} className="text-[#C49A6C] flex-shrink-0" />
                <span>대표전화: 02-1234-5678</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={13} className="text-[#C49A6C] flex-shrink-0" />
                <span>이메일: kr.support@beautyluxe.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 pt-8 text-[9.5px] font-bold text-neutral-600 tracking-widest uppercase">
          <p>© {currentYear} BEAUTY LUXE KOREA. All rights reserved.</p>
          <div className="flex items-center space-x-3 select-none text-neutral-700">
            <span>NPAY</span>
            <span>•</span>
            <span>KAKAOPAY</span>
            <span>•</span>
            <span>VISA</span>
            <span>•</span>
            <span>MASTER</span>
            <span>•</span>
            <span>WIRE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
