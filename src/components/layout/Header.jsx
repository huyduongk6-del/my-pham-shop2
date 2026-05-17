import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, ChevronDown, Menu, X, ChevronRight, Heart } from 'lucide-react';
import { navigationLinks } from '../../data/mockup';
import TopBar from './TopBar';
import SearchModal from '../common/SearchModal';

import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';

const Header = () => {
  const { openCart, cartCount } = useCart();
  const { currentUser, isAuthenticated } = useAuth();
  const { wishlistCount } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  // Scroll State effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <TopBar />
      <header 
        className={`w-full bg-white transition-all duration-300 z-50 border-b border-neutral-100 ${
          isScrolled ? 'sticky top-0 shadow-[0_2px_15px_rgba(0,0,0,0.02)] backdrop-blur-md bg-white/98 py-2' : 'py-4'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* 1. Logo Area */}
          <Link 
            to="/" 
            className="flex flex-col justify-center items-start flex-shrink-0 select-none group cursor-pointer"
          >
            <div className="flex items-center space-x-1">
              <h1 className="text-xl md:text-[22px] font-black tracking-[0.12em] text-dark uppercase leading-none">
                Beauty<span className="font-normal">Luxe</span>
              </h1>
            </div>
            <p className="text-[8px] tracking-[0.18em] font-bold text-[#C49A6C] uppercase leading-none mt-1">
              K-Style Premium Beauty
            </p>
          </Link>

          {/* 2. Desktop Navigation Menus */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-grow justify-center px-4">
            {navigationLinks.map((link, index) => {
              const linkActive = isActive(link.path);
              return (
                <Link
                  key={index}
                  to={link.path}
                  className={`relative text-[11px] font-bold tracking-[0.06em] uppercase transition-colors duration-300 hover:text-korean-beige flex items-center gap-1 group/link ${
                    linkActive ? 'text-dark' : 'text-neutral-500'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={11} className="text-neutral-400 group-hover/link:translate-y-0.5 transition-transform" />}
                  
                  {linkActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-dark animate-pulse"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. Utilities Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button 
              className="p-2 text-dark hover:bg-neutral-50 rounded-full transition-all active:scale-95"
              onClick={() => setIsSearchModalOpen(true)}
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

              <Link 
                to="/wishlist"
                className="p-2 text-dark hover:bg-neutral-50 rounded-full relative transition-all active:scale-95"
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#D8BFA3] text-dark text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link 
                to={isAuthenticated ? "/mypage" : "/login"}
                className={`p-1.5 rounded-full transition-all active:scale-95 flex items-center gap-1.5 ${
                  isAuthenticated ? 'text-[#C49A6C] bg-[#FAF7F2]' : 'text-dark hover:bg-neutral-50'
                }`}
              >
                {isAuthenticated && currentUser.profilePicture ? (
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-[#D8BFA3]/30">
                    <img src={currentUser.profilePicture} alt={currentUser.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <User size={18} className="m-0.5" />
                )}
                <span className="hidden md:block text-[10px] font-black uppercase tracking-widest truncate px-1">
                  {isAuthenticated ? currentUser.name : '로그인 / 회원가입'}
                </span>
              </Link>

              <button 
                onClick={openCart}
                className="p-2 text-dark hover:bg-neutral-50 rounded-full relative transition-all active:scale-95"
                aria-label="Open cart"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-dark text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full scale-in">
                    {cartCount}
                  </span>
                )}
              </button>

              <button 
                className="lg:hidden p-2 text-dark hover:bg-neutral-50 rounded-full transition-all ml-1 active:scale-95"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

        </div>

      {/* 4. Responsive Mobile Drawer Navbar */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white ${
          isMenuOpen ? 'max-h-[90vh] border-t border-neutral-100 shadow-md overflow-y-auto' : 'max-h-0'
        }`}
      >
        <nav className="px-4 py-5 flex flex-col space-y-3.5">
          
          {/* Search Trigger for Mobile Menu */}
          <button
            onClick={() => { setIsSearchModalOpen(true); setIsMenuOpen(false); }}
            className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-xl text-dark mb-4 group"
          >
            <div className="flex items-center gap-3">
              <Search size={18} className="text-neutral-500 group-hover:text-dark transition-colors" />
              <span className="text-[11px] font-black tracking-widest uppercase">검색하기</span>
            </div>
          </button>
          
          {/* Wishlist Section in Mobile Menu */}
          <div className="flex flex-col space-y-1.5 border-b border-neutral-100 pb-3.5 mb-3.5 px-1">
            <Link 
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between p-3.5 hover:bg-[#FAF7F2] rounded-xl text-dark group transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-neutral-400 shadow-sm border border-neutral-100 group-active:text-[#D8BFA3]">
                  <Heart size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-black tracking-widest uppercase">위시리스트</p>
                  <p className="text-[9px] font-bold text-neutral-400 uppercase mt-0.5">저장한 관심 상품 보기</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {wishlistCount > 0 && <span className="text-[10px] font-black bg-[#D8BFA3] text-dark px-1.5 rounded-full">{wishlistCount}</span>}
                <ChevronRight size={16} className="text-neutral-300" />
              </div>
            </Link>
          </div>

          {/* Auth Section in Mobile Menu */}
          <div className="flex flex-col space-y-1.5 border-b border-neutral-100 pb-3.5 mb-3.5">
            <Link 
              to={isAuthenticated ? "/mypage" : "/login"}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between p-3.5 bg-[#FAF7F2] rounded-xl text-dark"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#C49A6C] shadow-sm overflow-hidden border border-neutral-100">
                  {isAuthenticated && currentUser.profilePicture ? (
                    <img src={currentUser.profilePicture} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} />
                  )}
                </div>
                <div>
                  <p className="text-[11px] font-black tracking-widest uppercase">
                    {isAuthenticated ? `${currentUser.name}님 안녕하세요` : '로그인 / 회원가입'}
                  </p>
                  <p className="text-[9px] font-bold text-neutral-400 uppercase mt-0.5">
                    {isAuthenticated ? '마이페이지 바로가기' : '특별한 혜택을 만나보세요'}
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-neutral-300" />
            </Link>
          </div>
          
          {/* Navigation Link Items */}
          {navigationLinks.map((link, index) => {
            const linkActive = isActive(link.path);
            return (
              <Link
                key={index}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`py-2.5 px-2 text-[11px] font-bold tracking-widest uppercase border-b border-neutral-50 flex items-center justify-between active:bg-neutral-50 transition-colors ${
                  linkActive ? 'text-dark border-neutral-300 bg-neutral-50/50' : 'text-neutral-500'
                }`}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={12} className="text-neutral-400" />}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </header>
    </>
  );
};

export default Header;
