import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
console.log("Is clearCart a function?", typeof clearCart);
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

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleProceedToPayment = async () => {
  if (!formData.name || !formData.email || !formData.address || !formData.phone) {
    alert("Please fill in all delivery details.");
    return;
  }
  
  setLoading(true);
  try {
    const response = await fetch("https://snugbear-backend-dosj.onrender.com/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, cart, paymentMethod, total }),
    });

    const result = await response.json();

    if (!response.ok) {
      // Throw the error so the catch block handles it
      throw new Error(result.message || "Payment failed");
    }

    // SUCCESS FLOW:
    // 1. Show the confirmation
    alert(`Success! Tracking ID: ${result.tracking_id}`);
    
    // 2. Clear cart
    clearCart(); 
    
    // 3. Force redirect using window.location to ensure a fresh state
    window.location.href = "/"; 
    
  } catch (error) {
    console.error("Checkout Error:", error);
    // Show the actual error message if possible
    alert(`Something went wrong: ${error.message}. Please check your internet or try again.`);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="font-serif text-4xl font-black text-[#3A2A1D] mb-2 text-center tracking-tight">Checkout</h1>
        <p className="text-center text-[#7A6B5C] font-medium mb-10">Almost there! Complete your cozy order below.</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Delivery Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-[#EBE3DE] rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h2 className="font-serif text-xl font-black text-[#3A2A1D] mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-[#6D442C] rounded-full"></span> Delivery Details
              </h2>
              <div className="space-y-5">
                {['name', 'email', 'phone'].map((field) => (
                  <div key={field}>
                    <label className="text-[11px] uppercase font-bold tracking-widest text-[#A8988C] ml-1">{field}</label>
                    <input 
                      name={field} 
                      type={field === 'email' ? 'email' : 'text'} 
                      value={formData[field]}
                      onChange={handleInputChange} 
                      readOnly={field === 'email'}
                      className="w-full px-5 py-4 mt-1.5 rounded-2xl border border-[#EBE3DE] bg-[#FFF9F6] focus:border-[#6D442C] outline-none text-sm font-semibold text-[#3A2A1D] transition-all" 
                    />
                  </div>
                ))}
                <div>
                  <label className="text-[11px] uppercase font-bold tracking-widest text-[#A8988C] ml-1">Delivery Address</label>
                  <textarea 
                    name="address" 
                    onChange={handleInputChange} 
                    rows={3}
                    className="w-full px-5 py-4 mt-1.5 rounded-2xl border border-[#EBE3DE] bg-[#FFF9F6] focus:border-[#6D442C] outline-none text-sm font-semibold text-[#3A2A1D] transition-all resize-none" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#EBE3DE] rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-24">
              <h3 className="font-serif text-lg font-black text-[#3A2A1D] mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-2xl object-cover bg-[#FFF9F6]" />
                    <div className="flex-1">
                      <p className="text-sm font-black text-[#3A2A1D]">{item.name}</p>
                      <p className="text-[11px] font-bold text-[#7A6B5C]">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-black text-[#4D3A2A]">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-[#EBE3DE] pt-6 space-y-3">
                <div className="flex justify-between text-sm font-bold text-[#7A6B5C]">
                  <span>Subtotal</span>
                  <span className="text-[#3A2A1D]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-lg font-black text-[#3A2A1D]">
                  <span>Total</span>
                  <span className="text-[#6D442C]">₹{total}</span>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[11px] font-bold tracking-widest text-[#A8988C] mb-3 uppercase">Payment Method</p>
                <div className="flex gap-3">
                  {['UPI', 'COD'].map((method) => (
                    <button key={method} onClick={() => setPaymentMethod(method)}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${paymentMethod === method ? 'bg-[#6D442C] text-white' : 'bg-[#FFF9F6] border-[#EBE3DE] text-[#6D442C] hover:border-[#6D442C]'}`}>
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleProceedToPayment}
                disabled={loading}
                className="w-full mt-8 py-4 bg-[#6D442C] text-white rounded-2xl text-sm font-bold uppercase tracking-wide hover:bg-[#523321] transition-colors shadow-lg shadow-[#6D442C]/20"
              >
                {loading ? "Processing..." : "Confirm & Pay"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}