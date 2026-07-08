import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function AdminNav() {
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
      <div className="flex items-center">
        <Link to="/admin">
          <img src="/images/snugbear.png" alt="SnugBear Logo" className="h-10 w-auto" />
        </Link>
      </div>
      
      <div className="flex gap-8">
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

      <button 
        className="text-xs font-bold text-[#FF8580] hover:text-[#D96D69] hover:underline transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}