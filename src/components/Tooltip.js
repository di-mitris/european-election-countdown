// src/components/Tooltip.js
'use client';

import React, { useEffect, useState } from 'react';
import { format, differenceInDays } from 'date-fns';

const Tooltip = ({ tooltip }) => {
  // Keep local state to track the tooltip content
  const [tooltipContent, setTooltipContent] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Update local state when the tooltip prop changes
  useEffect(() => {
    if (tooltip.display && tooltip.country) {
      setTooltipContent(tooltip.country);
      setPosition({ x: tooltip.x, y: tooltip.y });
    } else {
      // Add a slight delay before hiding to prevent flickering
      const timer = setTimeout(() => {
        if (!tooltip.display) {
          setTooltipContent(null);
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [tooltip]);
  
  // Update position without re-rendering the whole component
  useEffect(() => {
    if (tooltip.display && tooltip.x && tooltip.y) {
      setPosition({ x: tooltip.x, y: tooltip.y });
    }
  }, [tooltip.x, tooltip.y, tooltip.display]);
  
  if (!tooltipContent) {
    return null;
  }

  // Calculate days until election - Client-side only calculation
  const calculateDaysUntil = (dateString) => {
    try {
      const today = new Date();
      const electionDate = new Date(dateString);
      const diffDays = differenceInDays(electionDate, today);
      return diffDays;
    } catch (error) {
      console.error('Error calculating days until election:', error);
      return 0;
    }
  };

  // Format date for display - also client-side only
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const daysRemaining = calculateDaysUntil(tooltipContent.nextElection);

  return (
    <div 
      className="absolute border border-gray-300 rounded-md p-3 shadow-lg z-50 max-w-xs transition-opacity duration-200"
      style={{ 
        left: position.x, 
        top: position.y,
        opacity: tooltip.display ? 1 : 0,
        pointerEvents: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-opaque white background
        backdropFilter: 'blur(2px)'                  // Optional: slight blur effect
      }}
    >
      <h3 className="text-lg font-bold mb-1">{tooltipContent.name}</h3>
      <p className="mb-1">{tooltipContent.electionType}</p>
      <p className="mb-1">Date: {formatDate(tooltipContent.nextElection)}</p>
      <p className="font-bold text-orange-600">
        {daysRemaining > 0 
          ? `${daysRemaining} days remaining` 
          : "Election day has passed"}
      </p>
    </div>
  );
};

export default Tooltip;
