import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "https://snugbear-backend-dosj.onrender.com";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/admin/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) { console.error("Error fetching orders:", error); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, []);

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
      case 'Delivered': return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case 'Shipped': return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] p-6 md:p-12 pt-28">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#2D241E]">Admin Dashboard</h1>
          <p className="text-[#8B7366] mt-1 font-medium">Manage your store operations</p>
        </div>
        <button 
          onClick={fetchOrders}
          className="bg-[#2D241E] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#4D3A2A] transition-all shadow-lg"
        >
          Refresh Data
        </button>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Orders", value: orders.length },
          { label: "Pending", value: orders.filter(o => o.status === 'Processing').length },
          { label: "Delivered", value: orders.filter(o => o.status === 'Delivered').length },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#E5E0DD] shadow-sm">
            <p className="text-xs uppercase tracking-widest text-[#8B7366] font-bold">{stat.label}</p>
            <p className="text-3xl font-black text-[#2D241E] mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Table Section */}
      <section className="bg-white rounded-2xl border border-[#E5E0DD] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FDFBF9] border-b border-[#E5E0DD]">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-[#8B7366] uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#8B7366] uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#8B7366] uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#8B7366] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0DD]">
              {isLoading ? (
                <tr><td colSpan="4" className="p-8 text-center text-[#8B7366]">Loading orders...</td></tr>
              ) : orders.map((order) => (
                <React.Fragment key={order.order_id}>
                  <tr 
                    className="hover:bg-[#FFFBF9] transition-colors cursor-pointer group"
                    onClick={() => setExpandedOrderId(expandedOrderId === order.order_id ? null : order.order_id)}
                  >
                    <td className="px-6 py-5 font-mono font-bold text-[#4D3A2A]">#{order.order_id}</td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#2D241E]">{order.name}</div>
                      <div className="text-xs text-[#8B7366]">{order.email}</div>
                    </td>
                    <td className="px-6 py-5 font-black text-[#2D241E]">₹{order.total}</td>
                    <td className="px-6 py-5">
                      <select 
                        onClick={(e) => e.stopPropagation()} 
                        onChange={(e) => updateStatus(order.order_id, e.target.value)} 
                        value={order.status}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold border ${getStatusColor(order.status)} outline-none cursor-pointer`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                  <AnimatePresence>
                    {expandedOrderId === order.order_id && (
                      <motion.tr initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                        <td colSpan="4" className="px-6 py-4 bg-[#FDFBF9] border-b border-[#E5E0DD]">
                          <div className="grid grid-cols-2 gap-8 text-sm">
                            <div>
                              <p className="font-bold text-[#2D241E] mb-2">Delivery Address</p>
                              <p className="text-[#6B5C54] leading-relaxed">
                                {typeof order.address === 'object' 
                                  ? `${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}` 
                                  : order.address}
                              </p>
                            </div>
                            <div>
                              <p className="font-bold text-[#2D241E] mb-2">Order Items</p>
                              {order.cart?.map((i, idx) => (
                                <p key={idx} className="text-[#6B5C54]">• {i.name} <span className="text-[#8B7366]">x{i.quantity}</span></p>
                              ))}
                            </div>
                          </div>
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
    </div>
  );
}