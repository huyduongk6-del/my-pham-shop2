import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [wishlistItems, setWishlistItems] = useState([]);
  
  // Storage keys
  const GUEST_KEY = 'beauty_luxe_wishlist_guest';
  const OLD_KEY = 'beauty_luxe_wishlist'; // For potential migration

  // Use a ref to track the previous auth state for merging logic
  const prevAuthRef = useRef(isAuthenticated);

  // 1. Initial Load and Auth Change Logic
  useEffect(() => {
    const loadWishlist = () => {
      try {
        let currentKey = isAuthenticated ? `beauty_luxe_wishlist_user_${currentUser.id}` : GUEST_KEY;
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
              // Merge guest items into user items, avoiding duplicates by id
              const merged = [...parsed];
              guestItems.forEach(gItem => {
                const exists = merged.some(uItem => uItem.id === gItem.id);
                if (!exists) {
                  merged.push(gItem);
                }
              });
              parsed = merged;
              // Clear guest wishlist after successful merge
              localStorage.removeItem(GUEST_KEY);
              // alert("위시리스트가 계정에 저장되었습니다."); // Optional as per spec
            }
          }
        }

        setWishlistItems(parsed);
        prevAuthRef.current = isAuthenticated;

      } catch (error) {
        console.error("Failed to load/merge wishlist:", error);
        setWishlistItems([]);
      }
    };

    loadWishlist();
  }, [isAuthenticated, currentUser?.id]);

  // 2. Persist to local storage on changes
  useEffect(() => {
    if (isAuthenticated && !currentUser) return; // Wait for auth sync

    try {
      let currentKey = isAuthenticated ? `beauty_luxe_wishlist_user_${currentUser.id}` : GUEST_KEY;
      localStorage.setItem(currentKey, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Failed to write wishlist to local storage:", error);
    }
  }, [wishlistItems, isAuthenticated, currentUser?.id]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        addToast(`${product.koreanName || product.name} 제품이 이미 위시리스트에 있습니다.`, 'warning');
        return prev;
      }
      
      // Save only necessary fields as per spec
      const newItem = {
        id: product.id,
        brand: product.brand || "CHANEL",
        name: product.name,
        koreanName: product.koreanName || product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating || 5.0,
        reviewsCount: product.reviewsCount || product.reviews || 0
      };
      
      addToast(`${product.koreanName || product.name} 제품이 위시리스트에 추가되었습니다.`, 'success');
      return [...prev, newItem];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    addToast('위시리스트에서 삭제되었습니다.', 'info');
  };

  const toggleWishlist = (product) => {
    const exists = wishlistItems.some(item => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const moveAllToCart = () => {
    wishlistItems.forEach(item => addToCart(item));
    clearWishlist();
    addToast('위시리스트의 모든 상품이 장바구니에 담겼습니다.', 'success');
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      clearWishlist,
      moveAllToCart,
      wishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist hook must be inside a WishlistProvider");
  return ctx;
};
