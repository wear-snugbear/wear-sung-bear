import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Adds an item or increments quantity if it exists
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if product with the exact same ID and selectedSize already exists
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.selectedSize === product.selectedSize
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Guarantee a fallback size if none was specified during quick view
      return [...prevCart, { ...product, quantity: 1, selectedSize: product.selectedSize || "M" }];
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

  // Easily get total quantity for the navbar badge
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, totalItemsCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}