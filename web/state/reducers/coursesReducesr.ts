import {
  AppAction,
  AppActionType,
} from '../context.interfaces';
import { CourseProps } from '../../hoc/withCourseData';
import { userActions, UserState } from './userReducer';

export interface CoursesState {
  [cid: number]: CourseProps;
}

export type CourseActionTypes =
  | 'POPULATE_COURSES'
  | 'ADD_COURSE'
  | 'UPDATE_COURSE'
  | 'VOTE_COURSE'
  | 'UPDATE_FEEDBACK'
  | 'DELETE_COURSE';

export const coursesActions: {
  [A in CourseActionTypes]: CourseActionTypes;
} = {
  ADD_COURSE: 'ADD_COURSE',
  DELETE_COURSE: 'DELETE_COURSE',
  UPDATE_COURSE: 'UPDATE_COURSE',
  POPULATE_COURSES: 'POPULATE_COURSES',
  UPDATE_FEEDBACK: 'UPDATE_FEEDBACK',
  VOTE_COURSE: 'VOTE_COURSE',
};

export const coursesReducer = (
  state: CoursesState,
  action: AppAction
) => {
  let newState = state;

  switch (action.type) {
    case coursesActions.POPULATE_COURSES:
      const mappedCourses = action.payload.reduce(
        (a: CoursesState, b: CourseProps) => {
          return { ...a, [b.cid]: b };
        },
        {}
      );
      newState = {
        ...state,
        ...mappedCourses,
      };
      break;

    case coursesActions.ADD_COURSE:
      newState = {
        ...state,
        [action.payload.cid]: { ...action.payload },
      };
      break;

    case coursesActions.UPDATE_COURSE: {
      const {
        cid,
        instructor,
        name,
        description,
        prereq,
      } = action.payload;

      newState = {
        ...state,
        [cid]: {
          ...state[cid],
          instructor,
          name,
          description,
          prereq,
        },
      };
      break;
    }

    case coursesActions.UPDATE_FEEDBACK:
      const { qualities, cid } = action.payload;
      newState = {
        ...state,
        [cid]: {
          ...state[cid],
          qualities,
        },
      };
      break;

    case coursesActions.DELETE_COURSE:
      const { [action.payload]: toDelete, ...keep } = state;
      newState = { ...keep };
      break;

    // case coursesActions.VOTE_COURSE:

    default:
      break;
  }

  console.log('COURSES_STATE', {
    prevState: state,
    newState,
  });

  return newState;
};
