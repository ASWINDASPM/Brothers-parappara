import React, { useState } from 'react';
import { 
  Palette, 
  Trophy, 
  Sparkles, 
  Calendar, 
  Users, 
  Image as ImageIcon, 
  Clock, 
  Bell, 
  Menu, 
  X,
  UserPlus
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  selectedWing, 
  setSelectedWing, 
  onOpenJoinModal,
  unreadAnnouncementsCount = 0
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'events', label: 'Events & Fixtures', icon: Calendar },
    { id: 'members', label: 'Members & Roster', icon: Users },
    { id: 'gallery', label: 'Showcase & Gallery', icon: ImageIcon },
    { id: 'facilities', label: 'Facility Booking', icon: Clock },
    { id: 'announcements', label: 'Notices', icon: Bell, badge: unreadAnnouncementsCount }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-500 shadow-md group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-black text-xl tracking-wider">P</span>
              <div className="absolute -bottom-1 -right-1 flex">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-700 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                  PULSE
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  Arts & Sports
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Campus Creative & Athletics Guild</p>
            </div>
          </div>

          {/* Wing Filter Switcher Pill */}
          <div className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setSelectedWing('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedWing === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Activities
            </button>
            <button
              onClick={() => setSelectedWing('arts')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedWing === 'arts'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-sm'
                  : 'text-purple-700 hover:text-purple-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Arts Wing
            </button>
            <button
              onClick={() => setSelectedWing('sports')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedWing === 'sports'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-sm'
                  : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Sports Wing
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 ? (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenJoinModal}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:opacity-95 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>Join Club</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Wing Filter Bar */}
        <div className="lg:hidden flex items-center justify-center pb-3 pt-1 border-t border-slate-100">
          <div className="inline-flex bg-slate-100 p-1 rounded-full text-xs">
            <button
              onClick={() => setSelectedWing('all')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                selectedWing === 'all' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedWing('arts')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                selectedWing === 'arts' ? 'bg-purple-600 text-white font-semibold' : 'text-purple-700'
              }`}
            >
              Arts Wing
            </button>
            <button
              onClick={() => setSelectedWing('sports')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                selectedWing === 'sports' ? 'bg-emerald-600 text-white font-semibold' : 'text-emerald-700'
              }`}
            >
              Sports Wing
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
          <div className="pt-3">
            <button
              onClick={() => {
                onOpenJoinModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600"
            >
              <UserPlus className="w-4 h-4" />
              <span>Apply for Membership</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
