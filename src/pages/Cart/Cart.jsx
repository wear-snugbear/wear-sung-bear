import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const AVAILABLE_COUPONS = [
  { code: "SNUG10", discount: 10, label: "10% OFF on your first order!" },
  { code: "COZY20", discount: 20, label: "Get ₹20 OFF on orders above ₹1000" },
];

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useCart();
  
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isCouponOpen, setIsCouponOpen] = useState(false);

  const subtotal = cart ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;
  const shipping = subtotal > 699 || subtotal === 0 ? 0 : 99;
  const discountAmount = selectedCoupon 
    ? (selectedCoupon.code === "SNUG10" ? subtotal * 0.1 : 20) 
    : 0;
  const total = Math.max(0, subtotal + shipping - discountAmount);

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-[#4D3A2A] px-4 py-10 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col">
      
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl font-black text-[#3A2A1D]">Your Shopping Basket</h1>
      </div>

      <AnimatePresence mode="wait">
        {cart && cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Scrollable Cart Items Container */}
            {/* Added max-h-[60vh] and overflow-y-auto to fix the scrolling issue */}
            <div className="lg:col-span-7 space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="bg-white border border-[#EBE3DE] rounded-2xl p-4 flex gap-4 items-center shadow-sm">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-[#FFF9F6]" />
                  <div className="flex-1">
                    <h3 className="font-black text-sm text-[#3A2A1D]">{item.name}</h3>
                    <p className="text-[10px] font-bold text-[#7A6B5C]">Size: {item.selectedSize}</p>
                    <p className="text-xs font-black text-[#6D442C]">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)} className="text-[#A8988C] font-bold px-2 py-1">−</button>
                    <span className="text-sm font-black">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)} className="text-[#A8988C] font-bold px-2 py-1">+</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white border border-[#6D442C]/10 rounded-2xl p-5 shadow-sm">
                <button 
                  onClick={() => setIsCouponOpen(!isCouponOpen)}
                  className="w-full flex justify-between items-center text-sm font-bold text-[#6D442C]"
                >
                  {selectedCoupon ? `Applied: ${selectedCoupon.code}` : "View Available Offers 🏷️"}
                  <span>{isCouponOpen ? "▲" : "▼"}</span>
                </button>
                
                {isCouponOpen && (
                  <div className="mt-4 space-y-2">
                    {AVAILABLE_COUPONS.map((coupon) => (
                      <div key={coupon.code} className="p-3 border border-[#EBE3DE] rounded-xl flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold">{coupon.code}</p>
                          <p className="text-[#7A6B5C]">{coupon.label}</p>
                        </div>
                        <button 
                          onClick={() => { setSelectedCoupon(coupon); setIsCouponOpen(false); }}
                          className="bg-[#6D442C] text-white px-3 py-1 rounded-lg font-bold"
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white border border-[#EBE3DE] rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex justify-between text-sm font-bold text-[#7A6B5C]">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm font-bold text-green-600">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#7A6B5C]">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-black text-[#3A2A1D]">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-4 py-4 bg-[#6D442C] text-white rounded-2xl font-bold uppercase tracking-wide hover:bg-[#523321] transition-all"
                >
                  Proceed to Checkout 🐻
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 font-bold text-[#7A6B5C]">Your basket is empty! 🧸</div>
        )}
      </AnimatePresence>
    </div>
  );
}