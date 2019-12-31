// Since MSAL library provides all the functionality for handling
// the token, don't need to store it here. Can call it directly in
// API functions
import {
  AppAction,
  AppActionType,
} from '../context.interfaces';
import { VotingCategoriesInterface } from '../../components/FormVote';
import { dLog } from '../../lib/utils';

export interface UserState {
  name: null | string;
  email: null | string;
  id: null | string;
  role: number;
  isAdmin: boolean;
  votes: {
    [courseId: number]: VotingCategoriesInterface;
  };
}

export type UserActionTypes =
  | 'SIGN_IN'
  | 'ASSIGN_ROLE'
  | 'UPDATE_VOTE'
  | 'DELETE_VOTE';

export const userActions: {
  [A in UserActionTypes]: UserActionTypes;
} = {
  SIGN_IN: 'SIGN_IN',
  ASSIGN_ROLE: 'ASSIGN_ROLE',
  UPDATE_VOTE: 'UPDATE_VOTE',
  DELETE_VOTE: 'DELETE_VOTE',
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

    case userActions.UPDATE_VOTE: {
      const {
        cid,
        quality,
        time,
        difficulty,
      } = action.payload;
      newState = {
        ...state,
        votes: {
          ...state.votes,
          [cid]: {
            ...state.votes[cid],
            quality,
            time,
            difficulty,
          },
        },
      };
      break;
    }

    case userActions.DELETE_VOTE: {
      const { cid } = action.payload;

      const { votes } = state;
      const { [cid]: toDelete, ...toKeep } = votes;

      newState = {
        ...state,
        votes: toKeep,
      };
      break;
    }
    default:
      break;
  }

  dLog('USER_STATE ', {
    prevState: state,
    newState,
  });

  return newState;
};
