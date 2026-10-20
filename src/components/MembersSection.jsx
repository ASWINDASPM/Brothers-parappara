import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Award, 
  Palette, 
  Trophy, 
  Sparkles,
  Filter,
  X
} from 'lucide-react';

export default function MembersSection({ 
  members, 
  onAddMember, 
  selectedWing, 
  setSelectedWing 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: 'Club Member',
    wing: 'arts',
    primaryDiscipline: '',
    bio: '',
    email: '',
    achievements: ''
  });

  const filteredMembers = members.filter(m => {
    const matchesWing = selectedWing === 'all' || m.wing === selectedWing || m.wing === 'dual';
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.primaryDiscipline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWing && matchesSearch;
  });

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.primaryDiscipline) return;

    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    const created = {
      id: `mem-${Date.now()}`,
      name: newMember.name,
      role: newMember.role || 'Member',
      wing: newMember.wing,
      primaryDiscipline: newMember.primaryDiscipline,
      bio: newMember.bio || 'Passionate about exploring creative arts & dynamic sports.',
      avatar: randomAvatar,
      email: newMember.email || `${newMember.name.toLowerCase().replace(/\s+/g, '.')}@pulseclub.org`,
      joinedYear: 2026,
      achievements: newMember.achievements ? newMember.achievements.split(',').map(s => s.trim()) : ['Active Contributor']
    };

    onAddMember(created);
    setShowAddModal(false);
    setNewMember({
      name: '',
      role: 'Club Member',
      wing: 'arts',
      primaryDiscipline: '',
      bio: '',
      email: '',
      achievements: ''
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Community & Roster</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Club Leaders & Member Directory
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Connect with team captains, guild directors, artists, and fellow athletes.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member Profile</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, role, sport or art..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedWing('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedWing === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Members ({members.length})
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
            Arts ({members.filter(m => m.wing === 'arts' || m.wing === 'dual').length})
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
            Sports ({members.filter(m => m.wing === 'sports' || m.wing === 'dual').length})
          </button>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.map((member) => {
          const isDual = member.wing === 'dual';
          const isArts = member.wing === 'arts';

          return (
            <div 
              key={member.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header with Avatar & Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white shadow-sm">
                      {isDual ? (
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      ) : isArts ? (
                        <Palette className="w-3.5 h-3.5 text-purple-600" />
                      ) : (
                        <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </div>
                  </div>

                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                    isDual
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : isArts
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {isDual ? 'Dual Wing' : isArts ? 'Arts Wing' : 'Sports Wing'}
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {member.role}
                </p>

                {/* Discipline Tag */}
                <div className="mt-2.5 inline-block px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 text-xs font-medium border border-slate-100">
                  🎯 {member.primaryDiscipline}
                </div>

                {/* Bio */}
                <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {member.bio}
                </p>

                {/* Achievements */}
                {member.achievements && member.achievements.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {member.achievements.slice(0, 2).map((ach, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Award className="w-3 h-3 text-amber-500 shrink-0" />
                        <span className="truncate">{ach}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Class of {member.joinedYear}</span>
                <a
                  href={`mailto:${member.email}`}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title={`Email ${member.name}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative my-8">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleAddMemberSubmit} className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>Add Member to Roster</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Member Profile</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Chen"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Wing Affiliation</label>
                <select
                  value={newMember.wing}
                  onChange={(e) => setNewMember({ ...newMember, wing: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  <option value="arts">Creative Arts Wing</option>
                  <option value="sports">Athletics & Sports Wing</option>
                  <option value="dual">Dual Wing (Arts & Sports)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Position</label>
                <input
                  type="text"
                  placeholder="e.g. Member, Team Captain, Vocalist"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Discipline / Sport / Art</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Badminton, Guitar, Oil Painting, Track"
                  value={newMember.primaryDiscipline}
                  onChange={(e) => setNewMember({ ...newMember, primaryDiscipline: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="e.g. member@campus.edu"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Bio</label>
                <textarea
                  rows="2"
                  placeholder="Brief introduction or interests..."
                  value={newMember.bio}
                  onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
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
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
