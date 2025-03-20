import { Confirm } from '@/modules/auth/pages/confirm';
import { EUnauthenticatedPath } from '../domain/enums/unauthenticated-path.enum';
import { IRoute } from '../domain/interfaces/route.interface';

import { Login, Reset, Recover, SignUp } from '@/modules/auth/pages';

export const UNAUTHENTICATED_ROUTES: Array<IRoute> = [
  {
    name: 'Acessar',
    element: <Login />,
    path: EUnauthenticatedPath.LOGIN,
  },
  {
    name: 'Cadastre-se',
    path: EUnauthenticatedPath.SIGN_UP,
    element: <SignUp />,
  },
  {
    name: 'Recuperar Senha',
    path: EUnauthenticatedPath.RECOVER,
    element: <Recover />,
  },
  {
    name: 'Recuperação de Senha',
    path: EUnauthenticatedPath.RESET,
    element: <Reset />,
  },
  {
    name: 'Confirmação de Usuário',
    path: EUnauthenticatedPath.CONFIRM,
    element: <Confirm />,
  },
];
