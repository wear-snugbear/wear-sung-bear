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
    <div className="min-h-screen bg-[#F8F7F4] p-4 md:p-12 pt-24">
      {/* Header - Stacked on mobile, side-by-side on desktop */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-[#2D241E]">Admin Dashboard</h1>
          <p className="text-[#8B7366] mt-1 font-medium text-sm md:text-base">Manage store operations</p>
        </div>
        <button 
          onClick={fetchOrders}
          className="bg-[#2D241E] text-white px-5 py-2 rounded-xl font-bold hover:bg-[#4D3A2A] transition-all shadow-md w-full sm:w-auto"
        >
          Refresh Data
        </button>
      </div>

      {/* Summary Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Orders", value: orders.length },
          { label: "Pending", value: orders.filter(o => o.status === 'Processing').length },
          { label: "Delivered", value: orders.filter(o => o.status === 'Delivered').length },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-[#E5E0DD] shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-[#8B7366] font-bold">{stat.label}</p>
            <p className="text-2xl font-black text-[#2D241E] mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <section className="bg-white rounded-2xl border border-[#E5E0DD] shadow-sm overflow-hidden">
        {/* Horizontal scroll wrapper for mobile */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-[#FDFBF9] border-b border-[#E5E0DD]">
              <tr>
                <th className="px-4 py-4 text-[10px] font-bold text-[#8B7366] uppercase">Order ID</th>
                <th className="px-4 py-4 text-[10px] font-bold text-[#8B7366] uppercase">Customer</th>
                <th className="px-4 py-4 text-[10px] font-bold text-[#8B7366] uppercase">Amount</th>
                <th className="px-4 py-4 text-[10px] font-bold text-[#8B7366] uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0DD]">
              {isLoading ? (
                <tr><td colSpan="4" className="p-8 text-center text-[#8B7366]">Loading orders...</td></tr>
              ) : orders.map((order) => (
                <React.Fragment key={order.order_id}>
                  <tr 
                    className="hover:bg-[#FFFBF9] transition-colors cursor-pointer"
                    onClick={() => setExpandedOrderId(expandedOrderId === order.order_id ? null : order.order_id)}
                  >
                    <td className="px-4 py-4 text-xs font-mono font-bold text-[#4D3A2A]">#{order.order_id.slice(-6)}</td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-bold text-[#2D241E]">{order.name}</div>
                      <div className="text-[10px] text-[#8B7366] truncate max-w-[120px]">{order.email}</div>
                    </td>
                    <td className="px-4 py-4 text-sm font-bold text-[#2D241E]">₹{order.total}</td>
                    <td className="px-4 py-4">
                      <select 
                        onClick={(e) => e.stopPropagation()} 
                        onChange={(e) => updateStatus(order.order_id, e.target.value)} 
                        value={order.status}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold border outline-none ${getStatusColor(order.status)}`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                  {/* Expanded Mobile View */}
                  <AnimatePresence>
                    {expandedOrderId === order.order_id && (
                      <motion.tr initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}>
                        <td colSpan="4" className="px-4 py-4 bg-[#FDFBF9] border-b text-[11px]">
                          <p className="font-bold mb-1">Address:</p>
                          <p className="text-[#6B5C54] mb-3">{typeof order.address === 'object' ? `${order.address.street}, ${order.address.city}` : order.address}</p>
                          <p className="font-bold mb-1">Items:</p>
                          {order.cart?.map((i, idx) => (<p key={idx} className="text-[#6B5C54]">• {i.name} ({i.quantity})</p>))}
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