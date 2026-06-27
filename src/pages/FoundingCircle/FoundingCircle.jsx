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
      })
      .catch((err) => console.error("Fetch error:", err));
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
          productId: randomItem.id || "N/A"
        })
      });
      
      if (response.ok) {
        alert("Yay! Your gift is secured! 🧸");
      } else {
        alert("Something went wrong. Please try again.");
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
    } else {
      alert("No gifts available right now!");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF9] flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {!giftOpened ? (
          <motion.div key="gift" className="text-center" exit={{ opacity: 0 }}>
            <motion.div whileHover={{ scale: 1.1 }} onClick={handleOpenGift} className="cursor-pointer text-[120px]">🎁</motion.div>
            <h2 className="text-[#6D442C] font-black text-2xl mt-4">Click to Open Your Gift!</h2>
          </motion.div>
        ) : (
          <motion.div 
            key="reveal" 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-white p-8 rounded-[2rem] shadow-2xl border-2 border-[#FF8580]/30 text-center max-w-sm w-full"
          >
            {randomItem?.image && (
              <img src={randomItem.image} alt="Gift" className="w-40 h-40 mx-auto rounded-2xl mb-4 object-cover shadow-md" />
            )}
            <h3 className="text-2xl font-black text-[#6D442C] mb-2">{randomItem?.name}</h3>
            <p className="text-[#7A6B5C] mb-6 text-sm">{randomItem?.description}</p>
            
            <input 
              type="email"
              placeholder="Enter your email to claim" 
              className="w-full p-3 mb-4 rounded-xl border border-[#FF8580]/20 focus:outline-none focus:ring-2 focus:ring-[#FF8580]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <button onClick={handleClaimGift} className="w-full bg-[#6D442C] text-white py-3 rounded-full font-bold shadow-lg hover:bg-[#FF8580] transition-all">
              Claim My Gift
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}