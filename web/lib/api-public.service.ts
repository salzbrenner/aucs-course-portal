import axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';
import { throwError } from 'rxjs';

const API_URL = `http://127.0.0.1:5000/api`;

export const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

export const getCourses = () => {
  return makeRequest(`/course`);
};

export const getCourse = async (
  cid: string
): Promise<AxiosResponse> => {
  return makeRequest(
    `course/${cid}`,
    'get',
    getDefaultHeaders()
  );
};

export const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
});

export const makeRequest = (
  url: string,
  method: 'get' | 'post' | 'put' | 'delete' = 'get',
  headers: any = getDefaultHeaders(),
  params?: any,
  data?: any
): Promise<any> => {
  const req: AxiosRequestConfig = {
    url,
    method,
    headers,
    params,
    data,
  };
  return instance.request(req);
};
