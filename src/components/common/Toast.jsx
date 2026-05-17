import React from 'react';
import { useToast } from '../../context/ToastContext';
import { Check, Info, AlertCircle, X } from 'lucide-react';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-[25000] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Check;
        let iconColor = 'text-[#C49A6C]';
        
        if (toast.type === 'error') {
          Icon = AlertCircle;
          iconColor = 'text-red-500';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = 'text-blue-500';
        }

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-xl p-4 flex items-center gap-3 w-[300px] transform transition-all duration-300 animate-slide-left"
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center ${iconColor}`}>
              <Icon size={16} strokeWidth={2.5} />
            </div>
            <p className="flex-1 text-[12px] font-bold text-[#111111] leading-snug pr-2">
              {toast.message}
            </p>
            <button 
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-[#111111] transition-colors p-1"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
