'use client';

import React from 'react';
import { Layout, theme } from 'antd';
import HeaderComponent from '@/app/todos/Header';
import AuthContext from '@/app/todos/AuthContext';
import SideMenu from './SideMenu';

const { Content } = Layout;

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AuthContext>
      <Layout hasSider style={{ height: '100vh' }}>
        <SideMenu />
        <Layout className="site-layout">
          <HeaderComponent bgColor={colorBgContainer} />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              textAlign: 'center',
            }}
          >
            { children }
          </Content>
        </Layout>
      </Layout>
    </AuthContext>
  );
}
