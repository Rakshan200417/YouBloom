import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'youbloom_auth_user';
const VALID_DEMO_PHONE = '+254712345678';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Validates phone number input
   * - Must not be empty
   * - Must start with +254 (or country code format)
   * - Must match valid mock credentials (+254712345678 or valid format)
   */
  const validatePhoneNumber = (phone) => {
    const trimmed = (phone || '').trim();
    if (!trimmed) {
      return { valid: false, error: 'Phone number is required.' };
    }
    if (!trimmed.startsWith('+254')) {
      return {
        valid: false,
        error: 'Phone number must start with country code (+254).',
      };
    }
    // Kenya phone regex: +254 followed by 7 or 1 and 8 digits (total 12 chars: e.g. +254712345678)
    const kenyaPhoneRegex = /^\+254[17]\d{8}$/;
    if (!kenyaPhoneRegex.test(trimmed)) {
      return {
        valid: false,
        error: 'Invalid format. Example: +254712345678 (12 characters).',
      };
    }

    // Mock logic as required: accept +254712345678 as valid
    if (trimmed !== VALID_DEMO_PHONE) {
      return {
        valid: false,
        error: `Unauthorized number. For this demo, please use: ${VALID_DEMO_PHONE}`,
      };
    }

    return { valid: true, error: null };
  };

  const login = (phoneNumber) => {
    const validation = validatePhoneNumber(phoneNumber);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const userData = {
      phoneNumber: phoneNumber.trim(),
      name: 'Demo Evaluator',
      loginTime: new Date().toISOString(),
    };

    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    validatePhoneNumber,
    VALID_DEMO_PHONE,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
