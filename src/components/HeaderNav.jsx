import React, { useState } from 'react';
import ClubLogo from './ClubLogo';
import { 
  Search, 
  Menu, 
  X,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';

export default function HeaderNav({ 
  activeSection, 
  onNavigate, 
  onOpenSearch, 
  onOpenContact 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'sports', label: 'Sports' },
    { id: 'arts', label: 'Arts & Culture' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'news', label: 'News & Updates' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div onClick={() => handleLinkClick('home')}>
            <ClubLogo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative text-xs xl:text-sm font-semibold transition-colors py-2 group ${
                    isActive 
                      ? 'text-emerald-700 font-bold' 
                      : 'text-slate-700 hover:text-emerald-600'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                  {!isActive && (
                    <span className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-emerald-600 rounded-full transition-all duration-300 group-hover:left-0 group-hover:right-0 opacity-0 group-hover:opacity-100" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Social Icons & Search */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Facebook"
              className="p-1.5 text-slate-700 hover:text-emerald-600 transition-colors"
            >
              <Facebook className="w-4 h-4 fill-current" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram"
              className="p-1.5 text-slate-700 hover:text-emerald-600 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="YouTube"
              className="p-1.5 text-slate-700 hover:text-emerald-600 transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
            
            <span className="w-px h-4 bg-slate-200 mx-1" />

            <button
              onClick={onOpenSearch}
              className="p-1.5 text-slate-700 hover:text-emerald-600 transition-colors"
              title="Search club website"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-700 hover:text-emerald-600"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-600 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-5 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                activeSection === link.id
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center gap-4 pt-4 mt-3 border-t border-slate-100 text-slate-600">
            <span className="text-xs font-semibold text-slate-400">Follow us:</span>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-emerald-600">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-emerald-600">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-emerald-600">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
