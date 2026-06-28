import { useState } from "react";
import { motion } from "framer-motion";
import PageGlow from "../../components/PageGlow/PageGlow";
import { useNavigate } from "react-router-dom";

export default function Community() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ order_id: "", email: "", instagram: "" });
  const navigate = useNavigate();
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
    <div className="relative min-h-screen overflow-hidden bg-[#FFFBF9] text-[#6D442C]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFE3DB_0%,transparent_35%),radial-gradient(circle_at_bottom,#FFF1EC_0%,transparent_30%)]" />
      <PageGlow />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-black mb-4"
          >
            Snugbear <span className="text-[#FF8580]">Founding Circle</span> 🧸
          </motion.h1>
          <p className="text-[#7A6B5C] font-medium max-w-xl mx-auto">
            Be part of the original 50. A tiny, cozy circle made for the sweetest early supporters.
          </p>
        </div>

        <div className="bg-white border-2 border-[#6D442C]/10 rounded-[2rem] p-8 md:p-12 mb-16 shadow-xl shadow-[#6D442C]/5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#FF8580]/10 text-[#FF8580] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                Limited Entry
              </span>
              <h2 className="text-2xl font-bold font-serif mt-4 mb-4">A Soft Little Gift for Our First 50</h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Join as a Founding Member and help shape the journey of Snugbear. As a warm thank-you,{" "}
                <strong>complete your journey to receive a complimentary Moody Collection piece on us!</strong>
              </p>

              <div className="space-y-4">
                {[
                  { title: "Snuggle Up", desc: "Order your favorite Snugbear gear." },
                  { title: "Share the Love", desc: "Post an Instagram reel with your cozy vibe." },
                  { title: "Claim Your Spot", desc: "Submit your details to enter the circle." },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4 text-sm">
                    <div className="w-7 h-7 rounded-full bg-[#6D442C] text-white flex items-center justify-center text-[10px] font-bold mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-bold text-[#6D442C]">{step.title}</p>
                      <p className="text-gray-500 text-[11px]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FFF9F6] p-6 rounded-2xl border border-[#6D442C]/5 shadow-sm">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <span className="text-5xl block mb-2">✨</span>
                  <h3 className="font-bold text-lg">Entry Received!</h3>
                  <p className="text-xs mt-2 text-gray-600">Welcome to the inner circle. We’ll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleFoundingCircleSignup} className="space-y-4">
                  <input
                    required
                    value={formData.order_id}
                    onChange={(e) => setFormData({ ...formData, order_id: e.target.value })}
                    placeholder="Order ID"
                    className="w-full px-4 py-3 rounded-xl border border-[#6D442C]/10 text-sm focus:border-[#FF8580] outline-none transition-all bg-white"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-xl border border-[#6D442C]/10 text-sm focus:border-[#FF8580] outline-none transition-all bg-white"
                  />
                  <input
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="Instagram Handle (@username)"
                    className="w-full px-4 py-3 rounded-xl border border-[#6D442C]/10 text-sm focus:border-[#FF8580] outline-none transition-all bg-white"
                  />
                  <button className="w-full py-3 bg-[#6D442C] text-white rounded-xl font-bold text-sm hover:bg-[#4D3A2A] transition-all transform hover:scale-[1.02]">
                    JOIN THE CIRCLE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Early Access", desc: "Shop new drops before anyone else.", icon: "🚀" },
            { title: "Exclusive Voting", desc: "Help choose future designs.", icon: "🗳️" },
            { title: "Cozy Meetups", desc: "Get invited to seasonal gatherings.", icon: "☕" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-[#6D442C]/10 text-center hover:border-[#FF8580] transition-all shadow-sm hover:shadow-md"
            >
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