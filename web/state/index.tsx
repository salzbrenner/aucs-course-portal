import React, {
  createContext,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from 'react';
import {
  userReducer,
  UserState,
} from './reducers/userReducer';
import { AppAction } from './context.interfaces';
import {
  apiReducer,
  ApiStateInterface,
} from './reducers/apiReducer';
import {
  coursesReducer,
  CoursesState,
} from './reducers/coursesReducer';
import {
  coursePopupReducer,
  CoursePopupState,
} from './reducers/coursePopupReducer';

export interface AppContextState {
  user: UserState;
  courses: CoursesState;
  coursePopup: CoursePopupState;
  // api: any;
}

const initialState: AppContextState = {
  user: {
    name: null,
    email: null,
    id: null,
    role: 0,
    isAdmin: false,
    votes: {},
  },
  courses: {},
  coursePopup: { id: null, x: 0, y: 0 },
  // api: null,
};

const mainReducer: Reducer<AppContextState, AppAction> = (
  { user, courses, coursePopup },
  action
) => ({
  user: userReducer(user, action),
  courses: coursesReducer(courses, action),
  coursePopup: coursePopupReducer(coursePopup, action),
  // api: apiReducer(api, action),
});

export const AppContext = createContext<
  [AppContextState, (action: AppAction) => void]
>([initialState, (action: AppAction) => {}]);

/**
 * Provider for app
 * @param children
 * @constructor
 */
export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}) => (
  <AppContext.Provider
    value={useReducer(mainReducer, initialState)}
  >
    {children}
  </AppContext.Provider>
);

export const useAppContext = () =>
  useContext<
    [AppContextState, (action: AppAction) => void]
  >(AppContext);
