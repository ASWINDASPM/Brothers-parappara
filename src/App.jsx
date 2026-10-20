import React, { useState } from 'react';
import HeaderNav from './components/HeaderNav';
import HeroSection from './components/HeroSection';
import PillarsBar from './components/PillarsBar';
import AboutUsSection from './components/AboutUsSection';
import ActivitiesSection from './components/ActivitiesSection';
import UpcomingEventsSection from './components/UpcomingEventsSection';
import GallerySection from './components/GallerySection';
import NewsSection from './components/NewsSection';
import FooterSection from './components/FooterSection';
import RegistrationModal from './components/RegistrationModal';
import ContactModal from './components/ContactModal';
import SearchModal from './components/SearchModal';
import EventModal from './components/EventModal';
import ActivityModal from './components/ActivityModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);

    if (sectionId === 'contact') {
      setIsContactOpen(true);
      return;
    }

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const mapping = {
      about: 'about',
      sports: 'activities',
      arts: 'activities',
      events: 'events',
      gallery: 'gallery',
      news: 'news'
    };

    const targetElem = document.getElementById(mapping[sectionId] || sectionId);
    if (targetElem) {
      targetElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-emerald-600 selection:text-white flex flex-col">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-5">
          {toastMessage}
        </div>
      )}

      {/* Header & Navbar */}
      <HeaderNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroSection
          onExploreClick={() => setIsRegisterOpen(true)}
        />

        {/* 4 Pillars Floating Bar */}
        <PillarsBar
          onSelectPillar={(pillarId) => {
            if (pillarId === 'sports' || pillarId === 'arts') {
              handleNavigate('sports');
            } else if (pillarId === 'achievements') {
              handleNavigate('news');
            } else {
              handleNavigate('about');
            }
          }}
        />

        {/* About Us: "Our Club, Our Pride" */}
        <AboutUsSection
          onLearnMoreClick={() => setIsRegisterOpen(true)}
        />

        {/* Activities: "Sports & Arts for a Brighter Tomorrow" */}
        <ActivitiesSection
          onSelectActivity={(act) => setSelectedActivity(act)}
          onViewAllActivities={() => handleNavigate('sports')}
        />

        {/* Upcoming Events: "Mark Your Calendar" */}
        <UpcomingEventsSection
          onSelectEvent={(evt) => setSelectedEvent(evt)}
          onViewAllEvents={() => handleNavigate('events')}
        />

        {/* Gallery: "Moments That Matter" */}
        <GallerySection
          onViewAllGallery={() => handleNavigate('gallery')}
        />

        {/* News & Updates: "Latest from Our Club" */}
        <NewsSection
          onViewAllNews={() => handleNavigate('news')}
        />

      </main>

      {/* Footer */}
      <FooterSection
        onNavigate={handleNavigate}
      />

      {/* Modals */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisterSuccess={(data) => {
          showToast(`Welcome to Brothers Parappara, ${data.name}! Member ID: ${data.memberId}`);
        }}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(section) => handleNavigate(section)}
      />

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <ActivityModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onJoinActivity={(activityTitle) => {
          setIsRegisterOpen(true);
        }}
      />

    </div>
  );
}
