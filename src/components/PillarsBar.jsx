import React from 'react';
import { 
  Users, 
  Award,
  Sparkles
} from 'lucide-react';

export default function PillarsBar({ onSelectPillar }) {
  const pillars = [
    {
      id: 'sports',
      title: 'Sports Activities',
      subtext: 'Play • Compete • Grow',
      iconSvg: (
        // Soccer ball icon
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" />
          <path d="m12 7-3.5 2.5 1.5 4h4l1.5-4z" fill="currentColor" fillOpacity="0.2" />
          <path d="M12 7V2M8.5 9.5 4 8M10 13.5 7 18M14 13.5l3 4.5M15.5 9.5 20 8" />
        </svg>
      )
    },
    {
      id: 'arts',
      title: 'Arts & Culture',
      subtext: 'Express • Celebrate • Inspire',
      iconSvg: (
        // Drama theater masks
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M2 10a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" />
          <circle cx="6" cy="10" r="1" fill="currentColor" />
          <circle cx="10" cy="10" r="1" fill="currentColor" />
          <path d="M6 13a2 2 0 0 0 4 0" />
          <path d="M14 6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-2" />
          <circle cx="18" cy="6" r="1" fill="currentColor" />
          <path d="M18 9a2 2 0 0 0 3 0" />
        </svg>
      )
    },
    {
      id: 'community',
      title: 'Community',
      subtext: 'Together • Stronger • Always',
      iconSvg: <Users className="w-6 h-6" />
    },
    {
      id: 'achievements',
      title: 'Achievements',
      subtext: 'Hard Work • Dedication • Success',
      iconSvg: <Award className="w-6 h-6" />
    }
  ];

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 py-6 px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-100">
          {pillars.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectPillar && onSelectPillar(p.id)}
              className="flex flex-col items-center text-center px-4 cursor-pointer group hover:transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Circle Icon */}
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                {p.iconSvg}
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                {p.title}
              </h3>

              {/* Subtext */}
              <p className="text-xs text-slate-500 font-medium mt-1">
                {p.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
