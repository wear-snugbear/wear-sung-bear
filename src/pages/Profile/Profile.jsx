import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (typeof logout === "function") {
      await logout();
      navigate("/");
    } else {
      console.error("Logout function is not defined in AuthContext");
      // Fallback: force clear local storage if context fails
      localStorage.clear();
      window.location.href = "/";
    }
  };

  // Redirect to login if user isn't authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-[#FFFBF9] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl font-black text-[#4D3A2A] mb-4">Welcome Back! 🧸</h2>
        <p className="text-[#7A6B5C] mb-8">Please log in or sign up to view your profile and manage orders.</p>
        <button 
          onClick={() => navigate("/login")} // Change this to your login route
          className="bg-[#6D442C] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#4D3A2A] transition-all"
        >
          Login / Signup
        </button>
      </div>
    );
  }

  const menuItems = [
    { title: "Track Order", path: "/track-order", icon: "📦" },
    { title: "Returns and Exchange", path: "/returns", icon: "🔄" },
    { title: "FAQ", path: "/faq", icon: "❓" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF9] p-6 pb-24">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
        <h1 className="font-serif text-2xl font-black text-[#4D3A2A] mb-6">My Profile</h1>

        {/* User Info Card */}
        <div className="bg-white p-6 rounded-3xl border border-[#6D442C]/10 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-[#FFE5EC] flex items-center justify-center text-xl font-black text-[#FF4D6D]">
              {user.displayName?.[0] || "U"}
            </div>
            <div>
              <h2 className="font-bold text-[#4D3A2A]">{user.displayName || "Cozy User"}</h2>
              <p className="text-xs text-[#7A6B5C] font-medium">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item) => (
            <Link 
              key={item.title} 
              to={item.path} 
              className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#6D442C]/10 hover:border-[#6D442C]/30 transition-all"
            >
              <span className="font-bold text-sm text-[#4D3A2A] flex items-center gap-3">
                <span>{item.icon}</span> {item.title}
              </span>
              <span className="text-[#A08A76]">›</span>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full mt-8 py-4 bg-transparent border border-[#FF8580] text-[#FF4D6D] rounded-2xl font-bold text-sm hover:bg-[#FF8580] hover:text-white transition-all"
        >
          Logout
        </button>
      </motion.div>
    </div>
  );
}