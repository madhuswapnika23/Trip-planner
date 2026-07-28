import React from 'react';
import { MOCK_USERS } from '@/auth/mockUsers';

export const UserAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 text-slate-100">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">User Analytics & Cohorts</h1>
        <p className="text-xs sm:text-sm text-purple-300/80 mt-1">User retention, account tiers, and activity statistics.</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-purple-900/40 bg-slate-900/60">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-purple-900/40 bg-slate-950/60 text-purple-300 uppercase tracking-wider">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Trips Generated</th>
              <th className="p-3">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-900/20 text-slate-200">
            {MOCK_USERS.map((user) => (
              <tr key={user.id} className="hover:bg-slate-900/80 transition">
                <td className="p-3 flex items-center gap-2.5 font-bold text-white">
                  <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-full bg-slate-800 border border-purple-900/40" />
                  <span>{user.name}</span>
                </td>
                <td className="p-3 text-slate-400">{user.email}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    user.role === 'admin' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-cyan-500/20 text-cyan-300'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-3 font-bold text-white">{user.tripsCount}</td>
                <td className="p-3 text-slate-400">{user.joinedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
