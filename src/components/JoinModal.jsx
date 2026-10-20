import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  CheckCircle2, 
  Palette, 
  Trophy, 
  Sparkles,
  CreditCard,
  ShieldCheck,
  Star
} from 'lucide-react';

export default function JoinModal({ isOpen, onClose, onJoinSuccess }) {
  const [step, setStep] = useState(1); // 1 = form, 2 = success / card
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    wing: 'dual', // 'arts' | 'sports' | 'dual'
    primaryDiscipline: '',
    department: '',
    year: '2nd Year',
    motivation: ''
  });
  const [memberCardId, setMemberCardId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.primaryDiscipline) return;

    const generatedId = `PULSE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setMemberCardId(generatedId);

    const newMemberObj = {
      id: `mem-${Date.now()}`,
      name: formData.name,
      role: 'New Club Member',
      wing: formData.wing,
      primaryDiscipline: formData.primaryDiscipline,
      bio: formData.motivation || `Passionate student joining the ${formData.wing === 'dual' ? 'Arts & Sports' : formData.wing} community.`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      email: formData.email,
      joinedYear: 2026,
      achievements: ['New Member 2026', 'Welcome Orientation']
    };

    onJoinSuccess(newMemberObj);
    setStep(2);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      wing: 'dual',
      primaryDiscipline: '',
      department: '',
      year: '2nd Year',
      motivation: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-6 animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <UserPlus className="w-4 h-4" />
              <span>Membership Registration</span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Join PULSE Arts & Sports Club
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Open to all enrolled students and community members. Gain access to studios, turf courts, and campus events.
              </p>
            </div>

            {/* Wing Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Which Wing would you like to join?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, wing: 'arts' })}
                  className={`p-3 rounded-2xl text-xs font-bold border flex flex-col items-center gap-1.5 transition-all ${
                    formData.wing === 'arts'
                      ? 'bg-purple-50 border-purple-500 text-purple-700 ring-2 ring-purple-500/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Palette className="w-4 h-4 text-purple-600" />
                  <span>Arts Wing</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, wing: 'sports' })}
                  className={`p-3 rounded-2xl text-xs font-bold border flex flex-col items-center gap-1.5 transition-all ${
                    formData.wing === 'sports'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Trophy className="w-4 h-4 text-emerald-600" />
                  <span>Sports Wing</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, wing: 'dual' })}
                  className={`p-3 rounded-2xl text-xs font-bold border flex flex-col items-center gap-1.5 transition-all ${
                    formData.wing === 'dual'
                      ? 'bg-gradient-to-r from-purple-50 to-emerald-50 border-indigo-500 text-indigo-800 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Both Wings!</span>
                </button>
              </div>
            </div>

            {/* Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@campus.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Discipline & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Sport / Artistic Medium
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Badminton, Guitar, Drama, Football"
                  value={formData.primaryDiscipline}
                  onChange={(e) => setFormData({ ...formData, primaryDiscipline: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Year</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="1st Year / Freshman">1st Year / Freshman</option>
                  <option value="2nd Year / Sophomore">2nd Year / Sophomore</option>
                  <option value="3rd Year / Junior">3rd Year / Junior</option>
                  <option value="4th Year / Senior">4th Year / Senior</option>
                  <option value="Graduate / Alumni">Graduate / Alumni</option>
                </select>
              </div>
            </div>

            {/* Motivation / Experience */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tell us about your interests & experience
              </label>
              <textarea
                rows="2"
                placeholder="What excites you most? Have you competed or performed previously?"
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all"
              >
                Submit Application & Get Club Pass
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: Digital Membership Card */
          <div className="text-center space-y-6 py-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900">Welcome to PULSE!</h3>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Your application has been approved. You are now officially enrolled in the club directory.
              </p>
            </div>

            {/* Virtual Membership Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 shadow-xl border border-slate-700 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-emerald-400 flex items-center justify-center font-black text-sm">
                    P
                  </div>
                  <div>
                    <span className="font-extrabold text-sm tracking-wide">PULSE CLUB</span>
                    <span className="text-[10px] block text-slate-400">Arts & Sports Guild</span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                  Active 2026/27
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-lg font-black text-white">{formData.name}</div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span>Wing: <strong className="text-indigo-300 capitalize">{formData.wing}</strong></span>
                  <span>•</span>
                  <span>Focus: <strong className="text-emerald-300">{formData.primaryDiscipline}</strong></span>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-400">
                <span>MEMBER ID</span>
                <span className="font-bold text-white tracking-widest">{memberCardId}</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              Go to Member Directory & Fixtures
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
