import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout components
import Header from './components/layout/Header';
import MiniCart from './components/cart/MiniCart';
import Newsletter from './components/layout/Newsletter';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import MemberBenefitPopup from './components/popup/MemberBenefitPopup';
import StickyMobileCTA from './components/common/StickyMobileCTA';
import PageTransition from './components/common/PageTransition';

// Page components
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import SearchResults from './pages/SearchResults';
import MakeupPage from './pages/MakeupPage';
import SkincarePage from './pages/SkincarePage';
import GiftSetPage from './pages/GiftSetPage';
import BestSellerPage from './pages/BestSellerPage';
import SalePage from './pages/SalePage';
import ContactPage from './pages/ContactPage';
import PerfumePage from './pages/PerfumePage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WishlistPage from './pages/WishlistPage';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { ToastProvider } from './context/ToastContext';
import Toast from './components/common/Toast';
import { Analytics } from '@vercel/analytics/react';

// Auth Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
                <ScrollToTop />
                <Analytics />
            <div className="min-h-screen flex flex-col bg-white antialiased font-sans selection:bg-[#E8DCC9] selection:text-dark">
              
              {/* SEO Accessibility H1 */}
              <h1 className="sr-only">뷰티럭스 코리아 - 샤넬 럭셔리 프리미엄 뷰티 온라인 부티크</h1>

              {/* Navigation Header - Fixed on all pages */}
              <Header />
              <MiniCart />
              <MemberBenefitPopup />
              <StickyMobileCTA />
              <Toast />

              {/* Dynamically Routed Content Container */}
              <main className="flex-grow">
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/makeup" element={<MakeupPage />} />
                    <Route path="/skincare" element={<SkincarePage />} />
                    <Route path="/perfume" element={<PerfumePage />} />
                    <Route path="/gift-set" element={<GiftSetPage />} />
                    <Route path="/best-seller" element={<BestSellerPage />} />
                    <Route path="/sale" element={<SalePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-success" element={<OrderSuccessPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    
                    {/* Auth Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/mypage" element={<MyPage />} />
                    
                    {/* Optional fallback redirect to home for safety */}
                    <Route path="*" element={<Home />} />
                  </Routes>
                </PageTransition>
              </main>

              {/* Consistent Footer Segment */}
              <Newsletter />
              <Footer />

            </div>
              </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
        </ToastProvider>
    </Router>
  );
}

export default App;
