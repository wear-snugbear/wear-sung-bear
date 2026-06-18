import { useState } from "react";

// 🐻 IMPORT YOUR BRAND GRAPHICS/MODEL IMAGES HERE
// You can use your existing assets or lifestyle photographs
import storyImg1 from "../../assets/images/daydream_bloom.png";
import storyImg2 from "../../assets/images/creamy_beary.png";

export default function FounderStory() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative w-full bg-[#F4F2EE] px-4 py-16 sm:px-6 md:py-24 lg:px-8 overflow-hidden">
      
      {/* Decorative Background Doodles */}
      <div className="absolute top-12 left-8 pointer-events-none select-none text-2xl opacity-20">✨</div>
      <div className="absolute bottom-12 right-12 pointer-events-none select-none text-3xl opacity-15">🧸</div>
      <div className="absolute top-1/3 right-8 pointer-events-none select-none text-xl opacity-20">🎀</div>

      <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-12 lg:items-center">
        
        {/* Left Side: Creative Overlapping Photo Layout */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[380px] sm:h-[440px]">
          {/* Main Polaroid Image */}
          <div className="absolute z-10 bg-white p-3 pb-10 rounded-xl shadow-md border border-[#6D442C]/10 rotate-[-4deg] w-[220px] sm:w-[250px] transition-transform duration-300 hover:rotate-0 hover:scale-105">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#F7F2EF]">
              <img 
                src={storyImg1} 
                alt="SnugBear Aesthetic Look" 
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-serif text-center text-xs text-[#7A6B5C] mt-3 tracking-wide">
              made with love ♥
            </p>
          </div>

          {/* Secondary Overlapping Polaroid */}
          <div className="absolute z-0 bg-white p-3 pb-8 rounded-xl shadow-sm border border-[#6D442C]/5 rotate-[6deg] translate-x-24 translate-y-12 w-[180px] sm:w-[200px] transition-transform duration-300 hover:rotate-0">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#F7F2EF]">
              <img 
                src={storyImg2} 
                alt="SnugBear Soft Textures" 
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-serif text-center text-[10px] text-[#7A6B5C]/70 mt-2.5">
              choose your mood ✨
            </p>
          </div>
        </div>

        {/* Right Side: Editorial Narrative Copy */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFD1DA]/50 px-3.5 py-1 text-xs font-bold tracking-wider text-[#6D442C] uppercase">
              ♥ Our Story ♥
            </span>
            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-[#6D442C] sm:text-4xl md:text-5xl lg:leading-[1.15]">
              It Started With <span className="text-[#FF8580]">A Feeling</span>
            </h2>
          </div>

          <p className="text-base font-medium leading-relaxed text-[#6D442C]/80 max-w-xl mx-auto lg:mx-0">
            Snug Bear was never created to become "just another clothing brand." It started with a feeling noticed everywhere—girls expressing themselves through tiny details. Through Pinterest boards, saved reels, outfit moodboards, and clothes that somehow say things words cannot. Fashion for girls was never only fashion.
          </p>

          <blockquote className="border-l-4 border-[#FFD1DA] pl-4 italic text-sm text-[#7A6B5C] font-medium max-w-md mx-auto lg:mx-0">
            “Some days you want to feel soft. Some days confident. Some days completely delusional about life and still romanticize every second of it.”
          </blockquote>

          {/* Action Trigger */}
          <div className="pt-2">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#6D442C] px-8 text-xs font-bold tracking-wider uppercase text-[#FEFDE4] shadow-sm transition-all hover:bg-[#523320] hover:scale-[1.02] active:scale-[0.98]"
            >
              Read Full Story
            </button>
          </div>
        </div>

      </div>

      {/* FULL STORY MODAL OVERLAY PORTAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div 
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#FEFDE4] border-2 border-[#6D442C]/20 p-6 sm:p-10 shadow-2xl space-y-8 scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky/Absolute Close Button Header */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#6D442C]/10 text-[#6D442C] hover:bg-[#6D442C] hover:text-[#FEFDE4] transition-colors font-bold"
            >
              ✕
            </button>

            {/* Modal Brand Heading */}
            <div className="text-center space-y-2 border-b border-[#6D442C]/10 pb-6">
              <span className="text-2xl">🐻</span>
              <h3 className="font-serif text-3xl font-extrabold text-[#6D442C]">
                The Story of SnugBear
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF8580]">
                Warmth that feels like a hug
              </p>
            </div>

            {/* Narrative Context Body Grid */}
            <div className="space-y-6 text-sm text-[#6D442C]/90 leading-relaxed font-medium">
              <p>
                Snug Bear was never created to become "just another clothing brand." It started with a feeling I kept noticing everywhere around me—girls expressing themselves through tiny details. Through Pinterest boards, saved reels, outfit moodboards, late-night wishlist screenshots, random "this is so me" moments, and clothes that somehow say things words cannot.
              </p>
              <p>
                I realized fashion for girls was never only fashion. Some days you want to feel soft. Some days confident. Some days emotional. Some days playful. Some days completely delusional about life and still romanticize every second of it.
              </p>
              <p>
                But when I looked around, I felt something was missing. Either clothes were trendy but didn't feel personal, or aesthetic but uncomfortable, or comfortable but lacked personality. I wanted to create something different. Something that feels like your comfort character. That's where Snug Bear was born.
              </p>
              <p>
                A brand built around cute crop tops, cozy aesthetics, emotions, and wearable moods. Not clothing you wear. Clothing you feel.
              </p>
              <p>
                Every Snug Bear piece starts with one question: <span className="italic font-bold text-[#FF8580]">"How do we want her to feel?"</span> That question became our foundation. We started designing pieces that feel soft, look cute, and carry emotion. Because I believe getting dressed should feel like choosing your mood for the day. That's why our collections are not just collections. They're little chapters.
              </p>

              {/* Chapter Deconstructions */}
              <div className="mt-8 space-y-6 border-t border-[#6D442C]/10 pt-6">
                
                <div className="p-4 rounded-xl bg-white/40 border border-[#6D442C]/5">
                  <h4 className="font-serif text-base font-bold text-[#6D442C] mb-1.5 flex items-center gap-1.5">
                    <span>☕</span> SnugBear Basics
                  </h4>
                  <p className="text-xs text-[#7A6B5C]">
                    The collection that built our foundation. Minimal. Easy. Soft. The pieces you reach for without thinking. The ones that somehow always work. Snugbear Basics was created for the girls who love looking put together without trying too hard. Clean silhouettes, comfort-first fits, and cute details. Your everyday safe place.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FFF0F0] border border-[#FFE0E0]">
                  <h4 className="font-serif text-base font-bold text-[#FF8580] mb-1.5 flex items-center gap-1.5">
                    <span>💭</span> Delulu Diaries
                  </h4>
                  <p className="text-xs text-[#7A6B5C]">
                    For the girls living ten lives inside their head. The girls who romanticize coffee runs, create imaginary conversations, fall in love with sunsets, and manifest impossible things. Delulu Diaries is playful. It celebrates being expressive, dreamy, emotional, and unapologetically soft. Because maybe being a little delulu sometimes is what keeps life magical.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F7ECE1] border border-[#EBD4C0]">
                  <h4 className="font-serif text-base font-bold text-[#4D3A2A] mb-1.5 flex items-center gap-1.5">
                    <span>🌙</span> Moody Collection
                  </h4>
                  <p className="text-xs text-[#7A6B5C]">
                    Our most personal collection. If there's one collection that feels closest to my heart... It's Moody. Because every girl has moods she doesn't always explain. Some days she wants attention, some days she wants silence. Some days she feels pretty, some days she hides inside oversized clothes. All of those versions deserve space. Moody was created for those quiet emotions—for the girls who don't always want to talk about what they feel but still want to wear something that understands them.
                  </p>
                </div>

              </div>

              <p className="pt-4 border-t border-[#6D442C]/10 text-center text-xs font-semibold italic text-[#7A6B5C]">
                "We want to become the brand girls reach for when they want to feel like themselves. Cute. Comfortable. Expressive. A little emotional. A little dreamy. And always soft. Welcome to Snug Bear. Wear your mood. Live your story."
              </p>
            </div>

            {/* Modal Footer Sign-off */}
            <div className="text-center pt-2">
              <p className="font-serif text-sm font-bold text-[#6D442C]">With love,</p>
              <p className="text-xs font-bold tracking-wider text-[#FF8580] uppercase mt-0.5">
                Ansh Malhotra
              </p>
              <p className="text-[10px] text-[#7A6B5C] font-bold tracking-widest uppercase">
                Founder, SnugBear.co
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}