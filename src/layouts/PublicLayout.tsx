import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicHeader } from '@/components/nav/PublicHeader';
import { PublicFooter } from '@/components/landing/PublicFooter';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};
