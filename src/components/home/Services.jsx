import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Headphones } from 'lucide-react';
import { serviceCommitments } from '../../data/mockup';

const iconMap = {
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Headphones,
};

const Services = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5 md:-mt-6 relative z-30">
      <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 rounded-xl py-4 md:py-5 px-4 flex items-center overflow-x-auto snap-x snap-mandatory gap-6 lg:gap-3 justify-between no-scrollbar select-none">
        {serviceCommitments.map((service) => {
          const IconComponent = iconMap[service.iconName];
          
          return (
            <div 
              key={service.id} 
              className="flex items-center space-x-3.5 flex-1 min-w-[200px] lg:min-w-0 lg:justify-center snap-center px-4 group"
            >
              {/* Icon Container - Ivory Minimalist */}
              <div className="w-9 h-9 rounded-full bg-[#FAF7F2] flex items-center justify-center flex-shrink-0 text-[#C49A6C] transition-all duration-300 border border-neutral-50 group-hover:scale-105 group-hover:bg-[#F2EBE1]">
                {IconComponent && <IconComponent size={16} className="stroke-[1.5px]" />}
              </div>
              
              {/* Text Info */}
              <div className="flex flex-col">
                <h4 className="text-[12px] font-bold text-dark leading-tight tracking-wide group-hover:text-[#C49A6C] transition-colors">
                  {service.title}
                </h4>
                <p className="text-[10px] text-neutral-400 font-medium mt-0.5 leading-tight">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Styles for hiding scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Services;
