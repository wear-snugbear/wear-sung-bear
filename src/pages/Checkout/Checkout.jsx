import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Checkout() {
  const { cart } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(""); // New: For better UI feedback

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Inside your Checkout.jsx
const handleProceedToPayment = async () => {
  // ... existing validation ...

  setLoading(true);
  
  // Increase the timeout to 60 seconds to allow Render time to "wake up"
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 60000); 

  try {
    const response = await fetch("https://snugbear-backend.onrender.com/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
      signal: controller.signal
    });

    clearTimeout(id); 

    if (!response.ok) throw new Error("Server error");
    
    alert("Order placed successfully!");
  } catch (error) {
    if (error.name === 'AbortError') {
      // Provide a clearer message to the user
      alert("The server is waking up from a sleep state. Please wait 10 seconds and try again.");
    } else {
      alert("Could not connect to the backend server.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#FFFBF9] py-12 px-4 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#6D442C]/10 shadow-lg"
      >
        <h2 className="font-serif text-2xl font-black text-[#4D3A2A] mb-1">Final Snuggles 🧸</h2>
        <p className="text-xs text-[#7A6B5C] font-bold mb-6 tracking-wide uppercase">Fill in your delivery details</p>

        <div className="space-y-4">
          {['name', 'email', 'phone'].map((field) => (
            <input 
              key={field}
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)} 
              onChange={handleInputChange} 
              className="w-full px-4 py-3 rounded-xl border border-[#6D442C]/10 bg-[#FFF9F6] focus:border-[#FF8580] outline-none transition-all placeholder:text-[#7A6B5C]/50 text-sm font-bold" 
            />
          ))}
          <textarea 
            name="address" 
            placeholder="Delivery Address" 
            onChange={handleInputChange} 
            className="w-full px-4 py-3 rounded-xl border border-[#6D442C]/10 bg-[#FFF9F6] focus:border-[#FF8580] outline-none transition-all placeholder:text-[#7A6B5C]/50 text-sm font-bold h-24 resize-none" 
          />
        </div>

        {/* Dynamic status message area */}
        <AnimatePresence>
          {loading && (
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mt-4 text-[10px] text-center font-bold text-[#6D442C] animate-pulse"
            >
              {statusMsg}
            </motion.p>
          )}
        </AnimatePresence>

        <button 
          onClick={handleProceedToPayment}
          disabled={loading}
          className={`w-full mt-6 py-4 rounded-2xl font-black tracking-widest text-sm transition-all shadow-md active:scale-[0.98] ${
            loading ? "bg-[#A38B78] cursor-not-allowed" : "bg-[#6D442C] hover:bg-[#4D3A2A]"
          } text-white`}
        >
          {loading ? "PROCESSING..." : "PROCEED TO PAYMENT ✨"}
        </button>
      </motion.div>
    </div>
  );
}