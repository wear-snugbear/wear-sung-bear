import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "Snugbear2026") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9] p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        // Added responsive width classes
        className="w-full max-w-sm md:max-w-md bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] border border-[#EBE3DE] shadow-xl"
      >
        <div className="text-center mb-6 sm:mb-8">
          {/* Logo container scales with screen size */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 flex items-center justify-center">
            <img 
              src="/images/snugbear.png" 
              alt="Snug Bear Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#4D3A2A]">Admin Authentication</h2>
          <p className="text-[#A68F81] text-xs sm:text-sm mt-2">Please enter your secure credentials to continue.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Enter Access Key"
              className={`w-full p-3 sm:p-4 bg-[#FDFBF9] border ${error ? 'border-red-300' : 'border-[#EBE3DE]'} rounded-xl focus:outline-none focus:border-[#6D442C] transition-all text-sm sm:text-base`}
            />
            {error && <p className="text-red-500 text-[10px] sm:text-xs mt-2 font-bold">Invalid access key. Please try again.</p>}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#6D442C] text-white py-3 sm:py-4 rounded-xl font-bold hover:bg-[#4D3A2A] transition-all transform hover:scale-[1.01] active:scale-[0.99] text-sm sm:text-base"
          >
            Authenticate
          </button>
        </form>

        <p className="text-center text-[9px] sm:text-[10px] text-[#C8B8AC] mt-6 sm:mt-8 uppercase tracking-widest">
          Snug Bear Operations © 2026
        </p>
      </motion.div>
    </div>
  );
}