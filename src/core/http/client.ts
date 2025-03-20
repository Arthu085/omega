import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { parse, stringify } from 'qs';

import { formatErrorForNotification } from '@/shared/utils/error';

import { getToken, redirect, refreshToken } from './helpers';

let axiosResponseErrorRetry: boolean = false;

function handleAxiosRequest(config: InternalAxiosRequestConfig) {
  const token = getToken();

  config.headers.setAuthorization(`Bearer ${token}`);

  return config;
}

function handleAxiosRequestError(error: AxiosError) {
  throw error;
}

function handleAxiosResponse(response: AxiosResponse<unknown, unknown>) {
  axiosResponseErrorRetry = false;
  return response;
}

async function handleAxiosResponseError(error: AxiosError) {
  const originalRequest: any = error.config;

  if (error?.response?.status === 502 || error?.code === 'ERR_NETWORK') {
    throw new Error('Servidor indisponível!');
  }

  if (error?.response?.status === 401 && !axiosResponseErrorRetry) {
    axiosResponseErrorRetry = true;

    try {
      await refreshToken();

      return Client(originalRequest);
    } catch (err) {
      redirect(formatErrorForNotification(err));
    }
  }

  if (error?.response?.status === 401 && originalRequest?._retry) {
    redirect();
  }

  throw error;
}

export const Client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API ?? "https://weiler-api.onrender.com",
  // withCredentials: true,
  timeout: 30000,
  timeoutErrorMessage: 'O servidor não está respondendo, tente novamente mais tarde.',
  paramsSerializer: {
    encode: (params) => parse(params),
    serialize: (params) => stringify(params),
  },
});

Client.interceptors.request.use(handleAxiosRequest, handleAxiosRequestError);

Client.interceptors.response.use(handleAxiosResponse, handleAxiosResponseError);
