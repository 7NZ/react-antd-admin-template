import { type FC, useMemo } from 'react';
import { Breadcrumb } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { useLayoutData } from '@/contexts';
import { type MenuRoute } from '@/router';

// 找出当前页面路由和其父级
const findCurBreadcrumbs = (pathname: string, routes: MenuRoute[]) => {
  const findRoutes: MenuRoute[] = [];
  routes.forEach(route => {
    if (route.path === pathname) {
      findRoutes.push(route);
    }
    if (route.children && route.children.length > 0) {
      const child = route.children.find(childRoute => childRoute.path === pathname);
      if (child) {
        findRoutes.push(route);
        findRoutes.push(child);
      }
    }
  });
  return findRoutes;
};

const convertBreadcrumbs = (routes: MenuRoute[]) => {
  return routes.map(({ path, name }) => {
    return {
      path,
      title: name
    };
  });
};

const Breadcrumbs: FC = () => {
  const layoutData = useLayoutData();
  const location = useLocation();
  const breadcrumbs = findCurBreadcrumbs(location.pathname, layoutData.routes);

  function itemRender (item: any, params: any, items: any[], paths: string[]) {
    const first = items.indexOf(item) === 0;
    return first ? <NavLink to={paths.join('/')}>{item.title}</NavLink> : <span>{item.title}</span>;
  }

  const items = useMemo(() => {
    const list = [{
      path: '/',
      title: 'home'
    }];
    const convertedBreadcrumbs = convertBreadcrumbs(breadcrumbs);
    list.push(...convertedBreadcrumbs);

    return list;
  }, [layoutData.routes, location.pathname]);

  return (
    <Breadcrumb className="breadcrumb" itemRender={itemRender} items={items} />
  );
};

export default Breadcrumbs;
