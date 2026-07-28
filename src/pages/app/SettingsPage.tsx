import React from 'react';
import { Bell, Moon, Sun, DollarSign, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { useTheme } from '@/context/ThemeContext';
import { useSettings } from '@/context/SettingsContext';

export const SettingsPage: React.FC = () => {
  const { showToast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const { settings, setCurrency, setNotifications, saveSettings } = useSettings();

  const handleSave = () => {
    saveSettings();
    showToast({ message: 'Settings saved successfully ✓', duration: 3000 });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Application Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage notifications, display preferences, and default currency.</p>
      </div>

      <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        {/* Currency Setting */}
        <div className="flex items-center justify-between py-3 border-b border-slate-800">
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-white flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-400" /> Default Currency
            </p>
            <p className="text-xs text-slate-400">Used for budget estimates and trip planning across all pages</p>
          </div>
          <select
            value={settings.currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
          >
            <option value="USD">USD ($)</option>
            <option value="INR">INR (₹)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="AUD">AUD (A$)</option>
            <option value="CAD">CAD (C$)</option>
            <option value="SGD">SGD (S$)</option>
          </select>
        </div>

        {/* Active Currency Preview */}
        <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 text-xs">
          <DollarSign className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="text-emerald-300 font-medium">
            Active currency: <strong className="font-extrabold text-white">{settings.currency}</strong> — prices across the app will show in {settings.currency}.
          </span>
        </div>

        {/* Notification Setting */}
        <div className="flex items-center justify-between py-3 border-b border-slate-800">
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-white flex items-center gap-2">
              <Bell className="h-4 w-4 text-cyan-400" /> Trip Alerts & Reminders
            </p>
            <p className="text-xs text-slate-400">Receive notifications for upcoming trip milestones</p>
          </div>
          <button
            onClick={() => setNotifications(!settings.notifications)}
            className={`h-6 w-11 rounded-full p-1 transition ${settings.notifications ? 'bg-cyan-500' : 'bg-slate-800'}`}
          >
            <div className={`h-4 w-4 rounded-full bg-white transition-transform duration-200 ${settings.notifications ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Theme Setting */}
        <div className="flex items-center justify-between py-3">
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-white flex items-center gap-2">
              {theme === 'dark' ? <Moon className="h-4 w-4 text-indigo-400" /> : <Sun className="h-4 w-4 text-amber-400" />}
              <span>{theme === 'dark' ? 'Cyber Dark Aesthetic' : 'Clean Light Aesthetic'}</span>
            </p>
            <p className="text-xs text-slate-400">Toggle between Light and Dark mode across the platform</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`h-6 w-11 rounded-full p-1 transition ${theme === 'dark' ? 'bg-cyan-500' : 'bg-amber-500'}`}
          >
            <div className={`h-4 w-4 rounded-full bg-white transition-transform duration-200 ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        <Button
          onClick={handleSave}
          variant="primary"
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2 rounded-xl flex items-center gap-2 text-xs"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </Button>
      </div>
    </div>
  );
};
