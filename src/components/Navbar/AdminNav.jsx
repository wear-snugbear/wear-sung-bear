import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const navLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Community Handle', path: '/admin/community' },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <nav className="bg-white border-b border-[#6D442C]/10 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      {/* Logo */}
<div className="flex items-center">
  <Link to="/admin">
    <img 
      src="/images/snugbear.png" 
      alt="SnugBear Logo" 
      // Increased from h-8 md:h-10 to h-12 md:h-16
      className="h-12 md:h-16 w-auto object-contain" 
    />
  </Link>
</div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8">
        {navLinks.map((link) => (
          <Link 
            key={link.path}
            to={link.path}
            className={`font-bold text-sm transition-all duration-200 ${
              location.pathname === link.path 
                ? 'text-[#6D442C] underline decoration-2 underline-offset-8' 
                : 'text-[#A68F81] hover:text-[#6D442C]'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Logout Button (Desktop) */}
      <button 
        className="hidden md:block text-xs font-bold text-[#FF8580] hover:text-[#D96D69] hover:underline transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>

      {/* Mobile Hamburger Button */}
      <button 
        className="md:hidden p-2 text-[#4D3A2A]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`w-6 h-0.5 bg-[#4D3A2A] transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'}`} />
        <div className={`w-6 h-0.5 bg-[#4D3A2A] transition-all ${isOpen ? 'opacity-0' : 'block'}`} />
        <div className={`w-6 h-0.5 bg-[#4D3A2A] transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : 'mt-1.5'}`} />
      </button>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-[#6D442C]/10 p-6 flex flex-col gap-4 md:hidden shadow-xl">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`font-bold text-lg p-2 ${location.pathname === link.path ? 'text-[#6D442C]' : 'text-[#A68F81]'}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button 
            className="text-left text-lg font-bold text-[#FF8580] p-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}