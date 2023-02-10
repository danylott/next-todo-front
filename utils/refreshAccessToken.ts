import jwtDecode from 'jwt-decode';
import { post } from '@/utils/requests';
import Session from '@/interfaces/Session';

export async function refreshAccessToken(token: Session) {
  try {
    const response = await post('/api/user/token/refresh/', { refresh: token.refresh });
    const refreshedToken = await response.json();

    if (response.status !== 200) {
      throw refreshedToken;
    }

    const { exp } = jwtDecode<Session>(refreshedToken.access);

    return {
      ...token,
      ...refreshedToken,
      exp,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
