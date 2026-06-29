import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Layout and Main Wrapper
import Navbar from "./components/Navbar/Navbar.jsx"; 

// Pages
import LandingPage from "./pages/Landing/Landing.jsx";
import Home from "./pages/Home/Home.jsx";
import Collections from "./pages/Collections/Collections.jsx";
import Community from "./pages/Community/Community.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import TrackOrder from "./pages/TrackOrder/TrackOrder.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import FoundingCircle from "./pages/FoundingCircle/FoundingCircle.jsx";
import FAQ from "./pages/FAQ/FAQ.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx"; // Make sure to import your new Wishlist page
import Login from "./pages/Login/Login.jsx";   // Added Login import
import Signup from "./pages/SignUp/SignUp.jsx";

function App() {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (showLanding) {
    return <LandingPage />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/wishlist" element={<Wishlist />} /> {/* Add this route */}
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/founding-circle" element={<FoundingCircle />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />     {/* Added Login Route */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;