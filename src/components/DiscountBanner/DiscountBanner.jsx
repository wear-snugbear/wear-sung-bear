import React, { useState, useEffect } from 'react';

const discounts = [
  { text: "🕒 Flash Sale: Grab These Cutesy Styles! 🎀", bg: "#ffe4ec", color: "#6D442C" },
  { text: "✨ Buy 2, Get 10% Off Your Favorite Finds! 🧸", bg: "#6D442C", color: "#ffffff" },
  { text: "💗 Free Shipping On Orders Above 699 💗", bg: "#ffe4ec", color: "#6D442C" },
  { text: "💌 Get 10% Off Your First Order! 🍯", bg: "#6D442C", color: "#ffffff" },
];

export default function DiscountBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // INCREASED: 6000ms (6 seconds) gives users plenty of time to read
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % discounts.length);
    }, 6000); 
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="w-full py-3 transition-colors duration-1000 ease-in-out flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: discounts[index].bg }}
    >
      <div className="w-full flex justify-center items-center overflow-hidden relative h-6">
        <p 
          key={index} 
          className="animate-fade-in-slide absolute whitespace-nowrap font-bold uppercase tracking-[0.1em] sm:tracking-[0.25em] text-[10px] sm:text-[11px] md:text-xs px-4"
          style={{ color: discounts[index].color }}
        >
          {discounts[index].text}
        </p>
      </div>
      
      <style>{`
        .animate-fade-in-slide {
          /* Smoother, slower animation */
          animation: fadeSlide 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes fadeSlide {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}