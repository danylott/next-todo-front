import { Layout, Menu } from 'antd';
import { UnorderedListOutlined, HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Sider } = Layout;

export default function SideMenu() {
  return (
    <Sider>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '/',
            icon: <HomeOutlined />,
            label: <Link href="/">Home</Link>,
          },
          {
            key: '/todos',
            icon: <UnorderedListOutlined />,
            label: <Link href="/todos">Todos</Link>,
          },
        ]}
      />
    </Sider>
  );
}
