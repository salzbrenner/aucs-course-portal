import { AppAction } from '../context.interfaces';
import { dLog } from '../../lib/utils';

export interface CoursePopupState {
  id: number | null;
  x: number;
  y: number;
}

export type CoursePopupTypes =
  | 'SHOW_COURSE_POPUP'
  | 'HIDE_COURSE_POPUP';

export const coursePopupActions: {
  [A in CoursePopupTypes]: CoursePopupTypes;
} = {
  SHOW_COURSE_POPUP: 'SHOW_COURSE_POPUP',
  HIDE_COURSE_POPUP: 'HIDE_COURSE_POPUP',
};

export const coursePopupReducer = (
  state: CoursePopupState,
  action: AppAction
) => {
  let newState = state;

  switch (action.type) {
    case coursePopupActions.SHOW_COURSE_POPUP: {
      const { x, y, id } = action.payload;
      newState = {
        ...state,
        id,
        x,
        y,
      };
      break;
    }

    case coursePopupActions.HIDE_COURSE_POPUP: {
      newState = {
        ...state,
        id: null,
      };
      break;
    }

    default:
      break;
  }

  dLog('COURSE_POPUP_STATE', {
    prevState: state,
    newState,
  });

  return newState;
};
