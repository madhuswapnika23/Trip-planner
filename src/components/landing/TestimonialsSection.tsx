import React from 'react';
import { TESTIMONIALS } from '@/data/mockData';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-slate-900/40 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Loved by Solo Travelers</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-1">
            Trusted by 24,000+ Explorers
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            See what real travelers say about planning their journeys with Roamly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl flex flex-col justify-between"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-slate-800 opacity-50" />
              <div>
                <div className="flex gap-1 text-amber-400 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                    <p className="text-xs text-slate-400">{t.location}</p>
                  </div>
                </div>
                <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-300 border border-cyan-500/20">
                  {t.destination}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
