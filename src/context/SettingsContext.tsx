import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const SETTINGS_STORAGE_KEY = 'roamly_settings';

interface Settings {
  currency: string;
  notifications: boolean;
}

const defaultSettings: Settings = {
  currency: 'USD',
  notifications: true,
};

interface SettingsContextValue {
  settings: Settings;
  setCurrency: (currency: string) => void;
  setNotifications: (enabled: boolean) => void;
  saveSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // Auto-persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch { /* ignore */ }
  }, [settings]);

  const setCurrency = useCallback((currency: string) => {
    setSettings(prev => ({ ...prev, currency }));
  }, []);

  const setNotifications = useCallback((notifications: boolean) => {
    setSettings(prev => ({ ...prev, notifications }));
  }, []);

  const saveSettings = useCallback(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch { /* ignore */ }
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setCurrency, setNotifications, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
