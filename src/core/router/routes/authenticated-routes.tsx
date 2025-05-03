import {
  HomeOutlined,
  PeopleOutline,
  AirplayOutlined
} from '@mui/icons-material';
import { Navigate } from 'react-router-dom';

import { EAuthenticatedPath } from '../domain/enums/authenticated-path.enum';
import { IRoute } from '../domain/interfaces/route.interface';
import { Fornos } from '@/modules/fornos/pages/fornos';
import { Home } from '@/modules/home/pages/home';
import { CreateProduction } from '@modules/home/pages/create/create-production';

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
    icon: <HomeOutlined/>,
    children: [
      {
        name: 'Produções',
        index: true,
        element: <Home/>
      },
      {
        name: 'Nova Produção',
        path: 'novo',
        hidden: true,
        children: [
          {
            name: 'Nova Produção',
            index: true,
            element: <CreateProduction/>
          }
        ]
      }
    ]
  },
  {
    name: 'Fornos',
    path: EAuthenticatedPath.FORNO,
    icon: <AirplayOutlined />,
    element: <Fornos />
  },
  {
    name: 'Funcionários',
    path: EAuthenticatedPath.FUNCIONARIO,
    icon: <PeopleOutline />,
    element: <Home />
  }
];