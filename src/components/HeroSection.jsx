import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { INITIAL_HERO_SLIDES } from '../data/mockData';

export default function HeroSection({ slides = INITIAL_HERO_SLIDES, onExploreClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide cycle
  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides || slides.length === 0) return null;
  const active = slides[currentSlide % slides.length];

  return (
    <section className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden bg-slate-950 select-none">
      
      {/* Background Image with Dark Vignette Overlay */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient vignette to ensure high text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>
      ))}

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pt-8">
          
          {/* Left Text Block */}
          <div className="max-w-2xl space-y-4 animate-in fade-in duration-500">
            
            {/* "WELCOME TO" */}
            <div className="tracking-widest text-xs sm:text-sm font-extrabold text-emerald-400 uppercase">
              {active.welcomeTag}
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                {active.title}
              </h1>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-400 tracking-tight">
                {active.subtitle}
              </div>
            </div>

            {/* Tagline */}
            <p className="text-sm sm:text-base text-slate-200 max-w-lg leading-relaxed pt-1">
              {active.tagline}
            </p>

            {/* "Explore Our Club →" Button */}
            <div className="pt-3">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Our Club</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

          </div>

          {/* Right Cursive Script Artwork */}
          <div className="hidden lg:flex flex-col items-end text-right pr-4 xl:pr-10 select-none">
            <div className="font-handwriting text-white/90 text-2xl xl:text-3xl tracking-wide drop-shadow-md">
              {active.scriptTop}
            </div>
            <div className="font-handwriting text-white text-4xl xl:text-5xl font-bold tracking-wider drop-shadow-lg flex items-center gap-2">
              <span>{active.scriptBottom}</span>
              <svg className="w-8 h-8 text-emerald-400 inline-block transform -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L15 8L22 9L17 14L18 21L12 17.5L6 21L7 14L2 9L9 8L12 2Z" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* Left Slider Arrow */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-sm flex items-center justify-center transition-all"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Slider Arrow */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-sm flex items-center justify-center transition-all"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? 'w-7 h-2 bg-emerald-400'
                : 'w-2 h-2 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
