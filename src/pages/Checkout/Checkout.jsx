import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ 
    name: user?.displayName || '', 
    email: user?.email || '', 
    phone: '', 
    address: '' 
  });
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1500 ? 0 : 99;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = async () => {
    if (!formData.name || !formData.email || !formData.address || !formData.phone) {
      alert("Please fill in all delivery details.");
      return;
    }
    setLoading(true);
    const orderData = { ...formData, cart, paymentMethod, total };
    
    try {
      const response = await fetch("https://snugbear-backend-dosj.onrender.com/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      
      // Clear cart (if you have a clearCart function) and redirect
      // clearCart(); 
      navigate("/thank-you", { state: { trackingId: result.tracking_id } }); 
  } catch (error) {
      alert("Something went wrong. Please try again.");
  } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-serif text-3xl font-black text-[#3A2A1D] mb-8 text-center">Complete Your Order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Delivery Details */}
          <div className="lg:col-span-7 bg-white border border-[#6D442C]/10 rounded-2xl p-6 shadow-xs">
            <h2 className="font-serif text-lg font-black text-[#3A2A1D] mb-6">Delivery Details</h2>
            <div className="space-y-4">
              {['name', 'email', 'phone'].map((field) => (
                <div key={field}>
                  <label className="text-[10px] uppercase font-bold text-[#7A6B5C] ml-1">{field}</label>
                  <input 
                    name={field} 
                    type={field === 'email' ? 'email' : 'text'} 
                    value={formData[field]}
                    onChange={handleInputChange} 
                    readOnly={field === 'email'}
                    className="w-full px-4 py-3 mt-1 rounded-xl border border-[#6D442C]/10 bg-[#FFF9F6] focus:border-[#6D442C] outline-none text-sm font-medium transition-all" 
                  />
                </div>
              ))}
              <div>
                <label className="text-[10px] uppercase font-bold text-[#7A6B5C] ml-1">Delivery Address</label>
                <textarea name="address" onChange={handleInputChange} className="w-full px-4 py-3 mt-1 rounded-xl border border-[#6D442C]/10 bg-[#FFF9F6] h-24 resize-none text-sm focus:border-[#6D442C] outline-none" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5 bg-white border border-[#6D442C]/10 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="font-serif text-base font-black text-[#3A2A1D] border-b border-[#6D442C]/5 pb-3">Order Summary</h3>
            
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-[#FFF9F6]" />
                  <div className="flex-1">
                    <p className="text-xs font-black text-[#3A2A1D]">{item.name}</p>
                    <p className="text-[10px] font-bold text-[#7A6B5C]">Size: {item.selectedSize || "M"} | Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-black text-[#4D3A2A]">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-[#6D442C]/10 pt-4 space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#7A6B5C]">
                <span>Subtotal</span>
                <span className="text-[#4D3A2A]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#3A2A1D]">
                <span>Total</span>
                <span className="text-[#FF8580]">₹{total}</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-[#7A6B5C] mb-2 uppercase">Select Payment</p>
              <div className="flex gap-2">
                {['UPI', 'COD'].map((method) => (
                  <button key={method} onClick={() => setPaymentMethod(method)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${paymentMethod === method ? 'bg-[#6D442C] text-white' : 'border-[#6D442C]/10 hover:border-[#6D442C]'}`}>
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleProceedToPayment}
              disabled={loading}
              className="w-full h-11 bg-[#6D442C] text-white rounded-xl text-xs font-bold uppercase hover:opacity-95 shadow-md active:scale-98 transition-all"
            >
              {loading ? "Processing..." : "Confirm & Pay"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}