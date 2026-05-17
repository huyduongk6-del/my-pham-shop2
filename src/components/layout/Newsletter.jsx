import React from 'react';
import { ShieldCheck, Truck, CreditCard, Send, Heart } from 'lucide-react';
import { footerCommitments } from '../../data/mockup';

const iconMap = {
  ShieldCheck,
  Truck,
  CreditCard,
  Heart,
};

const Newsletter = () => {
  return (
    <div className="w-full bg-[#FAF7F2] border-t border-neutral-100 py-12 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-4">
        
        {/* Left side: Mini-Commitments */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full lg:w-auto lg:flex-1 gap-6 xl:gap-10 border-b lg:border-b-0 lg:border-r border-neutral-200 pb-8 lg:pb-0 lg:pr-10">
          {footerCommitments.map((item, index) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div key={index} className="flex items-center space-x-3.5 group">
                <div className="w-10 h-10 rounded-full bg-white border border-neutral-50 flex items-center justify-center text-[#C49A6C] group-hover:bg-[#F2EBE1] transition-colors shadow-sm">
                  {IconComponent && <IconComponent size={17} strokeWidth={1.5} />}
                </div>
                <div>
                  <h5 className="text-[11.5px] font-black text-dark tracking-wider uppercase leading-tight">{item.text}</h5>
                  <p className="text-[10px] text-neutral-400 font-medium mt-0.5">{item.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right side: Newsletter Box */}
        <div className="w-full lg:w-auto flex flex-col md:flex-row items-center gap-5 lg:pl-6">
          <div className="flex-shrink-0 text-center md:text-left space-y-1">
            <h4 className="text-[13px] font-black text-dark tracking-[0.1em] uppercase">
              뉴스레터 구독
            </h4>
            <p className="text-xs text-neutral-400 font-medium">
              샤넬의 프리미엄 혜택과 신제품 소식을 가장 먼저 받으세요
            </p>
          </div>

          {/* Subscription Input */}
          <div className="relative flex w-full md:w-80 xl:w-96 group">
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요..."
              className="w-full bg-white border border-neutral-200 text-xs py-3.5 pl-4 pr-32 rounded-md outline-none shadow-[0_2px_6px_rgba(0,0,0,0.01)] transition-all duration-300 focus:border-dark"
            />
            <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-dark hover:bg-neutral-800 text-white px-5 rounded text-[10px] font-bold flex items-center space-x-1.5 transition-colors shadow-sm tracking-widest uppercase">
              <span>구독하기</span>
              <Send size={10} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Newsletter;
