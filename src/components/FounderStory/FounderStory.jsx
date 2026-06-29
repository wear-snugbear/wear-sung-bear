import { useState } from "react";

// 🐻 IMPORT YOUR BRAND GRAPHICS/MODEL IMAGES HERE

export default function FounderStory() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative w-full bg-[#F4F2EE] px-4 py-12 sm:px-6 md:py-24 lg:px-8 overflow-hidden">
      
      {/* Decorative Background Doodles - Hidden on very small screens to prevent clutter */}
      <div className="absolute top-12 left-4 md:left-8 pointer-events-none select-none text-2xl opacity-20">✨</div>
      <div className="absolute bottom-12 right-4 md:right-12 pointer-events-none select-none text-3xl opacity-15">🧸</div>
      <div className="absolute top-1/3 right-4 md:right-8 pointer-events-none select-none text-xl opacity-20">🎀</div>

      <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-12 lg:items-center">
        
        {/* Left Side: Creative Overlapping Photo Layout */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[320px] sm:h-[400px] lg:h-[440px]">
          {/* Main Polaroid Image */}
          <div className="absolute z-10 bg-white p-3 pb-8 sm:pb-10 rounded-xl shadow-md border border-[#6D442C]/10 rotate-[-4deg] w-[180px] sm:w-[250px] transition-transform duration-300 hover:rotate-0 hover:scale-105">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#F7F2EF]">
              <img 
                src="/images/daydream_bloom.png" 
                loading="lazy" 
                alt="SnugBear Aesthetic Look" 
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-serif text-center text-[10px] sm:text-xs text-[#7A6B5C] mt-2 sm:mt-3 tracking-wide">
              made with love ♥
            </p>
          </div>

          {/* Secondary Overlapping Polaroid */}
          <div className="absolute z-0 bg-white p-3 pb-6 sm:pb-8 rounded-xl shadow-sm border border-[#6D442C]/5 rotate-[6deg] translate-x-16 sm:translate-x-24 translate-y-10 sm:translate-y-12 w-[150px] sm:w-[200px] transition-transform duration-300 hover:rotate-0">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#F7F2EF]">
              <img 
                src="/images/creamy_beary.png" 
                loading="lazy" 
                alt="SnugBear Soft Textures" 
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-serif text-center text-[9px] sm:text-[10px] text-[#7A6B5C]/70 mt-2">
              choose your mood ✨
            </p>
          </div>
        </div>

        {/* Right Side: Editorial Narrative Copy */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFD1DA]/50 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[10px] sm:text-xs font-bold tracking-wider text-[#6D442C] uppercase">
              ♥ Our Story ♥
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight text-[#6D442C] md:text-5xl lg:leading-[1.15]">
              It Started With <span className="text-[#FF8580]">A Feeling</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base font-medium leading-relaxed text-[#6D442C]/80 max-w-xl mx-auto lg:mx-0">
            Snug Bear was never created to become "just another clothing brand." It started with a feeling noticed everywhere—girls expressing themselves through tiny details. Through Pinterest boards, saved reels, outfit moodboards, and clothes that somehow say things words cannot. Fashion for girls was never only fashion.
          </p>

          <blockquote className="border-l-4 border-[#FFD1DA] pl-4 italic text-xs sm:text-sm text-[#7A6B5C] font-medium max-w-md mx-auto lg:mx-0">
            “Some days you want to feel soft. Some days confident. Some days completely delusional about life and still romanticize every second of it.”
          </blockquote>

          {/* Action Trigger */}
          <div className="pt-2">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex h-11 sm:h-12 items-center justify-center rounded-xl bg-[#6D442C] px-6 sm:px-8 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#FEFDE4] shadow-sm transition-all hover:bg-[#523320] hover:scale-[1.02] active:scale-[0.98]"
            >
              Read Full Story
            </button>
          </div>
        </div>
      </div>

      {/* FULL STORY MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FEFDE4] border-2 border-[#6D442C]/20 p-6 sm:p-10 shadow-2xl space-y-6 sm:space-y-8 scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#6D442C]/10 text-[#6D442C] hover:bg-[#6D442C] hover:text-[#FEFDE4] transition-colors font-bold"
            >
              ✕
            </button>

            <div className="text-center space-y-2 border-b border-[#6D442C]/10 pb-6">
              <span className="text-xl sm:text-2xl">🐻</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#6D442C]">
                The Story of SnugBear
              </h3>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FF8580]">
                Warmth that feels like a hug
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 text-xs sm:text-sm text-[#6D442C]/90 leading-relaxed font-medium">
              <p>Snug Bear was never created to become "just another clothing brand." It started with a feeling I kept noticing everywhere—girls expressing themselves through tiny details. Through Pinterest boards, saved reels, outfit moodboards, and clothes that somehow say things words cannot.</p>
              <p>I realized fashion for girls was never only fashion. Some days you want to feel soft. Some days confident. Some days emotional. Some days playful. Some days completely delusional about life and still romanticize every second of it.</p>
              <p>I wanted to create something different. Something that feels like your comfort character. That's where Snug Bear was born. A brand built around cute crop tops, cozy aesthetics, emotions, and wearable moods. Not clothing you wear. Clothing you feel.</p>
              <p>Every Snug Bear piece starts with one question: <span className="italic font-bold text-[#FF8580]">"How do we want her to feel?"</span> That question became our foundation.</p>

              <div className="mt-8 space-y-4 border-t border-[#6D442C]/10 pt-6">
                {[
                  { emoji: "☕", title: "SnugBear Basics", color: "bg-white/40", text: "Minimal. Easy. Soft. The pieces you reach for without thinking." },
                  { emoji: "💭", title: "Delulu Diaries", color: "bg-[#FFF0F0]", text: "Playful. Celebrates being expressive, dreamy, emotional, and unapologetically soft." },
                  { emoji: "🌙", title: "Moody Collection", color: "bg-[#F7ECE1]", text: "Our most personal collection. For those quiet emotions and moods you don't always explain." }
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-xl ${item.color} border border-[#6D442C]/5`}>
                    <h4 className="font-serif text-sm font-bold text-[#6D442C] mb-1">{item.emoji} {item.title}</h4>
                    <p className="text-[11px] text-[#7A6B5C] leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <p className="pt-4 border-t border-[#6D442C]/10 text-center text-[10px] sm:text-xs font-semibold italic text-[#7A6B5C]">
                "We want to become the brand girls reach for when they want to feel like themselves. Welcome to Snug Bear. Wear your mood. Live your story."
              </p>
            </div>

            <div className="text-center pt-2">
              <p className="font-serif text-sm font-bold text-[#6D442C]">With love,</p>
              <p className="text-[10px] sm:text-xs font-bold tracking-wider text-[#FF8580] uppercase mt-0.5">Ansh Malhotra</p>
              <p className="text-[9px] text-[#7A6B5C] font-bold tracking-widest uppercase">Founder, SnugBear.co</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}