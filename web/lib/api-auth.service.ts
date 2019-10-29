import { AxiosResponse } from 'axios';
import { authProvider } from './auth-provider';
import {
  getDefaultHeaders,
  makeRequest,
} from './api-public.service';

export interface ApiAuthInterface {
  createUser: (
    uid: string,
    email: string
  ) => Promise<AxiosResponse<{ id: number; role: number }>>;
  createCourse: (
    name: string,
    instructor: string,
    description: string,
    cid: number
  ) => Promise<AxiosResponse<any>>;
  updateCourse: (
    name: string,
    instructor: string,
    description: string,
    cid: number
  ) => Promise<AxiosResponse<any>>;
  deleteCourse: (
    cid: number
  ) => Promise<AxiosResponse<any>>;
  userRole: number;
}

class apiAuth implements ApiAuthInterface {
  private _userRole = 0;

  set userRole(role: number) {
    this._userRole = role;
  }

  createUser = async (
    uid: string,
    email: string
  ): Promise<
    AxiosResponse<{ id: number; role: number }>
  > => {
    return this.makeAuthRequest(
      'user',
      'post',
      getDefaultHeaders(),
      null,
      { uid, email }
    );
  };

  createCourse = async (
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

    return this.makeAuthRequest(
      'course',
      'post',
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-app-admin': 0,
      },
      null,
      bodyFormData
    );
  };

  deleteCourse: ApiAuthInterface['deleteCourse'] = async (
    cid: number
  ): Promise<AxiosResponse<any>> => {
    return this.makeAuthRequest(
      `course/${cid}`,
      'delete',
      {},
      null
    );
  };

  updateCourse = async (
    name: string,
    instructor: string,
    description: string,
    cid: number
  ): Promise<AxiosResponse<any>> => {
    const bodyFormData = new FormData();
    bodyFormData.set('name', name);
    bodyFormData.set('instructor', instructor);
    bodyFormData.set('description', description);

    return this.makeAuthRequest(
      `course/${cid}`,
      'put',
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      null,
      bodyFormData
    );
  };

  authorizeHeaders = async (headers: any) => {
    try {
      const token = await authProvider.getIdToken();
      const idToken = token.idToken.rawIdToken;
      return {
        ...headers,
        Authorization: `Bearer ${idToken}`,
        'x-app-admin': this._userRole,
      };
    } catch (e) {
      alert('You need to log in first');
    }
  };

  makeAuthRequest = async (
    url: string,
    method: 'get' | 'post' | 'put' | 'delete' = 'get',
    headers: any = getDefaultHeaders(),
    params?: any,
    data?: any
  ) => {
    const authHeaders = await this.authorizeHeaders(
      headers
    );
    return makeRequest(
      url,
      method,
      authHeaders,
      params,
      data
    );
  };
}

export default apiAuth;
