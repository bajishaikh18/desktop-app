"use client";
import TopBanner from "@/components/about/AboutTopbanner";
import ContactUs from "@/components/about/ContactUs";
import Features from "@/components/about/Feature";
import OverseasJobSeekers from "@/components/about/OverSeas";
import VisionSection from "@/components/about/Vision";

const TopBannerPage: React.FC = () => {
  return (
    <>
     <TopBanner />  
     <Features/>
     <OverseasJobSeekers />
     <VisionSection />
     <ContactUs />
     </>
  );
};

export default TopBannerPage;