import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import bearLogo from "../../assets/images/bear.png";


// Background Heart Animation Component
function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate a fixed set of random configurations on mount to prevent hydration/render mismatches
    const palette = ["#FF4D6D", "#FF7AA2", "#FF9BCB", "#FFB3C6"];
    const generatedHearts = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      scale: Math.random() * 0.7 + 0.5, // slightly larger hearts
      delay: Math.random() * 6,
      duration: Math.random() * 6 + 7, // soft speed variation
      opacity: Math.random() * 0.35 + 0.35, // more visible but still ambient
      color: palette[i % palette.length],
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    // fixed inset-0 so hearts float throughout the entire viewport as you scroll the page
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.svg
          key={heart.id}
          className="absolute bottom-[-8%]"
          style={{ left: heart.left }}
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill={heart.color}
          initial={{ y: 0, x: 0, opacity: 0, scale: heart.scale }}
          animate={{
            y: "-115vh",
            x: [0, 18, -18, 10, -8, 0], // Gentle swaying motion as it rises
            opacity: [0, heart.opacity, heart.opacity, 0], // Fade in then fade out near top
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: heart.left,
            filter:
              "drop-shadow(0 0 8px rgba(255,109,141,0.45)) drop-shadow(0 0 16px rgba(255,179,198,0.35))",
          }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </motion.svg>
      ))}
    </div>
  );
}


