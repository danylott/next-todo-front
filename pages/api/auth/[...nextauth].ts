import NextAuth, { NextAuthOptions } from 'next-auth';
import jwtDecode from 'jwt-decode';
import CredentialsProvider from 'next-auth/providers/credentials';
import { refreshAccessToken } from '@/utils/refreshAccessToken';
import Session from '@/interfaces/Session';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({

      credentials: {},

      async authorize(credentials) {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/user/token/', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          });
          const token = await response.json();

          if (response.status !== 200) {
            throw token;
          }

          const {
            email, user_id, exp,
          }
            = jwtDecode(token.access);

          return {
            ...token,
            exp,
            user: {
              email,
              user_id,
            },
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
    async jwt({
      token, user, account,
    }) {
      // initial signin
      if (account && user) {
        return user;
      }

      // Return previous token if the access token has not expired
      if (Date.now() < token.exp * 100) {
        return token;
      }

      // refresh token
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.access = token.access;
      session.refresh = token.refresh;
      session.exp = token.exp;

      return session;
    },
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
