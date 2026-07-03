import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function Navbar() {
  const { totalItemsCount } = useCart();
  const { wishlist } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="z-50 border-b border-[#F0E4DD] bg-white/95 backdrop-blur-md">
      {/* Container with relative positioning to allow absolute centering of the logo */}
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3">
        
        {/* Left: Hamburger Button (Mobile) */}
        <button className="md:hidden p-2 text-[#4D3A2A] z-20" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Center: Logo (Centered on mobile, normal on desktop) */}
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0 z-10">
          <img 
            src="/images/snugbear.png" 
            alt="SnugBear Logo" 
            className="h-auto w-32 sm:w-40 md:w-52 object-fill" 
          />
        </Link>

        {/* Desktop Nav (Hidden on mobile) */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8 text-sm font-semibold text-[#4D3A2A]">
          <Link to="/" className="hover:text-[#7A5A3A]">Home</Link>
          <Link to="/collections" className="hover:text-[#7A5A3A]">Collections</Link>
          <Link to="/community" className="hover:text-[#7A5A3A]">Community</Link>
          <Link to="/about" className="hover:text-[#7A5A3A]">About</Link>
          <Link to="/contact" className="hover:text-[#7A5A3A]">Contact</Link>
        </nav>

        {/* Desktop Icons (Hidden on mobile) */}
<div className="hidden md:flex items-center gap-3 z-20">
  {/* Tracking */}
  <Link to="/track-order" className="h-11 w-11 flex items-center justify-center rounded-full bg-[#F7EFE2] text-[#4D3A2A] transition hover:bg-[#E6D4C3]">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  </Link>
  {/* Wishlist */}
  <Link to="/wishlist" className="relative h-11 w-11 flex items-center justify-center rounded-full bg-[#F7EFE2] text-[#4D3A2A] transition hover:bg-[#E6D4C3]">
    <span className="text-lg">♥</span>
    {wishlist.length > 0 && <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF8580] text-[10px] font-black text-white shadow-xs">{wishlist.length}</span>}
  </Link>
  {/* Cart */}
  <Link to="/cart" className="relative h-11 w-11 flex items-center justify-center rounded-full bg-[#F7EFE2] text-[#4D3A2A] transition hover:bg-[#E6D4C3]">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
    {totalItemsCount > 0 && <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF8580] text-[10px] font-black text-white shadow-xs">{totalItemsCount}</span>}
  </Link>
</div>
        
        {/* Empty div for spacing on mobile to balance the Hamburger button */}
        <div className="md:hidden w-10"></div> 
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#F0E4DD] px-4 py-4 flex flex-col gap-4 text-[#4D3A2A] font-semibold text-center">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/collections" onClick={() => setIsMenuOpen(false)}>Collections</Link>
          <Link to="/community" onClick={() => setIsMenuOpen(false)}>Community</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}