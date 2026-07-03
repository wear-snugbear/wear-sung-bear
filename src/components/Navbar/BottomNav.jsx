import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function BottomNav() {
  const { totalItemsCount } = useCart();
  const { wishlist } = useWishlist();

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-[#F0E4DD] flex justify-around items-center py-2 z-50">
      <Link to="/" className="flex flex-col items-center text-[#4D3A2A]">
        <span className="text-2xl">🏠</span>
        <span className="text-[10px] font-bold">Home</span>
      </Link>
      
      <Link to="/track-order" className="flex flex-col items-center text-[#4D3A2A]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span className="text-[10px] font-bold mt-1">Track</span>
      </Link>

      <Link to="/wishlist" className="relative flex flex-col items-center text-[#4D3A2A]">
        <span className="text-2xl">♥</span>
        {wishlist.length > 0 && <span className="absolute top-0 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF8580] text-[8px] text-white font-bold">{wishlist.length}</span>}
        <span className="text-[10px] font-bold">Wishlist</span>
      </Link>

      <Link to="/cart" className="relative flex flex-col items-center text-[#4D3A2A]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        {totalItemsCount > 0 && <span className="absolute top-0 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF8580] text-[8px] text-white font-bold">{totalItemsCount}</span>}
        <span className="text-[10px] font-bold">Cart</span>
      </Link>
    </div>
  );
}