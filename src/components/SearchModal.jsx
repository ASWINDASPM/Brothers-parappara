import React, { useState } from 'react';
import { X, Search, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { ACTIVITIES, UPCOMING_EVENTS, NEWS_UPDATES, GALLERY_MOMENTS } from '../data/mockData';

export default function SearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingActivities = q ? ACTIVITIES.filter(a => a.title.toLowerCase().includes(q) || a.subtext.toLowerCase().includes(q)) : [];
  const matchingEvents = q ? UPCOMING_EVENTS.filter(e => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)) : [];
  const matchingNews = q ? NEWS_UPDATES.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)) : [];
  const matchingGallery = q ? GALLERY_MOMENTS.filter(g => g.title.toLowerCase().includes(q)) : [];

  const totalResults = matchingActivities.length + matchingEvents.length + matchingNews.length + matchingGallery.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm p-4 pt-20 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 space-y-4">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-emerald-600" />
          <h3 className="font-extrabold text-lg text-slate-900">Search Brothers Parappara</h3>
        </div>

        {/* Input */}
        <div className="relative">
          <input
            type="text"
            autoFocus
            placeholder="Search football, cricket, events, nov 15, news, dance..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-3 text-sm rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results */}
        {q ? (
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 space-y-3 pt-2">
            {totalResults === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No results found for "{query}". Try "football", "cricket", or "cultural".
              </div>
            ) : (
              <>
                {matchingEvents.map(evt => (
                  <div 
                    key={evt.id} 
                    onClick={() => { onSelectResult('events'); onClose(); }}
                    className="p-3 hover:bg-emerald-50/60 rounded-xl cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">Event • {evt.month} {evt.day}</span>
                      <h4 className="text-xs font-bold text-slate-900">{evt.title}</h4>
                      <p className="text-[11px] text-slate-500">{evt.location}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}

                {matchingActivities.map(act => (
                  <div 
                    key={act.id} 
                    onClick={() => { onSelectResult('activities'); onClose(); }}
                    className="p-3 hover:bg-emerald-50/60 rounded-xl cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">Activity</span>
                      <h4 className="text-xs font-bold text-slate-900">{act.title}</h4>
                      <p className="text-[11px] text-slate-500">{act.subtext}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}

                {matchingNews.map(n => (
                  <div 
                    key={n.id} 
                    onClick={() => { onSelectResult('news'); onClose(); }}
                    className="p-3 hover:bg-emerald-50/60 rounded-xl cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-sky-600 uppercase">{n.tag}</span>
                      <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                      <p className="text-[11px] text-slate-500">{n.date}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </>
            )}
          </div>
        ) : (
          <div className="pt-2 text-xs text-slate-400 flex flex-wrap gap-2">
            <span>Popular:</span>
            <button onClick={() => setQuery('football')} className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700">Football</button>
            <button onClick={() => setQuery('cricket')} className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700">Cricket</button>
            <button onClick={() => setQuery('cultural')} className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700">Cultural Evening</button>
            <button onClick={() => setQuery('registration')} className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700">New Members</button>
          </div>
        )}

      </div>
    </div>
  );
}
