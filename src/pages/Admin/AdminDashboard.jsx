import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "https://snugbear-backend-dosj.onrender.com";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [foundingEntries, setFoundingEntries] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) { console.error("Error fetching orders:", error); }
  };

  const fetchFoundingCircle = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/founding-circle`);
      const data = await res.json();
      setFoundingEntries(data);
    } catch (err) { console.error("Error:", err); }
  };

  useEffect(() => {
    fetchOrders();
    fetchFoundingCircle();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    await fetch(`${API_BASE}/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    fetchOrders();
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return "bg-green-100 text-green-700";
      case 'Shipped': return "bg-blue-100 text-blue-700";
      default: return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF9] p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl md:text-4xl font-black text-[#4D3A2A] mb-8">Admin Dashboard 🧸</h1>

      {/* Orders Section */}
      <section className="bg-white rounded-3xl border border-[#6D442C]/10 shadow-xl overflow-hidden mb-12">
        <div className="p-6 border-b border-[#6D442C]/5 flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-xl md:text-2xl font-black text-[#4D3A2A]">Recent Orders</h2>
          <button onClick={fetchOrders} className="text-sm font-bold text-[#6D442C] hover:underline">Refresh List</button>
        </div>
        
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#FFF9F6] text-[#6D442C] text-[10px] md:text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-4 md:px-6">Order ID</th>
                <th className="px-4 py-4 md:px-6">Customer</th>
                <th className="px-4 py-4 md:px-6">Total</th>
                <th className="px-4 py-4 md:px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#6D442C]/5">
              {orders.map((order) => (
                <React.Fragment key={order.order_id}>
                  <tr className="hover:bg-[#FFF9F6] cursor-pointer transition-colors" onClick={() => setExpandedOrderId(expandedOrderId === order.order_id ? null : order.order_id)}>
                    <td className="px-4 py-4 md:px-6 font-mono font-bold text-[#7A6B5C] text-sm">#{order.order_id}</td>
                    <td className="px-4 py-4 md:px-6">
                      <div className="font-bold text-[#4D3A2A] text-sm md:text-base">{order.name}</div>
                      <div className="text-[10px] md:text-xs text-[#7A6B5C]">{order.email}</div>
                    </td>
                    <td className="px-4 py-4 md:px-6 font-black text-[#6D442C]">₹{order.total}</td>
                    <td className="px-4 py-4 md:px-6">
                      <select 
                        onClick={(e) => e.stopPropagation()} 
                        onChange={(e) => updateStatus(order.order_id, e.target.value)} 
                        value={order.status}
                        className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold ${getStatusColor(order.status)} border-none cursor-pointer`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                  <AnimatePresence>
                    {expandedOrderId === order.order_id && (
                      <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <td colSpan="4" className="px-6 py-4 bg-[#FFF9F6] text-xs">
                          <p className="font-bold text-[#4D3A2A]">Address:</p>
                          <p className="text-[#7A6B5C] mb-2">{order.address}</p>
                          <p className="font-bold text-[#4D3A2A]">Items:</p>
                          {order.cart?.map((i, idx) => <p key={idx}>• {i.name} (x{i.quantity})</p>)}
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Founding Circle Section */}
      <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#6D442C]/10 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#4D3A2A]">Founding Circle</h2>
            <p className="text-[#6D442C] font-bold text-base md:text-lg">{foundingEntries.length} / 50 Spots Filled</p>
          </div>
          <button 
            onClick={async () => {
              if(window.confirm("Reset the entire cycle? This cannot be undone.")) {
                await fetch(`${API_BASE}/api/admin/reset-founding-circle`, { method: 'DELETE' });
                fetchFoundingCircle();
              }
            }}
            className="bg-[#FF8580] text-white px-6 py-2 rounded-full font-bold hover:bg-[#6D442C] transition-all transform hover:scale-105 w-full md:w-auto"
          >
            Reset
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-4 mb-8 overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((foundingEntries.length / 50) * 100, 100)}%` }} className="bg-[#6D442C] h-full" />
        </div>

        {/* Grid Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {foundingEntries.length === 0 ? (
            <p className="text-[#7A6B5C] italic">No entries yet...</p>
          ) : (
            foundingEntries.map((entry, idx) => (
              <motion.div 
                key={idx} 
                className="p-4 md:p-5 bg-[#FFF9F6] rounded-2xl border border-[#6D442C]/10 hover:border-[#6D442C]/30 transition-all flex flex-col gap-2 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex-shrink-0 rounded-full bg-[#6D442C] text-white flex items-center justify-center font-black text-xs">
                    {idx + 1}
                  </div>
                  <p className="text-sm font-bold text-[#4D3A2A] truncate w-full">{entry.email || "No Email"}</p>
                </div>
                
                <div className="text-[11px] text-[#A68F81] space-y-1 border-t border-[#6D442C]/5 pt-2 mt-1">
                  <p><strong>Order ID:</strong> {entry.order_id || "N/A"}</p>
                  <p><strong>Insta:</strong> {entry.instagram && entry.instagram !== "N/A" ? `@${entry.instagram}` : "Not provided"}</p>
                  <p className="text-[#FF8580] font-bold mt-1">
                    🎁 Gift: {entry.productName || "Pending"}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}