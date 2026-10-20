import React from 'react';
import { ArrowRight, MapPin, Clock, ChevronRight } from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/mockData';

export default function UpcomingEventsSection({ onSelectEvent, onViewAllEvents }) {
  return (
    <section id="events" className="py-16 sm:py-20 bg-emerald-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Callout Panel */}
          <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-4">
            <div className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              UPCOMING EVENTS
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Mark Your Calendar
            </h2>
            
            <p className="text-sm text-slate-600 leading-relaxed">
              Join us for exciting events, tournaments and cultural programmes.
            </p>

            <div className="pt-2">
              <button
                onClick={onViewAllEvents}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-900/20 transition-all duration-200"
              >
                <span>View All Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Event Cards with Scroll Arrow */}
          <div className="lg:col-span-8 relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {UPCOMING_EVENTS.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => onSelectEvent && onSelectEvent(evt)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col justify-between"
                >
                  {/* Event Thumbnail with Date Badge */}
                  <div className="relative h-36 overflow-hidden bg-slate-100">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Black Date Badge on Top Left */}
                    <div className="absolute top-2.5 left-2.5 bg-slate-950 text-white rounded-lg px-2.5 py-1 text-center shadow-md">
                      <div className="text-[9px] font-extrabold tracking-wider text-slate-300 uppercase">
                        {evt.month}
                      </div>
                      <div className="text-base font-black leading-tight text-white">
                        {evt.day}
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                        {evt.title}
                      </h3>
                    </div>

                    <div className="space-y-1.5 pt-1 text-[11px] text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right slider indicator arrow */}
            <button
              onClick={onViewAllEvents}
              className="hidden xl:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-100 text-slate-700 hover:text-emerald-600 items-center justify-center transition-transform hover:scale-110"
              aria-label="View more events"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
