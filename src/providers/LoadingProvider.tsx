'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

type LoadingContextType = {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Gestion du chargement initial
  useEffect(() => {
    const handleComplete = () => {
      // Délai minimum pour éviter le clignotement trop rapide
      setTimeout(() => setIsLoading(false), 800);
    };

    // Si la page est déjà chargée, on cache immédiatement le loader
    if (document.readyState === 'complete') {
      handleComplete();
    } else {
      // Sinon, on attend que la page soit chargée
      window.addEventListener('load', handleComplete);
      return () => window.removeEventListener('load', handleComplete);
    }
  }, []);

  // Gestion du chargement lors des changements de route
  useEffect(() => {
    if (pathname || searchParams) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Gestion du rechargement de la page
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleBeforeUnload = () => setIsLoading(true);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {isLoading && <LoadingSpinner />}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
