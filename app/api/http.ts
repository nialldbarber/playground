type RequestOptions = {
  headers?: HeadersInit_;
  params?: Record<string, string>;
  body?: any;
};

export const BASE_URL = "https://pokeapi.co/api/v2/";

export const buildUrl = (
  baseUrl: string = BASE_URL,
  path: string,
  params?: Record<string, string>
): string => {
  const url = new URL(path, baseUrl);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  return url.toString();
};

async function request<T>(
  baseUrl: string = BASE_URL,
  method: string,
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { headers = {}, params, body } = options;
  const url = buildUrl(baseUrl, path, params);

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/** GET request */
export async function get<T>(
  baseUrl: string = BASE_URL,
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  return request<T>(baseUrl, "GET", path, options);
}

/** POST request */
export async function post<T>(
  baseUrl: string = BASE_URL,
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  return request<T>(baseUrl, "POST", path, options);
}

/** PUT request */
export async function put<T>(
  baseUrl: string = BASE_URL,
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  return request<T>(baseUrl, "PUT", path, options);
}

/** DELETE request */
export async function del<T>(
  baseUrl: string = BASE_URL,
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  return request<T>(baseUrl, "DELETE", path, options);
}
