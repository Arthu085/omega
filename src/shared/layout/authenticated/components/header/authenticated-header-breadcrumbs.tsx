import { useMemo } from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as LinkRouter, useLocation, useParams } from 'react-router-dom';

import { AUTHENTICATED_ROUTES, toBreadcrumbs } from '@/core/router';

export function AuthenticatedHeaderBreadcrumbs() {
  const { id } = useParams();
  const { pathname } = useLocation();

  const breadcrumbs = useMemo(() => toBreadcrumbs(AUTHENTICATED_ROUTES), []);

  const pathnames: Array<string> = pathname.split('/').reduce((prev, route) => {
    if (route)
      prev.push(!isNaN(route as any) || ['all', 'datasheets'].includes(route) ? ':id' : route);

    return prev;
  }, [] as Array<string>);

  return (
    <Breadcrumbs>
      {!pathnames.length ? (
        <Typography>{breadcrumbs['/']}</Typography>
      ) : (
        <Link component={LinkRouter} underline='hover' to='/'>
          {breadcrumbs['/']}
        </Link>
      )}

      {pathnames.map((_pathname, index) => {
        const last: boolean = index === pathnames.length - 1;
        const to: string = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography key={to} fontWeight='bold'>
            {breadcrumbs[to]}
          </Typography>
        ) : (
          <Link
            key={to}
            underline='hover'
            component={LinkRouter}
            to={to.includes(':id') ? to.replace(':id', id ?? '') : to}
          >
            {breadcrumbs[to]}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
