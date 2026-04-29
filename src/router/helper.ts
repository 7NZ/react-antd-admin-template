import { Outlet } from 'react-router-dom';
import { FileOutlined } from '@ant-design/icons';
import staticRoutes from './index';
import PageNotFound from '@/pages/404';
import pageMap from './pageMap';

type MenuDataItem = {
  name: string;
  url: string;
  key: string;
  children?: MenuDataItem[];
};

export type MenuRoute = {
  path: string;
  name: string;
  layout?: boolean;
  hidden?: boolean;
  index?: boolean;
  icon?: string | FC;
  breadcrumb?: string | FC;
  element?: FC;
  children?: MenuRoute[];
};

export const convertMenuData = (menus: MenuDataItem[]) => {
  return menus.map((item) => {
    const temp: MenuRoute = {
      name: item.name,
      path: item.url,
      breadcrumb: item.name,
      icon: FileOutlined
    };
    if (item.children) {
      temp.children = convertMenuData(item.children);
    } else {
      temp.element = pageMap[item.key];
    }
    return temp;
  });
};

export const flatRoutes = (routes: MenuRoute[]) => {
  const arr: MenuRoute[] = [];
  routes.forEach(route => {
    arr.push(route);
    if (route.children?.length) {
      arr.push(...flatRoutes(route.children));
    }
  });
  return arr;
};


// convert defined route to react router data
export const convertRouteData = (routes: MenuRoute[]) => {
  const routeArr: RouteObject[] = [];
  for (let i = 0, len = routes.length; i < len; i++) {
    const route = routes[i];
    if (route.layout === undefined || route.layout) {
      const tempRoute: RouteObject = {
        path: route.path
      };
      if (route.lazy) {
        tempRoute.lazy = route.lazy;
      } else {
        tempRoute.Component = route.element ? route.element : PageNotFound;
      }
      if (route.children && route.children.length > 0) {
        tempRoute.Component = route.element ? route.element : Outlet;
        tempRoute.children = convertRouteData(route.children);
      }
      routeArr.push(tempRoute);
    }
  }
  return routeArr;
};

// not in layout skeleton like login page
export const notLayoutRouteData = () => {
  const filteredRoutes = staticRoutes.filter(route => route.layout !== undefined && !route.layout);

  return filteredRoutes.map((route => {
    return {
      path: route.path,
      Component: route.element!
    };
  }));
};

