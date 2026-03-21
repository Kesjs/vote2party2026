'client';

import { Suspense } from 'react';
import { LoadingProvider } from '@/providers/LoadingProvider';
import LoadingSpinner from '@/components/LoadingSpinner';

export function LoadingProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </Suspense>
  );
}
