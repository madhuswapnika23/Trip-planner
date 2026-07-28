import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Bell, Menu, Shield, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/auth/useAuth';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';

export const AppTopBar: React.FC<{ onOpenMobileMenu?: () => void }> = ({ onOpenMobileMenu }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/app/explore?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 sm:px-6 backdrop-blur-md">
      {/* Mobile Menu Trigger & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <form onSubmit={handleSearch} className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations, hotels, food..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-1.5 pl-9 pr-4 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
          />
        </form>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/app/plan')}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 text-xs sm:text-sm flex items-center gap-1.5"
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">Plan Trip</span>
        </Button>

        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="p-2 text-slate-400 hover:text-amber-400 dark:hover:text-amber-300 rounded-lg hover:bg-slate-900 transition"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-indigo-400" />}
        </button>

        <button
          title="Notifications"
          className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400"></span>
        </button>

        {user && (
          <div
            onClick={() => navigate('/app/profile')}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-slate-900 transition"
          >
            <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700" />
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-white flex items-center gap-1">
                {user.name}
                {user.role === 'admin' && <Shield className="h-3 w-3 text-purple-400" />}
              </p>
              <p className="text-[10px] text-slate-400 capitalize">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
