import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FlashSaleSection from "@/components/sections/FlashSaleSection";
import RecommendedSection from "@/components/sections/RecommendedSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FlashSaleSection />
        <RecommendedSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
