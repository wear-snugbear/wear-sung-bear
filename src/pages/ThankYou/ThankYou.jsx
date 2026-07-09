import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ThankYou() {
  const location = useLocation();
  const trackingId = location.state?.trackingId || "N/A";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDFB] p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#6D442C]/10 text-center shadow-lg"
      >
        {/* Updated: Image instead of Emoji */}
        <div className="mb-6 flex justify-center">
          <img 
            src="/images/bear.png" 
            alt="Snug Bear Success" 
            className="w-24 h-24 object-contain" 
          />
        </div>
        
        <h1 className="font-serif text-3xl font-black text-[#3A2A1D] mb-2">Thank You!</h1>
        <p className="text-[#7A6B5C] mb-6">Your order has been placed successfully. A confirmation email has been sent to your inbox.</p>
        
        <div className="bg-[#FFF9F6] p-4 rounded-xl border border-[#6D442C]/10 mb-8">
          <p className="text-[10px] uppercase font-bold text-[#7A6B5C]">Order Tracking ID</p>
          <p className="text-lg font-black text-[#6D442C] tracking-widest">{trackingId}</p>
        </div>

        <div className="space-y-3">
          <Link to="/track-order" className="block w-full py-3 bg-[#6D442C] text-white rounded-xl font-bold text-sm">
            Track Your Order
          </Link>
          <div className="flex gap-3">
            <Link to="/" className="flex-1 py-3 border border-[#6D442C]/20 rounded-xl font-bold text-sm text-[#4D3A2A]">
              Home
            </Link>
            <Link to="/collections" className="flex-1 py-3 border border-[#6D442C]/20 rounded-xl font-bold text-sm text-[#4D3A2A]">
              Shop More
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}