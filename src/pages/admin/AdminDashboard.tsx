import React from 'react';
import { ADMIN_STATS, USER_GROWTH } from '@/data/mockData';
import { Users, Sparkles, MapPin, TrendingUp } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-100">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">System Admin Overview</h1>
        <p className="text-xs sm:text-sm text-purple-300/80 mt-1">Platform KPIs, active usage metrics, and AI request health.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-purple-900/40 bg-slate-900/80 p-5 backdrop-blur-xl space-y-2">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Users</span>
            <Users className="h-4 w-4" />
          </div>
          <p className="text-3xl font-extrabold text-white">{ADMIN_STATS.totalUsers.toLocaleString()}</p>
          <p className="text-[10px] text-purple-300/60">+12% vs last month</p>
        </div>

        <div className="rounded-2xl border border-purple-900/40 bg-slate-900/80 p-5 backdrop-blur-xl space-y-2">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Trips Generated</span>
            <Sparkles className="h-4 w-4" />
          </div>
          <p className="text-3xl font-extrabold text-white">{ADMIN_STATS.tripsGenerated.toLocaleString()}</p>
          <p className="text-[10px] text-purple-300/60">{ADMIN_STATS.aiCallsToday} calls today</p>
        </div>

        <div className="rounded-2xl border border-purple-900/40 bg-slate-900/80 p-5 backdrop-blur-xl space-y-2">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Conversion Rate</span>
            <TrendingUp className="h-4 w-4" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400">{ADMIN_STATS.conversionRate}%</p>
          <p className="text-[10px] text-purple-300/60">Form to itinerary completion</p>
        </div>

        <div className="rounded-2xl border border-purple-900/40 bg-slate-900/80 p-5 backdrop-blur-xl space-y-2">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Top Destination</span>
            <MapPin className="h-4 w-4" />
          </div>
          <p className="text-3xl font-extrabold text-cyan-300">{ADMIN_STATS.topDestination}</p>
          <p className="text-[10px] text-purple-300/60">34% of all generations</p>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="rounded-2xl border border-purple-900/40 bg-slate-900/60 p-6 space-y-6">
        <h2 className="text-lg font-bold text-white">Monthly Active User Growth</h2>
        <div className="flex items-end justify-between h-44 pt-4 border-b border-purple-900/40 gap-2">
          {USER_GROWTH.map((item) => (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-purple-600 to-indigo-500 transition-all hover:opacity-80"
                style={{ height: `${(item.users / 25000) * 100}%` }}
              />
              <span className="text-[10px] font-semibold text-purple-300">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
