import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Avatar, Space } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useLayoutData, useLayoutDispath } from '@/contexts';
import { ReactComponent as LightIcon } from '@/assets/light.svg';
import { ReactComponent as DarkIcon } from '@/assets/dark.svg';

const HeaderRight = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const layoutData = useLayoutData();
  const { onToggleTheme } = useLayoutDispath();

  useEffect(() => {
    const themeClass = `theme-${layoutData.theme}`;
    const oppositeClass = `theme-${layoutData.theme === 'light' ? 'dark' : 'light'}`;
    const html = document.documentElement;
    if (html.classList.contains(oppositeClass)) {
      html.classList.toggle(`${oppositeClass}`);
    }
    html.classList.add(`${themeClass}`);
  }, [layoutData.theme]);

  const handleLogout = () => {
    window.sessionStorage.clear();
    const redirect = `${location.pathname}${location.search ? location.search : ''}`;
    navigate(`/login?redirect=${encodeURIComponent(redirect)}`);
  };

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <span onClick={handleLogout}>
          <LogoutOutlined /> Logout
        </span>
      )
    }
  ];

  return (
    <Space className="right">
      <div className="theme-toggle" onClick={onToggleTheme}>
        {layoutData.theme === 'light' && <LightIcon />}
        {layoutData.theme === 'dark' && <DarkIcon />}
      </div>
      <Dropdown menu={{ items }}>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </Space>
  );
};

export default HeaderRight;