function About() {
  const brandPillars = [
    {
      number: "01",
      title: "Conscious Sourcing",
      description:
        "Every thread, texture, and material is chosen with profound respect for our planet. We prioritize organic, renewable, and certified non-toxic elements.",
      color: "from-[#FAD0C4] to-[#FFD1FF]",
    },
    {
      number: "02",
      title: "Slow Craftsmanship",
      description:
        "We reject the rush. Our pieces are designed intentionally and made to endure, celebrating the beauty of slight imperfections and human touch.",
      color: "from-[#E3F2FD] to-[#E8F5E9]",
    },
    {
      number: "03",
      title: "Radical Comfort",
      description:
        "Comfort isn't just physical—it's emotional. We create sensory spaces and garments that wrap you in a gentle, reassuring embrace every day.",
      color: "from-[#FFF3E0] to-[#FFE0B2]",
    },
  ];

  // Animation Variant Configurations
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#F9F3D6_0,_#F4ECC5_40%,_#E3D4B5_75%,_#D8C7A2_100%)] text-[#6D442C]">
      {/* Ambient Micro-Animations: Floating Hearts Background spanning full screen height */}
      <FloatingHearts />

      {/* Colorful Aesthetic Soft Ambient Blurs with floating animations */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF8580]/12 blur-[120px] pointer-events-none animate-[pulse_8s_infinite_alternate] z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#E6D5A9]/35 blur-[130px] pointer-events-none animate-[pulse_10s_infinite_alternate_2s] z-0" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#FFD1FF]/24 blur-[100px] pointer-events-none animate-[pulse_7s_infinite_alternate_1s] z-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-32">
        {/* 1. Creative Hero Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] items-center mb-28 sm:mb-36"
        >
          <motion.div variants={fadeInUp} className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.22em] uppercase bg-[#6D442C]/5 text-[#6D442C]/80 mb-5 border border-[#6D442C]/10 backdrop-blur-xs shadow-sm">
              🧸 Our Story & Heart
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif leading-tight drop-shadow-xs">
              Woven with{" "}
              <span className="bg-gradient-to-r from-[#AA6C39] via-[#FF8580] to-[#FFB3C6] bg-clip-text text-transparent">
                intention
              </span>
              , made for slower days.
            </h1>
            <p className="mt-6 text-lg text-[#6D442C]/90 leading-relaxed font-light">
              SnugBear was born from a simple realization: the world moves incredibly fast, but
              our finest memories are made when we dare to pause, breathe, and find comfort in the
              present.
            </p>
          </motion.div>

          {/* Image area with hover effects */}
          <motion.div variants={fadeInUp} className="flex justify-center md:justify-end w-full">
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96 rounded-3xl bg-gradient-to-tr from-white/90 to-[#FFFDF2]/95 border border-[#6D442C]/15 shadow-[0_18px_45px_rgba(91,57,33,0.22)] overflow-hidden group p-3 transition-all duration-500 hover:shadow-[0_24px_60px_rgba(91,57,33,0.28)] hover:border-[#FF8580]/35">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF8580]/7 via-transparent to-[#E6D5A9]/22 mix-blend-multiply z-10 pointer-events-none" />
              <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-inner">
                <img
                  src={bearLogo}
                  alt="SnugBear Illustration"
                  className="w-full h-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 2. Our Journey Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-3xl mb-28 sm:mb-36 p-8 sm:p-10 rounded-3xl backdrop-blur-lg bg-white/60 border border-white/80 shadow-[0_16px_40px_rgba(141,118,87,0.18)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_22px_55px_rgba(141,118,87,0.25)]"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#E6D5A9] to-[#FF8580]" />
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#52321F]">
              How it all started
            </h2>
            <p className="text-base text-[#6D442C]/95 leading-relaxed font-light">
              What began as small, hand-stitched keepsakes crafted at a sunlit kitchen table
              quickly evolved into a dedicated collective. We searched exhaustively for textures
              that felt like home—fabrics that tell a sensory story of safety, warmth, and quiet
              luxury.
            </p>
            <p className="text-base text-[#6D442C]/95 leading-relaxed font-light">
              Today, we collaborate directly with independent artisans and family-owned mills who
              share our obsessive devotion to quality, transparent supply chains, and mindful
              production.
            </p>
          </div>
        </motion.div>

        {/* 3. The Pillars / Values Grid */}
        <div className="border-t border-[#6D442C]/15 pt-20 mb-28 sm:mb-36">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-xl mb-12"
          >
            <h2 className="text-3xl font-bold font-serif tracking-tight text-[#3E2617]">
              The Values We Live By
            </h2>
            <p className="text-sm opacity-80 mt-2 font-light text-[#6D442C]">
              Every decision we make, from initial sketch to final packaging, is guided by three
              non-negotiable promises.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-8 sm:grid-cols-3"
          >
            {brandPillars.map((pillar, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-8 rounded-2xl backdrop-blur-lg bg-white/55 border border-white/70 relative overflow-hidden transition-all duration-500 hover:translate-y-[-6px] hover:shadow-[0_18px_45px_rgba(77,58,42,0.2)] hover:bg-white/90 group"
              >
                {/* Micro Color Top Border Strip */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pillar.color}`}
                />

                <span className="text-5xl font-serif font-black text-[#6D442C]/7 absolute -top-1 -right-2 select-none group-hover:text-[#6D442C]/12 transition-colors duration-500 group-hover:scale-105 block">
                  {pillar.number}
                </span>
                <h3 className="text-xl font-bold mb-3 relative z-10 text-[#52321F]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#6D442C]/90 leading-relaxed relative z-10 font-light">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 4. Contact & Social Information Hub */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-3 border-t border-[#6D442C]/15 pt-20"
        >
          {/* Social Links Box */}
          <motion.div
            variants={fadeInUp}
            className="p-8 rounded-3xl backdrop-blur-lg bg-white/55 border border-white/70 shadow-[0_12px_30px_rgba(141,118,87,0.18)] hover:border-[#FF8580]/30 transition-all duration-500 hover:bg-white/80 hover:shadow-[0_18px_40px_rgba(141,118,87,0.25)] hover:translate-y-[-2px]"
          >
            <h3 className="text-xl font-bold font-serif mb-5 flex items-center gap-2 text-[#52321F]">
              <span className="text-[#FF8580]">✨</span> Stay Connected
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a
                  href="https://www.instagram.com/snugbearofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#6D442C] hover:text-[#FF8580] transition-colors group"
                >
                  <span className="p-2 rounded-xl bg-[#FF8580]/10 text-[#FF8580] text-xs font-serif font-bold group-hover:bg-[#FF8580] group-hover:text-white transition-all duration-300">
                    📸
                  </span>
                  <span className="underline decoration-[#FF8580]/30 underline-offset-4">
                    @snugbearofficial
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/snugbear-co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#6D442C] hover:text-[#AA6C39] transition-colors group"
                >
                  <span className="p-2 rounded-xl bg-[#AA6C39]/10 text-[#AA6C39] text-xs font-serif font-bold group-hover:bg-[#AA6C39] group-hover:text-white transition-all duration-300">
                    💼
                  </span>
                  <span className="underline decoration-[#AA6C39]/30 underline-offset-4">
                    SnugBear | LinkedIn
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Quick Support Box */}
          <motion.div
            variants={fadeInUp}
            className="p-8 rounded-3xl backdrop-blur-lg bg-white/55 border border-white/70 shadow-[0_12px_30px_rgba(141,118,87,0.18)] hover:border-[#FF8580]/30 transition-all duration-500 hover:bg-white/80 hover:shadow-[0_18px_40px_rgba(141,118,87,0.25)] hover:translate-y-[-2px]"
          >
            <h3 className="text-xl font-bold font-serif mb-5 flex items-center gap-2 text-[#52321F]">
              <span className="text-[#FF8580]">💌</span> Customer Care
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col">
                <span className="text-[10px] tracking-wider text-[#6D442C]/50 font-bold uppercase mb-0.5">
                  WHATSAPP SUPPORT
                </span>
                <a
                  href="https://wa.me/9310103159"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-base text-[#6D442C] hover:text-[#FF8580] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  +91 9310103159
                </a>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] tracking-wider text-[#6D442C]/50 font-bold uppercase mb-0.5">
                  EMAIL ADDRESS
                </span>
                <a
                  href="mailto:snugbearofficial@gmail.com"
                  className="font-semibold text-[#6D442C] hover:text-[#FF8580] transition-colors break-all"
                >
                  snugbearofficial@gmail.com
                </a>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] tracking-wider text-[#6D442C]/50 font-bold uppercase mb-0.5">
                  HELP HOTLINE
                </span>
                <span className="font-medium opacity-60 italic text-xs bg-[#6D442C]/5 px-2.5 py-1 rounded-md w-max mt-1">
                  Shared Soon
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Business Headquarters Box */}
          <motion.div
            variants={fadeInUp}
            className="p-8 rounded-3xl backdrop-blur-lg bg-white/55 border border-white/70 shadow-[0_12px_30px_rgba(141,118,87,0.18)] hover:border-[#FF8580]/30 transition-all duration-500 hover:bg-white/80 hover:shadow-[0_18px_40px_rgba(141,118,87,0.25)] hover:translate-y-[-2px]"
          >
            <h3 className="text-xl font-bold font-serif mb-5 flex items-center gap-2 text-[#52321F]">
              <span className="text-[#E6D5A9] text-lg">🏡</span> Our HQ Address
            </h3>
            <div className="text-sm space-y-2 leading-relaxed text-[#6D442C]/90 font-light">
              <p className="font-bold text-[#52321F]">SnugBear Co.</p>
              <p>
                South City-2, Gurugram,
                <br />
                Haryana, 122018
                <br />
                India
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* 5. Heartfelt Outro */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-center py-12 max-w-2xl mx-auto mt-24 border-b border-[#6D442C]/10"
        >
          <p className="text-xl sm:text-2xl font-serif italic opacity-95 text-balance leading-relaxed text-[#52321F]">
            "May your days be softer, your coffee warmer, and your spaces filled with absolute
            comfort."
          </p>
          <span className="text-xs font-mono tracking-widest uppercase text-[#6D442C]/60 block mt-4">
            — The SnugBear Collective
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default About;