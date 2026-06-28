import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "https://snugbear-backend-dosj.onrender.com";

export default function FoundingCircle() {
  const [moodyItems, setMoodyItems] = useState([]);
  const [randomItem, setRandomItem] = useState(null);
  const [giftOpened, setGiftOpened] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setMoodyItems(data.filter((i) => i.collectionName === "Moody Collection"));
      });
  }, []);

  const handleClaimGift = async () => {
    if (!email) { alert("Please enter your email!"); return; }
    
    try {
      const response = await fetch(`${API_BASE}/api/claim-gift`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          productName: randomItem.name,
          productId: randomItem.id || "N/A",
          // Adding these ensures the backend knows it's a Founding Circle entry
          isFoundingCircle: true 
        })
      });
      
      if (response.ok) {
        alert("Yay! Your gift is secured! 🧸");
      } else {
        alert("Server error. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to connect to server.");
    }
  };

  const handleOpenGift = () => {
    if (moodyItems.length > 0) {
      const random = moodyItems[Math.floor(Math.random() * moodyItems.length)];
      setRandomItem(random);
      setGiftOpened(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF9] flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {!giftOpened ? (
          <motion.div key="gift" className="text-center">
            <motion.div whileHover={{ scale: 1.1 }} onClick={handleOpenGift} className="cursor-pointer text-[120px]">🎁</motion.div>
            <h2 className="text-[#6D442C] font-black text-2xl mt-4">Click to reveal your surprise!</h2>
          </motion.div>
        ) : (
          <motion.div 
            key="reveal" 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-[#FF8580]/30 text-center max-w-sm w-full"
          >
            {randomItem?.image && <img src={randomItem.image} className="w-32 h-32 mx-auto rounded-2xl mb-4" />}
            <h3 className="text-2xl font-black text-[#6D442C] mb-2">{randomItem?.name}</h3>
            <p className="text-gray-500 mb-6 text-sm">{randomItem?.description}</p>
            
            <input 
              type="email"
              placeholder="Enter your email to claim" 
              className="w-full p-3 mb-4 rounded-xl border border-gray-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <button onClick={handleClaimGift} className="w-full bg-[#FF8580] text-white py-3 rounded-full font-bold shadow-lg hover:bg-[#6D442C] transition">
              Claim Gift
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}