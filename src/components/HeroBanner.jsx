import React from 'react';
import { 
  Palette, 
  Trophy, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight,
  Music,
  Activity
} from 'lucide-react';

export default function HeroBanner({ 
  clubInfo, 
  onExploreEvents, 
  onBookFacility, 
  onJoinClick,
  selectedWing,
  setSelectedWing 
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-800">
      
      {/* Background Decorative Glow Gradients */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-slate-200">Official Campus Portal • Season 2026/27</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-emerald-400 font-semibold text-xs">Memberships Active</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          Where <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">Creative Vision</span>
          <br className="hidden sm:inline" /> Meets <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Athletic Drive</span>.
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {clubInfo.tagline || "Uniting painters, musicians, actors, and athletes under one passionate community. Compete on the court, perform on the stage, create in the studio."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onJoinClick}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white shadow-lg hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Become a Member</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onExploreEvents}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm bg-white/10 hover:bg-white/15 backdrop-blur-md text-white border border-white/20 transition-all transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Upcoming Fixtures & Fests</span>
          </button>

          <button
            onClick={onBookFacility}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm bg-white/10 hover:bg-white/15 backdrop-blur-md text-white border border-white/20 transition-all transform hover:-translate-y-0.5"
          >
            <Activity className="w-4 h-4 text-purple-400" />
            <span>Book Studio or Court</span>
          </button>
        </div>

        {/* Dual Wing Quick Explorer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-left">
          
          {/* Arts Wing Card */}
          <div 
            onClick={() => setSelectedWing(selectedWing === 'arts' ? 'all' : 'arts')}
            className={`cursor-pointer group relative p-5 rounded-2xl border transition-all duration-300 ${
              selectedWing === 'arts'
                ? 'bg-purple-900/40 border-purple-500 ring-2 ring-purple-500/50 shadow-xl shadow-purple-900/40'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md">
                <Palette className="w-6 h-6" />
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                selectedWing === 'arts' ? 'bg-purple-500 text-white border-purple-400' : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
              }`}>
                {selectedWing === 'arts' ? 'Active Filter' : 'Click to Focus'}
              </span>
            </div>
            <h3 className="mt-4 font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
              Creative Arts Wing
            </h3>
            <p className="mt-1 text-xs text-slate-300 line-clamp-2">
              Oil painting, indie soundstage, acoustic jams, theatrical troupe, cinema & street photography.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-purple-300">
              <span>5 Studios & Guilds</span>
              <span>•</span>
              <span>14 Annual Exhibitions</span>
            </div>
          </div>

          {/* Sports Wing Card */}
          <div 
            onClick={() => setSelectedWing(selectedWing === 'sports' ? 'all' : 'sports')}
            className={`cursor-pointer group relative p-5 rounded-2xl border transition-all duration-300 ${
              selectedWing === 'sports'
                ? 'bg-emerald-900/40 border-emerald-500 ring-2 ring-emerald-500/50 shadow-xl shadow-emerald-900/40'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-400/50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-md">
                <Trophy className="w-6 h-6" />
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                selectedWing === 'sports' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}>
                {selectedWing === 'sports' ? 'Active Filter' : 'Click to Focus'}
              </span>
            </div>
            <h3 className="mt-4 font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">
              Athletics & Sports Wing
            </h3>
            <p className="mt-1 text-xs text-slate-300 line-clamp-2">
              Football 7v7, competitive badminton, 3v3 basketball, track & 5K circuits, tactical chess.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <span>6 Varsity Squads</span>
              <span>•</span>
              <span>19 Championship Trophies</span>
            </div>
          </div>

        </div>

        {/* Live Metrics Row */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl font-black text-white">340+</div>
            <div className="text-xs text-slate-400 font-medium">Registered Members</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl font-black text-purple-400">11+</div>
            <div className="text-xs text-slate-400 font-medium">Arts & Sports Guilds</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl font-black text-emerald-400">28</div>
            <div className="text-xs text-slate-400 font-medium">Events This Season</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-2xl font-black text-amber-400">33</div>
            <div className="text-xs text-slate-400 font-medium">Trophies & Exhibits</div>
          </div>
        </div>

      </div>
    </div>
  );
}
