import React from 'react';

// Home components
import HeroBanner from '../components/home/HeroBanner';
import Services from '../components/home/Services';
import Categories from '../components/home/Categories';
import BestSellers from '../components/home/BestSellers';
import PromoBanners from '../components/home/PromoBanners';
import KoreanCuratedPicks from '../components/home/KoreanCuratedPicks';
import ChanelCollection from '../components/home/ChanelCollection';
import BeautyLuxeStory from '../components/home/BeautyLuxeStory';
import TodaysChanelPick from '../components/home/TodaysChanelPick';
import FlashDeal from '../components/home/FlashDeal';
import GiftPreview from '../components/home/GiftPreview';
import CustomerReviewPreview from '../components/home/CustomerReviewPreview';
import ShoppingBenefit from '../components/home/ShoppingBenefit';
import RecentlyViewedSection from '../components/common/RecentlyViewedSection';
import BeautyDiary from '../components/home/BeautyDiary';
import ScrollRevealWrapper from '../components/common/ScrollRevealWrapper';

const Home = () => {
  return (
    <>
      {/* Above the Fold */}
      <HeroBanner />
      
      {/* Dãy cam kết dịch vụ nổi bật */}
      <ScrollRevealWrapper>
        <Services />
      </ScrollRevealWrapper>
      
      {/* Section Giới thiệu câu chuyện thương hiệu cao cấp */}
      <ScrollRevealWrapper animation="fade-up">
        <BeautyLuxeStory />
      </ScrollRevealWrapper>
      
      {/* Danh mục hình tròn -> nay là thẻ lớn */}
      <ScrollRevealWrapper animation="fade-left">
        <Categories />
      </ScrollRevealWrapper>
      
      {/* Section Tuyển chọn gợi ý 3 sản phẩm lớn hôm nay */}
      <ScrollRevealWrapper animation="fade-up">
        <TodaysChanelPick />
      </ScrollRevealWrapper>
      
      {/* MỚI: Flash Deal */}
      <FlashDeal />
      
      {/* MỚI: Section Gift Preview */}
      <ScrollRevealWrapper animation="fade-up">
        <GiftPreview />
      </ScrollRevealWrapper>

      {/* MỚI: Section Customer Review Preview */}
      <ScrollRevealWrapper animation="fade-up">
        <CustomerReviewPreview />
      </ScrollRevealWrapper>

      {/* MỚI: Section Shopping Benefit (Black Theme) */}
      <ScrollRevealWrapper animation="zoom-in">
        <ShoppingBenefit />
      </ScrollRevealWrapper>

      {/* BỘ SƯU TẬP CHANEL 12 SẢN PHẨM - Moved Up */}
      <ScrollRevealWrapper animation="fade-up">
        <ChanelCollection />
      </ScrollRevealWrapper>
      
      {/* Sản phẩm bán chạy dạng card ngang */}
      <ScrollRevealWrapper animation="fade-up">
        <BestSellers />
      </ScrollRevealWrapper>
      
      {/* MỚI: Beauty Diary (Instagram Style) */}
      <BeautyDiary />
      
      {/* Banner ưu đãi phụ */}
      <ScrollRevealWrapper animation="fade-up">
        <PromoBanners />
      </ScrollRevealWrapper>

      {/* Tuyển chọn gợi ý đặc trưng Style Hàn */}
      <ScrollRevealWrapper animation="fade-up">
        <KoreanCuratedPicks />
      </ScrollRevealWrapper>

      {/* 최근 본 상품 - Recently Viewed */}
      <RecentlyViewedSection limit={4} className="bg-white" />
    </>
  );
};

export default Home;
