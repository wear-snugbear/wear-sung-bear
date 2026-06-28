import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


export default function CollectionsPreview() {
  const [cuteEffects, setCuteEffects] = useState([]);

  useEffect(() => {
    const symbols = ["✨", "♥", "🌸", "☁️"];
    const interval = setInterval(() => {
      const id = Math.random().toString(36).substring(2, 9);
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      const startX = Math.random() * 100;
      
      const newEffect = {
        id,
        symbol: randomSymbol,
        style: { left: `${startX}%`, top: "100%" },
        animation: { y: -600, opacity: [0, 0.3, 0] },
        duration: 8 + Math.random() * 4
      };
      setCuteEffects((prev) => [...prev.slice(-8), newEffect]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const collections = [
    {
      id: "basics",
      title: "SnugBear Basics",
      image: "/images/basics.png", // UPDATED PATH
      description: ["Minimal aesthetic", "Organic textures"],
      badge: "Core Line",
      bg: "bg-white",
      border: "border-gray-100",
      btnStyle: "bg-[#6D442C] text-white hover:bg-[#523320]",
      link: "/collections?filter=Snugbear Basics",
    },
    {
      id: "moody",
      title: "Moody Collection",
      image: "/images/moody.png", // UPDATED PATH
      description: ["Deep emotional tones", "Expressive fit"],
      badge: "Trending",
      bg: "bg-white",
      border: "border-gray-100",
      btnStyle: "bg-[#FF8580] text-white hover:bg-[#E5746F]",
      link: "/collections?filter=Moody Collection",
    },
    {
      id: "delulu",
      title: "Delulu Diaries",
      image: "/images/delulu.png", // UPDATED PATH
      description: ["Pastel clouds", "Dreamy vibes"],
      badge: "Coming Soon",
      isComingSoon: true,
      bg: "bg-white",
      border: "border-gray-100",
      btnStyle: "bg-gray-50 text-gray-400 cursor-not-allowed border-none",
      link: "#",
    },
  ];

  return (
    <section className="relative w-full bg-[#FFF9F6] px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <AnimatePresence>
          {cuteEffects.map((effect) => (
            <motion.span
              key={effect.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={effect.animation}
              exit={{ opacity: 0 }}
              transition={{ duration: effect.duration }}
              className="absolute text-sm"
              style={effect.style}
            >
              {effect.symbol}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="mb-16 text-center space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#4D3A2A]">
            Explore the <span className="text-[#FF8580]">Collections</span>
          </h2>
        </div>

        {/* SWIPER COMPONENT */}
        <Swiper
  modules={[Autoplay, Pagination]}
  spaceBetween={20}
  slidesPerView={1}
  // Disable loop if you have fewer than 4 items to avoid this warning
  loop={collections.length > 3} 
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  // watchOverflow helps Swiper behave gracefully when not enough slides exist
  watchOverflow={true} 
  breakpoints={{
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  className="pb-12"
>
          {collections.map((item) => (
            <SwiperSlide key={item.id}>
              <motion.div
                whileHover={{ y: -5 }}
                className={`flex flex-col rounded-3xl border ${item.border} ${item.bg} p-4 shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                <div className="p-4 bg-gray-50 rounded-2xl mb-4">
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-[#4D3A2A]">
                      {item.badge}
                    </span>
                  </div>
                </div>
                
                <div className="px-2 pb-2 flex-1">
                  <h3 className="font-serif text-xl font-bold text-[#4D3A2A] mb-2">{item.title}</h3>
                  <div className="space-y-1 mb-6">
                    {item.description.map((desc, i) => (
                      <p key={i} className="text-xs text-[#7A6B5C] font-medium italic">✦ {desc}</p>
                    ))}
                  </div>
                </div>

                <Link
                  to={item.isComingSoon ? "#" : item.link}
                  className={`w-full h-10 flex items-center justify-center rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${item.btnStyle}`}
                >
                  {item.isComingSoon ? "Coming Soon" : "View Collection"}
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}