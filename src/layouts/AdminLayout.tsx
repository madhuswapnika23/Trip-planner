import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '@/components/nav/AdminSidebar';
import { Shield } from 'lucide-react';
import { useAuth } from '@/auth/useAuth';

export const AdminLayout: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0 ml-64">
        {/* Admin Header */}
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-purple-900/40 bg-slate-950/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-300 border border-purple-500/20">
              <Shield className="h-3.5 w-3.5" />
              SYSTEM ADMIN CONSOLE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Logged in as <strong className="text-purple-300">{user?.name}</strong></span>
            <img src={user?.avatar} alt={user?.name} className="h-8 w-8 rounded-full bg-purple-900/40 border border-purple-500/30 object-cover" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
