import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "https://snugbear-backend-dosj.onrender.com";

export default function CommunityHandle() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/founding-circle`);
      const data = await res.json();
      setEntries(data);
    } catch (err) { console.error("Error fetching entries:", err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchEntries(); }, []);
  
  const resetCircle = async () => {
    if(window.confirm("⚠️ DANGER ZONE: This will permanently erase all Founding Circle entries. Proceed?")) {
      await fetch(`${API_BASE}/api/admin/reset-founding-circle`, { method: 'DELETE' });
      fetchEntries(); 
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] px-4 py-8 md:p-12 pt-24 md:pt-28">
      {/* Page Header - Responsive Sizing */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-[#4D3A2A] mb-2">Founding Circle</h1>
        <p className="text-[#8B735B] text-sm md:text-base">Manage community ambassadors and track capacity.</p>
      </div>

      <section className="max-w-7xl mx-auto bg-white p-5 md:p-10 rounded-[2rem] border border-[#EBE3DE] shadow-sm">
        
        {/* Statistics and Reset Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="text-center p-3 md:p-4 bg-[#FFF9F6] rounded-2xl border border-[#F5EBE6]">
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#A68F81] font-bold">Capacity</p>
              <p className="text-2xl md:text-3xl font-black text-[#4D3A2A]">{entries.length}<span className="text-base text-[#C8B8AC]">/50</span></p>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#4D3A2A]">Enrollment</h2>
              <p className="text-xs md:text-sm text-[#A68F81]">Current status</p>
            </div>
          </div>
          
          <button 
            onClick={resetCircle}
            className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-[#FF8580] text-[#FF8580] font-bold rounded-xl hover:bg-[#FF8580] hover:text-white transition-all duration-300 text-sm"
          >
            Reset Database
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#F5F2F0] rounded-full h-3 mb-10 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${Math.min((entries.length / 50) * 100, 100)}%` }} 
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-[#6D442C] h-full rounded-full" 
          />
        </div>

        {/* Data Grid - Responsive Columns */}
        {loading ? (
          <div className="h-40 flex items-center justify-center text-[#A68F81]">Loading entries...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence>
              {entries.length === 0 ? (
                <p className="col-span-full py-16 text-center text-[#C8B8AC] italic font-medium">No active Founding Circle members.</p>
              ) : (
                entries.map((entry, idx) => (
                  <motion.div 
                    key={entry.email || idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 md:p-5 bg-white border border-[#F5EBE6] rounded-2xl hover:shadow-md hover:border-[#D6C5BC] transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#F5F2F0] flex items-center justify-center font-bold text-[#6D442C] text-sm">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="truncate">
                        <p className="text-[10px] md:text-xs text-[#A68F81] uppercase tracking-wider font-bold">Member</p>
                        <p className="text-sm font-bold text-[#4D3A2A] truncate">{entry.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 bg-[#FDFBF9] p-3 rounded-xl border border-[#F5EBE6]">
                      <div className="flex justify-between text-[10px] md:text-[11px]">
                        <span className="text-[#A68F81]">Order ID</span>
                        <span className="font-mono font-bold text-[#4D3A2A] truncate ml-2">{entry.order_id || "N/A"}</span>
                      </div>
                      <div className="flex justify-between text-[10px] md:text-[11px]">
                        <span className="text-[#A68F81]">Instagram</span>
                        <span className="font-bold text-[#6D442C] truncate ml-2">{entry.instagram && entry.instagram !== "N/A" ? `@${entry.instagram}` : "—"}</span>
                      </div>
                      <div className="pt-2 border-t border-[#EBE3DE] flex justify-between items-center">
                        <span className="text-[9px] md:text-[10px] font-bold text-[#FF8580] uppercase">Gift</span>
                        <span className="text-[10px] md:text-[11px] font-bold text-[#4D3A2A] bg-[#FFF0EF] px-2 py-0.5 rounded truncate ml-2">{entry.productName || "Pending"}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}