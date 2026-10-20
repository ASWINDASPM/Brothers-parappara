import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  Ticket, 
  X,
  Palette,
  Trophy,
  Share2
} from 'lucide-react';

export default function EventsSection({ 
  events, 
  onAddEvent, 
  onRsvpEvent, 
  selectedWing, 
  setSelectedWing 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [rsvpModalEvent, setRsvpModalEvent] = useState(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    wing: 'arts',
    category: 'Fine Arts',
    date: '',
    time: '10:00 AM - 1:00 PM',
    venue: '',
    description: '',
    capacity: 50,
    tags: 'Campus, Open'
  });

  const categories = [
    'all',
    'Fine Arts & Media',
    'Football',
    'Music & Band',
    'Badminton',
    'Theatre & Drama',
    'Athletics & Track'
  ];

  // Filtering
  const filteredEvents = events.filter(evt => {
    const matchesWing = selectedWing === 'all' || evt.wing === selectedWing;
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'all' || evt.category.toLowerCase().includes(filterCategory.toLowerCase());
    return matchesWing && matchesSearch && matchesCat;
  });

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpModalEvent) return;
    onRsvpEvent(rsvpModalEvent.id, rsvpName.trim());
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setRsvpModalEvent(null);
      setRsvpName('');
    }, 1800);
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date || !newEvent.venue) return;

    const defaultImages = {
      arts: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
      sports: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80'
    };

    const created = {
      id: `evt-${Date.now()}`,
      title: newEvent.title,
      wing: newEvent.wing,
      category: newEvent.category,
      date: newEvent.date,
      time: newEvent.time,
      venue: newEvent.venue,
      description: newEvent.description || 'Club hosted activity open to all students and members.',
      image: defaultImages[newEvent.wing],
      organizer: 'Club Coordinator',
      capacity: Number(newEvent.capacity) || 50,
      rsvps: ['You (Host)'],
      featured: false,
      tags: newEvent.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    onAddEvent(created);
    setShowAddModal(false);
    setNewEvent({
      title: '',
      wing: 'arts',
      category: 'Fine Arts',
      date: '',
      time: '10:00 AM - 1:00 PM',
      venue: '',
      description: '',
      capacity: 50,
      tags: 'Campus, Open'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Fixtures & Sessions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Club Events & Competitions
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Sign up for upcoming matches, art workshops, auditions, and tournaments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event / Match</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events, venues, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Wing Switch Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedWing('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedWing === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Wings ({events.length})
          </button>
          <button
            onClick={() => setSelectedWing('arts')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedWing === 'arts'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            Arts ({events.filter(e => e.wing === 'arts').length})
          </button>
          <button
            onClick={() => setSelectedWing('sports')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedWing === 'sports'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Sports ({events.filter(e => e.wing === 'sports').length})
          </button>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No events found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search filters or add a new event using the button above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => {
            const isArts = evt.wing === 'arts';
            const rsvpCount = evt.rsvps?.length || 0;
            const percentFilled = Math.min(100, Math.round((rsvpCount / evt.capacity) * 100));
            const isFull = rsvpCount >= evt.capacity;

            return (
              <div 
                key={evt.id} 
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Event Image & Badges */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Wing Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                      isArts 
                        ? 'bg-purple-600/95 text-white backdrop-blur-md'
                        : 'bg-emerald-600/95 text-white backdrop-blur-md'
                    }`}>
                      {isArts ? <Palette className="w-3 h-3" /> : <Trophy className="w-3 h-3" />}
                      <span>{isArts ? 'Arts Wing' : 'Sports Wing'}</span>
                    </span>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/50 text-white backdrop-blur-md border border-white/20">
                      {evt.category}
                    </span>
                  </div>

                  {/* Date Chip */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="flex items-center gap-1.5 text-xs font-semibold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5 text-amber-300" />
                      <span>{evt.date}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-slate-900 text-lg leading-snug group-hover:text-indigo-600 transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  {/* Meta details */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                  </div>

                  {/* Capacity Bar & RSVP Button */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1.5">
                      <span>RSVP Seats: {rsvpCount} / {evt.capacity}</span>
                      <span className={percentFilled > 80 ? 'text-rose-600 font-bold' : ''}>
                        {percentFilled}% booked
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isArts ? 'bg-purple-600' : 'bg-emerald-600'
                        }`}
                        style={{ width: `${percentFilled}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setRsvpModalEvent(evt)}
                      disabled={isFull}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                        isFull 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : isArts
                            ? 'bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white border border-purple-200 hover:border-transparent'
                            : 'bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 hover:border-transparent'
                      }`}
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>{isFull ? 'Sold Out / At Capacity' : 'RSVP / Reserve Pass'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* RSVP Modal */}
      {rsvpModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setRsvpModalEvent(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {rsvpSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Pass Confirmed!</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  You are registered for <strong>{rsvpModalEvent.title}</strong> on {rsvpModalEvent.date}. A digital pass code has been saved to your session.
                </p>
                <div className="inline-block px-4 py-2 bg-slate-100 rounded-xl text-xs font-mono font-bold text-slate-700">
                  PASS-PULSE-{Math.floor(100000 + Math.random() * 900000)}
                </div>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  <Ticket className="w-4 h-4" />
                  <span>Event Registration</span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{rsvpModalEvent.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                    <span>📅 {rsvpModalEvent.date}</span>
                    <span>📍 {rsvpModalEvent.venue}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                  Free entry for all registered club members & campus students. Seats allocated on first-come basis.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name or Student ID
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Martinez"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRsvpModalEvent(null)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md"
                  >
                    Confirm My Seat
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative my-8">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>Publish New Activity / Fixture</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Add Club Event</h3>

              {/* Wing Choice */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Club Wing</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewEvent({ ...newEvent, wing: 'arts', category: 'Fine Arts' })}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      newEvent.wing === 'arts'
                        ? 'bg-purple-50 border-purple-500 text-purple-700'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <Palette className="w-4 h-4" />
                    <span>Creative Arts Wing</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewEvent({ ...newEvent, wing: 'sports', category: 'Football' })}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      newEvent.wing === 'sports'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Sports Wing</span>
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Event / Fixture Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3v3 Streetball Shootout or Watercolors Workshop"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              {/* Category & Capacity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category / Discipline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Badminton, Music, Theatre"
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Max Capacity</label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Time Range</label>
                  <input
                    type="text"
                    placeholder="e.g. 4:00 PM - 7:00 PM"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Venue */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Venue / Field / Room</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Indoor Arena Court 1 or Studio B"
                  value={newEvent.venue}
                  onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Event Description</label>
                <textarea
                  rows="3"
                  placeholder="What should participants expect? What should they bring?"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
