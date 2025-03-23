// api.utils.ts - Generic API Wrapper

interface RequestOptions<T = unknown> {
  method: string;
  body?: T;
  headers?: HeadersInit;
}

const request = async <T = unknown, R = unknown>(
  url: string,
  { method, body, headers }: RequestOptions<T>
): Promise<R> => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    credentials: 'include',
  };
  const API_BASE_URL = process.env.__NEXT_PRIVATE_ORIGIN || '';

  const response = await fetch(`${API_BASE_URL}${url}`, config);

  if (!response.ok) {
    const DEFAULT_API_ERR_MSG = `Something went wrong, Error! Status: ${response.status}`;
    let toastMessage = DEFAULT_API_ERR_MSG;
    try {
      const { message } = await response.json();
      if (message) toastMessage = message;
    } catch {
      toastMessage = DEFAULT_API_ERR_MSG;
    }
    throw new Error(toastMessage);
  }

  return response.json() as Promise<R>;
};

export const api = {
  get: <R = any>(url: string, headers?: HeadersInit) =>
    request<undefined, R>(url, { method: 'GET', headers }),

  post: <T = any, R = any>(url: string, body?: T, headers?: HeadersInit) =>
    request<T, R>(url, { method: 'POST', body, headers }),

  put: <T = any, R = any>(url: string, body?: T, headers?: HeadersInit) =>
    request<T, R>(url, { method: 'PUT', body, headers }),

  patch: <T = any, R = any>(url: string, body?: T, headers?: HeadersInit) =>
    request<T, R>(url, { method: 'PATCH', body, headers }),

  delete: <R = any>(url: string, headers?: HeadersInit) =>
    request<undefined, R>(url, { method: 'DELETE', headers }),
};
