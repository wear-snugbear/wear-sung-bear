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
    try {
        const res = await fetch(`${API_BASE}/api/admin/founding-circle`);
        const data = await res.json();
        setFoundingEntries(data); // This updates the UI!
    } catch (err) {
        console.error("Error:", err);
    }
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

  const deleteOldOrders = async () => {
    if (window.confirm("Are you sure you want to delete all orders older than 30 days?")) {
        const response = await fetch(`${API_BASE}/api/admin/delete-old-orders`, {
            method: 'DELETE'
        });
        const data = await response.json();
        alert(data.message);
        fetchOrders(); // Refresh the order list
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

      <div className="bg-white p-8 mt-10 rounded-3xl border border-[#6D442C]/10 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-black text-[#4D3A2A]">Founding Circle</h2>
            <p className="text-[#6D442C] font-bold text-lg">
              Entries: {foundingEntries.length} / 50
            </p>
          </div>
          <button 
            onClick={async () => {
              if(window.confirm("Reset the cycle? This will delete all current entries!")) {
                  await fetch(`${API_BASE}/api/admin/reset-founding-circle`, { method: 'DELETE' });
                  fetchFoundingCircle();
              }
            }}
            className="bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600 transition"
          >
            Reset Cycle
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-4 mb-8 overflow-hidden">
          <div 
            className="bg-[#6D442C] h-full transition-all duration-500" 
            style={{ width: `${Math.min((foundingEntries.length / 50) * 100, 100)}%` }}
          />
        </div>

        {/* Entries List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {foundingEntries.slice(0, 50).map((entry, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-[#FFF9F6] rounded-xl border border-[#6D442C]/5">
              <div className="w-8 h-8 rounded-full bg-[#6D442C] text-white flex items-center justify-center font-bold text-xs">
                {idx + 1}
              </div>
              <div>
                <p className="text-sm font-bold text-[#4D3A2A]">{entry.email}</p>
                <p className="text-[10px] text-[#7A6B5C]">Order: {entry.order_id}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => { fetchFoundingCircle(); fetchClaimedGifts(); }} className="...">
  Refresh Data
</button>
      </div>
    </div>
  );
}