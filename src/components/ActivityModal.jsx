import React from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ActivityModal({ activity, onClose, onJoinActivity }) {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-md"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Banner */}
        <div className="relative h-48 bg-slate-900">
          <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-5 text-white">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">
              {activity.category === 'sports' ? 'Athletics & Sports Wing' : 'Arts & Cultural Wing'}
            </span>
            <h3 className="text-2xl font-black">{activity.title}</h3>
            <p className="text-xs text-slate-300">{activity.subtext}</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {activity.description}
          </p>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Training & Practice Schedule:
            </div>
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1">
              <div>📍 <strong>Venue:</strong> Parappara Ground / Club Cultural Stage</div>
              <div>⏰ <strong>Regular Sessions:</strong> Daily 6:30 AM - 8:30 AM & 4:30 PM - 7:00 PM</div>
              <div>👥 <strong>Age Divisions:</strong> Under-15 Juniors, Youth, and Senior Club Teams</div>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onJoinActivity(activity.title);
              }}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Join {activity.title} Squad</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
