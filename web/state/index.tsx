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
} from './reducers/coursesReducesr';

export interface AppContextState {
  user: UserState;
  courses: CoursesState;
  // api: any;
}

const initialState: AppContextState = {
  user: {
    name: null,
    email: null,
    uid: null,
    courses: [],
    role: 0,
    isAdmin: false,
  },
  courses: {},
  // api: null,
};

const mainReducer: Reducer<AppContextState, AppAction> = (
  { user, courses },
  action
) => ({
  user: userReducer(user, action),
  courses: coursesReducer(courses, action),
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
