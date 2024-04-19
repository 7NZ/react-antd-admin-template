import { type FC, lazy } from 'react';
import {
  HomeOutlined,
  FileOutlined,
  FolderOutlined,
  UserOutlined
} from '@ant-design/icons';
import Dashboard from '@/pages/Dashboard';
import AntdButtons from '@/pages/Button';
import AntdCard from '@/pages/Card';
import AntdDatePicker from '@/pages/DatePicker';
import AntdForm from '@/pages/Form';
import Login from '@/pages/Login/index';
import Page1 from '@/pages/Page1';
import SubPage1 from '@/pages/SubPage1';

const pageMap: Record<string, FC> = {
  dynamicp1: lazy(() => import('@/pages/DynamicPage1')),
  dynamicp2: lazy(() => import('@/pages/DynamicPage2')),
  dynamicpsub: lazy(() => import('@/pages/DynamicSubpage'))
};

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

const staticRoutes: MenuRoute[] = [
  {
    path: '/',
    name: 'dashboard',
    icon: HomeOutlined,
    element: Dashboard
  },
  {
    path: '/login',
    name: 'login',
    layout: false,
    hidden: true,
    element: Login
  },
  {
    path: '/button',
    name: 'button',
    icon: FileOutlined,
    element: AntdButtons
  },
  {
    path: '/card',
    name: 'card',
    icon: FileOutlined,
    element: AntdCard
  },
  {
    path: '/datePicker',
    name: 'datePicker',
    icon: FileOutlined,
    element: AntdDatePicker
  },
  {
    path: '/form',
    name: 'form',
    icon: FileOutlined,
    element: AntdForm
  },
  {
    path: '/page1',
    name: 'page1',
    icon: FolderOutlined,
    element: Page1,
    children: [
      {
        // must use full path
        path: '/page1/subpage1',
        name: 'subpage1',
        index: true,
        icon: UserOutlined,
        element: SubPage1
      }
    ]
  }
];

export default staticRoutes;
