import { CourseActionTypes } from './reducers/coursesReducer';
import { UserActionTypes } from './reducers/userReducer';
import { CoursePopupTypes } from './reducers/coursePopupReducer';

export type AppActionType =
  | CoursePopupTypes
  | CourseActionTypes
  | UserActionTypes;

export type AppAction = {
  type: AppActionType;
  payload: any;
};
