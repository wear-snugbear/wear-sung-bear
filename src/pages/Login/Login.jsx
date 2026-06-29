import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigation will be handled automatically by your App's route protection 
      // or simply redirect here.
      navigate("/collections");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/collections");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9F6] p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-[#6D442C]/10 shadow-xl">
        <h2 className="text-2xl font-black text-[#4D3A2A] mb-6">Welcome Back 🧸</h2>
        
        <form onSubmit={handleSignIn}>
          <input className="w-full p-3 mb-4 rounded-xl border border-[#6D442C]/20" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} required />
          <input className="w-full p-3 mb-6 rounded-xl border border-[#6D442C]/20" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-[#6D442C] text-white py-3 rounded-xl font-bold mb-4">Sign In</button>
        </form>

        <div className="relative my-4 text-center">
          <span className="bg-white px-2 text-xs text-[#A08A76]">OR</span>
        </div>

        <button onClick={handleGoogleSignIn} className="w-full border-2 border-[#6D442C]/10 py-3 rounded-xl font-bold text-[#4D3A2A] flex items-center justify-center gap-2 hover:bg-[#FFF9F6]">
          Sign in with Google
        </button>

        <p className="mt-6 text-sm text-center text-[#7A6B5C]">
          Don't have an account? <Link to="/signup" className="text-[#FF8580] font-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}