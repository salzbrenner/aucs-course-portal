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

// const UNAUTHORIZED = 401;
// instance.interceptors.response.use(
//   response => response,
//   error => {
//     const { status } = error.response;
//     if (status === UNAUTHORIZED) {
//       // dispatch(userSignOut());
//     }
//     return Promise.reject(error);
//   }
// );

/**
 * Gets a list of user boards from /boards/<uid>
 *  @return {AxiosPromise}
 */
export const getCourses = () => {
  return makeRequest(`/course`);
};

export const getCourse = async (
  cid: string
): Promise<AxiosResponse<any>> => {
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
