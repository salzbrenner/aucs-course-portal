// Since MSAL library provides all the functionality for handling
// the token, don't need to store it here. Can call it directly in
// API functions
import {
  AppAction,
  AppActionType,
} from '../context.interfaces';

export interface UserState {
  name: null | string;
  email: null | string;
  uid: null | string;
  courses: null | number[];
  role: number;
  isAdmin: boolean;
}

export type UserActionTypes = 'SIGN_IN' | 'ASSIGN_ROLE';

export const userActions: {
  [A in UserActionTypes]: UserActionTypes;
} = {
  SIGN_IN: 'SIGN_IN',
  ASSIGN_ROLE: 'ASSIGN_ROLE',
};

export const userReducer = (
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
