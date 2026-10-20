import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, CheckCircle2, Ticket } from 'lucide-react';

export default function EventModal({ event, onClose }) {
  const [rsvpName, setRsvpName] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!event) return null;

  const handleRsvp = (e) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setConfirmed(true);
  };

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

        {/* Thumbnail */}
        <div className="relative h-48 bg-slate-900">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-3 left-4">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-md">
              {event.category}
            </span>
          </div>

          <div className="absolute top-3 left-4 bg-slate-950 text-white rounded-xl px-3 py-1.5 shadow-md">
            <div className="text-[10px] font-extrabold uppercase text-emerald-400">{event.month}</div>
            <div className="text-lg font-black leading-none">{event.day}</div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-2xl font-black text-slate-900 leading-tight">
              {event.title}
            </h3>
            
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {event.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                {event.time}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {event.description}
          </p>

          {/* RSVP Form */}
          {confirmed ? (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">RSVP Confirmed!</h4>
              <p className="text-xs text-slate-600">
                You are registered for <strong>{event.title}</strong>. Admission is free for all club members.
              </p>
              <div className="inline-block px-3 py-1 bg-white rounded-lg text-xs font-mono font-bold text-slate-800 shadow-2xs">
                PASS: BP-{event.month}{event.day}-{Math.floor(100 + Math.random() * 900)}
              </div>
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="space-y-3 pt-1">
              <label className="block text-xs font-semibold text-slate-700">
                Register for Free Audience / Participant Pass
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center gap-1.5 shrink-0"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Get Pass</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
