import process from 'process';

interface Headers {
    [key: string]: any;
}

export function get(
  url: string, headers: Headers | undefined = undefined,
) {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
    cache: 'no-store',
    headers,
  });
}

export function post(
  url: string, data: any, token: string | undefined = undefined,
) {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
    headers: {
      'content-type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` }),
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function patch(
  url: string, data: any, token: string | undefined = undefined,
) {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
    headers: {
      'content-type': 'application/json',
      ...(token && { authorization: `Bearer ${token}` }),
    },
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function destroy(url: string, headers: Headers | undefined = undefined) {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
    method: 'DELETE',
    headers,
  });
}
