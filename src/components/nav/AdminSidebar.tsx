import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Shield, LayoutDashboard, MapPin, Users, Activity, Star,
  MessageSquare, ArrowLeft, LogOut
} from 'lucide-react';
import { useAuth } from '@/auth/useAuth';

export const AdminSidebar: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const items = [
    { label: 'Overview', to: '/admin', icon: LayoutDashboard },
    { label: 'Destinations', to: '/admin/destinations', icon: MapPin },
    { label: 'User Analytics', to: '/admin/analytics/users', icon: Users },
    { label: 'AI Usage Stats', to: '/admin/analytics/ai', icon: Activity },
    { label: 'Featured Picks', to: '/admin/featured', icon: Star },
    { label: 'Feedback Mgmt', to: '/admin/feedback', icon: MessageSquare },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-purple-900/40 bg-slate-950/95 backdrop-blur-xl">
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-purple-900/40 px-5">
        <NavLink to="/admin" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20">
            <Shield className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white">Roamly Admin</span>
            <span className="text-[10px] text-purple-400 font-mono">MANAGEMENT</span>
          </div>
        </NavLink>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-purple-400/70 uppercase">
          Control Panel
        </div>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) => `
                flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
                ${isActive
                  ? 'bg-purple-900/40 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}
              `}
            >
              <Icon className="h-4 w-4 text-purple-400" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Back to User App + Logout */}
      <div className="border-t border-purple-900/40 p-3 space-y-2">
        <button
          onClick={() => {
            switchRole('user');
            navigate('/app/dashboard');
          }}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition border border-slate-800"
        >
          <ArrowLeft className="h-4 w-4 text-cyan-400" />
          <span>Return to User Portal</span>
        </button>

        {user && (
          <div className="flex items-center justify-between rounded-lg bg-slate-900/60 p-2 border border-slate-800">
            <div className="flex items-center gap-2 min-w-0">
              <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-full bg-purple-900/50 border border-purple-500/30" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-purple-300">{user.name}</p>
                <p className="truncate text-[10px] text-purple-400">Admin</p>
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
        )}
      </div>
    </aside>
  );
};
