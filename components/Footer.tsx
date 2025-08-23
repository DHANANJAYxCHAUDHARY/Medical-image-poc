
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 mt-4">
      <div className="container mx-auto text-center text-slate-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Medical Image Classifier POC. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
