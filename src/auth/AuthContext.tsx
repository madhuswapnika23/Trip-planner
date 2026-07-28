import React, { createContext, useCallback, useContext, useState } from 'react';
import { findUser, saveCustomUser, type MockUser, type UserRole } from './mockUsers';

const STORAGE_KEY = 'roamly_auth';

interface AuthContextValue {
  user: MockUser | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  updateUser: (updatedFields: Partial<MockUser>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as MockUser) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 400));
    const found = findUser(email, password);
    if (!found) {
      return { success: false, error: 'Invalid email or password.' };
    }
    setUser(found);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    } catch { /* ignore */ }
    return { success: true };
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    await new Promise(r => setTimeout(r, 400));
    const newUser: MockUser = {
      id: `user-${Date.now()}`,
      email: email.trim(),
      password,
      name: name.trim(),
      role: 'user',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`,
      joinedAt: new Date().toISOString().split('T')[0],
      tripsCount: 0,
      savedTrips: 0,
    };

    saveCustomUser(newUser);
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch { /* ignore */ }
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
  }, []);

  const switchRole = useCallback((newRole: UserRole) => {
    setUser(prev => {
      if (!prev) return null;
      const updated: MockUser = { ...prev, role: newRole };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch { /* ignore */ }
      return updated;
    });
  }, []);

  const updateUser = useCallback((updatedFields: Partial<MockUser>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated: MockUser = { ...prev, ...updatedFields };
      saveCustomUser(updated);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch { /* ignore */ }
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      role: user?.role ?? null,
      login,
      register,
      logout,
      switchRole,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
