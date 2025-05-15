// src/app/layout.js
import './globals.css';
import { Suspense } from 'react';

export const metadata = {
  title: 'European Election Countdown',
  description: 'Interactive map showing upcoming elections across Europe',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 min-h-screen">
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}