import { type FC, Suspense, useEffect, useState } from 'react';
import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';
import type { RouteObject, RouterProviderProps } from 'react-router-dom';
import { Spin } from 'antd';
import Container from '@/layout/container';
import staticRoutes, { convertMenuData, flatRoutes } from '@/router';
import { useLayoutDispath, useLayoutData } from '@/contexts';
import type { MenuRoute } from '@/router';
import './App.scss';
import PageNotFound from '@/pages/404';
import menuData from '@/assets/menu.json';

// convert defined route to react router data
const convertRouteData = (routes: MenuRoute[]) => {
  const routeArr: RouteObject[] = [];
  for (let i = 0, len = routes.length; i < len; i++) {
    const route = routes[i];
    if (route.layout === undefined || route.layout) {
      const Content = route.element!;
      const tempRoute: RouteObject = {
        path: route.path,
        element: route.element ? <Content /> : <Outlet />
      };
      if (route.children && route.children.length > 0) {
        tempRoute.element = <Outlet />;
        tempRoute.children = convertRouteData(route.children);
      }
      routeArr.push(tempRoute);
    }
  }
  return routeArr;
};

// not in layout skeleton like login page
const notLayoutRouteData = () => {
  const filteredRoutes = staticRoutes.filter(route => route.layout !== undefined && !route.layout);

  return filteredRoutes.map((route => {
    const Content = route.element!;
    return {
      path: route.path,
      element: <Content />
    };
  }));
};

const PageLoading = () => {
  return (<div className="page-loading"><Spin size="large" /></div>);
};

const App: FC = () => {
  const { setMenuRoutes } = useLayoutDispath();
  const layoutData = useLayoutData();
  const [reactRouter, setReactRouter] = useState<RouterProviderProps['router']>();

  // listen router change
  const handleRouterChange = (router: RouterProviderProps['router']) => {
    const hasLogin = window.sessionStorage.getItem('hasLogin');
    if (!hasLogin) {
      const location = router.state.location;
      if (location.pathname !== '/login') {
        const redirect = `${location.pathname}${location.search ? location.search : ''}`;
        router.navigate(`/login?redirect=${encodeURIComponent(redirect)}`);
      }
    } else {
      const flatedRoutes = flatRoutes(layoutData.routes);
      const pathname = router.state.location.pathname;
      const currentRoute = flatedRoutes.find(route => pathname === route.path);
      if (currentRoute) {
        document.title = `${currentRoute.name}-react-antd-admin`;
      }
    }
  };

  useEffect(() => {
    const remoteRoutes = convertMenuData(menuData.data);
    const allRoutes = staticRoutes.concat(remoteRoutes);
    setMenuRoutes(allRoutes);
  }, []);

  useEffect(() => {
    if (!layoutData.routesLoaded) return;

    const routeData: RouteObject[] = [];
    const convertRoutes = convertRouteData(layoutData.routes);
    routeData.push(
      ...notLayoutRouteData(),
      {
        path: '/',
        element: <Container/>,
        children: convertRoutes
      },
      {
        path: '*',
        element: <PageNotFound />
      }
    );
    const router = createHashRouter(routeData);
    setReactRouter(router);

    handleRouterChange(router);
    router.subscribe(() => {
      handleRouterChange(router);
    });
  }, [layoutData.routesLoaded]);

  return (
    <Suspense fallback={ <PageLoading/> }>
      {reactRouter && <RouterProvider router={reactRouter} />}
    </Suspense>
  );
};

export default App;
