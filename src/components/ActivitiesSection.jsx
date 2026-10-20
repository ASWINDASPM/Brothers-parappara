import React from 'react';
import { ArrowRight, Trophy } from 'lucide-react';
import { ACTIVITIES } from '../data/mockData';

export default function ActivitiesSection({ onSelectActivity, onViewAllActivities }) {
  const getBadgeIcon = (icon) => {
    switch (icon) {
      case 'football':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <circle cx="12" cy="12" r="10" />
            <path d="m12 7-3.5 2.5 1.5 4h4l1.5-4z" fill="currentColor" fillOpacity="0.2" />
            <path d="M12 7V2M8.5 9.5 4 8M10 13.5 7 18M14 13.5l3 4.5M15.5 9.5 20 8" />
          </svg>
        );
      case 'cricket':
        return (
          // Cricket bat & ball icon
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M18 3l3 3-9 9-3-3 9-9z" />
            <path d="M6 15l-3 3 1.5 1.5L7.5 16.5" />
            <circle cx="19" cy="19" r="2.5" fill="currentColor" />
          </svg>
        );
      case 'masks':
        return (
          // Traditional arts dancer / drama mask
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M2 10a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" />
            <circle cx="6" cy="10" r="1" fill="currentColor" />
            <circle cx="10" cy="10" r="1" fill="currentColor" />
            <path d="M6 13a2 2 0 0 0 4 0" />
            <path d="M14 6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-2" />
            <circle cx="18" cy="6" r="1" fill="currentColor" />
            <path d="M18 9a2 2 0 0 0 3 0" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        );
    }
  };

  return (
    <section id="activities" className="py-14 sm:py-18 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              OUR ACTIVITIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Sports & Arts for a Brighter Tomorrow
            </h2>
          </div>

          <button
            onClick={onViewAllActivities}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors group"
          >
            <span>View All Activities</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ACTIVITIES.map((act) => (
            <div
              key={act.id}
              onClick={() => onSelectActivity && onSelectActivity(act)}
              className="group cursor-pointer relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-slate-900"
            >
              {/* Background Image */}
              <img
                src={act.image}
                alt={act.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Green icon pill badge */}
              <div className="absolute bottom-16 left-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  {getBadgeIcon(act.icon)}
                </div>
              </div>

              {/* Bottom Text Content */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-extrabold text-white leading-tight">
                  {act.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  {act.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
