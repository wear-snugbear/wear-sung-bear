import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout and Components
import Navbar from "./components/Navbar/Navbar.jsx";
import BottomNav from "./components/Navbar/BottomNav.jsx"; // Import your new BottomNav
import DiscountBanner from "./components/DiscountBanner/DiscountBanner.jsx";
// Pages
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
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* Wrapper that keeps the header fixed */}
      <div className="fixed top-0 left-0 w-full z-40 bg-white">
        <Navbar />
        <DiscountBanner />
      </div>
      
      <main className="pt-[120px] pb-20 md:pb-0"> {/* Add padding-top to push content below the fixed header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/wishlist" element={<Wishlist />} />
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <div id="bottom-nav-wrapper" className="fixed bottom-0 left-0 w-full z-40">
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;