import { AxiosResponse } from 'axios';
import { authProvider } from './auth-provider';
import {
  getDefaultHeaders,
  makeRequest,
} from './api-public.service';

export const protect = async (): Promise<AxiosResponse> => {
  return makeAuthRequest(`/protected`, 'get');
};

export const createUser = async (
  uid: string,
  email: string
): Promise<AxiosResponse> => {
  return makeAuthRequest(
    'user',
    'post',
    getDefaultHeaders(),
    null,
    { uid, email }
  );
};

export const getUser = async (
  uid: string
): Promise<AxiosResponse> => {
  return makeAuthRequest(
    `user/${uid}`,
    'get',
    getDefaultHeaders()
  );
};

const authorizeHeaders = async (headers: any) => {
  try {
    const token = await authProvider.getIdToken();
    const idToken = token.idToken.rawIdToken;
    return {
      ...headers,
      Authorization: `Bearer ${idToken}`,
    };
  } catch (e) {
    alert('You need to log in first');
  }
};

const makeAuthRequest = async (
  url: string,
  method: 'get' | 'post' | 'put' = 'get',
  headers: any = getDefaultHeaders(),
  params?: any,
  data?: any
) => {
  const authHeaders = await authorizeHeaders(headers);
  return makeRequest(
    url,
    method,
    authHeaders,
    params,
    data
  );
};
