import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TrackOrder() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/orders/${email}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF9] p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-black text-[#4D3A2A] mb-6">Track Your Snuggles 📦</h2>
        <div className="flex gap-2 mb-8">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 p-3 rounded-xl border border-[#6D442C]/10"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={fetchOrders} className="bg-[#6D442C] text-white px-6 py-3 rounded-xl font-bold">
            Track
          </button>
        </div>

        {/* Display Orders */}
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-[#6D442C]/10 mb-4">
              <p className="font-black text-[#4D3A2A]">Order #{index + 1}</p>
              <p className="text-sm text-[#7A6B5C]">Total: ₹{order.total} | Payment: {order.paymentMethod}</p>
              <p className="text-xs text-[#FF8580] font-bold mt-2">Status: Processing ⏳</p>
            </div>
          ))
        ) : !loading && <p>No orders found for this email.</p>}
      </div>
    </div>
  );
}