import { AppAction } from '../context.interfaces';
import { AxiosResponse } from 'axios';
import {
  getCourse,
  getCourses,
  getDefaultHeaders,
  makeRequest,
} from '../../lib/api-public.service';

export interface ApiStateInterface {
  makeRequest: (
    url: string,
    method: 'get' | 'post' | 'put' | 'delete',
    headers: any,
    params?: any,
    data?: any
  ) => Promise<AxiosResponse>;
  getCourses: () => Promise<AxiosResponse>;
  getCourse: (cid: string) => Promise<AxiosResponse>;
  getDefaultHeaders: () => {};
}

export const apiReducer = async (
  state: ApiStateInterface,
  action: AppAction
) => {
  return state;
};

const apiPublic: ApiStateInterface = {
  makeRequest,
  getDefaultHeaders,
  getCourses,
  getCourse,
};
