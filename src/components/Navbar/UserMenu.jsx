import React from 'react';
import { Link } from 'react-router-dom';

export default function UserMenu({ onClose, isLoggedIn }) {
  // Color palette:
  // Text: #3E2723 (Dark Chocolate)
  // Accent: #FFB703 (Soft Goldenrod - friendlier than neon yellow)
  // Background: #FFFBF8 (Creamy white)
  
  return (
    <div className="bg-[#FFFBF8] rounded-3xl shadow-2xl border border-[#EFE4DE] p-6 w-full max-w-xs animate-in fade-in zoom-in duration-200">
      <div className="mb-6">
        <h3 className="font-extrabold text-xl text-[#3E2723]">Hello there!</h3>
        <p className="text-xs text-[#8D7B73] mt-1">Manage your orders and account</p>
      </div>
      
      {!isLoggedIn ? (
        <Link 
          to="/login" 
          onClick={onClose} 
          className="block w-full bg-[#6D442C] text-[#FFFFFF] font-bold py-3 text-center rounded-2xl mb-6 shadow-md hover:bg-[#ffc83d] transition-all"
        >
          Login / Signup
        </Link>
      ) : (
        <Link 
          to="/profile" 
          onClick={onClose} 
          className="block w-full bg-[#3E2723] text-[#FFFBF8] font-bold py-3 text-center rounded-2xl mb-6 hover:bg-[#5D4037] transition-all"
        >
          My Account
        </Link>
      )}

      <nav className="space-y-4 text-sm font-semibold text-[#5D4037]">
        <Link to="/track-order" className="flex items-center hover:text-[#3E2723] transition-colors" onClick={onClose}>
          <span className="mr-3"></span> Track Order
        </Link>
        <Link to="/returns" className="flex items-center hover:text-[#3E2723] transition-colors" onClick={onClose}>
          <span className="mr-3"></span> Returns & Exchange
        </Link>
        <Link to="/faq" className="flex items-center hover:text-[#3E2723] transition-colors" onClick={onClose}>
          <span className="mr-3"></span> Help & FAQ
        </Link>
      </nav>
      
      <div className="mt-6 pt-6 border-t border-[#EFE4DE] text-center">
        <button onClick={onClose} className="text-[10px] uppercase tracking-widest text-[#A1887F] hover:text-[#3E2723]">
          Close Menu
        </button>
      </div>
    </div>
  );
}