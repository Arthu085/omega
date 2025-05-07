import {
  HomeOutlined
} from '@mui/icons-material';

import { Navigate } from 'react-router-dom';
import { Fornos } from '@/modules/fornos/pages/fornos';
import { Home } from '@/modules/home/pages/home';
import { CreateProduction } from '@modules/home/pages/create/create-production';
import { EAuthenticatedPath } from '../domain/enums/authenticated-path.enum';
import { IRoute } from '../domain/interfaces/route.interface';
import { UserCreate, UserList } from '@/modules/user/pages';
import { FurnaceIcon } from '@/modules/fornos/Icon/FurnaceIcon';

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
    icon: <HomeOutlined />,
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
    icon: <HomeOutlined />,
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
            element: <UserCreate />,
          },
        ],
      },
    ],
  },
];