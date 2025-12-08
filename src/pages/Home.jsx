import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import FeaturesSection from "../components/home/FeaturesSection";
import PackagesSection from "../components/home/PackagesSection";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Packages/Pricing Section */}
      <PackagesSection />

      {/* More sections will be added in upcoming steps */}
      {/* - Testimonials Section */}
      {/* - How It Works + FAQ Section */}
      {/* - CTA Section */}
    </div>
  );
};

export default Home;
