import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = async () => {
  if (!formData.name || !formData.email || !formData.address) {
    alert("Please fill in all required fields.");
    return;
  }

  const orderData = { 
    ...formData, 
    items: cart, 
    total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0) 
  };

  setLoading(true);

  // Set a timeout controller
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 20000); // 20 second timeout

  try {
    const response = await fetch("https://snugbear-backend.onrender.com/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
      signal: controller.signal
    });

    clearTimeout(id); // Clear timeout if response is received

    if (!response.ok) throw new Error("Server error");
    
    // Handle success (e.g., navigate to success page)
    alert("Order placed successfully!");
  } catch (error) {
    if (error.name === 'AbortError') {
      alert("The server is taking too long to respond (Cold Start). Please try again in a moment.");
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

        <button 
          onClick={handleProceedToPayment}
          disabled={loading}
          className={`w-full mt-6 py-4 rounded-2xl font-black tracking-widest text-sm transition-all shadow-md active:scale-[0.98] ${
            loading ? "bg-[#7A6B5C] cursor-not-allowed" : "bg-[#6D442C] hover:bg-[#4D3A2A]"
          } text-white`}
        >
          {loading ? "PROCESSING... ☁️" : "PROCEED TO PAYMENT ✨"}
        </button>
      </motion.div>
    </div>
  );
}