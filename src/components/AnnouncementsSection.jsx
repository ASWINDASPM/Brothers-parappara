import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  AlertCircle, 
  Calendar, 
  User, 
  X, 
  Palette, 
  Trophy, 
  Sparkles,
  Pin
} from 'lucide-react';

export default function AnnouncementsSection({ 
  announcements, 
  onAddAnnouncement, 
  selectedWing, 
  setSelectedWing 
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    wing: 'all',
    priority: 'notice',
    badge: 'Update',
    author: 'Club Executive Team'
  });

  const filtered = announcements.filter(a => {
    return selectedWing === 'all' || a.wing === 'all' || a.wing === selectedWing;
  });

  const handleCreateNotice = (e) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;

    const today = new Date().toISOString().split('T')[0];
    const created = {
      id: `ann-${Date.now()}`,
      title: newNotice.title,
      content: newNotice.content,
      wing: newNotice.wing,
      priority: newNotice.priority,
      author: newNotice.author || 'Club Lead',
      date: today,
      badge: newNotice.badge || 'Notice'
    };

    onAddAnnouncement(created);
    setShowAddModal(false);
    setNewNotice({
      title: '',
      content: '',
      wing: 'all',
      priority: 'notice',
      badge: 'Update',
      author: 'Club Executive Team'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-2">
            <Bell className="w-3.5 h-3.5" />
            <span>Bulletin & Updates</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Club Notices & Announcements
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Stay updated with trial dates, tournament schedules, workshop materials, and general alerts.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Post Announcement</span>
        </button>
      </div>

      {/* Notices Feed */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isUrgent = item.priority === 'urgent';
          const isNotice = item.priority === 'notice';
          const isArts = item.wing === 'arts';
          const isSports = item.wing === 'sports';

          return (
            <div 
              key={item.id}
              className={`p-6 rounded-3xl border transition-all duration-200 ${
                isUrgent
                  ? 'bg-rose-50/60 border-rose-200 shadow-sm'
                  : 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Pin / Priority Badge */}
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    isUrgent
                      ? 'bg-rose-600 text-white'
                      : isNotice
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Pin className="w-3 h-3" />
                    <span>{item.badge || 'Bulletin'}</span>
                  </span>

                  {/* Wing tag */}
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                    isArts
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : isSports
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  }`}>
                    {isArts ? <Palette className="w-3 h-3" /> : isSports ? <Trophy className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                    <span>{isArts ? 'Arts Wing' : isSports ? 'Sports Wing' : 'All Club'}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>
              
              <p className="mt-2 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {item.content}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Posted by {item.author}</span>
                </div>
                <span className="text-slate-400">PULSE Executive Board</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Notice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative my-8">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleCreateNotice} className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <Plus className="w-4 h-4 text-amber-500" />
                <span>Publish Bulletin</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Post Announcement</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Wing</label>
                <select
                  value={newNotice.wing}
                  onChange={(e) => setNewNotice({ ...newNotice, wing: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="all">Entire Club (Arts & Sports)</option>
                  <option value="arts">Creative Arts Wing Only</option>
                  <option value="sports">Athletics & Sports Wing Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Announcement Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tryouts Rescheduled or Art Supplies Arrived"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="notice">Standard Notice</option>
                    <option value="urgent">Urgent / Alert</option>
                    <option value="upcoming">Upcoming Reminder</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tag / Badge</label>
                  <input
                    type="text"
                    placeholder="e.g. Audition, Match, Tour"
                    value={newNotice.badge}
                    onChange={(e) => setNewNotice({ ...newNotice, badge: e.target.value })}
                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message Content</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Provide complete details, timings, instructions..."
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
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
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
