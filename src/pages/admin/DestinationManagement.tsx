import React, { useState } from 'react';
import { DESTINATIONS, Destination } from '@/data/mockData';
import { Plus, Edit, Trash2, Search, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

export const DestinationManagement: React.FC = () => {
  const { showToast } = useToast();
  const [destinations, setDestinations] = useState<Destination[]>(DESTINATIONS);
  const [searchTerm, setSearchTerm] = useState('');

  // Add / Edit Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [continent, setContinent] = useState('Asia');
  const [tagline, setTagline] = useState('Experience unforgettable sights and culture');
  const [avgBudget, setAvgBudget] = useState(1800);
  const [rating, setRating] = useState(4.8);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80');
  const [trending, setTrending] = useState(true);

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setCountry('');
    setContinent('Asia');
    setTagline('Experience unforgettable sights and culture');
    setAvgBudget(1800);
    setRating(4.8);
    setImage('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80');
    setTrending(true);
    setIsModalOpen(true);
  };

  const openEditModal = (d: Destination) => {
    setEditingId(d.id);
    setName(d.name);
    setCountry(d.country);
    setContinent(d.continent || 'Asia');
    setTagline(d.tagline || 'Experience unforgettable sights and culture');
    setAvgBudget(d.avgBudget);
    setRating(d.rating);
    setImage(d.image);
    setTrending(d.trending);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !country.trim()) {
      showToast({ message: 'Please enter both Destination Name and Country', duration: 3000 });
      return;
    }

    if (editingId) {
      setDestinations(prev =>
        prev.map(d =>
          d.id === editingId
            ? { ...d, name: name.trim(), country: country.trim(), continent, tagline, avgBudget, rating, image, trending }
            : d
        )
      );
      showToast({ message: `Destination "${name}" updated ✓`, duration: 2500 });
    } else {
      const newDest: Destination = {
        id: Date.now().toString(),
        name: name.trim(),
        country: country.trim(),
        continent,
        tagline: tagline.trim(),
        description: `Explore the breathtaking highlights and vibrant culture of ${name}, ${country}.`,
        image,
        rating,
        reviewCount: 120,
        avgBudget,
        currency: 'USD',
        bestTime: 'Oct - Apr',
        highlights: ['Cultural Landmarks', 'Local Gastronomy', 'Scenic Views'],
        tags: ['Popular', 'Must Visit'],
        trending,
        featured: true,
        lat: 20.0,
        lng: 77.0,
      };
      setDestinations(prev => [newDest, ...prev]);
      showToast({ message: `New destination "${name}" added to catalog ✓`, duration: 3000 });
    }

    setIsModalOpen(false);
  };

  const toggleTrending = (id: string, name: string, currentStatus: boolean) => {
    setDestinations(prev =>
      prev.map(d => (d.id === id ? { ...d, trending: !d.trending } : d))
    );
    showToast({
      message: `"${name}" status changed to ${!currentStatus ? 'ACTIVE' : 'OFF'} ✓`,
      duration: 2500,
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the destination catalog?`)) {
      setDestinations(prev => prev.filter(d => d.id !== id));
      showToast({ message: `Destination "${name}" deleted ✓`, duration: 2500 });
    }
  };

  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Destination Management</h1>
          <p className="text-xs sm:text-sm text-purple-300/80 mt-1">Manage catalog entries, feature flags, and metadata.</p>
        </div>

        <Button
          variant="primary"
          onClick={openAddModal}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 px-4 py-2.5 rounded-xl shadow-lg shadow-purple-900/30"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Add Destination</span>
        </Button>
      </div>

      {/* Search Bar & Filter Summary */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-purple-900/40 bg-slate-900/80 p-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter destinations by name or country..."
            className="w-full rounded-xl border border-purple-900/40 bg-slate-950 py-2 pl-9 pr-3 text-xs text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none"
          />
        </div>

        <span className="text-xs text-purple-300/70 font-medium hidden sm:inline">
          Showing {filtered.length} of {destinations.length} destinations
        </span>
      </div>

      {/* CRUD Table */}
      <div className="overflow-x-auto rounded-2xl border border-purple-900/40 bg-slate-900/60 shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-purple-900/40 bg-slate-950/80 text-purple-300 uppercase tracking-wider font-semibold">
            <tr>
              <th className="p-3.5">Destination</th>
              <th className="p-3.5">Country</th>
              <th className="p-3.5">Rating</th>
              <th className="p-3.5">Avg Budget</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-900/20 text-slate-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                  No destinations found matching "{searchTerm}". Click "+ Add Destination" to create one.
                </td>
              </tr>
            ) : (
              filtered.map((d) => (
                <tr key={d.id} className="hover:bg-purple-950/20 transition">
                  <td className="p-3.5 flex items-center gap-3 font-bold text-white">
                    <img src={d.image} alt={d.name} className="h-9 w-9 rounded-xl object-cover bg-slate-800 border border-purple-900/40 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-white">{d.name}</p>
                      <p className="text-[10px] text-purple-300/70 font-normal">{d.tagline || d.continent}</p>
                    </div>
                  </td>
                  <td className="p-3.5 font-medium text-slate-300">{d.country}</td>
                  <td className="p-3.5 text-amber-400 font-semibold">★ {d.rating}</td>
                  <td className="p-3.5 font-semibold text-emerald-400">${d.avgBudget}</td>
                  <td className="p-3.5">
                    <button
                      onClick={() => toggleTrending(d.id, d.name, d.trending)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition ${
                        d.trending
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-slate-800/80 text-slate-400 border border-slate-700 hover:text-white'
                      }`}
                    >
                      {d.trending ? 'ACTIVE' : 'OFF'}
                    </button>
                  </td>
                  <td className="p-3.5 text-right space-x-1">
                    <button
                      onClick={() => openEditModal(d)}
                      title="Edit Destination"
                      className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-500/20 border border-purple-500/20 transition"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(d.id, d.name)}
                      title="Delete Destination"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Destination Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Destination' : 'Add New Destination'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs text-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Destination Name</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tokyo, Goa, Kerala"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-9 pr-3 text-sm text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. Japan, India, France"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Continent</label>
            <select
              value={continent}
              onChange={(e) => setContinent(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-sm text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Africa">Africa</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-sm text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Avg 7-Day Budget ($)</label>
              <input
                type="number"
                value={avgBudget}
                onChange={(e) => setAvgBudget(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Rating (1-5)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Cover Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 px-3 text-xs text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              className="text-xs text-slate-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
            >
              {editingId ? 'Save Changes' : 'Create Destination'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
