import React, { useState } from 'react';
import { FEEDBACK_ITEMS } from '@/data/mockData';
import { Star } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export const FeedbackManagement: React.FC = () => {
  const { showToast } = useToast();
  const [feedback, setFeedback] = useState(FEEDBACK_ITEMS);

  const toggleStatus = (id: string) => {
    setFeedback(feedback.map(f => f.id === id ? { ...f, status: f.status === 'reviewed' ? 'pending' : 'reviewed' } : f));
    showToast({ message: 'Feedback status updated ✓', duration: 2000 });
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Feedback & Rating Management</h1>
        <p className="text-xs sm:text-sm text-purple-300/80 mt-1">Review user feedback and ratings for AI generated itineraries.</p>
      </div>

      <div className="space-y-4">
        {feedback.map((item) => (
          <div key={item.id} className="rounded-2xl border border-purple-900/40 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{item.user}</span>
                <span className="text-xs text-slate-400">• {item.destination}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex gap-0.5 text-amber-400 text-xs">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <button
                  onClick={() => toggleStatus(item.id)}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase transition ${
                    item.status === 'reviewed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {item.status}
                </button>
              </div>
            </div>

            <p className="text-sm text-slate-200 italic">"{item.message}"</p>
            <p className="text-[10px] text-slate-500">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
