import { LoginResponseDTO } from '@/modules/auth/domain';
import { EUnauthenticatedPath } from '../router';
import { Client } from './client';

export function getToken(): string {
  const item: string | null = localStorage.getItem('@omega/auth');
  const token: string | undefined = item ? JSON.parse(item)['token'] : 'none';

  return token ?? 'none';
}

export async function refreshToken() {
  const item: string | null = localStorage.getItem('@omega/auth');
  const refreshToken: string | undefined = item ? JSON.parse(item)['refreshToken'] : 'none';

  if (!refreshToken) {
    return localStorage.removeItem('@omega/auth');
  }

  const { status, data } = await Client.post<LoginResponseDTO>('/auth/refresh', {
    refreshToken,
  });

  if (status >= 200 && status < 300) {
    return localStorage.setItem('@omega/auth', JSON.stringify(data));
  }

  return localStorage.removeItem('@omega/auth');
}

export function redirect(message?: string) {
  if (
    !window.location.pathname
      .split('/')
      .some((path) =>
        [
          EUnauthenticatedPath.SIGN_UP,
          EUnauthenticatedPath.LOGIN,
          EUnauthenticatedPath.RECOVER,
        ].includes(('/' + path) as EUnauthenticatedPath),
      )
  ) {
    window.location.href = '/' + EUnauthenticatedPath.LOGIN;

    throw new Error(message || 'Sem autorização!');
  }
}
