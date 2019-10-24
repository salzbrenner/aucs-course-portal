import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

type AppAction = {
  type: AppActionType;
  payload: any;
};

type AppActionType = 'SIGN_IN' | 'ASSIGN_ROLE';

export const userActions: {
  [A in AppActionType]: AppActionType;
} = {
  SIGN_IN: 'SIGN_IN',
  ASSIGN_ROLE: 'ASSIGN_ROLE',
};

export interface GlobalState {
  user: UserState;
}

// Since MSAL library provides all the functionality for handling
// the token, don't need to store it here. Can call it directly in
// API functions
export interface UserState {
  name: null | string;
  email: null | string;
  uid: null | string;
  courses: null | number[];
  role: number;
  isAdmin: boolean;
}

const initialState: GlobalState = {
  user: {
    name: null,
    email: null,
    uid: null,
    courses: [],
    role: 0,
    isAdmin: false,
  },
};

const userReducer = (
  state: UserState,
  action: AppAction
) => {
  let newState = state;
  switch (action.type) {
    case userActions.SIGN_IN:
      newState = {
        ...state,
        ...action.payload,
        isAdmin: action.payload.role > 0,
      };
      break;
    default:
      break;
  }

  console.log('USER_STATE', {
    prevState: state,
    newState,
  });

  return newState;
};

export interface GlobalStates {
  user: UserState;
}
const mainReducer = (
  { user }: GlobalStates,
  action: AppAction
) => ({
  user: userReducer(user, action),
});

export const AppContext = createContext<
  [GlobalState, (action: AppAction) => void]
>([initialState, () => {}]);

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
  useContext<[GlobalState, (action: AppAction) => void]>(
    AppContext
  );

// TODO: add api to global context
// export interface ApiStateInterface {
//   makeRequest:  (
//     url: string,
//     method: 'get' | 'post' | 'put' | 'delete',
//     headers: any,
//     params?: any,
//     data?: any
//   ) => Promise<AxiosResponse>,
//   getCourses: () => Promise<AxiosResponse>,
//   getCourse: (cid: string) => Promise<AxiosResponse>,
//   getDefaultHeaders: () => {}
// }
//
// const apiPublic: ApiStateInterface = {
//   makeRequest,
//   getDefaultHeaders,
//   getCourses,
//   getCourse,
// };
