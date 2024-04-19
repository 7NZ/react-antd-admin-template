import type { FC } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import LayoutMenu from '../menu';
import Header from '../header';

const { Content } = Layout;

const Container: FC = () => {
  return (
    <Layout className="layout" hasSider>
      <LayoutMenu />
      <Layout className="layout-right">
        <Header />
        <Content className="layout-main">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Container;
