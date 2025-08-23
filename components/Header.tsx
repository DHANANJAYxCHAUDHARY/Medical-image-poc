
import React from 'react';

const StethoscopeIcon = () => (
    <svg xmlns="http://www.w-org/2000/svg" className="h-8 w-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5V3.935m-14 0A10.003 10.003 0 0112 2a10.003 10.003 0 017 1.935M5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-white/50 backdrop-blur-md w-full sticky top-0 z-10 border-b border-white/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center">
        <StethoscopeIcon />
        <h1 className="text-xl md:text-2xl font-bold text-slate-700 ml-3">
          Medical Image Classifier <span className="text-sky-600 font-semibold">POC</span>
        </h1>
      </div>
    </header>
  );
};
