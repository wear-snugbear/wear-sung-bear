import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext"; // 🛒 Using your shared custom context hook
import { useNavigate } from "react-router-dom";
// ==========================================
// 1. COMBINED GLOBAL BACKGROUND ANIMATION LAYER
// ==========================================
function BackgroundAnimations() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const generatedElements = Array.from({ length: 10 }).map((_, i) => {
      const isBear = i % 3 === 0;
      return {
        id: `bg-cart-art-${i}`,
        type: isBear ? "bear" : "heart",
        left: `${Math.random() * 90 + 5}%`,
        scale: Math.random() * 0.4 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 14,
        opacity: isBear ? Math.random() * 0.04 + 0.02 : Math.random() * 0.1 + 0.05,
        color: isBear ? "#6D442C" : ["#FF8580", "#FFB7B2", "#FFD1DA"][i % 3]
      };
    });
    setElements(generatedElements);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute bottom-[-10%]"
          style={{ left: el.left }}
          initial={{ y: 0, x: 0, opacity: 0, scale: el.scale }}
          animate={{
            y: "-120vh",
            x: [0, 20, -20, 10, -10, 0],
            opacity: [0, el.opacity, el.opacity, 0],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {el.type === "bear" ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill={el.color} style={{ opacity: 0.75 }}>
              <path d="M4.5 10c0-1.38 1.12-2.5 2.5-2.5.38 0 .74.09 1.06.24C8.6 6.64 9.73 6 11 6s2.4.64 2.94 1.74c.32-.15.68-.24 1.06-.24 1.38 0 2.5 1.12 2.5 2.5 0 .9-.48 1.69-1.19 2.13.12.44.19.9.19 1.37 0 3.04-2.46 5.5-5.5 5.5S5.5 16.54 5.5 13.5c0-.47.07-.93.19-1.37C4.98 11.69 4.5 10.9 4.5 10zm4.5 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill={el.color}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ==========================================
// MAIN CART COMPONENT
// ==========================================
export default function Cart() {
  const navigate = useNavigate();
  // Destructure context attributes mapped directly to your CartContext values
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Dynamic calculations based off real elements in context
  const subtotal = cart ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;
  const shipping = subtotal > 1500 ? 0 : 99; // Free shipping if subtotal is over ₹1500
  const total = subtotal + shipping;

  return (
    <div className="relative min-h-screen bg-[#FFFDFB] text-[#4D3A2A] px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      <BackgroundAnimations />

      <div className="max-w-4xl w-full relative z-10 mt-8">
        {/* Page Title Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center rounded-full bg-[#FFEAE8] px-3 py-1 text-[10px] font-black tracking-wider text-[#FF8580] uppercase shadow-xs mb-2">
            Your Honey Basket 🍯
          </span>
          <h1 className="font-serif text-3xl font-black tracking-tight text-[#3A2A1D]">
            Your Shopping Cart
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {cart && cart.length > 0 ? (
            <motion.div 
              key="cart-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Dynamic Cart List items map */}
              <div className="lg:col-span-7 space-y-4">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.selectedSize}`} // Unique key handling identical items with distinct size selections
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="bg-white border border-[#6D442C]/10 rounded-2xl p-4 flex gap-4 items-center shadow-xs"
                    >
                      {/* Product Image preview */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FFF9F6] border border-[#6D442C]/5 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-sm font-black text-[#3A2A1D] truncate">{item.name}</h3>
                        <p className="text-[10px] text-[#7A6B5C] font-bold mt-0.5">
                          Size Fit: {item.selectedSize || "M"}
                        </p>
                        <p className="text-xs font-black text-[#FF8580] mt-2">₹{item.price}</p>
                      </div>

                      {/* Controls Area */}
                      <div className="flex flex-col items-end justify-between h-20 flex-shrink-0">
                        {/* Remove Button */}
                        <button 
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className="text-gray-300 hover:text-[#FF8580] p-1 transition-colors rounded-lg text-xs"
                          title="Remove item"
                        >
                          🌸 
                        </button>

                        {/* Quantity Counter */}
                        <div className="flex items-center bg-[#FFF9F6] border border-[#6D442C]/10 rounded-xl p-1 gap-2.5">
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center font-black rounded-lg hover:bg-[#FFEAE8] text-[#7A6B5C] transition-colors"
                          >
                            -
                          </button>
                          <span className="text-xs font-black min-w-[12px] text-center text-[#4D3A2A]">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center font-black rounded-lg hover:bg-[#FFEAE8] text-[#7A6B5C] transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Right Column: Checkout Breakdown Calculations Panel */}
              <div className="lg:col-span-5 bg-white border border-[#6D442C]/10 rounded-2xl p-5 shadow-xs space-y-4">
                <h3 className="font-serif text-base font-black text-[#3A2A1D] border-b border-[#6D442C]/5 pb-2">
                  Order Summary
                </h3>
                <div className="space-y-2 text-xs font-bold text-[#7A6B5C]">
                  <div className="flex justify-between">
                    <span>Basket Subtotal</span>
                    <span className="text-[#4D3A2A]">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cozy Shipping</span>
                    <span className="text-[#4D3A2A]">
                      {shipping === 0 ? "FREE ✨" : `₹${shipping}`}
                    </span>
                  </div>
                </div>
                <div className="border-t border-dashed border-[#6D442C]/10 pt-3 flex justify-between items-baseline">
                  <span className="text-sm font-black text-[#3A2A1D]">Total Amount</span>
                  <span className="text-lg font-black text-[#FF8580]">₹{total}</span>
                </div>
                <button 
  onClick={() => navigate('/checkout')} // This redirects the user
  className="w-full mt-2 h-11 bg-[#6D442C] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-md active:scale-98 transition-all"
>
  Proceed to Checkout 🐻
</button>
              </div>
            </motion.div>
          ) : (
            /* Empty Basket Fallback Render */
            <motion.div 
              key="empty-basket"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center bg-white/50 border border-dashed border-[#6D442C]/15 rounded-3xl p-8"
            >
              <span className="text-5xl mb-4 animate-bounce duration-1000">🍯</span>
              <h3 className="font-serif text-lg font-black text-[#4D3A2A]">Your basket is empty</h3>
              <p className="text-xs font-semibold text-[#7A6B5C] max-w-xs mt-1 leading-relaxed">
                Looks like you haven't captured any cozy drop variants yet! Fill your basket with something sweet.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}