import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import FeaturesSection from "../components/home/FeaturesSection";
import PackagesSection from "../components/home/PackagesSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import FAQSection from "../components/home/FAQSection";
import CTASection from "../components/home/CTASection";

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

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Call to Action Section */}
      <CTASection />
    </div>
  );
};

export default Home;
