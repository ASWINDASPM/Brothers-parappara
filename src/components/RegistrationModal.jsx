import React, { useState } from 'react';
import { X, CheckCircle2, Trophy, Palette, Users, ArrowRight } from 'lucide-react';
import ClubLogo from './ClubLogo';
import { registerMemberToSupabase } from '../lib/supabase';

export default function RegistrationModal({ isOpen, onClose, onRegisterSuccess }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    wing: 'Football Squad',
    ageGroup: 'Youth (15-22 yrs)',
    address: 'Parappara',
    notes: ''
  });
  const [memberId, setMemberId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const id = `BP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setMemberId(id);
    
    // Save to Supabase (or demo fallback)
    await registerMemberToSupabase({ ...formData, memberId: id });

    setSubmitted(true);
    if (onRegisterSuccess) {
      onRegisterSuccess({ ...formData, memberId: id });
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      wing: 'Football Squad',
      ageGroup: 'Youth (15-22 yrs)',
      address: 'Parappara',
      notes: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-6 animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                MEMBERSHIP APPLICATION
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Join Brothers Parappara
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Be part of our sports teams, cultural programs, or community social welfare initiatives.
              </p>
            </div>

            {/* Wing / Team Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Primary Activity or Squad
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Football Squad', 'Cricket Club', 'Arts & Culture Guild', 'General Community Member'].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setFormData({ ...formData, wing: w })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-left ${
                      formData.wing === w
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Varma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Email & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Age Group</label>
                <select
                  value={formData.ageGroup}
                  onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  <option value="Juniors (Under 15)">Juniors (Under 15)</option>
                  <option value="Youth (15-22 yrs)">Youth (15-22 yrs)</option>
                  <option value="Seniors (23-35 yrs)">Seniors (23-35 yrs)</option>
                  <option value="Veterans / Community (35+ yrs)">Veterans / Community (35+ yrs)</option>
                </select>
              </div>
            </div>

            {/* Locality in Parappara */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Locality / Ward</label>
              <input
                type="text"
                placeholder="e.g. Parappara Junction, Near School Road"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-700/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Submit Membership Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation & Digital Membership Pass */
          <div className="text-center space-y-5 py-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900">Welcome to the Club!</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Your application has been received by the Brothers Parappara executive committee.
              </p>
            </div>

            {/* Digital Card */}
            <div className="rounded-2xl bg-[#0b192c] text-white p-5 text-left border border-slate-700 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <ClubLogo isDark={true} />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Enrolled
                </span>
              </div>

              <div>
                <div className="text-base font-extrabold text-white">{formData.name}</div>
                <div className="text-xs text-emerald-400 font-semibold">{formData.wing}</div>
                <div className="text-[11px] text-slate-400">{formData.address}, Parappara</div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-slate-400">
                <span>CLUB PASS ID</span>
                <span className="font-bold text-white tracking-widest">{memberId}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
            >
              Done & Return to Homepage
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
