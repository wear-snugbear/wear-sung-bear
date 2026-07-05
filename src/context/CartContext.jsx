import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Use 'cart' consistently as the state variable
  const [cart, setCart] = useState([]);

  // Adds an item or increments quantity if it exists with the same size
  const addToCart = (product, chosenSize) => {
    setCart((prevCart) => {
      // Find the index of the item that matches BOTH the id and the specific size
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        // If found, increment the quantity of that specific size variation
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      }
      
      // If not found, add the new product object with the chosenSize and initial quantity 1
      return [...prevCart, { ...product, selectedSize: chosenSize, quantity: 1 }];
    });
  };

  // Adjusts item quantity or drops it entirely if quantity becomes less than 1
  const updateQuantity = (id, selectedSize, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id, selectedSize);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.selectedSize === selectedSize
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Removes a product matching its unique ID and configured variant size
  const removeFromCart = (id, selectedSize) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.selectedSize === selectedSize))
    );
  };

  // --- ADDED THIS FUNCTION ---
  // Resets the cart to an empty array
  const clearCart = () => {
    setCart([]);
  };

  // Easily get total quantity for the navbar badge
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    // --- UPDATED VALUE OBJECT ---
    // Added 'clearCart' so it is available in any component that calls useCart()
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart, 
        totalItemsCount 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}