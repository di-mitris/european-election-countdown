// src/config.js

/**
 * Application-wide configuration
 */
export const config = {
    // Set this to true to use static export
    // Remember to set output: 'export' in next.config.js as well
    useStaticExport: false,
    
    // Date format for displaying election dates
    dateFormat: 'MMMM d, yyyy',
    
    // Map settings
    map: {
      defaultFill: '#4F6D7A',
      hoverFill: '#F49D6E',
      borderColor: 'white',
      borderWidth: 0.5,
    },
    
    // Tooltip settings
    tooltip: {
      offset: {
        x: 15,
        y: 15
      }
    }
  };