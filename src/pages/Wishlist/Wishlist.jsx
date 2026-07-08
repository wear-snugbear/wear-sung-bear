import React, { useState, useEffect } from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { QuickViewModal } from "../../pages/Collections/Collections"; 
import Reviews from "../../components/Reviews/Reviews";

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#6D442C]/10 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-xs font-bold text-[#4D3A2A] uppercase tracking-wider"
      >
        {title}
        <span className="text-[#A08A76] text-lg leading-none">{isOpen ? "−" : "+"}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-xs text-[#7A6B5C] leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Wishlist() {
  const { addToCart } = useCart();
  const { wishlist, loading: contextLoading, toggleWishlist } = useWishlist();
  
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isLocalLoading, setIsLocalLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLocalLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = contextLoading || isLocalLoading;

  if (isLoading) return <div className="p-20 text-center">Loading your cozy treasures... 🧸</div>;

  return (
    <div className="min-h-screen bg-[#FFFBF9] px-4 py-12 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl font-black text-[#4D3A2A] mb-8">My Cozy Wishlist ☁️</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#6D442C]/10">
            <p className="text-[#7A6B5C]">Your wishlist is empty. Time to add some cozy finds! ✨</p>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlist.map((product) => (
              <div
                key={product.id}
                onClick={() => setQuickViewProduct(product)}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#6D442C]/10 shadow-sm hover:border-[#6D442C]/30 transition-all cursor-pointer hover:shadow-md"
              >
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-xl" />

                <div className="flex-1">
                  <h3 className="font-bold text-[#4D3A2A]">{product.name}</h3>
                  <p className="text-[#6D442C] font-black">₹{product.price}</p>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); addToCart(product, product.sizes?.[0] || "M"); }}
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

      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal 
            product={quickViewProduct} 
            allProducts={wishlist}
            onClose={() => setQuickViewProduct(null)}
            onProductSelect={(newProduct) => setQuickViewProduct(newProduct)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}