import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import OverviewSection from './components/OverviewSection';
import EventsSection from './components/EventsSection';
import MembersSection from './components/MembersSection';
import GallerySection from './components/GallerySection';
import FacilityBookingSection from './components/FacilityBookingSection';
import AnnouncementsSection from './components/AnnouncementsSection';
import JoinModal from './components/JoinModal';
import Footer from './components/Footer';
import { 
  loadAllClubData, 
  setStoredData, 
  resetClubDataToDefaults, 
  STORAGE_KEYS 
} from './utils/storage';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export default function App() {
  const [data, setData] = useState(() => loadAllClubData());
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedWing, setSelectedWing] = useState('all'); // 'all' | 'arts' | 'sports'
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync state changes with localStorage
  useEffect(() => {
    setStoredData(STORAGE_KEYS.CLUB_INFO, data.clubInfo);
  }, [data.clubInfo]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.EVENTS, data.events);
  }, [data.events]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.MEMBERS, data.members);
  }, [data.members]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.GALLERY, data.gallery);
  }, [data.gallery]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.FACILITIES, data.facilities);
  }, [data.facilities]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.ANNOUNCEMENTS, data.announcements);
  }, [data.announcements]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.BOOKINGS, data.bookings);
  }, [data.bookings]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Handlers
  const handleAddEvent = (newEvent) => {
    setData(prev => ({
      ...prev,
      events: [newEvent, ...prev.events]
    }));
    showToast(`Event "${newEvent.title}" published!`);
  };

  const handleRsvpEvent = (eventId, name) => {
    setData(prev => ({
      ...prev,
      events: prev.events.map(evt => {
        if (evt.id === eventId) {
          const currentRsvps = evt.rsvps || [];
          if (!currentRsvps.includes(name)) {
            return { ...evt, rsvps: [...currentRsvps, name] };
          }
        }
        return evt;
      })
    }));
    showToast(`Pass reserved for ${name}!`);
  };

  const handleAddMember = (newMember) => {
    setData(prev => ({
      ...prev,
      members: [newMember, ...prev.members]
    }));
    showToast(`Member ${newMember.name} added to roster!`);
  };

  const handleAddGalleryItem = (newItem) => {
    setData(prev => ({
      ...prev,
      gallery: [newItem, ...prev.gallery]
    }));
    showToast(`Showcase item "${newItem.title}" submitted!`);
  };

  const handleLikeGalleryItem = (itemId) => {
    setData(prev => ({
      ...prev,
      gallery: prev.gallery.map(item => {
        if (item.id === itemId) {
          return { ...item, likes: (item.likes || 0) + 1 };
        }
        return item;
      })
    }));
  };

  const handleAddBooking = (newBooking) => {
    setData(prev => ({
      ...prev,
      bookings: [newBooking, ...prev.bookings]
    }));
    showToast(`Booking confirmed for ${newBooking.facilityName}!`);
  };

  const handleAddAnnouncement = (newAnn) => {
    setData(prev => ({
      ...prev,
      announcements: [newAnn, ...prev.announcements]
    }));
    showToast(`Announcement broadcasted!`);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all club data to sample defaults?')) {
      resetClubDataToDefaults();
      setData(loadAllClubData());
      showToast('Club data restored to sample defaults.', 'info');
    }
  };

  const handleJoinSuccess = (newMember) => {
    setData(prev => ({
      ...prev,
      members: [newMember, ...prev.members]
    }));
    showToast(`Welcome to PULSE, ${newMember.name}!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* Toast Alert Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {toast.type === 'info' ? (
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedWing={selectedWing}
        setSelectedWing={setSelectedWing}
        onOpenJoinModal={() => setJoinModalOpen(true)}
        unreadAnnouncementsCount={data.announcements.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'overview' && (
          <OverviewSection
            clubInfo={data.clubInfo}
            events={data.events}
            members={data.members}
            gallery={data.gallery}
            facilities={data.facilities}
            announcements={data.announcements}
            selectedWing={selectedWing}
            setSelectedWing={setSelectedWing}
            onOpenJoinModal={() => setJoinModalOpen(true)}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRsvpEvent={handleRsvpEvent}
          />
        )}

        {activeTab === 'events' && (
          <EventsSection
            events={data.events}
            onAddEvent={handleAddEvent}
            onRsvpEvent={handleRsvpEvent}
            selectedWing={selectedWing}
            setSelectedWing={setSelectedWing}
          />
        )}

        {activeTab === 'members' && (
          <MembersSection
            members={data.members}
            onAddMember={handleAddMember}
            selectedWing={selectedWing}
            setSelectedWing={setSelectedWing}
          />
        )}

        {activeTab === 'gallery' && (
          <GallerySection
            gallery={data.gallery}
            onAddGalleryItem={handleAddGalleryItem}
            onLikeItem={handleLikeGalleryItem}
            selectedWing={selectedWing}
            setSelectedWing={setSelectedWing}
          />
        )}

        {activeTab === 'facilities' && (
          <FacilityBookingSection
            facilities={data.facilities}
            bookings={data.bookings}
            onAddBooking={handleAddBooking}
            selectedWing={selectedWing}
            setSelectedWing={setSelectedWing}
          />
        )}

        {activeTab === 'announcements' && (
          <AnnouncementsSection
            announcements={data.announcements}
            onAddAnnouncement={handleAddAnnouncement}
            selectedWing={selectedWing}
            setSelectedWing={setSelectedWing}
          />
        )}
      </main>

      {/* Membership Registration Modal */}
      <JoinModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        onJoinSuccess={handleJoinSuccess}
      />

      {/* Footer */}
      <Footer
        onResetData={handleResetData}
        onOpenJoinModal={() => setJoinModalOpen(true)}
      />
    </div>
  );
}
