import React from 'react';
import { Sparkles, Zap, DollarSign, Compass, Shield, Clock } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'AI Data Model Engine',
      description: 'Not just text responses. Roamly turns AI outputs into structured, draggable, editable data models for your itinerary.',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: DollarSign,
      title: 'Dynamic Budgeting',
      description: 'Real-time calculation of activity, dining, and stay costs with custom currency conversions and budget caps.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Zap,
      title: 'Energy Index Visualizer',
      description: 'Pace your trip smartly with energy exertion scores (Low, Moderate, High) so you don\'t burn out on Day 2.',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: Compass,
      title: 'Smart Drag & Drop Timeline',
      description: 'Reorder days or move activities seamlessly between morning, afternoon, and evening slots.',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      icon: Clock,
      title: 'Live Regeneration',
      description: 'Dislike an activity? Swap it out in 1-click using AI-powered activity replacement with instant options.',
      color: 'from-rose-500 to-pink-600',
    },
    {
      icon: Shield,
      title: 'Companion Tool Suite',
      description: 'Integrated packing checklists, 7-day weather forecasts, hotel curation, and local restaurant picks.',
      color: 'from-blue-500 to-cyan-600',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Architecture</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-1">
            Built Different by Design
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Every feature in Roamly is engineered to eliminate tab-switching and give you an actionable travel blueprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl transition hover:border-slate-700 hover:bg-slate-900"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${f.color} text-white shadow-lg mb-5`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
