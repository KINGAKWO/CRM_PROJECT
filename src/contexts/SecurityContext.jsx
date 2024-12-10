import React, { createContext, useContext, useState, useEffect } from 'react';
import securityService from '../services/security/securityService';

const SecurityContext = createContext(null);

export const SecurityProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validateSession();
  }, []);

  const validateSession = async () => {
    const isValid = securityService.session.validate();
    setIsAuthenticated(isValid);
    if (isValid) {
      // Fetch user data
      const userData = await fetchUserData();
      setUser(userData);
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      // Implement login logic
      const response = await axios.post('/api/auth/login', credentials);
      const { user, token } = response.data;
      
      await securityService.session.create(user);
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    securityService.session.destroy();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    validateSession,
  };

  return (
    <SecurityContext.Provider value={value}>
      {!loading && children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}; 