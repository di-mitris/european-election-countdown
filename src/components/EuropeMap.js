// src/components/EuropeMap.js
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { electionData } from '../data/electionData';

const EuropeMap = ({ setTooltip }) => {
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Function to initialize the map
    const initializeMap = async () => {
      try {
        // Create a fetch request to get the SVG map
        const response = await fetch('/europe.svg');
        if (!response.ok) {
          throw new Error('Failed to load SVG map');
        }
        
        const svgText = await response.text();
        
        // Set the SVG content to the container
        if (mapContainerRef.current) {
          mapContainerRef.current.innerHTML = svgText;
          
          // Add event listeners to each country
          setTimeout(() => {
            const countries = mapContainerRef.current.querySelectorAll('path');
            
            countries.forEach(country => {
              // Get the country code (assuming it's in the id attribute)
              const countryCode = country.id?.toUpperCase();
              
              // Check if we have election data for this country
              if (electionData[countryCode]) {
                // Add the country class for styling
                country.classList.add('country');
                
                // Add event listeners
                country.addEventListener('mouseover', (e) => {
                  setTooltip({
                    display: true,
                    country: electionData[countryCode],
                    x: e.clientX + 15,
                    y: e.clientY + 15
                  });
                });
                
                country.addEventListener('mousemove', (e) => {
                  setTooltip(prev => ({
                    ...prev,
                    x: e.clientX + 15,
                    y: e.clientY + 15
                  }));
                });
                
                country.addEventListener('mouseleave', () => {
                  setTooltip({
                    display: false,
                    country: null,
                    x: 0,
                    y: 0
                  });
                });
              }
            });
            
            setMapLoaded(true);
          }, 100);
        }
      } catch (error) {
        console.error('Error loading SVG map:', error);
      }
    };
    
    initializeMap();
    
    // Clean up function
    return () => {
      if (mapContainerRef.current) {
        const countries = mapContainerRef.current.querySelectorAll('.country');
        countries.forEach(country => {
          country.removeEventListener('mouseover', () => {});
          country.removeEventListener('mousemove', () => {});
          country.removeEventListener('mouseleave', () => {});
        });
      }
    };
  }, [setTooltip]);

  return (
    <div className="relative w-full h-full">
      {!mapLoaded && (
        <div className="w-full h-96 bg-gray-200 animate-pulse flex items-center justify-center">
          <p className="text-gray-500">Loading map...</p>
        </div>
      )}
      <div 
        ref={mapContainerRef} 
        className="w-full" 
        style={{ minHeight: '500px', background: '#E6F2F8' }}
      />
    </div>
  );
};

export default EuropeMap;