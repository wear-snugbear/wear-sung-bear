import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import CollectionsPreview from "../../components/CommunityPreview/CommunityPreview";
import BestSellers from "../../components/BestSellers/BestSellers";
import FounderStory from "../../components/FounderStory/FounderStory";
import CustomerReviews from "../../components/CustomerReviews/CustomerReviews";
import Footer from "../../components/Footer/Footer";
import LandingPage from "../../components/Landing/Landing";

export default function Home() {
  // Check if user has already seen the landing page in this session
  const [hasScrolled, setHasScrolled] = useState(() => {
    return sessionStorage.getItem("hasVisited") === "true";
  });
  
  const [isLocked, setIsLocked] = useState(!hasScrolled);

  useEffect(() => {
    // If user already visited, just show the content immediately
    if (hasScrolled) return;

    // 1. Force top of page on initial load
    window.scrollTo(0, 0);

    // 2. Unlock after 1 second
    const timer = setTimeout(() => {
      setIsLocked(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [hasScrolled]);

  useEffect(() => {
    if (hasScrolled) return;

    const handleScroll = () => {
      if (!isLocked && window.scrollY > 50) {
        setHasScrolled(true);
        sessionStorage.setItem("hasVisited", "true"); // Mark as visited
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLocked, hasScrolled]);

  return (
    <div className="relative bg-[#FEFDE4] min-h-screen">
      {/* Show Landing ONLY if not scrolled yet */}
      {!hasScrolled && (
        <div className="fixed inset-0 z-50 bg-[#FEFDE4] flex items-center justify-center">
          <LandingPage />
        </div>
      )}

      {/* Main content: Always rendered, opacity changes based on hasScrolled */}
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