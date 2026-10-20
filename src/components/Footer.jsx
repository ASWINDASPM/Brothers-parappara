import React from 'react';
import { 
  Palette, 
  Trophy, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  RotateCcw, 
  Heart 
} from 'lucide-react';

export default function Footer({ onResetData, onOpenJoinModal }) {
  return (
    <footer className="mt-20 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-500 font-black text-lg">
                P
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                PULSE CLUB
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Uniting creative expression with athletic drive. The official student community for fine arts, music, theatre, football, badminton, and intramural sports.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-900/60 text-purple-300 border border-purple-700/50">
                <Palette className="w-3 h-3" /> Arts Wing
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                <Trophy className="w-3 h-3" /> Sports Wing
              </span>
            </div>
          </div>

          {/* Regular Schedules */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 tracking-wider uppercase">
              Weekly Practice & Sessions
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300">Arts Studio & Jam:</strong>
                  <p>Tuesdays & Thursdays, 5:00 - 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300">Football & Court Games:</strong>
                  <p>Wednesdays & Saturdays, 4:30 - 7:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-300">Open Stage & Tournaments:</strong>
                  <p>Every Alternate Sunday Afternoon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 tracking-wider uppercase">
              Location & Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Student Activity & Sports Arena, Campus East Wing</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <a href="mailto:contact@pulseclub.org" className="hover:text-white transition-colors">
                  contact@pulseclub.org
                </a>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Office Hours: Mon - Fri, 10:00 AM - 6:00 PM
              </p>
            </div>
          </div>

          {/* Quick Actions & Reset */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 tracking-wider uppercase">
              Quick Actions
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenJoinModal}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Apply for Club Membership
              </button>
              <button
                onClick={onResetData}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
                title="Reset local storage data back to demo default seed"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Seed Data</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PULSE Arts & Sports Club. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with passion for creators & competitors</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
