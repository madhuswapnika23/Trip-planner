import React, { useState } from 'react';
import { useAuth } from '@/auth/useAuth';
import { Mail, Calendar, MapPin, Award, Edit3, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleOpenModal = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`;
      updateUser({ name: name.trim(), email: email.trim(), avatar });
      setIsEditModalOpen(false);
      showToast({ message: 'Profile updated successfully ✓', duration: 3000 });
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Traveler Profile</h1>
        <p className="text-sm text-slate-400 mt-1">Manage personal details, travel preferences, and achievements.</p>
      </div>

      {/* User Info Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img src={user?.avatar} alt={user?.name} className="h-24 w-24 rounded-2xl bg-slate-800 border-2 border-cyan-500/40 object-cover" />

        <div className="flex-1 space-y-3 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
              <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-xs font-bold text-purple-300 border border-purple-500/30 uppercase">
                {user?.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1 mt-1">
              <Mail className="h-3.5 w-3.5" />
              <span>{user?.email}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span>4 Countries Visited</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
              <Calendar className="h-4 w-4 text-emerald-400" />
              <span>Joined {user?.joinedAt || '2024'}</span>
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={handleOpenModal}
          className="bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs flex items-center gap-1.5"
        >
          <Edit3 className="h-3.5 w-3.5" />
          <span>Edit Profile</span>
        </Button>
      </div>

      {/* Badges / Achievements */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-400" />
          <span>Travel Badges</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center space-y-1">
            <span className="text-3xl">⛩️</span>
            <p className="text-xs font-bold text-white">Kyoto Explorer</p>
            <p className="text-[10px] text-slate-400">Visited Ancient Shrines</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center space-y-1">
            <span className="text-3xl">🥖</span>
            <p className="text-xs font-bold text-white">Parisian Foodie</p>
            <p className="text-[10px] text-slate-400">Michelin Dining Enthusiast</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center space-y-1">
            <span className="text-3xl">🌴</span>
            <p className="text-xs font-bold text-white">Bali Nomad</p>
            <p className="text-[10px] text-slate-400">Wellness & Beach Wanderer</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center opacity-50 space-y-1">
            <span className="text-3xl">🏔️</span>
            <p className="text-xs font-bold text-white">Alpine Trekker</p>
            <p className="text-[10px] text-slate-400">Locked Achievement</p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile Details"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 px-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 px-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsEditModalOpen(false)}
              className="text-xs text-slate-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Check className="h-4 w-4" />
              <span>Save Changes</span>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
