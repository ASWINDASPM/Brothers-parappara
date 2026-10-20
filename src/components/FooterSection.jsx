import React from 'react';
import ClubLogo from './ClubLogo';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Youtube 
} from 'lucide-react';

export default function FooterSection({ onNavigate }) {
  return (
    <footer className="bg-[#0b192c] text-white pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Identity & Contact Info */}
          <div className="md:col-span-5 space-y-4">
            <ClubLogo isDark={true} />

            <div className="space-y-2.5 pt-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Parappara, Kerala, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-emerald-400 transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:info@brothersparappara.org" className="hover:text-emerald-400 transition-colors">
                  info@brothersparappara.org
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 columns) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-200">
              Quick Links
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <div className="space-y-2">
                <button 
                  onClick={() => onNavigate('home')} 
                  className="block hover:text-emerald-400 transition-colors text-left"
                >
                  Home
                </button>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="block hover:text-emerald-400 transition-colors text-left"
                >
                  About Us
                </button>
                <button 
                  onClick={() => onNavigate('sports')} 
                  className="block hover:text-emerald-400 transition-colors text-left"
                >
                  Sports
                </button>
                <button 
                  onClick={() => onNavigate('arts')} 
                  className="block hover:text-emerald-400 transition-colors text-left"
                >
                  Arts & Culture
                </button>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={() => onNavigate('events')} 
                  className="block hover:text-emerald-400 transition-colors text-left"
                >
                  Events
                </button>
                <button 
                  onClick={() => onNavigate('gallery')} 
                  className="block hover:text-emerald-400 transition-colors text-left"
                >
                  Gallery
                </button>
                <button 
                  onClick={() => onNavigate('news')} 
                  className="block hover:text-emerald-400 transition-colors text-left"
                >
                  News & Updates
                </button>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="block hover:text-emerald-400 transition-colors text-left"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Follow Us & Cursive Script Artwork */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-200">
              Follow Us
            </h4>

            <div className="flex items-center gap-3 text-slate-300">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            {/* Signature Cursive Script */}
            <div className="pt-2 select-none">
              <div className="font-handwriting text-2xl xl:text-3xl text-emerald-400 tracking-wider">
                Together We Grow
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <p>© 2026 Brothers Parappara. All rights reserved.</p>
          <p className="hover:text-slate-400 transition-colors">
            Designed & Developed by QuadCubes
          </p>
        </div>

      </div>
    </footer>
  );
}
