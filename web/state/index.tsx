import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

type StateAction = {
  type: UserActionType;
  payload: any;
};

type UserActionType = 'SIGN_IN' | 'ASSIGN_ROLE';

export const userActions: {
  [A in UserActionType]: UserActionType;
} = {
  SIGN_IN: 'SIGN_IN',
  ASSIGN_ROLE: 'ASSIGN_ROLE',
};

// Since MSAL library provides all the functionality for handling
// the token, don't need to store it here. Can call it directly in
// API functions
export interface UserState {
  name: null | string;
  email: null | string;
  uid: null | string;
  courses: null | number[];
  role: number;
}

const initialState: UserState = {
  name: null,
  email: null,
  uid: null,
  courses: [],
  role: 0,
};

const reducer = (state: UserState, action: StateAction) => {
  let newState = state;
  switch (action.type) {
    case userActions.SIGN_IN:
      newState = {
        ...state,
        ...action.payload,
      };
      break;
    default:
      break;
  }
  console.log(UserContext.displayName, {
    prevState: state,
    newState,
  });
  return newState;
};

export const UserContext = createContext<
  [UserState, (action: StateAction) => void]
>([initialState, () => {}]);

export const UserProvider = ({
  children,
}: {
  children: ReactNode;
}) => (
  <UserContext.Provider
    value={useReducer(reducer, initialState)}
  >
    {children}
  </UserContext.Provider>
);

export const useUserState = () =>
  useContext<[UserState, (action: StateAction) => void]>(
    UserContext
  );
