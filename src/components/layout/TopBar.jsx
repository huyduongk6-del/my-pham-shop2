import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const TopBar = () => {
  const [lang, setLang] = useState('KR');
  const [currency, setCurrency] = useState('KRW');

  return (
    <div className="w-full bg-[#111111] text-white text-[10px] font-bold tracking-widest hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-1.5">
        <div className="flex items-center gap-4 text-neutral-400">
          <span className="hover:text-white cursor-pointer transition-colors">고객센터</span>
          <span>|</span>
          <span className="hover:text-white cursor-pointer transition-colors">매장찾기</span>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="text-[#C49A6C] uppercase tracking-[0.2em] animate-pulse">
            Complimentary Shipping on all orders
          </span>
          
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-neutral-300 transition-colors">
              <Globe size={10} />
              <span>{lang}</span>
              <ChevronDown size={10} className="text-neutral-500" />
              
              <div className="absolute top-full right-0 mt-1 w-24 bg-white text-dark rounded border border-neutral-100 shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
                <div className="p-1">
                  <div className="px-3 py-1.5 hover:bg-[#FAF7F2] rounded text-[10px] cursor-pointer" onClick={() => setLang('KR')}>한국어 (KR)</div>
                  <div className="px-3 py-1.5 hover:bg-[#FAF7F2] rounded text-[10px] cursor-pointer" onClick={() => setLang('EN')}>English (EN)</div>
                  <div className="px-3 py-1.5 hover:bg-[#FAF7F2] rounded text-[10px] cursor-pointer" onClick={() => setLang('VN')}>Tiếng Việt (VN)</div>
                </div>
              </div>
            </div>

            <span>|</span>

            {/* Currency Switcher */}
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-neutral-300 transition-colors">
              <span>{currency}</span>
              <ChevronDown size={10} className="text-neutral-500" />
              
              <div className="absolute top-full right-0 mt-1 w-20 bg-white text-dark rounded border border-neutral-100 shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
                <div className="p-1">
                  <div className="px-3 py-1.5 hover:bg-[#FAF7F2] rounded text-[10px] cursor-pointer" onClick={() => setCurrency('KRW')}>₩ KRW</div>
                  <div className="px-3 py-1.5 hover:bg-[#FAF7F2] rounded text-[10px] cursor-pointer" onClick={() => setCurrency('USD')}>$ USD</div>
                  <div className="px-3 py-1.5 hover:bg-[#FAF7F2] rounded text-[10px] cursor-pointer" onClick={() => setCurrency('VND')}>₫ VND</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
