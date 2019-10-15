import axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

const API_URL = `http://127.0.0.1:5000/api`;

export const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

/**
 * Gets a list of user boards from /boards/<uid>
 *  @return {AxiosPromise}
 */
export const getCourses = () => {
  return makeRequest(`/courses`);
};

export const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
});

export const makeRequest = (
  url: string,
  method: 'get' | 'post' | 'put' = 'get',
  headers: any = getDefaultHeaders(),
  params?: any,
  data?: any
): Promise<AxiosResponse> => {
  const req: AxiosRequestConfig = {
    url,
    method,
    headers,
    params,
    data,
  };
  return instance.request(req);
};
