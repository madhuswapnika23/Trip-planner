import React, { useState } from 'react';
import { DollarSign, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { useSettings } from '@/context/SettingsContext';
import { formatCurrency } from '@/utils/budget';

interface CategoryAllocation {
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

export const BudgetPlanner: React.FC = () => {
  const { showToast } = useToast();
  const { settings } = useSettings();
  const [totalBudget, setTotalBudget] = useState(2500);
  const [isAddCatModalOpen, setIsAddCatModalOpen] = useState(false);

  const [categories, setCategories] = useState<CategoryAllocation[]>([
    { name: 'Activities & Tours', allocated: 800, spent: 620, color: 'bg-cyan-500' },
    { name: 'Accommodations', allocated: 1000, spent: 950, color: 'bg-indigo-500' },
    { name: 'Food & Dining', allocated: 500, spent: 410, color: 'bg-emerald-500' },
    { name: 'Transport & Flights', allocated: 200, spent: 160, color: 'bg-amber-500' },
  ]);

  const [catName, setCatName] = useState('');
  const [catAllocated, setCatAllocated] = useState(300);
  const [catSpent, setCatSpent] = useState(0);

  const colors = ['bg-rose-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-400', 'bg-amber-400'];

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (catName.trim()) {
      const color = colors[categories.length % colors.length];
      const newCat: CategoryAllocation = {
        name: catName.trim(),
        allocated: catAllocated,
        spent: catSpent,
        color,
      };
      setCategories(prev => [...prev, newCat]);
      setCatName('');
      setCatAllocated(300);
      setCatSpent(0);
      setIsAddCatModalOpen(false);
      showToast({ message: `Added category "${newCat.name}" ✓`, duration: 3000 });
    }
  };

  const totalAllocated = categories.reduce((sum, c) => sum + c.allocated, 0);
  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-slate-100">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Standalone Budget Planner</h1>
        <p className="text-sm text-slate-400 mt-1">Track allocations, expense caps, and real-time spending for any trip.</p>
      </div>

      {/* Main Budget Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Overall Budget Setup</h2>
          
          <div>
            <label className="block text-xs text-slate-400 mb-1">Target Total Budget</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
              <input
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-lg font-bold text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Currency</label>
            <div className="rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-cyan-300 font-semibold">
              {settings.currency} — change in Settings
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Total Allocated:</span>
              <span className="font-semibold text-white">{formatCurrency(totalAllocated, settings.currency)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Total Spent:</span>
              <span className="font-semibold text-emerald-400">{formatCurrency(totalSpent, settings.currency)}</span>
            </div>
            <div className="flex justify-between text-slate-300 font-bold pt-2 border-t border-slate-800">
              <span>Remaining Balance:</span>
              <span className={remaining < 0 ? 'text-rose-400' : 'text-cyan-300'}>
                {formatCurrency(remaining, settings.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Visual Progress */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-white">Budget Allocation vs Spend</h2>
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/20">
                {Math.round((totalSpent / (totalBudget || 1)) * 100)}% Spent
              </span>
            </div>

            <div className="h-3 w-full rounded-full bg-slate-950 overflow-hidden flex">
              {categories.map((cat, i) => {
                const widthPct = (cat.spent / (totalBudget || 1)) * 100;
                return (
                  <div
                    key={i}
                    className={`h-full ${cat.color} transition-all duration-500`}
                    style={{ width: `${widthPct}%` }}
                    title={`${cat.name}: ${formatCurrency(cat.spent, settings.currency)}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Allocated</p>
              <p className="text-lg font-bold text-white mt-0.5">{formatCurrency(totalAllocated, settings.currency)}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Total Spent</p>
              <p className="text-lg font-bold text-emerald-400 mt-0.5">{formatCurrency(totalSpent, settings.currency)}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Remaining</p>
              <p className={`text-lg font-bold mt-0.5 ${remaining < 0 ? 'text-rose-400' : 'text-cyan-300'}`}>
                {formatCurrency(remaining, settings.currency)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Expense Categories</h2>
          <Button
            size="sm"
            onClick={() => setIsAddCatModalOpen(true)}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-1 text-xs"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat, i) => {
            const catPct = Math.min(Math.round((cat.spent / (cat.allocated || 1)) * 100), 100);
            const isOverCap = cat.spent > cat.allocated;

            return (
              <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-3 w-3 rounded-full ${cat.color}`} />
                    <h3 className="font-bold text-white text-base">{cat.name}</h3>
                  </div>
                  {isOverCap && (
                    <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
                      Over cap
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Spent: <strong className="text-white">{formatCurrency(cat.spent, settings.currency)}</strong></span>
                    <span>Cap: {formatCurrency(cat.allocated, settings.currency)}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isOverCap ? 'bg-rose-500' : cat.color}`}
                      style={{ width: `${catPct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        isOpen={isAddCatModalOpen}
        onClose={() => setIsAddCatModalOpen(false)}
        title="Add Expense Category"
      >
        <form onSubmit={handleAddCategory} className="space-y-4 text-xs text-slate-100">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Category Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Souvenirs & Shopping"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Allocated Cap ({settings.currency})</label>
              <input
                type="number"
                min="0"
                value={catAllocated}
                onChange={(e) => setCatAllocated(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Current Spent ({settings.currency})</label>
              <input
                type="number"
                min="0"
                value={catSpent}
                onChange={(e) => setCatSpent(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsAddCatModalOpen(false)}
              className="text-xs text-slate-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
            >
              Save Category
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
