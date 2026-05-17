import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('이메일 또는 비밀번호를 입력해 주세요.');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate('/');
      // Optional: alert('로그인되었습니다.');
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
            <Sparkles size={11} />
            BEAUTY LUXE MEMBER
          </span>
          <h2 className="text-2xl font-black text-[#111111] tracking-tight mb-2.5">
            로그인
          </h2>
          <p className="text-[12.5px] font-bold text-neutral-400 leading-relaxed max-w-[300px] mx-auto">
            회원 전용 혜택과 장바구니를 안전하게 이어서 이용해보세요.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해 주세요"
                className="w-full bg-neutral-50 border border-neutral-100 py-3.5 pl-12 pr-4 rounded-xl text-[13px] font-bold outline-none focus:bg-white focus:border-dark transition-all placeholder:font-medium placeholder:text-neutral-300"
              />
            </div>
          </div>

          {error && (
            <p className="text-rose-500 text-[11.5px] font-bold text-center animate-fade-in">
              {error}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-[#111111] text-white text-[11px] font-black tracking-[0.2em] uppercase rounded-xl hover:bg-neutral-800 active:scale-[0.98] transition-all shadow-lg shadow-black/5 flex items-center justify-center gap-2"
            >
              로그인
              <ArrowRight size={14} />
            </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-10 pt-8 border-t border-neutral-50 text-center">
          <p className="text-[12.5px] font-medium text-neutral-400">
            아직 계정이 없으신가요? 
            <Link to="/register" className="ml-2 text-dark font-black hover:text-[#C49A6C] transition-colors border-b border-dark/20 hover:border-[#C49A6C]/40 pb-0.5">
              회원가입
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
