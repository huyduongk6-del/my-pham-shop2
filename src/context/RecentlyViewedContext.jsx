import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const RecentlyViewedContext = createContext();

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};

export const RecentlyViewedProvider = ({ children }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);

  // Determine storage key
  const getStorageKey = () => {
    if (isAuthenticated && currentUser) {
      return `beauty_luxe_recently_viewed_user_${currentUser.id}`;
    }
    return 'beauty_luxe_recently_viewed_guest';
  };

  // Load from localStorage
  useEffect(() => {
    const key = getStorageKey();
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        setRecentlyViewedItems(JSON.parse(saved));
      } else {
        setRecentlyViewedItems([]);
      }
    } catch (error) {
      console.error('Failed to load recently viewed items:', error);
      setRecentlyViewedItems([]);
    }
  }, [isAuthenticated, currentUser?.id]);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (recentlyViewedItems.length >= 0) {
      const key = getStorageKey();
      localStorage.setItem(key, JSON.stringify(recentlyViewedItems));
    }
  }, [recentlyViewedItems, isAuthenticated, currentUser?.id]);

  const addRecentlyViewed = (product) => {
    if (!product || !product.id) return;

    setRecentlyViewedItems((prev) => {
      // Remove if already exists to move to top
      const filtered = prev.filter((item) => item.id !== product.id);
      
      const newItem = {
        id: product.id,
        brand: product.brand || 'CHANEL',
        name: product.name,
        koreanName: product.koreanName,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
        reviewsCount: product.reviewsCount || product.reviews || 0
      };

      // Add to beginning and limit to 8
      const updated = [newItem, ...filtered].slice(0, 8);
      return updated;
    });
  };

  const removeRecentlyViewed = (productId) => {
    setRecentlyViewedItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewedItems([]);
  };

  const recentlyViewedCount = recentlyViewedItems.length;

  const value = {
    recentlyViewedItems,
    addRecentlyViewed,
    removeRecentlyViewed,
    clearRecentlyViewed,
    recentlyViewedCount
  };

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};
