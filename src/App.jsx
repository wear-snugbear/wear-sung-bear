import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
// Layout and Components
import Navbar from "./components/Navbar/Navbar.jsx";
import BottomNav from "./components/Navbar/BottomNav.jsx";
import DiscountBanner from "./components/DiscountBanner/DiscountBanner.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import AdminNav from './components/Navbar/AdminNav.jsx';
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
import CommunityHandle from "./pages/Admin/CommunityHandle.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import FoundingCircle from "./pages/FoundingCircle/FoundingCircle.jsx";
import FAQ from "./pages/FAQ/FAQ.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Returns from "./pages/Returns/Returns.jsx";
import ThankYou from "./pages/ThankYou/ThankYou.jsx";
// Add this helper component in App.jsx (above AppContent)
function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }
  
  return children;
}

function AppContent() {
  const location = useLocation();

  // Check if we are on an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      
      {/* Conditional Header Rendering */}
      <div className="fixed top-0 left-0 w-full z-40 bg-white">
        {isAdminRoute ? (
          <AdminNav />
        ) : (
          <>
            <Navbar />
            <DiscountBanner />
          </>
        )}
      </div>

      <main className="flex-grow pt-[120px] pb-20 md:pb-0">
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
          <Route path="/admin" element={
            <ProtectedRoute><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/admin/community" element={
            <ProtectedRoute><CommunityHandle /></ProtectedRoute>
          } />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/founding-circle" element={<FoundingCircle />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/thank-you" element={<ThankYou />} />
          
        </Routes>
      </main>
      {!isAdminRoute && (
        <div id="bottom-nav-wrapper" className="fixed bottom-0 left-0 w-full z-40">
          <BottomNav />
        </div>
      )}
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
export default App;