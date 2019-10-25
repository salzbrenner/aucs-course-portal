import { CourseActionTypes } from './reducers/coursesReducesr';
import { UserActionTypes } from './reducers/userReducer';

export type AppActionType =
  | CourseActionTypes
  | UserActionTypes;

export type AppAction = {
  type: AppActionType;
  payload: any;
};
