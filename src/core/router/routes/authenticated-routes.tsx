import {
  AccountCircleSharp,
  HomeOutlined,
  Settings,
} from '@mui/icons-material';
import { Navigate } from 'react-router-dom';

import { EAuthenticatedPath } from '../domain/enums/authenticated-path.enum';
import { IRoute } from '../domain/interfaces/route.interface';

import { Home } from '@/modules/home/pages/home';
import { EAbilityCodes } from '@/modules/role/domain';
import { RequiredAbility } from '../hocs/required-ability';
import { ClockIcon } from '@mui/x-date-pickers';
import { UserList, UserUpdate } from '@/modules/user/pages';

export const AUTHENTICATED_ROUTES: Array<IRoute> = [
  {
    name: 'Redirect',
    hidden: true,
    path: '*',
    element: <Navigate to={EAuthenticatedPath.HOME} />,
  },
  {
    name: 'Página Inicial',
    icon: <HomeOutlined />,
    element: <Home />,
    path: EAuthenticatedPath.HOME,
  },
  {
    name: 'Histórico',
    icon: <ClockIcon />,
    path: EAuthenticatedPath.HISTORY,
    ability: EAbilityCodes.HISTORY,
    element: <RequiredAbility code={EAbilityCodes.ROLES} />, // todo: hoc of required ability
  },
  {
    name: 'Clientes',
    icon: <AccountCircleSharp />,
    path: EAuthenticatedPath.CLIENTS,
    ability: EAbilityCodes.CLIENTS,
    element: <RequiredAbility code={EAbilityCodes.ROLES} />,
    children: [
      {
        index: true,
        name: "Clientes",
        element: <UserList />
      },
      {
        name: 'Ver Usuário',
        hidden: true,
        path: ':id',
        element: <RequiredAbility code={EAbilityCodes.USERS} />,
        children: [
          {
            name: 'Ver Usuário',
            index: true,
            element: <UserUpdate />,
          },
        ],
      },
    ] // todo: hoc of required ability
  },
  {
    name: 'Configurações',
    icon: <Settings />,
    path: EAuthenticatedPath.USER_SETTINGS,
    ability: EAbilityCodes.ROLES,
    element: <RequiredAbility code={EAbilityCodes.ROLES} />, // todo: hoc of required ability
  }
];
