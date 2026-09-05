'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { toast } from 'react-hot-toast';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const tokenData = localStorage.getItem("token");
    if (userData && tokenData) {
      setUser(JSON.parse(userData));
      setToken(tokenData);
    }
    setLoading(false);
  }, []);

  // const login = (userData) => {
  //   localStorage.setItem('user', JSON.stringify(userData));
  //   setUser(userData);
  // };

  const login = (userData, userToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
    setUser(userData);
    setToken(userToken);
  };


  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    toast.error("useAuth must be used within an AuthProvider");
  }
  return context;
}