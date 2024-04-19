import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import App from './App';
import 'antd/dist/reset.css';
import { LayoutProvider, useLayoutData } from '@/contexts';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const RootApp = () => {
  const layoutData = useLayoutData();

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        cssVar: true,
        hashed: false,
        algorithm: layoutData.theme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm
      }}
    >
      <App />
    </ConfigProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <LayoutProvider>
      <RootApp />
    </LayoutProvider>
  </React.StrictMode>
);