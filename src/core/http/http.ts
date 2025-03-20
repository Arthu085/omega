import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Client } from './client';

export class Http {
  private client: AxiosInstance;
  private uri: string;

  constructor(uri?: string) {
    this.client = Client;
    this.uri = uri ?? '';
  }

  public get<T>(path?: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get(`${this.uri}${path}`, config);
  }

  public post<T, K>(
    path?: string,
    data?: K,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.post(`${this.uri}${path}`, data, config);
  }

  public put<T, K>(
    path?: string,
    data?: K,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.put(`${this.uri}${path}`, data, config);
  }

  public patch<T, K>(
    path?: string,
    data?: K,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.patch(`${this.uri}${path}`, data, config);
  }

  public delete<T>(path?: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete(`${this.uri}${path}`, config);
  }
}
