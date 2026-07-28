import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Sparkles, User, LogOut, Shield, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/auth/useAuth';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';

export const PublicHeader: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-white transition hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/20">
            <Compass className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
            Roamly
          </span>
          <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-400 border border-cyan-500/20">
            AI Companion
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link to="/#features" className="transition hover:text-cyan-400">Features</Link>
          <Link to="/#destinations" className="transition hover:text-cyan-400">Destinations</Link>
          <Link to="/#testimonials" className="transition hover:text-cyan-400">Reviews</Link>
          <Link to="/app/explore" className="transition hover:text-cyan-400">Explore</Link>
        </nav>

        {/* Auth / CTA actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className="p-2 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-900 transition"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-indigo-400" />}
          </button>
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(user.role === 'admin' ? '/admin' : '/app/dashboard')}
                className="text-slate-300 hover:text-white flex items-center gap-2"
              >
                {user.role === 'admin' ? <Shield className="h-4 w-4 text-purple-400" /> : <User className="h-4 w-4 text-cyan-400" />}
                <span>{user.name}</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate('/app/plan')}
                className="bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/30 flex items-center gap-1.5"
              >
                <Sparkles className="h-4 w-4" />
                <span>Plan Trip</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                title="Sign out"
                className="text-slate-400 hover:text-rose-400"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/login')}
                className="text-slate-300 hover:text-white"
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/app/plan')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
              >
                <Sparkles className="h-4 w-4" />
                <span>Get Started</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
