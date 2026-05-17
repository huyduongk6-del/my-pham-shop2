import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError('필수 정보를 입력해 주세요.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 6자 이상 입력해 주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const result = register(name, email, password);
    if (result.success) {
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 py-20">
      <div className="w-full max-w-[460px] bg-white rounded-[24px] border border-[#EEEEEE] p-8 md:p-12 shadow-[0_4px_25px_rgba(0,0,0,0.02)] animate-fade-in">
        
        {/* Branding & Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-8 select-none">
            <h1 className="text-2xl font-black tracking-[0.15em] text-dark uppercase leading-none">
              Beauty<span className="font-normal text-neutral-400">Luxe</span>
            </h1>
            <p className="text-[9px] tracking-[0.2em] font-bold text-[#C49A6C] uppercase leading-none mt-1.5">
              K-Style Premium Beauty
            </p>
          </Link>
          
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#C49A6C] tracking-[0.2em] uppercase mb-3">
            <ShieldCheck size={11} />
            BEAUTY LUXE MEMBER
          </span>
          <h2 className="text-2xl font-black text-[#111111] tracking-tight mb-2.5">
            회원가입
          </h2>
          <p className="text-[12.5px] font-bold text-neutral-400 leading-relaxed max-w-[300px] mx-auto">
            Beauty Luxe 회원이 되어 프리미엄 혜택과 개인 장바구니를 이용해보세요.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-dark tracking-widest uppercase ml-1">
              이름
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-[#C49A6C] transition-colors">
                <User size={16} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력해 주세요"
                className="w-full bg-neutral-50 border border-neutral-100 py-3.5 pl-12 pr-4 rounded-xl text-[13px] font-bold outline-none focus:bg-white focus:border-dark transition-all placeholder:font-medium placeholder:text-neutral-300"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-dark tracking-widest uppercase ml-1">
              이메일
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-[#C49A6C] transition-colors">
                <Mail size={16} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일을 입력해 주세요"
                className="w-full bg-neutral-50 border border-neutral-100 py-3.5 pl-12 pr-4 rounded-xl text-[13px] font-bold outline-none focus:bg-white focus:border-dark transition-all placeholder:font-medium placeholder:text-neutral-300"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-dark tracking-widest uppercase ml-1">
              비밀번호
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-[#C49A6C] transition-colors">
                <Lock size={16} />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력해 주세요"
                className="w-full bg-neutral-50 border border-neutral-100 py-3.5 pl-12 pr-4 rounded-xl text-[13px] font-bold outline-none focus:bg-white focus:border-dark transition-all placeholder:font-medium placeholder:text-neutral-300"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-dark tracking-widest uppercase ml-1">
              비밀번호 확인
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-[#C49A6C] transition-colors">
                <Lock size={16} />
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력해 주세요"
                className="w-full bg-neutral-50 border border-neutral-100 py-3.5 pl-12 pr-4 rounded-xl text-[13px] font-bold outline-none focus:bg-white focus:border-dark transition-all placeholder:font-medium placeholder:text-neutral-300"
              />
            </div>
          </div>

          {error && (
            <p className="text-rose-500 text-[11.5px] font-bold text-center animate-fade-in pt-1">
              {error}
            </p>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-[#111111] text-white text-[11px] font-black tracking-[0.2em] uppercase rounded-xl hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-lg shadow-black/5 flex items-center justify-center gap-2"
            >
              회원가입
              <ArrowRight size={14} />
            </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-10 pt-8 border-t border-neutral-50 text-center">
          <p className="text-[12.5px] font-medium text-neutral-400">
            이미 계정이 있으신가요? 
            <Link to="/login" className="ml-2 text-dark font-black hover:text-[#C49A6C] transition-colors border-b border-dark/20 hover:border-[#C49A6C]/40 pb-0.5">
              로그인
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
