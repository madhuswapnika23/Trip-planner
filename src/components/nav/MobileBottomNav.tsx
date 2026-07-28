import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Sparkles, MapPin, Bookmark, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const items = [
    { label: 'Home', to: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Explore', to: '/app/explore', icon: MapPin },
    { label: 'Plan', to: '/app/plan', icon: Sparkles, highlight: true },
    { label: 'Saved', to: '/app/trips', icon: Bookmark },
    { label: 'Profile', to: '/app/profile', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-slate-800 bg-slate-950/95 backdrop-blur-md px-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition
              ${isActive
                ? item.highlight
                  ? 'text-cyan-300 font-semibold'
                  : 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'}
            `}
          >
            {item.highlight ? (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 -mt-5 border-2 border-slate-950">
                <Icon className="h-5 w-5" />
              </div>
            ) : (
              <Icon className="h-5 w-5" />
            )}
            <span className="text-[10px]">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
