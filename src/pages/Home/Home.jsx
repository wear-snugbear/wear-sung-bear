import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import CollectionsPreview from "../../components/CommunityPreview/CommunityPreview";
import BestSellers from "../../components/BestSellers/BestSellers";
import FounderStory from "../../components/FounderStory/FounderStory";
import CustomerReviews from "../../components/CustomerReviews/CustomerReviews";
import Footer from "../../components/Footer/Footer";
import LandingPage from "../../components/Landing/Landing";


export default function Home() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    // 1. Force top of page on reload
    window.scrollTo(0, 0);

    // 2. Unlock scrolling after 1 second
    const timer = setTimeout(() => {
      setIsLocked(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // If unlocked and user scrolls, trigger transition
      if (!isLocked && window.scrollY > 50) {
        setHasScrolled(true);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLocked]);

// Home.jsx
  useEffect(() => {
    // Select both the header (Navbar + Banner) and the BottomNav
    const header = document.querySelector('header')?.parentElement; 
    const bottomNav = document.getElementById('bottom-nav-wrapper');
    
    if (header && bottomNav) {
      if (hasScrolled) {
        header.style.display = 'block';
        bottomNav.style.display = 'block';
      } else {
        header.style.display = 'none';
        bottomNav.style.display = 'none';
      }
    }
  }, [hasScrolled]);

  return (
    <div className="relative bg-[#FEFDE4]">
      {!hasScrolled && (
        <div className="fixed inset-0 z-50 bg-[#FEFDE4] flex items-center justify-center">
          <LandingPage />
        </div>
      )}

      {/* Main content */}
      <div className={`relative z-10 transition-opacity duration-700 ${hasScrolled ? "opacity-100" : "opacity-0"}`}>
        <Hero />
        <CollectionsPreview />
        <BestSellers />
        <div id="founder-story">
          <FounderStory />
        </div>
        <CustomerReviews />
        <Footer />
      </div>
    </div>
  );
}