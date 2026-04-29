import { type FC } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useLayoutData, useLayoutDispath } from '@/contexts';
import Breadcrumbs from './Breadcrumbs';
import HeaderRight from './Right';

const Header: FC = () => {
  const layoutData = useLayoutData();
  const { onToggleCollapse } = useLayoutDispath();

  const toggleCollpase = () => {
    onToggleCollapse(!layoutData.collapse);
  };

  return (
    <Layout.Header className="header">
      <div className="left">
        {layoutData.collapse
          ? <MenuUnfoldOutlined onClick={toggleCollpase} />
          : <MenuFoldOutlined onClick={toggleCollpase} />
        }
        <Breadcrumbs />
      </div>
      <HeaderRight />
    </Layout.Header>
  );
};

export default Header;
