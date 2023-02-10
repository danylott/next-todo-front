import { SessionProvider } from 'next-auth/react';
import { RootStyleRegistry } from '../app/antd';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RootStyleRegistry>
        <Component {...pageProps} />
      </RootStyleRegistry>
    </SessionProvider>
  );
}
