import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

export interface UserState {
  name: null | string;
  email: null | string;
  uid: null | string;
  courses: null | number[];
}

const initialState: UserState = {
  name: null,
  email: null,
  uid: null,
  courses: [],
};

type ActionType = 'SIGN_IN';

type Action = {
  type: ActionType;
  payload: any;
};

const reducer = (state: UserState, action: Action) => {
  let newState = state;
  switch (action.type) {
    case 'SIGN_IN':
      newState = {
        ...state,
        ...action.payload,
      };
      break;
    default:
      break;
  }
  const UserContext = {};
  console.log('UserContext', {
    prevState: state,
    newState,
  });
  return newState;
};

export const UserContext = createContext<
  [UserState, (action: Action) => void]
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
  useContext<[UserState, (action: Action) => void]>(
    UserContext
  );
