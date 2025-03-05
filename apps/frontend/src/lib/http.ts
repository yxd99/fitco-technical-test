import { HTTP_STATUS_MESSAGE } from '@app/lib/constants/http-status';
import { filtersToQueryParams } from '@app/lib/utils';

export interface HttpResponse<T> {
  data: T;
  status: string;
  statusCode: number;
}

export class HttpClient {
  constructor(private readonly baseUrl: string) {
    if (!baseUrl) {
      throw new Error('baseUrl is required');
    }
  }

  async jsonResponse<T>(response: Promise<Response>) {
    const awaitedResponse = await response;

    return {
      data: (await awaitedResponse.json()) as T,
      statusCode: awaitedResponse.status,
      status: HTTP_STATUS_MESSAGE[awaitedResponse.status],
    };
  }

  async get<T>(
    path: string,
    params?: Record<string, unknown>,
    headers?: Record<string, string>
  ): Promise<HttpResponse<T>> {
    const queryParams = filtersToQueryParams(params);
    const url = new URL(`${this.baseUrl}${path}?${queryParams}`);

    const fetchPromise = fetch(url, {
      headers: {
        ...headers,
      },
      cache: 'no-store',
    });

    return this.jsonResponse<T>(fetchPromise);
  }

  async post<T, B>(
    path: string,
    body: B,
    headers?: Record<string, string>
  ): Promise<HttpResponse<T>> {
    const fetchPromise = fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return await this.jsonResponse<T>(fetchPromise);
  }

  async patch<T, B>(
    path: string,
    body: B,
    headers?: Record<string, string>
  ): Promise<HttpResponse<T>> {

    const fetchPromise = fetch(`${this.baseUrl}${path}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });

    return await this.jsonResponse<T>(fetchPromise);
  }

  async delete<T>(
    path: string,
    headers?: Record<string, string>
  ): Promise<HttpResponse<T>> {

    const fetchPromise = fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers: {
        ...headers,
      },
    });

    return await this.jsonResponse<T>(fetchPromise);
  }
}

export const httpClient = new HttpClient(
  String(process.env.NEXT_PUBLIC_API_URL)
);
