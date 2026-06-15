import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

export default function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate(); // 2. Initialize it
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = () => {
    // 3. Create the order object
    const orderData = { 
      ...formData, 
      items: cart, 
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0) 
    };
    
    // 4. Navigate to Payment page, passing the data through 'state'
    navigate('/payment', { state: { orderData } });
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
          onClick={handleProceedToPayment} // 5. Trigger navigation
          className="w-full mt-6 bg-[#6D442C] hover:bg-[#4D3A2A] text-white py-4 rounded-2xl font-black tracking-widest text-sm transition-all shadow-md active:scale-[0.98]"
        >
          PROCEED TO PAYMENT ✨
        </button>
      </motion.div>
    </div>
  );
}