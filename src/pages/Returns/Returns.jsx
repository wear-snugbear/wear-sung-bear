import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

export default function Returns() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    orderId: "",
    email: user?.email || "",
    reason: "Size Issue",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.orderId || !formData.details) {
      alert("Please fill in all fields.");
      return;
    }
    
    setLoading(true);
    // Simulate API call to your backend
    try {
      const response = await fetch("https://snugbear-backend-dosj.onrender.com/api/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF9] py-12 px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl font-black text-[#4D3A2A] mb-2">Returns & Exchange</h1>
        <p className="text-[#7A6B5C] mb-8 text-sm">We want you to love your Snuggles. If you aren't satisfied, we're here to help.</p>

        {submitted ? (
          <div className="bg-white p-8 rounded-3xl border border-[#6D442C]/10 text-center">
            <span className="text-4xl mb-4 block">✅</span>
            <h2 className="text-xl font-black text-[#4D3A2A]">Request Submitted</h2>
            <p className="text-[#7A6B5C] mt-2">Our team will review your request and get back to you within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-[#6D442C]/10 space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-[#A8988C] uppercase tracking-widest mb-1.5">Order ID</label>
              <input name="orderId" required onChange={handleInputChange} className="w-full p-4 rounded-2xl border border-[#EBE3DE] bg-[#FFF9F6] outline-none text-sm font-semibold" placeholder="e.g., #SB12345" />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#A8988C] uppercase tracking-widest mb-1.5">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} readOnly={!!user} className="w-full p-4 rounded-2xl border border-[#EBE3DE] bg-[#FFF9F6] outline-none text-sm font-semibold opacity-80" />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#A8988C] uppercase tracking-widest mb-1.5">Reason for Return</label>
              <select name="reason" onChange={handleInputChange} className="w-full p-4 rounded-2xl border border-[#EBE3DE] bg-[#FFF9F6] outline-none text-sm font-semibold text-[#4D3A2A]">
                <option>Size Issue</option>
                <option>Damaged Product</option>
                <option>Wrong Item Received</option>
                <option>Changed My Mind</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#A8988C] uppercase tracking-widest mb-1.5">Additional Details</label>
              <textarea name="details" required onChange={handleInputChange} rows={3} className="w-full p-4 rounded-2xl border border-[#EBE3DE] bg-[#FFF9F6] outline-none text-sm font-semibold" placeholder="Tell us more about the issue..." />
            </div>

            <button disabled={loading} className="w-full py-4 bg-[#6D442C] text-white rounded-2xl font-black hover:bg-[#4D3A2A] transition-all">
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        )}

        <div className="mt-12 text-[#7A6B5C] text-xs leading-relaxed space-y-4">
          <h3 className="font-bold text-[#4D3A2A]">Return Policy Highlights:</h3>
          <ul className="list-disc pl-4 space-y-2">
            <li>Requests must be initiated within 7 days of delivery.</li>
            <li>Items must be in original condition with tags attached.</li>
            <li>Refunds are processed within 5-7 business days after the item is received at our warehouse.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}