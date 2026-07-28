import React from 'react';
import { AI_USAGE } from '@/data/mockData';
import { Cpu, Zap, DollarSign } from 'lucide-react';

export const AIUsageAnalytics: React.FC = () => {
  const totalTokens = AI_USAGE.reduce((sum, item) => sum + item.tokens, 0);

  return (
    <div className="space-y-8 text-slate-100">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">AI Usage & Token Metrics</h1>
        <p className="text-xs sm:text-sm text-purple-300/80 mt-1">Track LLM API calls, token consumption, latency, and cost estimates.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-purple-900/40 bg-slate-900/80 p-5 space-y-1">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-xs font-semibold uppercase">Total Token Consumption</span>
            <Cpu className="h-4 w-4" />
          </div>
          <p className="text-2xl font-extrabold text-white">{(totalTokens / 1000000).toFixed(1)}M Tokens</p>
        </div>

        <div className="rounded-2xl border border-purple-900/40 bg-slate-900/80 p-5 space-y-1">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-xs font-semibold uppercase">Avg Latency per Plan</span>
            <Zap className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-cyan-300">1.84 seconds</p>
        </div>

        <div className="rounded-2xl border border-purple-900/40 bg-slate-900/80 p-5 space-y-1">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-xs font-semibold uppercase">Est. Monthly API Cost</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-300">$142.80</p>
        </div>
      </div>

      {/* Usage Table */}
      <div className="overflow-x-auto rounded-2xl border border-purple-900/40 bg-slate-900/60">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-purple-900/40 bg-slate-950/60 text-purple-300 uppercase tracking-wider">
            <tr>
              <th className="p-3">Month</th>
              <th className="p-3">API Requests</th>
              <th className="p-3">Total Tokens Used</th>
              <th className="p-3">Avg Tokens/Request</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-900/20 text-slate-200">
            {AI_USAGE.map((row) => (
              <tr key={row.month} className="hover:bg-slate-900/80 transition">
                <td className="p-3 font-bold text-white">{row.month}</td>
                <td className="p-3 text-cyan-300 font-semibold">{row.calls.toLocaleString()} calls</td>
                <td className="p-3 font-mono">{row.tokens.toLocaleString()}</td>
                <td className="p-3 text-slate-400">{Math.round(row.tokens / row.calls)} tokens</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
