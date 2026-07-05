import React, { useRef, useEffect } from "react";

const reviews = [
  { name: "Shreya Iyer", date: "10/06/26", rating: 5, text: "The Pastel Character Graphic Is So Sweet And Detailed. The Fabric Has A Nice Stretch To It...", img: "/images/review1.jpg" },
  { name: "Divya Kapoor", date: "10/06/26", rating: 5, text: "The Sanrio Characters Print Is Incredibly Cute And Vibrant. The Top Has A Very Nice Relaxed Fit...", img: "/images/review2.jpg" },
  { name: "Ishita Sharma", date: "10/06/26", rating: 4, text: "The Fit Of This Crop Top Is Great And The Graphic Print On The Side Is Really Stylish...", img: "/images/review3.jpg" },
  { name: "Ananya Singh", date: "09/06/26", rating: 5, text: "I love the cute design and the color palette. It looks even better in person.", img: "/images/review4.jpg" },
  { name: "Megha Nair", date: "09/06/26", rating: 5, text: "The print quality is excellent and the overall look is adorable. I love it!", img: "/images/review5.jpg" },
];

function Stars({ rating = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-sm ${i < rating ? "text-amber-400" : "text-gray-200"}`}>★</span>
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Smoothly scroll, looping back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-[#FFFBF9] overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-10 px-6 snap-x hide-scrollbar"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              data-review-card
              className="min-w-[320px] md:min-w-[350px] snap-start bg-white p-6 rounded-3xl border border-[#6D442C]/10 shadow-[0_10px_30px_rgba(77,58,42,0.05)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(77,58,42,0.1)] flex flex-col group"
            >
              <div className="relative mb-5 overflow-hidden rounded-2xl">
                <img src={review.img} alt={review.name} className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-[#6D442C] uppercase tracking-wider">
                  Verified Purchase
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-[#4D3A2A] text-base">{review.name}</h3>
                <Stars rating={review.rating} />
              </div>

              <p className="text-[#7A6B5C] leading-relaxed text-sm flex-grow italic">
                "{review.text}"
              </p>
              
              <div className="mt-6 pt-4 border-t border-[#6D442C]/5 flex justify-between items-center">
                <span className="text-[10px] font-bold text-[#D4BDB5] uppercase tracking-widest">{review.date}</span>
                <span className="text-2xl opacity-20">🎀</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}