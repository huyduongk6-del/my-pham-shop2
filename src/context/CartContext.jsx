import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { parsePrice } from '../utils/price';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Storage keys
  const GUEST_KEY = 'beauty_luxe_cart_guest';
  const OLD_KEY = 'beauty_luxe_cart'; // For migration

  // Use a ref to track the previous auth state for merging logic
  const prevAuthRef = useRef(isAuthenticated);

  // 1. Initial Load and Auth Change Logic
  useEffect(() => {
    const loadCart = () => {
      try {
        let currentKey = isAuthenticated ? `beauty_luxe_cart_user_${currentUser.id}` : GUEST_KEY;
        let localData = localStorage.getItem(currentKey);

        // Migration from old generic key if guest key is empty
        if (!isAuthenticated && !localData) {
          const oldData = localStorage.getItem(OLD_KEY);
          if (oldData) {
            localData = oldData;
            localStorage.setItem(GUEST_KEY, oldData);
            localStorage.removeItem(OLD_KEY);
          }
        }

        let parsed = localData ? JSON.parse(localData) : [];

        // Handle Merging Logic (Guest -> User)
        if (isAuthenticated && !prevAuthRef.current) {
          const guestDataStr = localStorage.getItem(GUEST_KEY);
          if (guestDataStr) {
            const guestItems = JSON.parse(guestDataStr);
            if (guestItems.length > 0) {
              // Merge guest items into user items
              const merged = [...parsed];
              guestItems.forEach(gItem => {
                const existingIdx = merged.findIndex(uItem => uItem.cartItemId === gItem.cartItemId);
                if (existingIdx > -1) {
                  merged[existingIdx].quantity += gItem.quantity;
                } else {
                  merged.push(gItem);
                }
              });
              parsed = merged;
              // Clear guest cart after successful merge
              localStorage.removeItem(GUEST_KEY);
            }
          }
        }

        // Self-healing: ensure all items have a valid cartItemId
        const sanitized = parsed.map(item => {
          if (!item.cartItemId) {
            const optLabel = (item.option && typeof item.option === 'object') 
              ? (item.option.label || 'default') 
              : (item.option || 'default');
            return { ...item, cartItemId: `${item.id}-${optLabel}` };
          }
          return item;
        });

        setCartItems(sanitized);
        prevAuthRef.current = isAuthenticated;

      } catch (error) {
        console.error("Failed to load/merge cart:", error);
        setCartItems([]);
      }
    };

    loadCart();
  }, [isAuthenticated, currentUser?.id]);

  // 2. Persist to local storage on changes
  useEffect(() => {
    if (isAuthenticated && !currentUser) return; // Wait for auth sync

    try {
      let currentKey = isAuthenticated ? `beauty_luxe_cart_user_${currentUser.id}` : GUEST_KEY;
      localStorage.setItem(currentKey, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to write cart to local storage:", error);
    }
  }, [cartItems, isAuthenticated, currentUser?.id]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product, selectedOption, quantity = 1) => {
    const optionLabel = selectedOption?.label || "default";
    const cartItemId = `${product.id}-${optionLabel}`;
    
    // Base or option pricing
    const priceString = selectedOption?.price || product.price;

    setCartItems((prevItems) => {
      const existingItemIdx = prevItems.findIndex(item => item.cartItemId === cartItemId);

      if (existingItemIdx > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIdx] = {
          ...updatedItems[existingItemIdx],
          quantity: updatedItems[existingItemIdx].quantity + quantity
        };
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            cartItemId,
            id: product.id,
            brand: product.brand || "CHANEL",
            name: product.name,
            koreanName: product.koreanName || product.name,
            image: product.image,
            price: priceString,
            option: selectedOption,
            quantity: quantity
          }
        ];
      }
    });

    setIsCartOpen(true);
    addToast(`${product.koreanName || product.name} 제품이 장바구니에 담겼습니다.`, 'success');
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const increaseQuantity = (cartItemId) => {
    setCartItems(prev => prev.map(item => 
      item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (cartItemId) => {
    setCartItems(prev => prev.map(item => 
      item.cartItemId === cartItemId 
        ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
        : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Derived Metrics
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartTotal = cartItems.reduce((sum, item) => {
    const itemPriceNumeric = parsePrice(item.price);
    return sum + (itemPriceNumeric * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart hook must be inside a CartProvider");
  return ctx;
};
