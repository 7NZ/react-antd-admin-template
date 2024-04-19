import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import staticRoutes, { convertMenuData } from '@/router';
import { useLayoutDispath } from '@/contexts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import menuData from '@/assets/menu.json';

const Login: React.FC = () => {
  const { setMenuRoutes } = useLayoutDispath();
  const [submiting, setSubmiting] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');

  const onFinish = (values: any) => {
    if (values.username === 'admin') {
      if (values.password === 'admin789') {
        setSubmiting(true);
        setTimeout(() => {
          const remoteRoutes = convertMenuData(menuData.data);
          const allRoutes = staticRoutes.concat(remoteRoutes);
          setMenuRoutes(allRoutes);
          window.sessionStorage.setItem('hasLogin', '1');
          setSubmiting(false);
          navigate(redirect ? decodeURIComponent(redirect) : '/', { replace: true });
        }, 1000);
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.loginWrap}>
      <Form
        name="login"
        className={styles.loginForm}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="admin" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="admin789"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" className={styles.loginBtn} loading={submiting}>
          Login
        </Button>
      </Form>
    </div>

  );
};

export default Login;
