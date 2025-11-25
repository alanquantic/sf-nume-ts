import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import { queryClient } from '@/api/react-query';
import ErrorFallback from '@/components/ErrorFallback';
import Spinner from '@/components/Spinner';
import env from '@/utils/constants';
import { AuthProvider } from './AuthProvider';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense
      fallback={(
        <div className="grid place-items-center w-screen h-screen">
          <Spinner size="xl" />
        </div>
      )}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {env.VITE_APP_VERSION === 'local' && <ReactQueryDevtools />}
            <AuthProvider>
              <Router>{children}</Router>
            </AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}

export default AppProvider;
