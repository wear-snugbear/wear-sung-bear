import React, { useState, useEffect } from "react";

// Set your Render backend URL here
const API_BASE = "https://snugbear-backend-dosj.onrender.com"; 

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [claimedGifts, setClaimedGifts] = useState([]);
  
  const [foundingEntries, setFoundingEntries] = useState([]);
  const fetchClaimedGifts = async () => {
    try {
        const res = await fetch(`${API_BASE}/api/admin/claimed-gifts`);
        const data = await res.json();
        setClaimedGifts(data);
    } catch (err) {
        console.error("Error fetching claimed gifts:", err);
    }
};
  const updateOffer = async () => {
    const newOffer = prompt("Enter the new offer name:");
    await fetch(`${API_BASE}/api/admin/update-offer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offer: newOffer })
    });
};

// Add a button in your AdminDashboard return:
<button onClick={updateOffer} className="bg-red-500 text-white p-2 rounded">
  Update Global Offer
</button>

const fetchFoundingCircle = async () => {
    const res = await fetch(`${API_BASE}/api/admin/founding-circle`);
    const data = await res.json();
    setFoundingEntries(data);
};
useEffect(() => {
    fetchOrders();
    fetchFoundingCircle();
    fetchClaimedGifts(); // Add this
}, []);
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await fetch(`${API_BASE}/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="p-8 bg-[#FFFBF9] min-h-screen">
      <h1 className="text-3xl font-black text-[#4D3A2A] mb-8">Order Management 🧸</h1>
      
      <div className="bg-white rounded-3xl border border-[#6D442C]/10 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FFF9F6] text-[#6D442C] uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer Details</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#6D442C]/5">
            {orders.map((order) => (
              <React.Fragment key={order.order_id}>
                <tr 
                  className="hover:bg-[#FFF9F6] cursor-pointer" 
                  onClick={() => setExpandedOrderId(expandedOrderId === order.order_id ? null : order.order_id)}
                >
                  <td className="px-6 py-4 font-mono font-bold text-[#7A6B5C]">{order.order_id}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#4D3A2A]">{order.name || "N/A"}</div>
                    <div className="text-[10px] text-[#7A6B5C]">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 font-black text-[#6D442C]">
                    ₹{order.total ? order.total : "0"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-orange-100 text-orange-700">
                      {order.status || 'Processing'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      onClick={(e) => e.stopPropagation()} 
                      onChange={(e) => updateStatus(order.order_id, e.target.value)} 
                      value={order.status || 'Processing'} 
                      className="bg-white border p-1 rounded"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
                
                {/* Expanded Details Row */}
                {/* Expanded Details Row */}
{expandedOrderId === order.order_id && (
  <tr className="bg-[#FFF9F6]">
    <td colSpan="5" className="px-6 py-4">
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="font-bold text-[#4D3A2A]">Shipping Address:</p>
          <p className="text-[#7A6B5C]">{order.address || "No address"}</p>
          <p className="mt-2 font-bold text-[#4D3A2A]">Phone: <span className="font-normal">{order.phone}</span></p>
        </div>
        
        {/* FIXED: Targeting order.cart instead of order.items */}
        <div>
          <p className="font-bold text-[#4D3A2A]">Order Items:</p>
          {order.cart?.map((item, idx) => (
            <p key={idx} className="text-[#7A6B5C]">
              • {item.name} (x{item.quantity}) - ₹{item.price * item.quantity}
            </p>
          ))}
          <p className="mt-2 font-black text-[#6D442C]">
            Total Amount: ₹{order.total || 0}
          </p>
        </div>
      </div>
    </td>
  </tr>
)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- ADD THE FOUNDING CIRCLE SECTION HERE --- */}
      <div className="bg-white p-8 rounded-3xl border border-[#6D442C]/10 shadow-sm">
        <h2 className="text-2xl font-black text-[#4D3A2A] mb-4">Founding Circle Entries</h2>
        {/* --- NEW: Claimed Gifts Section --- */}
<div className="bg-white p-8 mt-8 rounded-3xl border border-[#6D442C]/10 shadow-sm">
  <h2 className="text-2xl font-black text-[#4D3A2A] mb-4">🎁 Claimed Moody Gifts</h2>
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead className="text-[#6D442C] uppercase font-bold text-xs border-b">
        <tr>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Product Won</th>
          <th className="px-4 py-2">Time Claimed</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {claimedGifts.map((gift, idx) => (
          <tr key={idx}>
            <td className="px-4 py-3 text-[#4D3A2A] font-bold">{gift.email}</td>
            <td className="px-4 py-3 text-[#FF8580] font-bold">{gift.productName}</td>
            <td className="px-4 py-3 text-[#7A6B5C]">
              {new Date(gift.claimed_at).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
        
        {/* Counter */}
        <div className="font-bold text-lg mb-4 text-[#6D442C]">
          Total Entries: {foundingEntries.length} / 50
        </div>

        {/* List of Entries */}
        <div className="space-y-2">
          {foundingEntries.slice(0, 50).map((entry, idx) => (
            <div key={idx} className={`border-b py-3 px-4 rounded-xl text-sm ${idx < 50 ? "bg-green-50" : "bg-gray-50"}`}>
              <span className="font-bold text-[#4D3A2A]">{idx + 1}. {entry.email}</span> 
              <span className="text-[#7A6B5C] ml-4">Order ID: {entry.order_id}</span>
              <span className="text-[#7A6B5C] ml-4">IG: {entry.instagram}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}