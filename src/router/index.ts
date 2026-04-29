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
