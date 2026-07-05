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
        <span key={i} className={`text-lg ${i < rating ? "text-[#E6AA84]" : "text-[#EEDDD3]"}`}>★</span>
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
        // Reset to start if at the end, otherwise scroll forward
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 374, behavior: "smooth" });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#6D442C] mb-4">From Our Community 🧸</h2>
          <p className="text-[#A58D80] font-medium italic">Hear what our lovely customers have to say</p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scroll-smooth pb-12 snap-x hide-scrollbar"
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                data-review-card
                className="min-w-[calc(33.333%-22px)] snap-start bg-white p-8 rounded-[2.5rem] border-2 border-[#F9E4E8] shadow-[0_8px_24px_-4px_rgba(230,170,132,0.15)] transition-transform hover:-translate-y-2 flex flex-col"
              >
                <div className="relative mb-6">
                  <img src={review.img} alt={review.name} className="w-full h-72 object-cover rounded-[2rem]" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm text-xs font-bold text-[#6D442C]">
                    Verified
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-[#6D442C] text-lg">{review.name}</h3>
                  <Stars rating={review.rating} />
                </div>

                <p className="text-gray-600 leading-relaxed text-sm flex-grow line-clamp-4">
                  "{review.text}"
                </p>
                
                <p className="text-[10px] uppercase tracking-widest text-[#D4BDB5] mt-6 font-bold">
                  {review.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @media (max-width: 1024px) { [data-review-card] { min-width: calc(50% - 16px) !important; } }
        @media (max-width: 640px) { [data-review-card] { min-width: 100% !important; } }
      `}</style>
    </section>
  );
}