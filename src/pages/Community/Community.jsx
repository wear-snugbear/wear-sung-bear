import { useState } from "react";
import { motion } from "framer-motion";
import PageGlow from "../../components/PageGlow/PageGlow";
import { useNavigate } from "react-router-dom";

export default function Community() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ order_id: '', email: '', instagram: '' });
  const navigate = useNavigate();

  // Use your production backend URL
  const API_BASE = "https://snugbear-backend-dosj.onrender.com";

  const handleFoundingCircleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/api/community/founding-circle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => navigate("/founding-circle"), 1000);
      } else {
        const errorData = await response.json();
        console.error("Server responded with:", errorData);
        alert("Submission failed. Please check your details.");
      }
    } catch (error) {
      console.error("Network or CORS error:", error);
      alert("Network error. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFFBF9] text-[#6D442C]">
      <PageGlow />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20">
        {/* 1. Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-black mb-4"
          >
            Snugbear <span className="text-[#FF8580]">Founding Circle</span> 🧸
          </motion.h1>
          <p className="text-[#7A6B5C] font-medium max-w-xl mx-auto">
            Join the inner circle of our first 50 supporters and be a part of the Snugbear story from the very beginning.
          </p>
        </div>

        {/* 2. Founding Circle Promotion Section */}
        <div className="bg-white border-2 border-[#6D442C]/10 rounded-[2rem] p-8 md:p-12 mb-16 shadow-xl shadow-[#6D442C]/5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold font-serif mb-4">Limited Offer: Free Article!</h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                As a thank you to our founding members, the first 50 customers who purchase, post a reel on Instagram, and fill out this form will receive <strong>one moody collection article</strong> from our collection—on us!
              </p>
              
              <div className="space-y-4">
                {['1. Purchase your favorite Snuggies', '2. Share how your bear made you feel today on your socials', '3. Submit your details'].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-[#6D442C]">
                    <div className="w-6 h-6 rounded-full bg-[#FF8580] text-white flex items-center justify-center text-[10px]">{i + 1}</div>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FFF9F6] p-6 rounded-2xl border border-[#6D442C]/5">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <span className="text-4xl block mb-2">✨</span>
                  <h3 className="font-bold">Entry Received!</h3>
                  <p className="text-xs mt-2">We’ll reach out via email if you're one of our first 50!</p>
                </div>
              ) : (
                <form onSubmit={handleFoundingCircleSignup} className="space-y-4">
                  <input 
                    required 
                    value={formData.order_id} 
                    onChange={(e) => setFormData({...formData, order_id: e.target.value})} 
                    placeholder="Your Order ID" 
                    className="w-full px-4 py-3 rounded-xl border border-[#6D442C]/10 text-sm" 
                  />
                  <input 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    placeholder="Email Address" 
                    className="w-full px-4 py-3 rounded-xl border border-[#6D442C]/10 text-sm" 
                  />
                  <input 
                    value={formData.instagram} 
                    onChange={(e) => setFormData({...formData, instagram: e.target.value})} 
                    placeholder="Instagram Handle (@...)" 
                    className="w-full px-4 py-3 rounded-xl border border-[#6D442C]/10 text-sm" 
                  />
                  <button className="w-full py-3 bg-[#6D442C] text-white rounded-xl font-bold text-sm hover:bg-[#4D3A2A] transition-all">
                    JOIN THE CIRCLE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 3. Community Perks */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Early Access", desc: "Get first dibs on all new drops.", icon: "🚀" },
            { title: "Exclusive Voting", desc: "Help us decide our next designs.", icon: "🗳️" },
            { title: "Meetups", desc: "Join our seasonal cozy gatherings.", icon: "☕" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-[#6D442C]/10 text-center hover:border-[#FF8580] transition-colors">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="font-bold text-sm mb-1">{item.title}</h4>
              <p className="text-[11px] text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}