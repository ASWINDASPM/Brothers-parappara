import React from 'react';
import { 
  Palette, 
  Trophy, 
  Calendar, 
  Users, 
  Image as ImageIcon, 
  Clock, 
  Bell, 
  ArrowRight, 
  Sparkles, 
  Award,
  ChevronRight,
  MapPin,
  Flame,
  CheckCircle2
} from 'lucide-react';
import HeroBanner from './HeroBanner';

export default function OverviewSection({
  clubInfo,
  events,
  members,
  gallery,
  facilities,
  announcements,
  selectedWing,
  setSelectedWing,
  onOpenJoinModal,
  onNavigateTab,
  onRsvpEvent
}) {
  const upcomingEvents = events.slice(0, 3);
  const recentGallery = gallery.slice(0, 4);
  const urgentAnnouncement = announcements.find(a => a.priority === 'urgent') || announcements[0];

  return (
    <div className="space-y-12">
      
      {/* Hero Banner */}
      <HeroBanner
        clubInfo={clubInfo}
        selectedWing={selectedWing}
        setSelectedWing={setSelectedWing}
        onExploreEvents={() => onNavigateTab('events')}
        onBookFacility={() => onNavigateTab('facilities')}
        onJoinClick={onOpenJoinModal}
      />

      {/* Pinned Urgent Alert if available */}
      {urgentAnnouncement && (
        <div className="relative overflow-hidden p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-amber-300/60 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-white shrink-0 shadow-md">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  Club Notice
                </span>
                <span className="text-xs text-slate-500">{urgentAnnouncement.date}</span>
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base mt-1">
                {urgentAnnouncement.title}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                {urgentAnnouncement.content}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('announcements')}
            className="shrink-0 text-xs font-bold px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Read Notice →
          </button>
        </div>
      )}

      {/* Featured Upcoming Fixtures & Exhibitions */}
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Happening Soon</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">Next Upcoming Activities</h2>
          </div>
          <button
            onClick={() => onNavigateTab('events')}
            className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
          >
            <span>View All ({events.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((evt) => {
            const isArts = evt.wing === 'arts';
            return (
              <div 
                key={evt.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img 
                      src={evt.image} 
                      alt={evt.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-md backdrop-blur-md ${
                        isArts ? 'bg-purple-600/95' : 'bg-emerald-600/95'
                      }`}>
                        {isArts ? 'Arts Wing' : 'Sports Wing'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 text-white text-xs font-bold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      📅 {evt.date}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wide">
                      {evt.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                      {evt.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onNavigateTab('events')}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      isArts
                        ? 'border-purple-200 text-purple-700 hover:bg-purple-600 hover:text-white'
                        : 'border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white'
                    }`}
                  >
                    View Details & RSVP
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dual Wing Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Creative Arts Spotlight */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50/50 to-white border border-purple-100 shadow-sm space-y-6">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md">
              <Palette className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800">
              Arts & Culture
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-900">Creative Arts Guild</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Fostering original artistic voices through open studios, gallery exhibitions, open mics, theatrical productions, and sound recording facilities.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 block">
              Active Guilds & Studios
            </span>
            <div className="flex flex-wrap gap-2">
              {clubInfo.wings[0].disciplines.map((item, idx) => (
                <span key={idx} className="text-xs px-3 py-1.5 rounded-xl bg-white text-purple-900 font-semibold border border-purple-200/80 shadow-2xs">
                  ✨ {item}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setSelectedWing('arts');
                onNavigateTab('events');
              }}
              className="flex items-center gap-2 text-xs font-bold text-purple-700 hover:text-purple-900"
            >
              <span>Explore Arts events & fixtures</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Athletics & Sports Spotlight */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-100 shadow-sm space-y-6">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-md">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Athletics & Sports
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-900">Athletics & Sports Wing</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Cultivating competitive grit, physical fitness, teamwork, and tactical mastery across varsity leagues, weekend friendlies, and fitness circuits.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
              Active Teams & Squads
            </span>
            <div className="flex flex-wrap gap-2">
              {clubInfo.wings[1].disciplines.map((item, idx) => (
                <span key={idx} className="text-xs px-3 py-1.5 rounded-xl bg-white text-emerald-900 font-semibold border border-emerald-200/80 shadow-2xs">
                  🏆 {item}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setSelectedWing('sports');
                onNavigateTab('events');
              }}
              className="flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-900"
            >
              <span>Explore Sports matches & tournaments</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Snapshot Showcase Gallery Grid */}
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full mb-1">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Recent Highlights</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">Creative Works & Match Wins</h2>
          </div>
          <button
            onClick={() => onNavigateTab('gallery')}
            className="flex items-center gap-1 text-xs font-bold text-pink-600 hover:text-pink-800 hover:underline"
          >
            <span>View Full Gallery ({gallery.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recentGallery.map((item) => (
            <div 
              key={item.id}
              onClick={() => onNavigateTab('gallery')}
              className="group cursor-pointer relative aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  {item.category}
                </span>
                <h4 className="text-xs font-bold truncate text-white">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Booking Callout */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Facility Reservations</span>
          </div>
          <h3 className="text-2xl font-black">Need a Studio or Badminton Court?</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            All registered members can reserve campus facilities, sound stages, football turf, and media cameras directly from the portal with real-time slot verification.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('facilities')}
          className="shrink-0 px-6 py-3.5 rounded-2xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all"
        >
          Reserve Studio / Court Now →
        </button>
      </div>

    </div>
  );
}
