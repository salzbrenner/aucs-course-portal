import { AxiosResponse } from 'axios';
import { authProvider } from './auth-provider';
import {
  getDefaultHeaders,
  makeRequest,
} from './api-public.service';
import { CourseMetricInterface } from '../hoc/withCourseData';
import { VotingCategoriesInterface } from '../components/FormVote';

export interface ApiAuthInterface {
  createUser: (
    id: string,
    email: string
  ) => Promise<AxiosResponse<{ id: number; role: number }>>;
  createCourse: (
    name: string,
    instructor: string,
    description: string,
    cid: number,
    prereqs: { [key: number]: string }
  ) => Promise<AxiosResponse<any>>;
  updateCourse: (
    name: string,
    instructor: string,
    description: string,
    cid: number,
    prereqs: { [key: number]: string }
  ) => Promise<AxiosResponse<any>>;
  deleteCourse: (
    cid: number
  ) => Promise<AxiosResponse<any>>;
  userRole: number;
  getUser: (id: string) => Promise<AxiosResponse<any>>;
  voteForCourse: (
    cid: number,
    uid: string,
    categories: VotingCategoriesInterface,
    type: 'post' | 'put'
  ) => Promise<AxiosResponse<any>>;
}

class apiAuth implements ApiAuthInterface {
  private _userRole = 0;

  set userRole(role: number) {
    this._userRole = role;
  }

  getUser: ApiAuthInterface['getUser'] = async (
    id: string
  ): Promise<AxiosResponse> => {
    return this.makeAuthRequest(
      `user/${id}`,
      'get',
      getDefaultHeaders()
    );
  };

  createUser: ApiAuthInterface['createUser'] = async (
    id: string,
    email: string
  ): Promise<
    AxiosResponse<{ id: number; role: number }>
  > => {
    return this.makeAuthRequest(
      'user',
      'post',
      getDefaultHeaders(),
      null,
      { id, email }
    );
  };

  createCourse: ApiAuthInterface['createCourse'] = async (
    name,
    instructor,
    description,
    cid,
    prereqs
  ) => {
    const bodyFormData = new FormData();
    bodyFormData.set('cid', `${cid}`);
    bodyFormData.set('name', name);
    bodyFormData.set('instructor', instructor);
    bodyFormData.set('description', description);
    bodyFormData.set('prereqs', JSON.stringify(prereqs));

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

  updateCourse: ApiAuthInterface['updateCourse'] = async (
    name: string,
    instructor: string,
    description: string,
    cid: number,
    prereqs
  ): Promise<AxiosResponse<any>> => {
    const bodyFormData = new FormData();
    bodyFormData.set('name', name);
    bodyFormData.set('instructor', instructor);
    bodyFormData.set('description', description);
    bodyFormData.set('prereqs', JSON.stringify(prereqs));

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

  // VOTING
  voteForCourse: ApiAuthInterface['voteForCourse'] = async (
    cid,
    uid,
    categories,
    type
  ): Promise<AxiosResponse<any>> => {
    const { quality, time, difficulty } = categories;
    const bodyFormData = new FormData();
    bodyFormData.set('quality', `${quality}`);
    bodyFormData.set('time_spent', `${time}`);
    bodyFormData.set('difficulty', `${difficulty}`);

    return this.makeAuthRequest(
      `course/${cid}/${uid}`,
      type,
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
      console.log('Authorization header error ', e);
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
