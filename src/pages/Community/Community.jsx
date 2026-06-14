import { useState } from "react";
import PageGlow from "../../components/PageGlow/PageGlow";

function Community() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  // Sample data for Community Perks/Activities
  const perks = [
    {
      title: "Local Meetups & Workshops",
      description: "Join our seasonal gatherings, hands-on craft workshops, and community circles hosted worldwide.",
      icon: "🌱"
    },
    {
      title: "Exclusive Digital Forums",
      description: "Connect 24/7 with fellow creators, share inspiration, and discuss your latest creative projects.",
      icon: "💬"
    },
    {
      title: "Collaborative Projects",
      description: "Get early access to community-driven design submissions, voting on new collections, and co-creation.",
      icon: "✨"
    }
  ];

  // Sample data simulating user-uploaded photos or an Instagram community feed
  const galleryImages = [
    { id: 1, label: "@creative_soul", placeholder: "bg-[#F3E2B6]" },
    { id: 2, label: "@nature_studios", placeholder: "bg-[#E6D5A9]" },
    { id: 3, label: "@the_artisan_way", placeholder: "bg-[#DAC99D]" },
    { id: 4, label: "@earthy_home", placeholder: "bg-[#CDBC91]" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FEFDE4] text-[#6D442C]">
      <PageGlow />
      
      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-32">
        
        {/* 1. Hero Section */}
        <div className="text-center mb-16 sm:mb-24">
          <span className="text-sm font-semibold tracking-widest uppercase opacity-75">Our Inner Circle</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight font-serif">
            Welcome to the Community
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg opacity-90 leading-relaxed">
            A collective space for shared stories, creative inspiration, and conscious living. We believe in building deeper connections through shared passions.
          </p>
        </div>

        {/* 2. Perks / How to Engage Section */}
        <div className="grid gap-8 sm:grid-cols-3 mb-20 sm:mb-28">
          {perks.map((perk, index) => (
            <div 
              key={index} 
              className="flex flex-col p-6 rounded-2xl bg-[#FFFDF2] border border-[#6D442C]/10 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
            >
              <div className="text-3xl mb-4">{perk.icon}</div>
              <h3 className="text-xl font-bold mb-2">{perk.title}</h3>
              <p className="text-sm opacity-85 leading-relaxed flex-grow">{perk.description}</p>
            </div>
          ))}
        </div>

        {/* 3. Community Feed / Visual Gallery */}
        <div className="mb-20 sm:mb-28">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">Shared by the Collective</h2>
              <p className="text-sm opacity-85 mt-1">Tag your moments with us to be featured in our seasonal lookbook.</p>
            </div>
            <span className="text-sm font-medium underline cursor-pointer mt-2 sm:mt-0 opacity-95 hover:opacity-100">
              View Instagram Feed →
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {galleryImages.map((img) => (
              <div 
                key={img.id} 
                className="group relative aspect-square overflow-hidden rounded-xl border border-[#6D442C]/10 cursor-pointer"
              >
                {/* Visual Placeholder for actual user photos */}
                <div className={`w-full h-full ${img.placeholder} transition-transform duration-500 group-hover:scale-105 flex items-center justify-center text-xs opacity-40 font-mono`}>
                  [Photo Placeholder]
                </div>
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#6D442C]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3">
                  <span className="text-white text-xs font-medium tracking-wide">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Newsletter / Sign Up Call to Action */}
        <div className="rounded-3xl bg-[#6D442C] text-[#FEFDE4] p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[#FEFDE4]/5 pointer-events-none mix-blend-overlay"></div>
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-3">Stay in the Loop</h2>
            <p className="text-sm sm:text-base opacity-90 mb-6">
              Subscribe to receive updates on upcoming digital events, exclusive community product drops, and storytelling articles.
            </p>

            {subscribed ? (
              <div className="p-4 bg-[#FEFDE4]/10 rounded-xl border border-[#FEFDE4]/20 animate-fade-in">
                <p className="font-medium">✨ Thank you for joining! Check your inbox soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-3 rounded-xl bg-[#FEFDE4] text-[#6D442C] placeholder-[#6D442C]/60 text-sm outline-none focus:ring-2 focus:ring-[#FEFDE4]/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#FEFDE4] text-[#6D442C] font-semibold text-sm transition-transform duration-200 active:scale-95 hover:bg-[#FFFDF2] shadow-sm"
                >
                  Join Us
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Community;