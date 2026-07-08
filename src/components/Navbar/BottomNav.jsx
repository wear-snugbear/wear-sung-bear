import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext"; // Assuming you have this
import UserMenu from "./UserMenu";

export default function BottomNav() {
  const { totalItemsCount } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-[#F0E4DD] flex justify-around items-center py-2 z-50">
      {/* User Menu Overlay */}
      {isUserMenuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
          <div className="absolute bottom-full mb-2 right-4 w-64 z-50">
            <UserMenu onClose={() => setIsUserMenuOpen(false)} isLoggedIn={!!user} />
          </div>
        </>
      )}

      {/* Home */}
      <Link to="/" className="flex flex-col items-center text-[#4D3A2A]">
        <span className="text-xl">🏠</span>
        <span className="text-[10px] font-bold mt-0.5">Home</span>
      </Link>
      
      {/* Wishlist */}
      <Link to="/wishlist" className="relative flex flex-col items-center text-[#4D3A2A]">
        <span className="text-xl">♥</span>
        {wishlist.length > 0 && (
          <span className="absolute -top-0.5 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF8580] text-[8px] text-white font-bold">
            {wishlist.length}
          </span>
        )}
        <span className="text-[10px] font-bold mt-0.5">Wishlist</span>
      </Link>

      {/* Cart */}
      <Link to="/cart" className="relative flex flex-col items-center text-[#4D3A2A]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        {totalItemsCount > 0 && (
          <span className="absolute -top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF8580] text-[8px] text-white font-bold">
            {totalItemsCount}
          </span>
        )}
        <span className="text-[10px] font-bold mt-0.5">Cart</span>
      </Link>

      {/* Profile Trigger */}
      <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex flex-col items-center text-[#4D3A2A]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span className="text-[10px] font-bold mt-0.5">Profile</span>
      </button>
    </div>
  );
}