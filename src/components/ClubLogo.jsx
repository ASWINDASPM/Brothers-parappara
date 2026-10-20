import React from 'react';

export default function ClubLogo({ isDark = false, className = "" }) {
  return (
    <div className={`flex items-center gap-3 cursor-pointer select-none group ${className}`}>
      {/* Emblem */}
      <div className="relative w-10 h-10 shrink-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform group-hover:scale-105 transition-transform duration-300">
          {/* Blue base petal / community figure */}
          <path d="M50 48C45 48 38 52 35 58C32 64 34 72 40 76C46 80 54 80 60 76C66 72 68 64 65 58C62 52 55 48 50 48Z" fill="#1e3a8a" />
          {/* Green left petal / sports leaf */}
          <path d="M38 42C32 44 26 50 25 57C24 64 28 71 35 73C34 65 37 56 44 50C42 46 40 43 38 42Z" fill="#16a34a" />
          {/* Cyan right petal / arts wing */}
          <path d="M62 42C68 44 74 50 75 57C76 64 72 71 65 73C66 65 63 56 56 50C58 46 60 43 62 42Z" fill="#0d9488" />
          {/* Central head / spark */}
          <circle cx="50" cy="36" r="8" fill="#15803d" />
          <circle cx="50" cy="36" r="4.5" fill="#22c55e" />
          {/* Golden star / achievement accent */}
          <circle cx="36" cy="34" r="5" fill="#0284c7" />
          <circle cx="64" cy="34" r="5" fill="#10b981" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span className={`font-black text-lg leading-tight tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Brothers Parappara
        </span>
        <span className={`text-[11px] font-semibold tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Local Arts & Sports Club
        </span>
      </div>
    </div>
  );
}
