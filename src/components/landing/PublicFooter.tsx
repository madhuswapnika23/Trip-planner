import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Github, Twitter, Instagram, Heart } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 text-white">
                <Compass className="h-4 w-4" />
              </div>
              <span className="bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                Roamly
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm">
              Plan less. Experience more. AI-powered itineraries that respect your time, energy, and budget.
            </p>
            <div className="flex gap-4 text-slate-400">
              <a href="#" className="hover:text-cyan-400 transition"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-cyan-400 transition"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-cyan-400 transition"><Github className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/app/plan" className="hover:text-cyan-400 transition">AI Planner</Link></li>
              <li><Link to="/app/explore" className="hover:text-cyan-400 transition">Explore Destinations</Link></li>
              <li><Link to="/app/budget" className="hover:text-cyan-400 transition">Budget Tracker</Link></li>
              <li><Link to="/app/packing" className="hover:text-cyan-400 transition">Packing Checklist</Link></li>
              <li><Link to="/app/weather" className="hover:text-cyan-400 transition">Weather Forecast</Link></li>
            </ul>
          </div>

          {/* Discover Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">Discover</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/app/hotels" className="hover:text-cyan-400 transition">Curated Hotels</Link></li>
              <li><Link to="/app/restaurants" className="hover:text-cyan-400 transition">Top Restaurants</Link></li>
              <li><Link to="/app/explore?tag=Culture" className="hover:text-cyan-400 transition">Cultural Trips</Link></li>
              <li><Link to="/app/explore?tag=Beach" className="hover:text-cyan-400 transition">Beach Escapes</Link></li>
            </ul>
          </div>

          {/* Account / Admin */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-cyan-400 transition">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-cyan-400 transition">Create Account</Link></li>
              <li><Link to="/app/dashboard" className="hover:text-cyan-400 transition">User Dashboard</Link></li>
              <li><Link to="/admin" className="hover:text-purple-400 transition text-purple-300">Admin Console</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Roamly Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for modern travelers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
