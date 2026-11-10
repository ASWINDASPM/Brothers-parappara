import React, { useState } from 'react';
import { ArrowRight, Play, X, Eye } from 'lucide-react';
import { GALLERY_MOMENTS } from '../data/mockData';

export default function GallerySection({ gallery = GALLERY_MOMENTS, onViewAllGallery }) {
  const [activePhoto, setActivePhoto] = useState(null);
  const items = gallery || GALLERY_MOMENTS;

  return (
    <section id="gallery" className="py-14 sm:py-18 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              OUR GALLERY
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Moments That Matter
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore photos and videos from our activities, events and celebrations.
            </p>
          </div>

          <button
            onClick={onViewAllGallery}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors group shrink-0"
          >
            <span>View Gallery</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Images Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group cursor-pointer relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Dark Vignette */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />

              {/* Video Play Icon if item is marked as video */}
              {item.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>
              )}

              {/* Eye icon on hover */}
              {!item.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-md transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video max-h-[440px] bg-black">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 space-y-2">
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                {activePhoto.category}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {activePhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
