import React, { useState, useEffect } from 'react';
import { CheckSquare, Plus, Trash2, Check, RefreshCw, FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

interface ChecklistItem {
  id: string;
  category: string;
  label: string;
  checked: boolean;
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  { id: '1', category: 'Documents', label: 'Passport & Visa copies', checked: true },
  { id: '2', category: 'Documents', label: 'Travel insurance & flight tickets', checked: true },
  { id: '3', category: 'Electronics', label: 'Universal power adapter & plugs', checked: true },
  { id: '4', category: 'Electronics', label: 'Noise-canceling headphones', checked: false },
  { id: '5', category: 'Electronics', label: 'Power bank 20,000mAh', checked: false },
  { id: '6', category: 'Clothing', label: 'Breathable walking shoes & socks', checked: true },
  { id: '7', category: 'Clothing', label: 'Light rain jacket or windbreaker', checked: false },
  { id: '8', category: 'Toiletries', label: 'Sunscreen SPF 50+ & lip balm', checked: false },
  { id: '9', category: 'Toiletries', label: 'First aid mini kit & prescription meds', checked: false },
];

const DEFAULT_CATEGORIES = ['Documents', 'Electronics', 'Clothing', 'Toiletries'];

const QUICK_SUGGESTIONS = [
  { label: 'Camera & Memory Cards', category: 'Electronics' },
  { label: 'Sunglasses & UV Hat', category: 'Clothing' },
  { label: 'Reusable Water Bottle', category: 'Clothing' },
  { label: 'Travel Pillow & Eye Mask', category: 'Clothing' },
  { label: 'Hand Sanitizer & Wipes', category: 'Toiletries' },
  { label: 'Driver License & ID', category: 'Documents' },
];

const LOCAL_ITEMS_KEY = 'voyagr:packing-items';
const LOCAL_CATS_KEY = 'voyagr:packing-categories';

export const PackingChecklist: React.FC = () => {
  const { showToast } = useToast();

  const [categories, setCategories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_CATS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  const [items, setItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_ITEMS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_ITEMS;
    } catch {
      return DEFAULT_ITEMS;
    }
  });

  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || 'Clothing');
  const [isAddCatModalOpen, setIsAddCatModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_ITEMS_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save packing items:', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_CATS_KEY, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save packing categories:', e);
    }
  }, [categories]);

  const toggleItem = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  };

  const addItem = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (newItem.trim()) {
      const item: ChecklistItem = {
        id: Date.now().toString(),
        category: selectedCategory,
        label: newItem.trim(),
        checked: false,
      };
      setItems(prev => [...prev, item]);
      setNewItem('');
      showToast({ message: `Added "${item.label}" to ${item.category} ✓`, duration: 2500 });
    } else {
      showToast({ message: 'Please type an item name to add (e.g. Camera, Sunglasses)', duration: 3000 });
    }
  };

  const addQuickSuggestion = (label: string, category: string) => {
    const targetCat = categories.includes(category) ? category : categories[0] || 'Clothing';
    const item: ChecklistItem = {
      id: Date.now().toString(),
      category: targetCat,
      label,
      checked: false,
    };
    setItems(prev => [...prev, item]);
    showToast({ message: `Added "${label}" to ${targetCat} ✓`, duration: 2500 });
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = newCatName.trim();
    if (cat && !categories.includes(cat)) {
      setCategories(prev => [...prev, cat]);
      setSelectedCategory(cat);
      setNewCatName('');
      setIsAddCatModalOpen(false);
      showToast({ message: `New Category "${cat}" created ✓`, duration: 3000 });
    }
  };

  const clearCompleted = () => {
    setItems(prev => prev.filter(i => !i.checked));
    showToast({ message: 'Cleared packed items ✓', duration: 2500 });
  };

  const resetToDefault = () => {
    setItems(DEFAULT_ITEMS);
    setCategories(DEFAULT_CATEGORIES);
    setSelectedCategory(DEFAULT_CATEGORIES[0]);
    showToast({ message: 'Checklist reset to default items ✓', duration: 3000 });
  };

  const completedCount = items.filter(i => i.checked).length;
  const progressPct = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Smart Packing Checklist</h1>
          <p className="text-sm text-slate-400 mt-1">Organize essential travel gear, documents, and apparel without missing a thing.</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={clearCompleted}
            className="bg-slate-900 border-slate-800 text-slate-300 hover:text-white flex items-center gap-1 text-xs"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Packed</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={resetToDefault}
            className="bg-slate-900 border-slate-800 text-slate-300 hover:text-white flex items-center gap-1 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </Button>
        </div>
      </div>

      {/* Progress Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl space-y-3">
        <div className="flex justify-between items-center text-sm font-semibold">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-cyan-400" />
            <span className="text-white">Packing Readiness</span>
          </div>
          <span className="text-cyan-300">{completedCount} / {items.length} items packed ({progressPct}%)</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Add Item Form */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl space-y-3">
        <form onSubmit={addItem} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Add new packing item (e.g. Passport, Camera, Jacket)..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950 py-2 px-4 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950 py-2 px-3 text-xs text-cyan-300 font-semibold focus:border-cyan-500 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-1 text-xs px-4"
            >
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </Button>
            <button
              type="button"
              onClick={() => setIsAddCatModalOpen(true)}
              title="Add New Category"
              className="flex items-center justify-center rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-400 hover:text-white transition"
            >
              <FolderPlus className="h-4 w-4" />
            </button>
          </div>
        </form>

        <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] font-semibold text-slate-400 uppercase shrink-0">Quick Add:</span>
          {QUICK_SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              onClick={() => addQuickSuggestion(sug.label, sug.category)}
              className="shrink-0 rounded-full border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition flex items-center gap-1"
            >
              <Plus className="h-3 w-3 text-cyan-400" />
              <span>{sug.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Checklists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map((category) => {
          const categoryItems = items.filter(i => i.category === category);
          const catCompleted = categoryItems.filter(i => i.checked).length;

          return (
            <div key={category} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-base">{category}</h3>
                <span className="text-xs text-slate-400 font-medium">
                  {catCompleted} / {categoryItems.length} packed
                </span>
              </div>

              {categoryItems.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-2">No items in {category} yet.</p>
              ) : (
                <div className="space-y-2">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer ${
                        item.checked
                          ? 'bg-slate-950/40 border-slate-800/60 text-slate-500 line-through'
                          : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-5 w-5 rounded-md flex items-center justify-center border transition ${
                          item.checked
                            ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                            : 'border-slate-700 bg-slate-900'
                        }`}>
                          {item.checked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">{item.label}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setItems(prev => prev.filter(i => i.id !== item.id));
                        }}
                        className="text-slate-500 hover:text-rose-400 transition p-1"
                        title="Delete item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isAddCatModalOpen}
        onClose={() => setIsAddCatModalOpen(false)}
        title="Add New Category"
      >
        <form onSubmit={handleAddCategory} className="space-y-4 text-xs text-slate-100">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Category Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Hiking & Outdoor Gear"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
            />
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
              Create Category
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
