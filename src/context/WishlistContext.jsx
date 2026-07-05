import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import axios from 'axios';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to keep items consistent
  const getCleanProduct = (product) => ({
    id: String(product.id),
    name: product.name,
    price: product.price,
    image: product.image,
    collectionName: product.collectionName || "General"
  });

  // 1. Monitor Auth Changes (Firebase)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setWishlist([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch Wishlist from MongoDB whenever user logs in
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user && user.email) {
        try {
          setLoading(true);
          // Adjust the URL to match your backend port (e.g., 5000)
          const res = await axios.get(`http://localhost:5000/api/wishlist/${user.email}`);
          setWishlist(res.data || []);
        } catch (error) {
          console.error("Error fetching wishlist from MongoDB:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (product) => {
  if (!user || !user.email) {
    alert("Please log in to add items to your wishlist!");
    return;
  }

  const isLiked = wishlist.some((item) => String(item.id) === String(product.id));
  const updatedWishlist = isLiked 
    ? wishlist.filter((item) => String(item.id) !== String(product.id)) 
    : [...wishlist, product];

  setWishlist(updatedWishlist);

  try {
    // FIX: Use the dynamic user email from state
    await axios.post('https://snugbear-backend-dosj.onrender.com/api/wishlist/update', {
      email: user.email, 
      items: updatedWishlist
    });
  } catch (error) {
    console.error("Error syncing wishlist:", error);
    setWishlist(wishlist); 
  }
};
  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);