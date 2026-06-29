import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function Navbar() {
  const { totalItemsCount } = useCart();
  const { wishlist } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#F0E4DD] bg-white/95 backdrop-blur-md">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-[#4D3A2A]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="z-10 flex items-center">
          <img 
            src="/images/snugbear.png" 
            alt="SnugBear Logo" 
            className="h-auto w-32 sm:w-40 md:w-52 object-fill" 
          />
        </Link>

        {/* Desktop Navigation Links Middle */}
        <nav className="hidden absolute left-1/2 transform -translate-x-1/2 items-center gap-8 text-sm font-semibold text-[#4D3A2A] md:flex">
          <Link to="/" className="transition hover:text-[#7A5A3A]">Home</Link>
          <Link to="/collections" className="transition hover:text-[#7A5A3A]">Collections</Link>
          <Link to="/community" className="transition hover:text-[#7A5A3A]">Community</Link>
          <Link to="/about" className="transition hover:text-[#7A5A3A]">About</Link>
          <Link to="/contact" className="transition hover:text-[#7A5A3A]">Contact</Link>
        </nav>

        {/* Right Icons (Tracking, Wishlist & Cart) */}
        <div className="z-10 flex items-center gap-3">
          
          {/* Tracking Icon (Location Pin) - Hidden on mobile, shown on desktop */}
          <Link to="/track-order" className="relative hidden md:inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#F7EFE2] text-[#4D3A2A] transition hover:bg-[#E6D4C3]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </Link>

          {/* Wishlist Icon - Hidden on mobile, shown on desktop */}
          <Link to="/wishlist" className="relative hidden md:inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#F7EFE2] text-[#4D3A2A] transition hover:bg-[#E6D4C3]">
            <span className="text-lg">♥</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF8580] px-1 text-[10px] font-black text-white shadow-xs animate-scaleIn">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#F7EFE2] text-[#4D3A2A] transition hover:bg-[#E6D4C3]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF8580] px-1 text-[10px] font-black text-white shadow-xs animate-scaleIn">
                {totalItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#F0E4DD] px-4 py-4 flex flex-col gap-4 text-[#4D3A2A] font-semibold text-center">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/collections" onClick={() => setIsMenuOpen(false)}>Collections</Link>
          <Link to="/track-order" onClick={() => setIsMenuOpen(false)}>Track Order</Link>
          <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
          <Link to="/community" onClick={() => setIsMenuOpen(false)}>Community</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}