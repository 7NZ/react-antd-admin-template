import { type FC, Suspense, useEffect, useState } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import type { RouteObject, RouterProviderProps } from 'react-router-dom';
import { Spin } from 'antd';
import Container from '@/layout/container';
import staticRoutes from '@/router';
import { useLayoutDispath, useLayoutData } from '@/contexts';
import { convertMenuData, flatRoutes, convertRouteData, notLayoutRouteData } from '@/router/helper';
import './App.scss';
import PageNotFound from '@/pages/404';
import menuData from '@/assets/menu.json';


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
