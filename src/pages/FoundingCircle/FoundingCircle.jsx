import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

const API_BASE = "https://snugbear-backend-dosj.onrender.com";

export default function FoundingCircle() {
  const [randomItem, setRandomItem] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  
  const navigate = useNavigate(); // 2. Initialize navigate

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const moody = data.filter((i) => i.collectionName === "Moody Collection");
        const random = moody[Math.floor(Math.random() * moody.length)];
        setRandomItem(random);

        setTimeout(() => {
          setIsAnimating(false);
        }, 3000);
      });
  }, []);

  const handleClaimGift = async () => {
    if (!email) { alert("Please enter your email!"); return; }
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/claim-gift`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          productName: randomItem.name,
          productId: randomItem.id || "N/A"
        })
      });
      
      if (response.ok) {
        alert("Welcome to the Founding Circle! Your gift is secured. 🧸");
        navigate("/"); // 3. Redirect to Home page after success
      } else {
        alert("Could not secure gift. Please try again!");
      }
    } catch (error) {
      alert("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... rest of your JSX remains the same
    <div className="min-h-screen bg-[#FFFBF9] flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        
        {isAnimating ? (
          <motion.div 
            key="loader"
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <motion.div 
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-[100px] mb-6 block"
            >
              🧸
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-[#6D442C] font-black text-xl md:text-3xl uppercase tracking-[0.2em]"
            >
              Consulting the Bear...
            </motion.h2>
          </motion.div>
        ) : (
          <motion.div 
            key="reveal" 
            initial={{ opacity: 0, y: 50, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="bg-white p-6 md:p-12 rounded-[3rem] shadow-2xl border border-[#E5DCD5] max-w-4xl w-full flex flex-col md:flex-row items-center gap-10"
          >
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full md:w-1/2"
            >
              <img 
                src={randomItem?.image} 
                className="w-full h-auto rounded-[2rem] shadow-xl object-cover aspect-square" 
                alt="Exclusive Reward" 
              />
            </motion.div>

            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full md:w-1/2 text-center md:text-left"
            >
              <h2 className="text-[#6D442C] font-bold uppercase tracking-widest text-xs mb-2">Reserved for you</h2>
              <h3 className="text-3xl md:text-5xl font-black text-[#4D3A2A] mb-4">{randomItem?.name}</h3>
              <p className="text-[#A68F81] mb-8 leading-relaxed text-sm md:text-base">{randomItem?.description}</p>
              
              <input 
                type="email"
                placeholder="Enter your email to secure" 
                className="w-full p-4 mb-4 rounded-2xl bg-[#FFFBF9] border-2 border-[#E5DCD5] focus:border-[#4D3A2C] outline-none transition-all font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClaimGift} 
                disabled={loading}
                className="w-full bg-[#FF8580] text-white py-4 rounded-2xl font-black shadow-lg shadow-[#FF8580]/20 hover:bg-[#6D442C] transition-all"
              >
                {loading ? "Securing..." : "Claim Founding Gift 🧸"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}