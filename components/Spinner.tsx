
import React, { useState, useEffect } from 'react';

const messages = [
  "Initializing AI analysis...",
  "Scanning image for patterns...",
  "Consulting vast medical knowledge...",
  "Cross-referencing data points...",
  "Compiling diagnostic report...",
];

export const Spinner: React.FC = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-8 animate-fade-in">
      <div className="w-16 h-16 border-4 border-slate-200 border-t-sky-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 font-medium text-center w-64 transition-opacity duration-500">{message}</p>
    </div>
  );
};
