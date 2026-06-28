import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Checkout() {
  const { cart } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ... inside your Checkout component ...

  const handleProceedToPayment = async () => {
    if (!formData.name || !formData.email || !formData.address || !paymentMethod) {
      alert("Please complete all details and select a payment method.");
      return;
    }

    setLoading(true);

    // 1. Calculate the total here
    const calculatedTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // 2. Add 'total' to the orderData object
    const orderData = { 
      ...formData, 
      cart, 
      paymentMethod,
      total: calculatedTotal 
    };

    try {
      // Use the actual API URL if deployed, or localhost for testing
      const API_BASE = "https://snugbear-backend-dosj.onrender.com"; 
      
      const response = await fetch(`${API_BASE}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      
      alert(`Success! Your Tracking ID: ${result.tracking_id}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

// ... the rest of your component (return statement) remains the same ...

  return (
    <div className="min-h-screen bg-[#FFFBF9] py-12 px-4 flex justify-center items-start">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-100 shadow-xl"
      >
        <h2 className="font-serif text-3xl font-bold text-[#4D3A2A] mb-2">Checkout</h2>
        <p className="text-sm text-gray-500 mb-8">Almost there! Just a few details left.</p>

        {/* Order Summary Summary */}
        <div className="bg-[#FFF9F6] p-4 rounded-2xl mb-6 border border-[#6D442C]/5">
            <p className="text-xs font-bold text-[#6D442C] uppercase tracking-wider mb-1">Your Order Summary</p>
            <p className="text-sm font-semibold text-gray-700">{cart.length} items waiting for you.</p>
        </div>

        {/* Delivery Form */}
        <div className="space-y-4 mb-8">
          {['name', 'email', 'phone'].map((field) => (
            <div key={field}>
                <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">{field}</label>
                <input name={field} type={field === 'email' ? 'email' : 'text'} onChange={handleInputChange} 
                   className="w-full px-4 py-3 mt-1 rounded-xl border border-gray-200 focus:border-[#6D442C] outline-none transition-all text-sm font-medium" />
            </div>
          ))}
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Delivery Address</label>
            <textarea name="address" onChange={handleInputChange} 
                    className="w-full px-4 py-3 mt-1 rounded-xl border border-gray-200 focus:border-[#6D442C] outline-none transition-all text-sm font-medium h-20 resize-none" />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <p className="text-xs font-bold text-gray-400 mb-3 uppercase">Payment Method</p>
          <div className="grid grid-cols-2 gap-3">
            {['UPI', 'COD'].map((method) => (
              <button key={method} onClick={() => setPaymentMethod(method)}
                className={`py-3 rounded-xl border font-bold text-sm transition-all ${
                  paymentMethod === method ? "border-[#6D442C] bg-[#6D442C] text-white" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleProceedToPayment}
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-lg ${
            loading ? "bg-gray-300" : "bg-[#4D3A2A] hover:bg-[#2e2319]"
          } text-white`}
        >
          {loading ? "PROCESSING..." : "CONFIRM & PAY"}
        </button>
      </motion.div>
    </div>
  );
}