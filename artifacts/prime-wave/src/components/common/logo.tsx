import React from 'react';

export function PrimeWaveLogo({ className = "w-8 h-8", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-xl ${className}`}>
      <img 
        src="/logo.png" 
        alt="Prime Wave Logo" 
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback if image fails to load
          e.currentTarget.src = '/logo.jpg';
        }}
      />
    </div>
  );
}
