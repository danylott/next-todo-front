import { getServerSession } from 'next-auth';
import {
  destroy, get, patch, post,
} from '@/utils/requests';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Session from '@/interfaces/Session';

export async function getAuthServer(url: string) {
  const session: Session | null = await getServerSession(authOptions);

  return get(url, {
    Authorization: `Bearer ${session?.access}`,
  });
}

export async function postAuthServer(url: string, data: any) {
  const session: Session | null = await getServerSession(authOptions);

  return post(url, data, session?.access);
}

export async function patchAuthServer(url: string, data: any) {
  const session: Session | null = await getServerSession(authOptions);

  return patch(url, data, session?.access);
}

export async function destroyAuthServer(url: string) {
  const session: Session | null = await getServerSession(authOptions);

  return destroy(url, {
    Authorization: `Bearer ${session?.access}`,
  });
}
