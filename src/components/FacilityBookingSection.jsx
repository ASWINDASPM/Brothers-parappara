import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  X, 
  Palette, 
  Trophy, 
  Activity,
  Check,
  AlertCircle
} from 'lucide-react';

export default function FacilityBookingSection({ 
  facilities, 
  bookings, 
  onAddBooking, 
  selectedWing, 
  setSelectedWing 
}) {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('browse'); // 'browse' | 'my-bookings'
  
  // Booking Form State
  const [bookingDate, setBookingDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('');
  const [memberName, setMemberName] = useState('');
  const [bookingPurpose, setBookingPurpose] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const filteredFacilities = facilities.filter(f => {
    return selectedWing === 'all' || f.wing === selectedWing;
  });

  const handleOpenBooking = (fac) => {
    setSelectedFacility(fac);
    setSelectedSlot(fac.slots[0] || '');
    setBookingConfirmed(false);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!selectedFacility || !memberName.trim() || !selectedSlot) return;

    const newBooking = {
      id: `bkg-${Date.now()}`,
      facilityId: selectedFacility.id,
      facilityName: selectedFacility.name,
      memberName: memberName.trim(),
      slot: selectedSlot,
      date: bookingDate,
      purpose: bookingPurpose.trim() || 'General Club Practice / Session',
      status: 'Confirmed'
    };

    onAddBooking(newBooking);
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedFacility(null);
      setMemberName('');
      setBookingPurpose('');
      setActiveSubTab('my-bookings');
    }, 1800);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Facility & Gear Reservation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Courts, Studios & Equipment
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Book badminton courts, football turf, acoustic jam rooms, and DSLR photography gear online.
          </p>
        </div>

        {/* Sub-tabs: Browse vs Active Bookings */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab('browse')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'browse'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Available Spaces ({facilities.length})
          </button>
          <button
            onClick={() => setActiveSubTab('my-bookings')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'my-bookings'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Reserved Slots</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-700">
              {bookings.length}
            </span>
          </button>
        </div>
      </div>

      {activeSubTab === 'browse' ? (
        <>
          {/* Wing filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedWing('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedWing === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Spaces
            </button>
            <button
              onClick={() => setSelectedWing('arts')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedWing === 'arts'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-purple-700 hover:bg-purple-50'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Arts Studios & Gear
            </button>
            <button
              onClick={() => setSelectedWing('sports')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedWing === 'sports'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Sports Courts & Turfs
            </button>
          </div>

          {/* Facility Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((fac) => {
              const isArts = fac.wing === 'arts';

              return (
                <div 
                  key={fac.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Facility Image */}
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <img
                        src={fac.image}
                        alt={fac.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-md backdrop-blur-md ${
                          isArts ? 'bg-purple-600/95' : 'bg-emerald-600/95'
                        }`}>
                          {isArts ? <Palette className="w-3 h-3" /> : <Trophy className="w-3 h-3" />}
                          <span>{fac.type}</span>
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/90 text-white backdrop-blur-md">
                          <Check className="w-3 h-3" />
                          <span>{fac.status}</span>
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-300" />
                        <span>{fac.location}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-lg leading-snug">
                          {fac.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">Capacity: {fac.capacity}</p>
                      </div>

                      {/* Amenities Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {fac.amenities.map((item, idx) => (
                          <span 
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-medium"
                          >
                            ✓ {item}
                          </span>
                        ))}
                      </div>

                      {/* Slots preview */}
                      <div className="pt-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                          Daily Time Slots ({fac.slots.length})
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {fac.slots.slice(0, 3).map((slot, idx) => (
                            <span 
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200"
                            >
                              {slot}
                            </span>
                          ))}
                          {fac.slots.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-medium">
                              +{fac.slots.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking CTA */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleOpenBooking(fac)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                        isArts
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Reserve Slot Online</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Active Bookings List */
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Confirmed Facility Bookings</h3>
              <p className="text-xs text-slate-500">Live roster of active studio and sports venue reservations</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {bookings.length} Active
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold">No active bookings right now.</p>
              <button
                onClick={() => setActiveSubTab('browse')}
                className="mt-3 text-xs font-bold text-indigo-600 hover:underline"
              >
                Browse facilities & reserve a slot →
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {bookings.map((bkg) => (
                <div key={bkg.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{bkg.facilityName}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {bkg.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Reserved by <strong>{bkg.memberName}</strong> • {bkg.purpose}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-xs">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                      📅 {bkg.date}
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-semibold">
                      ⏰ {bkg.slot}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Booking Form Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedFacility(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingConfirmed ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Slot Confirmed!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your reservation for <strong>{selectedFacility.name}</strong> on {bookingDate} ({selectedSlot}) is saved and confirmed.
                </p>
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold">
                  Access pass key sent to club entry desk.
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-600 uppercase tracking-wider">
                  <Activity className="w-4 h-4" />
                  <span>Reserve Club Asset</span>
                </div>
                
                <div>
                  <h3 className="text-xl font-black text-slate-900">{selectedFacility.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Location: {selectedFacility.location}</p>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Reservation Date</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                {/* Slot Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Time Slot</label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedFacility.slots.map((slot, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                          selectedSlot === slot
                            ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold ring-2 ring-teal-500/30'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name / Club Member ID</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Martinez (Club ID: PULSE-24)"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                {/* Purpose */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Purpose / Activity</label>
                  <input
                    type="text"
                    placeholder="e.g. Singles practice or Solo painting session"
                    value={bookingPurpose}
                    onChange={(e) => setBookingPurpose(e.target.value)}
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedFacility(null)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
