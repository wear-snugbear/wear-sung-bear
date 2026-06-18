import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import basicsImg from "../../assets/images/basics.png";
import moodyImg from "../../assets/images/moody.png";
import deluluImg from "../../assets/images/delulu.png";

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
      image: basicsImg,
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
      image: moodyImg,
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
      image: deluluImg,
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
          <p className="text-[#7A6B5C] text-sm uppercase tracking-widest font-semibold">Curated for your comfort</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className={`flex flex-col rounded-3xl border ${item.border} ${item.bg} p-4 shadow-sm hover:shadow-xl transition-all duration-300`}
            >
              {/* IMAGE WRAPPER: Added padding and square aspect ratio to make image look smaller */}
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
          ))}
        </div>
      </div>
    </section>
  );
}