import { type FC, useState, useEffect } from 'react';
import { Layout, Menu, Skeleton } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLayoutData } from '@/contexts';
import { type MenuRoute, flatRoutes } from '@/router';

type MenuItem = Required<MenuProps>['items'][number];

const generateMenu = (routes: MenuRoute[]) => {
  const menuTemp: MenuItem[] = [];
  routes.forEach(route => {
    if (!route.hidden) {
      const menuItem: MenuItem = {
        key: route.path,
        label: route.name
      };
      const Icon = route.icon;
      menuItem.icon = Icon ? <Icon /> : null;
      if (route.children?.length) {
        // @ts-expect-error
        menuItem.children = generateMenu(route.children);
      }
      menuTemp.push(menuItem);
    }
  });
  return menuTemp;
};

const findParent = (path: string, flatedMenu: MenuRoute[]) => {
  return flatedMenu.find((route) => {
    if (route.children?.length) {
      return route.children.find((child => child.path === path));
    } else {
      return undefined;
    }
  });
};

const LayoutMenu: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const layoutData = useLayoutData();
  const [current, setCurrent] = useState<string[]>([]);
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);
  const [defaultOpenKeys, setDefalutOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const menus = generateMenu(layoutData.routes);
    setMenuItems(menus);

    const flatedMenu: MenuRoute[] = flatRoutes(layoutData.routes);
    const parent = findParent(location.pathname, flatedMenu);
    const openKeys = parent ? [parent.path] : [];
    setDefalutOpenKeys(openKeys);
  }, [layoutData.routes]);

  useEffect(() => {
    setCurrent([location.pathname]);
  }, [location]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (current[0] !== e.key) {
      setCurrent([e.key]);
      navigate(e.key);
    }
  };

  return (
    <Layout.Sider
      className="layout-sider"
      theme={layoutData.theme}
      trigger={null}
      collapsible
      collapsed={layoutData.collapse}
    >
      <div className="logo" />
      <Skeleton className="menu-skeleton" loading={!menuItems || menuItems.length === 0}>
        <Menu
          theme={layoutData.theme}
          mode="inline"
          defaultOpenKeys={defaultOpenKeys}
          selectedKeys={current}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Skeleton>
    </Layout.Sider>
  );
};

export default LayoutMenu;
