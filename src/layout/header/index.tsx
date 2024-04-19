import { type FC, createElement } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useLayoutData, useLayoutDispath } from '@/contexts';
import Breadcrumbs from './Breadcrumbs';
import HeaderRight from './Right';

const Header: FC = () => {
  const layoutData = useLayoutData();
  const { onToggleCollapse } = useLayoutDispath();

  const MenuCollapseTrigger = () => {
    return (<>
      {createElement(layoutData.collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => onToggleCollapse(!layoutData.collapse)
      })}
    </>);
  };

  return (
    <Layout.Header className="header">
      <div className="left">
        <MenuCollapseTrigger />
        <Breadcrumbs />
      </div>
      <HeaderRight />
    </Layout.Header>
  );
};

export default Header;
