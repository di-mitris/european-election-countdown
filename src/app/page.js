// src/app/page.js
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Tooltip from '../components/Tooltip';

// Client-only map to avoid hydration issues
const EuropeMap = dynamic(() => import('../components/EuropeMap'), { 
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto relative">
      <div className="w-full h-96 bg-gray-200 animate-pulse flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    </div>
  )
});

export default function Home() {
  // Use useState with empty initial values to prevent hydration errors
  const [tooltip, setTooltip] = useState({
    display: false,
    country: null,
    x: 0,
    y: 0
  });
  
  // Track client-side mounting to prevent hydration issues
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading state on server/initial render
  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">European Election Countdown</h1>
          <p className="text-lg text-gray-600">Hover over countries to see upcoming election information</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto relative">
          <div className="w-full h-96 bg-gray-200 animate-pulse flex items-center justify-center">
            <p className="text-gray-500">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">European Election Countdown</h1>
        <p className="text-lg text-gray-600">Hover over countries to see upcoming election information</p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto relative">
        <EuropeMap setTooltip={setTooltip} />
        {isMounted && <Tooltip tooltip={tooltip} />}
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>European Election Countdown &copy; {new Date().getFullYear()}</p>
        <p className="mt-1">Data is for demonstration purposes only</p>
      </footer>
    </div>
  );
}