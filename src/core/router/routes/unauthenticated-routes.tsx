import { EUnauthenticatedPath } from '../domain/enums/unauthenticated-path.enum';
import { IRoute } from '../domain/interfaces/route.interface';

import { Login } from '@/modules/auth/pages';

export const UNAUTHENTICATED_ROUTES: Array<IRoute> = [
  {
    name: 'Acessar',
    element: <Login />,
    path: EUnauthenticatedPath.LOGIN,
  },
];
