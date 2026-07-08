import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check (In production, use a secure backend validation)
    if (password === "Snugbear2026") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Unauthorized Access");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#FFFBF9]">
      <form onSubmit={handleLogin} className="p-8 bg-white rounded-2xl shadow-xl border border-[#6D442C]/10">
        <h2 className="text-2xl font-black text-[#4D3A2A] mb-4">Admin Access</h2>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Admin Password"
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <button type="submit" className="w-full bg-[#6D442C] text-white py-2 rounded-lg font-bold">
          Login
        </button>
      </form>
    </div>
  );
}