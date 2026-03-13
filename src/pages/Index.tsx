import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CustomServicesSection from "@/components/CustomServicesSection";
import PrintToOrderSection from "@/components/PrintToOrderSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CustomServicesSection />
      <PrintToOrderSection />
      <FooterSection />
    </div>
  );
};

export default Index;
