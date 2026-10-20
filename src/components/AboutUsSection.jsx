import React from 'react';
import { ArrowRight, Leaf, Target } from 'lucide-react';

export default function AboutUsSection({ onLearnMoreClick }) {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Gate Entrance Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/80 border border-slate-100 group">
              <img
                src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1000&q=80"
                alt="Brothers Parappara Club Entrance Gate"
                className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Gate Sign Overlay simulating the traditional club entrance arch */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 flex flex-col justify-between p-6">
                
                {/* Arch sign */}
                <div className="self-center bg-white/95 backdrop-blur-sm px-6 py-2 rounded-xl border border-slate-200 shadow-md flex items-center gap-2 mt-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    BP
                  </div>
                  <span className="font-black text-sm tracking-widest text-slate-900 uppercase">
                    BROTHERS PARAPPARA
                  </span>
                </div>

                {/* Subtext info */}
                <div className="text-white text-xs">
                  <span className="font-bold text-emerald-400">Club Grounds & Cultural Center</span>
                  <p className="text-slate-300 text-[11px]">Parappara, Kerala • Est. Community Guild</p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column: Story & Learn More */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Green Category Tag */}
            <div className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              ABOUT US
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Our Club, Our Pride
            </h2>

            {/* Description Paragraph */}
            <p className="text-sm text-slate-600 leading-relaxed">
              Brothers Parappara is a well-recognized local arts and sports club that brings together people of all ages through sports, arts and community activities. Our club aims to create a vibrant platform for talent, friendship and togetherness, while contributing to the growth and well-being of our community.
            </p>

            {/* "Learn More →" Button */}
            <div className="pt-2">
              <button
                onClick={onLearnMoreClick}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-900/20 transition-all duration-200"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Column: Vision & Mission Cards */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Vision Card */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2 hover:bg-emerald-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                Our Vision
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To build a united, active and culturally rich community.
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2 hover:bg-emerald-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                Our Mission
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To promote sports, arts and social welfare through inclusive and sustainable initiatives.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
