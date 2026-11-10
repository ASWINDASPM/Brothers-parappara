import React, { useState } from 'react';
import { ArrowRight, Megaphone, Trophy, Calendar, X } from 'lucide-react';
import { NEWS_UPDATES } from '../data/mockData';

export default function NewsSection({ news = NEWS_UPDATES, onViewAllNews }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const items = news || NEWS_UPDATES;

  const getNewsIcon = (tag) => {
    switch (tag) {
      case 'NEWS':
        return <Megaphone className="w-5 h-5 text-slate-700" />;
      case 'ACHIEVEMENT':
        return <Trophy className="w-5 h-5 text-slate-700" />;
      case 'NOTICE':
        return <Calendar className="w-5 h-5 text-slate-700" />;
      default:
        return <Megaphone className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <section id="news" className="py-14 sm:py-18 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              NEWS & UPDATES
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Latest from Our Club
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Stay informed with the latest announcements, notices and club updates.
            </p>
          </div>

          <button
            onClick={onViewAllNews}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors group shrink-0"
          >
            <span>View All News</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 News Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="group cursor-pointer bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Top: Icon + Category Badge */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 transition-colors">
                    {getNewsIcon(item.tag)}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-sky-100 text-sky-800">
                    {item.tag}
                  </span>
                </div>

                {/* News Title */}
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Bottom: Date + Arrow */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>{item.date}</span>
                <span className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-sky-100 text-sky-800">
                  {selectedNews.tag}
                </span>
                <span className="text-xs text-slate-400">• {selectedNews.date}</span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                {selectedNews.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {selectedNews.content}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span>Issued by: {selectedNews.author}</span>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800"
                >
                  Close Notice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
