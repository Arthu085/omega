import { CircularProgress, Stack } from '@mui/material';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/modules/auth/hooks';
import { EUnauthenticatedPath } from '../domain/enums/unauthenticated-path.enum';

export function RequiredAuth() {
  const location = useLocation();

  const { authenticated, loading } = useAuth();

  if (loading) {
    return (
      <Stack alignItems='center' justifyContent='center' height='100vh'>
        <CircularProgress size='50px' title='Carregando...' />
      </Stack>
    );
  }

  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate to={EUnauthenticatedPath.LOGIN} state={{ from: location }} replace />
  );
}
