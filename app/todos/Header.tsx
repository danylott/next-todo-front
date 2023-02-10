'use client';

import { Button, Layout } from 'antd';
import { signOut, useSession } from 'next-auth/react';

const { Header } = Layout;

interface Props {
  bgColor: string;
}

export default function HeaderComponent({ bgColor }: Props) {
  const { data: session, status } = useSession();

  return (
    <Header style={{ background: bgColor }}>
      Hi,
      {' '}
      {session?.user?.email}
      !
      <Button
        type='primary'
        style={{ float: 'right', marginTop: '16px' }}
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
      >
        Sign Out
      </Button>
    </Header>
  );
}
