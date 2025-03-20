import { Outlet, Navigate } from 'react-router-dom';
import { CssBaseline, Stack, Theme, ThemeProvider, createTheme } from '@mui/material';

import { palette } from '@/core/theme';
import { EAuthenticatedPath } from '@/core/router';

import { useAuth } from '@/modules/auth/hooks';
import { useTheme } from '@/core/theme';

import { UnauthenticatedHeader } from './components/unauthenticated-header';
import { UnauthenticatedFooter } from './components/unauthenticated-footer';
import { UnauthenticatedContainer } from './components/unauthenticated-container';
import { UnauthenticatedBackground } from './components/unauthenticated-background';
import { useEffect } from 'react';

function unauthenticatedTheme(theme: Theme) {
  return createTheme({
    ...theme,
    palette: {
      ...palette.light,
    },
  });
}

export function Unauthenticated() {
  const { authenticated } = useAuth();
  const { changeThemeMode } = useTheme();

  useEffect(() => {
    changeThemeMode('light');
  }, [changeThemeMode]);

  if (authenticated) return <Navigate to={EAuthenticatedPath.HOME} replace />;

  return (
    <ThemeProvider theme={unauthenticatedTheme}>
      <CssBaseline />

      <Stack
        gap={3}
        width='100%'
        minHeight='100vh'
        position='relative'
        alignItems='center'
        justifyContent='space-between'
      >
        <UnauthenticatedBackground />

        <UnauthenticatedHeader />

        <UnauthenticatedContainer>
          <Outlet />
        </UnauthenticatedContainer>

        <UnauthenticatedFooter />
      </Stack>
    </ThemeProvider>
  );
}
