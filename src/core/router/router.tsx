import { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';

import { Authenticated, Unauthenticated } from '@shared/layout';

import { toRouter } from './mappers/to-router.ts';
import { RequiredAuth } from './hocs/required-auth.tsx';
import { AUTHENTICATED_ROUTES } from './routes/authenticated-routes.tsx';
import { UNAUTHENTICATED_ROUTES } from './routes/unauthenticated-routes.tsx';

export function Router() {
  const { authenticatedRoutes, unauthenticatedRoutes } = useMemo(
    () => ({
      authenticatedRoutes: toRouter(AUTHENTICATED_ROUTES),
      unauthenticatedRoutes: toRouter(UNAUTHENTICATED_ROUTES),
    }),
    [],
  );

  return useRoutes([
    {
      element: <Unauthenticated />,
      children: unauthenticatedRoutes,
    },
    {
      element: <RequiredAuth />,
      children: [
        {
          element: <Authenticated />,
          children: authenticatedRoutes,
        },
      ],
    },
  ]);
}
