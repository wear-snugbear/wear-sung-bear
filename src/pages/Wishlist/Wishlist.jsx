import React, { useState, useEffect } from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Wishlist() {
  const { addToCart } = useCart();
  const [activeQuickView, setActiveQuickView] = useState(null);
  
  // 1. Get the wishlist from context
  const { wishlist, loading: contextLoading, toggleWishlist } = useWishlist();
  
  // 2. Define a local loading state for this component's transition
  const [isLocalLoading, setIsLocalLoading] = useState(true);

  // 3. Update the useEffect to use the local setter
  useEffect(() => {
    const timer = setTimeout(() => setIsLocalLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // 4. Determine if the page is loading based on BOTH context and local state
  const isLoading = contextLoading || isLocalLoading;

  if (isLoading) return <div className="p-20 text-center">Loading your cozy treasures... 🧸</div>;

  return (
    <div className="min-h-screen bg-[#FFFBF9] px-4 py-12 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl font-black text-[#4D3A2A] mb-8">My Cozy Wishlist ☁️</h1>

        {/* Use isLoading here instead of loading */}
        {isLoading ? (
          <div className="text-center py-20 text-[#7A6B5C] animate-pulse">
            Loading your saved cozy items... ✨
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#6D442C]/10">
            <p className="text-[#7A6B5C]">Your wishlist is empty. Time to add some cozy finds! ✨</p>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlist.map((product) => (
              <div
                key={product.id}
                onClick={() => setActiveQuickView(product)}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#6D442C]/10 shadow-sm hover:border-[#6D442C]/30 transition-all cursor-pointer"
              >
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-xl" />

                <div className="flex-1">
                  <h3 className="font-bold text-[#4D3A2A]">{product.name}</h3>
                  <p className="text-[#6D442C] font-black">₹{product.price}</p>
                </div>

                {/* stopPropagation prevents these clicks from triggering the Quick Preview */}
                <button
                  onClick={(e) => { e.stopPropagation(); addToCart(product, "M"); }}
                  className="px-4 py-2 bg-[#6D442C] text-white text-xs font-bold rounded-xl hover:bg-[#4D3A2A] transition-all"
                >
                  Add to Cart
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                  className="text-xs text-[#FF4D6D] font-bold px-2 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {activeQuickView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#2B1C13]/20 backdrop-blur-sm"
              onClick={() => setActiveQuickView(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm relative z-10 shadow-2xl"
            >
              <button
                onClick={() => setActiveQuickView(null)}
                className="absolute top-4 right-4 text-[#A08A76] hover:text-[#4D3A2A] text-lg"
              >✕</button>

              <img src={activeQuickView.image} alt={activeQuickView.name} className="w-full h-64 object-cover rounded-2xl mb-4" />
              <h2 className="text-lg font-black text-[#4D3A2A]">{activeQuickView.name}</h2>
              <p className="text-sm text-[#7A6B5C] mt-2">{activeQuickView.description || "A cozy essential for your collection."}</p>

              <div className="mt-6 flex justify-between items-center border-t border-[#F0E4DD] pt-4">
                <span className="font-black text-[#6D442C] text-lg">₹{activeQuickView.price}</span>
                <button
                  onClick={() => { addToCart(activeQuickView, "M"); setActiveQuickView(null); }}
                  className="px-6 py-2 bg-[#6D442C] text-white text-xs font-bold rounded-xl hover:bg-[#4D3A2A]"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}