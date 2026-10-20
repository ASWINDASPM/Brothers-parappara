import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import ClubLogo from './ClubLogo';
import { sendContactMessageToSupabase } from '../lib/supabase';

export default function ContactModal({ isOpen, onClose }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    
    // Save contact message to Supabase
    await sendContactMessageToSupabase(form);

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', phone: '', message: '' });
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-6 animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Message Sent!</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Thank you for reaching out to Brothers Parappara. Our club secretary will respond shortly.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                GET IN TOUCH
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Contact Brothers Parappara
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Have questions about tournament entries, hall booking, or club membership?
              </p>
            </div>

            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 text-xs space-y-2 text-slate-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Club House:</strong> Parappara, Kerala, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Phone:</strong> +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Email:</strong> info@brothersparappara.org</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Menon"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone or Email</label>
                <input
                  type="text"
                  required
                  placeholder="+91 ... or email@example.com"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message</label>
                <textarea
                  rows="3"
                  required
                  placeholder="How can we assist you?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Club</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
