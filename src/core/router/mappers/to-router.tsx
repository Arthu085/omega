import { RouteObject } from 'react-router-dom';
import { IRoute } from '../domain/interfaces/route.interface';

function toRouteObject(route: IRoute): RouteObject {
  return {
    index: route.index,
    path: route.path,
    element: route.element,
    children: route.children?.map((children) => toRouteObject(children)),
  } as RouteObject;
}

export function toRouter(routes: Array<IRoute>) {
  return routes.map((route) => toRouteObject(route));
}
