import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Compass, Sparkles, LayoutDashboard, MapPin, Bookmark, Clock,
  Wallet, CheckSquare, CloudSun, Hotel, Utensils, User, Settings,
  LogOut, Shield, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/auth/useAuth';

interface NavGroup {
  title: string;
  items: {
    label: string;
    to: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    highlight?: boolean;
  }[];
}

export const Sidebar: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({ isOpen = true, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const groups: NavGroup[] = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboard },
        { label: 'Plan a Trip', to: '/app/plan', icon: Sparkles, badge: 'AI', highlight: true },
        { label: 'Explore Destinations', to: '/app/explore', icon: MapPin },
      ],
    },
    {
      title: 'My Trips',
      items: [
        { label: 'Saved Trips', to: '/app/trips', icon: Bookmark },
        { label: 'Trip History', to: '/app/trips/history', icon: Clock },
      ],
    },
    {
      title: 'Companion Tools',
      items: [
        { label: 'Budget Planner', to: '/app/budget', icon: Wallet },
        { label: 'Packing Checklist', to: '/app/packing', icon: CheckSquare },
        { label: 'Weather Forecast', to: '/app/weather', icon: CloudSun },
      ],
    },
    {
      title: 'Discover',
      items: [
        { label: 'Hotels', to: '/app/hotels', icon: Hotel },
        { label: 'Restaurants', to: '/app/restaurants', icon: Utensils },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Profile', to: '/app/profile', icon: User },
        { label: 'Settings', to: '/app/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-800 bg-slate-950/95 backdrop-blur-xl transition-transform duration-200 lg:static lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
        <NavLink to="/app/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20">
            <Compass className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">Roamly</span>
        </NavLink>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>
        )}
      </div>

      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {groups.map((group) => (
          <div key={group.title}>
            <div className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              {group.title}
            </div>
            <div className="mt-2 space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) => `
                      group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all
                      ${isActive
                        ? item.highlight
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-800/80 text-white shadow-sm border border-slate-700/50'
                        : item.highlight
                          ? 'text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${item.highlight ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}

        {/* Admin Console Switcher - Visible ONLY to Admin Role */}
        {user?.role === 'admin' && (
          <div className="pt-2 border-t border-slate-800/80">
            <button
              onClick={() => navigate('/admin')}
              className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-purple-300 transition bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30"
            >
              <div className="flex items-center gap-2.5">
                <Shield className="h-4 w-4 text-purple-400" />
                <span>Admin Console</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 px-1.5 py-0.5 rounded text-purple-300">
                Portal
              </span>
            </button>
          </div>
        )}
      </div>

      {/* User Footer Profile Card */}
      {user && (
        <div className="border-t border-slate-800 p-3">
          <div className="flex items-center justify-between rounded-lg bg-slate-900/60 p-2 border border-slate-800/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-white">{user.name}</p>
                <p className="truncate text-[10px] text-slate-400">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); navigate('/login'); }}
              title="Sign Out"
              className="text-slate-400 hover:text-rose-400 transition p-1"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
