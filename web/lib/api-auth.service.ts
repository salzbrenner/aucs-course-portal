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
): Promise<AxiosResponse<{ id: number; role: number }>> => {
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

/**
 * Courses
 */

export const createCourse = async (
  name: string,
  instructor: string,
  description: string,
  cid: number
): Promise<AxiosResponse<any>> => {
  const bodyFormData = new FormData();
  bodyFormData.set('cid', `${cid}`);
  bodyFormData.set('name', name);
  bodyFormData.set('instructor', instructor);
  bodyFormData.set('description', description);

  return makeAuthRequest(
    'course',
    'post',
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    null,
    bodyFormData
  );
};

export const updateCourse = async (
  name: string,
  instructor: string,
  description: string,
  cid: number
): Promise<AxiosResponse<any>> => {
  const bodyFormData = new FormData();
  bodyFormData.set('name', name);
  bodyFormData.set('instructor', instructor);
  bodyFormData.set('description', description);

  return makeAuthRequest(
    `course/${cid}`,
    'put',
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    null,
    bodyFormData
  );
};

export const deleteCourse = async (
  cid: number
): Promise<AxiosResponse<any>> => {
  return makeAuthRequest(
    `course/${cid}`,
    'delete',
    {},
    null
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
  method: 'get' | 'post' | 'put' | 'delete' = 'get',
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
