import React, { createContext, useState, useEffect, useContext } from 'react';

/**
 * NOTE: This is a simulation using localStorage for demonstration purposes.
 * In a production environment, authentication should be handled by a secure backend 
 * with proper password hashing, token management (JWT), and session validation.
 */

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const STORAGE_KEY_USERS = 'beauty_luxe_users';
  const STORAGE_KEY_CURRENT_USER = 'beauty_luxe_current_user';

  // Load current user session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to load user session from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Register a new user
  const register = (name, email, password) => {
    try {
      const usersStr = localStorage.getItem(STORAGE_KEY_USERS);
      const users = usersStr ? JSON.parse(usersStr) : [];

      // Check if email already exists
      if (users.find(u => u.email === email)) {
        return { success: false, message: "이미 가입된 이메일입니다." };
      }

      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password, // In real apps, NEVER store plain text passwords
        createdAt: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.')
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(updatedUsers));

      // Auto login after registration
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(newUser));

      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "회원가입 중 오류가 발생했습니다." };
    }
  };

  // Login
  const login = (email, password) => {
    try {
      const usersStr = localStorage.getItem(STORAGE_KEY_USERS);
      const users = usersStr ? JSON.parse(usersStr) : [];

      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
        return { success: true };
      } else {
        return { success: false, message: "이메일 또는 비밀번호를 확인해 주세요." };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "로그인 중 오류가 발생했습니다." };
    }
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
  };

  // Update Profile (e.g., Profile Picture)
  const updateProfile = (updates) => {
    try {
      if (!currentUser) return { success: false };

      const usersStr = localStorage.getItem(STORAGE_KEY_USERS);
      const users = usersStr ? JSON.parse(usersStr) : [];

      const userIndex = users.findIndex(u => u.id === currentUser.id);
      if (userIndex === -1) return { success: false };

      const updatedUser = { ...users[userIndex], ...updates };
      
      // 1. Update users list
      users[userIndex] = updatedUser;
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));

      // 2. Update current session
      setCurrentUser(updatedUser);
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(updatedUser));

      return { success: true };
    } catch (error) {
      console.error("Profile update error:", error);
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
