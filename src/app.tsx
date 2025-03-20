import { SWRConfig, SWRConfiguration } from 'swr';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from './core/theme';
import { Router } from './core/router';

import { AuthProvider } from './modules/auth/contexts';

export function App() {
  const swrConfiguration: SWRConfiguration = {
    refreshInterval: 0,
    errorRetryCount: 0,
    dedupingInterval: 0,
    errorRetryInterval: 0,
    focusThrottleInterval: 0,
    shouldRetryOnError: false,
  };

  return (
    <SWRConfig value={swrConfiguration}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </SWRConfig>
  );
}
