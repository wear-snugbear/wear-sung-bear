import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData } = location.state || {};
  const [method, setMethod] = useState("UPI");

  const handleFinalPayment = async () => {
    const finalOrder = { ...orderData, paymentMethod: method, status: "Pending" };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalOrder),
      });
      
      const result = await response.json(); // Capture the response from backend
      
      if (response.ok) {
        // Show the unique Order ID to the user
        alert(`Payment Successful! \n\nYour Order ID is: ${result.order_id} \n\nUse this to track your order.`);
        navigate("/"); 
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) { 
      console.error("Payment failed", error); 
      alert("Payment failed. Please check your connection.");
    }
  };

  if (!orderData) return <div className="p-10 text-center font-bold text-[#4D3A2A]">No order found!</div>;

  return (
    <div className="min-h-screen bg-[#FFFBF9] flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white p-8 rounded-3xl border border-[#6D442C]/10 max-w-sm w-full shadow-xl">
        <h2 className="text-xl font-black text-[#4D3A2A] mb-6 text-center">Select Payment 💳</h2>
        
        <div className="space-y-3 mb-8">
          {["UPI", "COD"].map((option) => (
            <button
              key={option}
              onClick={() => setMethod(option)}
              className={`w-full p-4 rounded-xl border-2 font-bold transition-all flex justify-between items-center ${
                method === option ? "border-[#FF8580] bg-[#FFF0F0] text-[#FF8580]" : "border-[#6D442C]/10 bg-[#FFF9F6] text-[#7A6B5C]"
              }`}
            >
              {option === "UPI" ? "📱 UPI / Net Banking" : "💵 Cash on Delivery"}
              {method === option && "✓"}
            </button>
          ))}
        </div>

        <div className="bg-[#FFF9F6] p-4 rounded-xl mb-6 text-center font-black text-[#4D3A2A]">
          Total Amount: <span className="text-[#FF8580]">₹{orderData.total}</span>
        </div>

        <button onClick={handleFinalPayment} className="w-full bg-[#6D442C] text-white py-4 rounded-2xl font-black text-sm hover:bg-[#4D3A2A] transition-all shadow-md active:scale-[0.98]">
          CONFIRM & PAY {method}
        </button>
      </motion.div>
    </div>
  );
}