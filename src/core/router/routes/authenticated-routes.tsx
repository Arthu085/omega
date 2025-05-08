import {
  AirplayOutlined,
  PeopleOutline
} from '@mui/icons-material';

import { FurnaceIcon } from '@/modules/fornos/Icon/FurnaceIcon';
import { Fornos } from '@/modules/fornos/pages/fornos';
import { Home } from '@/modules/home/pages/home';
import { ProductionUpdate } from '@/modules/home/pages/update/update-production';
import { UserList } from '@/modules/user/pages';
import { CreateProduction } from '@modules/home/pages/create/create-production';
import { Navigate } from 'react-router-dom';
import { EAuthenticatedPath } from '../domain/enums/authenticated-path.enum';
import { IRoute } from '../domain/interfaces/route.interface';

export const AUTHENTICATED_ROUTES: Array<IRoute> = [
  {
    name: 'Redirect',
    hidden: true,
    path: '*',
    element: <Navigate to={EAuthenticatedPath.PRODUCAO} />
  },
  {
    name: 'Produções',
    path: EAuthenticatedPath.PRODUCAO,
    icon: <AirplayOutlined />,
    children: [
      {
        name: 'Produções',
        index: true,
        element: <Home />
      },
      {
        name: 'Nova Produção',
        path: 'novo',
        hidden: true,
        children: [
          {

            name: 'Nova Produção',
            index: true,
            element: <CreateProduction />
          }
        ]
      },
      {
        name: 'Ver Produção',
        path: ':id',
        hidden: true,
        children: [
          {
            name: 'Editar Produção',
            index: true,
            element: < ProductionUpdate />
          }
        ]
      }
    ],
  },
  {
    name: 'Fornos',
    path: EAuthenticatedPath.FORNO,
    icon: <FurnaceIcon />,
    element: <Fornos />,
    children: [
      // {
      //   index: true,
      //   name: 'Cadastro de Hierarquia',
      //   element: <CompanyList />,
      // },
      {
        name: 'Novos Fornos',
        hidden: true,
        path: 'novo',
        // element: <RequiredAbility code={EAbilityCodes.USERS} action={EAbilityAction.CREATE} />,
        children: [
          {
            name: 'Novos Fornos',
            index: true,
            element: <Fornos />,
          },
        ],
      },
    ],
  },
  {
    name: 'Funcionários',
    icon: <PeopleOutline />,
    element: <UserList />,
    path: EAuthenticatedPath.FUNCIONARIO,
    children: [
      // {
      //index: true,
      //    name: 'Funcionários',
      // element: <UserList />,
      //   },
      {
        name: 'Novos Usuario',
        hidden: true,
        path: 'novo',
        // element: <RequiredAbility code={EAbilityCodes.USERS} action={EAbilityAction.CREATE} />,
        children: [
          {
            name: 'Novos Usuario',
            index: true,
            element: <UserList />,
          },
        ],
      },
    ],
  },
];