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

  // 3. Toggle Function (Sync with MongoDB)
  // Example of how your WishlistContext.jsx should look:
const toggleWishlist = async (product) => {
  const isLiked = wishlist.some((item) => item.id === product.id);
  const updatedWishlist = isLiked 
    ? wishlist.filter((item) => item.id !== product.id) 
    : [...wishlist, product];

  // Update local state immediately for UI responsiveness
  setWishlist(updatedWishlist);

  try {
    // Ensure the email matches exactly what is in your database
    await axios.post('http://localhost:5000/api/wishlist/update', {
      email: "ruhela.vibhu2005@gmail.com", 
      items: updatedWishlist
    });
  } catch (error) {
    console.error("Error syncing wishlist:", error);
    // Revert state if the API call fails
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