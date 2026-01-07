'use client';

import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

const LoadingSpinner = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Délai d'affichage pour éviter le clignotement rapide
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
      <div className="text-center">
        <BeatLoader 
          color="#16a34a" 
          size={15}
          speedMultiplier={0.8}
          className="mb-4"
        />
        <p className="text-gray-700 font-medium">Chargement en cours...</p>
        <p className="text-sm text-gray-500 mt-1">Veuillez patienter</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
