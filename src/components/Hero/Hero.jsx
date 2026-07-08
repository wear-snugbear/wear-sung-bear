import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const floatingHearts = [
    { id: 1, left: "5%", size: 14, delay: 0, duration: 6 },
    { id: 2, left: "15%", size: 22, delay: 2.5, duration: 7 },
    { id: 3, left: "28%", size: 16, delay: 1, duration: 5.5 },
    { id: 4, left: "40%", size: 26, delay: 4, duration: 8 },
    { id: 5, left: "52%", size: 12, delay: 0.5, duration: 5 },
    { id: 6, left: "65%", size: 20, delay: 3.2, duration: 6.5 },
    { id: 7, left: "78%", size: 15, delay: 1.8, duration: 7.5 },
    { id: 8, left: "92%", size: 24, delay: 4.5, duration: 6 },
  ];

  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-[#FFF9F6] px-4 py-8 sm:px-6 md:py-14 lg:px-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, y: "80vh", scale: 0.6 }}
            animate={{ opacity: [0, 0.5, 0.5, 0], y: "-10vh", scale: [0.6, 1, 0.9, 0.7] }}
            transition={{ duration: heart.duration, delay: heart.delay, repeat: Infinity, ease: "linear" }}
            className="absolute text-[#FFB7B2] select-none"
            style={{ left: heart.left, fontSize: `${heart.size}px` }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 md:flex-row md:gap-8 relative z-10">
        <div className="flex max-w-xl flex-col items-start space-y-5 text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFEAE8] px-6 py-2.5 text-sm md:text-base font-bold tracking-wide text-[#FF8580]">
            <span>♥</span> #WEARSNUG <span>♥</span>
          </div>
          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-[#4D3A2A] sm:text-5xl md:text-6xl lg:leading-[1.15]">
            Wear Your Mood. <br />
            <span className="text-[#FF8580]">Live Your Story.</span>
          </h1>
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-[#7A5A3A]">Cute. Comfy. Useful.</h3>
            <p className="text-sm leading-relaxed text-[#7A6B5C] sm:text-base">
              Real fits. Real people. Real SnugBear vibes. <br />
              Tag us <a href="mailto:SNUGBEAROFFICIAL@GMAIL.COM" className="font-semibold text-[#FF8580] hover:underline">@snugbear.official</a> to be featured!
            </p>
          </div>
        </div>

        <div className="relative flex h-[400px] w-full max-w-[480px] items-center justify-center md:h-[480px] md:flex-1">
          <div className="absolute left-[5%] top-[8%] z-10 w-[200px] -rotate-6 rounded-sm bg-white p-3 shadow-xl sm:w-[230px]">
            <img src="/images/polaroid1.png" loading="lazy" alt="Showcase 1" className="h-full w-full object-cover" />
          </div>
          <div className="absolute right-[5%] bottom-[8%] z-20 w-[200px] rotate-4 rounded-sm bg-white p-3 shadow-2xl sm:w-[230px]">
            <img src="/images/polaroid2.png" loading="lazy" alt="Showcase 2" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}