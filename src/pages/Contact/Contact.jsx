import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// 1. COMBINED GLOBAL BACKGROUND ANIMATION LAYER
// ==========================================
function BackgroundAnimations() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Generates a subtle assortment of ambient floating objects (Hearts and Bears)
    const generatedElements = Array.from({ length: 12 }).map((_, i) => {
      const isBear = i % 3 === 0; // Balance of hearts and teddy bears
      return {
        id: `bg-contact-art-${i}`,
        type: isBear ? "bear" : "heart",
        left: `${Math.random() * 90 + 5}%`, 
        scale: Math.random() * 0.4 + 0.5,   
        delay: Math.random() * 6,
        duration: Math.random() * 8 + 12,   
        opacity: isBear ? Math.random() * 0.05 + 0.03 : Math.random() * 0.12 + 0.06,
        // Colorful variations for the hearts
        color: isBear ? "#6D442C" : ["#FF8580", "#FFB7B2", "#FFD1DA", "#FFEAE8"][i % 4]
      };
    });
    setElements(generatedElements);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute bottom-[-10%]"
          style={{ left: el.left }}
          initial={{ y: 0, x: 0, opacity: 0, scale: el.scale }}
          animate={{
            y: "-120vh",
            x: [0, 25, -25, 15, -15, 0], 
            opacity: [0, el.opacity, el.opacity, 0], 
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {el.type === "bear" ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill={el.color} style={{ opacity: 0.85 }}>
              <path d="M4.5 10c0-1.38 1.12-2.5 2.5-2.5.38 0 .74.09 1.06.24C8.6 6.64 9.73 6 11 6s2.4.64 2.94 1.74c.32-.15.68-.24 1.06-.24 1.38 0 2.5 1.12 2.5 2.5 0 .9-.48 1.69-1.19 2.13.12.44.19.9.19 1.37 0 3.04-2.46 5.5-5.5 5.5S5.5 16.54 5.5 13.5c0-.47.07-.93.19-1.37C4.98 11.69 4.5 10.9 4.5 10zm4.5 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill={el.color}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ==========================================
// 2. MICRO SPARKLE CARD COMPONENT
// ==========================================
function SparkleEffect({ containerId }) {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const symbols = ["✨", "🌸", "⭐", "☁️", "💗"];
    const generated = Array.from({ length: 5 }).map((_, i) => ({
      id: `${containerId}-sparkle-${i}`,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      top: `${Math.random() * 85 + 5}%`,
      left: `${Math.random() * 85 + 5}%`,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 4,
    }));
    setSparkles(generated);
  }, [containerId]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sp) => (
        <motion.span
          key={sp.id}
          style={{ position: "absolute", top: sp.top, left: sp.left }}
          className="text-sm select-none opacity-50 filter blur-[0.2px]"
          animate={{
            scale: [0, 1.3, 1, 0],
            opacity: [0, 0.6, 0.4, 0],
            y: [0, -20, -40],
          }}
          transition={{
            duration: sp.duration,
            repeat: Infinity,
            delay: sp.delay,
            ease: "easeInOut"
          }}
        >
          {sp.symbol}
        </motion.span>
      ))}
    </div>
  );
}

// ==========================================
// MAIN CONTACT PAGE CONTAINER COMPONENT
// ==========================================
export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate soft submit animation trigger
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#FFFDFB] text-[#4D3A2A] px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      {/* Colorful Floating Background Layer */}
      <BackgroundAnimations />

      <div className="max-w-4xl w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mt-8">
        
        {/* Left Side: Aesthetic Info Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:col-span-5 bg-[#FFF9F6] border border-[#6D442C]/10 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-xs"
        >
          <SparkleEffect containerId="contact-info-panel" />
          
          <div className="space-y-6 relative z-10">
            <div>
              <span className="inline-flex items-center rounded-full bg-[#FFEAE8] px-3 py-1 text-[10px] font-black tracking-wider text-[#FF8580] uppercase shadow-xs mb-3">
                Say Hello 🌸
              </span>
              <h1 className="font-serif text-3xl font-black tracking-tight text-[#3A2A1D] leading-tight">
                Let's Stay Connected!
              </h1>
            </div>
            
            <p className="text-xs font-medium text-[#7A6B5C] leading-relaxed">
              Have questions about your cozy drops, size tracking, or just want to send some love to the bears? Drop a message!
            </p>

            <div className="space-y-4 pt-4 border-t border-[#6D442C]/5 text-xs font-bold text-[#6D442C]">
              <div className="flex items-center gap-3">
                <span className="text-base">💌</span>
                <span>hello@snugbear.cozy</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-base">⏰</span>
                <span>Mon - Fri / 10 AM - 6 PM</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-base">📍</span>
                <span>Cloud Knits Studio, World</span>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-[#FFF0F0] p-4 text-[11px] font-medium text-[#6D442C] leading-normal relative z-10">
            ✨ <b>Response Time:</b> Our helper teddy bears typically reply within 24 cozy hours!
          </div>
        </motion.div>

        {/* Right Side: Contact Form Card */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="md:col-span-7 bg-white border border-[#6D442C]/10 rounded-3xl p-8 shadow-md relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="contact-form"
                onSubmit={handleSubmit} 
                className="space-y-5 relative z-10"
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#4D3A2A]">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Teddy Bear" 
                    className="w-full h-11 px-4 text-xs font-semibold rounded-xl border border-[#6D442C]/15 bg-[#FFFDFB] text-[#4D3A2A] placeholder-[#7A6B5C]/40 outline-none transition-all focus:border-[#FF8580] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#4D3A2A]">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="hello@cozy.com" 
                    className="w-full h-11 px-4 text-xs font-semibold rounded-xl border border-[#6D442C]/15 bg-[#FFFDFB] text-[#4D3A2A] placeholder-[#7A6B5C]/40 outline-none transition-all focus:border-[#FF8580] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#4D3A2A]">Message</label>
                  <textarea 
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your cozy thoughts here..." 
                    className="w-full p-4 text-xs font-semibold rounded-xl border border-[#6D442C]/15 bg-[#FFFDFB] text-[#4D3A2A] placeholder-[#7A6B5C]/40 outline-none transition-all resize-none focus:border-[#FF8580] focus:bg-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 inline-flex items-center justify-center rounded-xl bg-[#6D442C] text-xs font-bold uppercase tracking-widest text-white shadow-xs hover:opacity-95 active:scale-98 transition-all mt-2"
                >
                  Send Cozy Mail 💌
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center py-16 text-center space-y-3"
              >
                <motion.span 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="text-5xl"
                >
                  📬
                </motion.span>
                <h3 className="font-serif text-lg font-black text-[#4D3A2A]">Mail Sent Safely!</h3>
                <p className="text-xs font-medium text-[#7A6B5C] max-w-xs leading-relaxed">
                  Thank you for reaching out! Your message flew safely right into our honey basket. 🧸✨
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}