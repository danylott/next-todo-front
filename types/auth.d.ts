import 'next-auth';

declare module 'next-auth' {
  interface User {
    user_id: number;
    email: string;
  }

  interface Session {
    user: User;
    access: string;
    refresh: string;
    exp: number;
  }
}
