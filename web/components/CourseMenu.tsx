import Link from 'next/link';
import * as React from 'react';
import { CourseProps } from '../hoc/withCourseData';
import CourseLink from './CourseLink';
import { colors } from './GlobalStyles';
import { useAppContext } from '../state';
import { useEffect, useState } from 'react';
import { coursesActions } from '../state/reducers/coursesReducesr';

export interface CourseMenuProps {
  courses: CourseProps[];
}

const CourseMenu = ({ courses }: CourseMenuProps) => {
  const [
    { courses: coursesState },
    dispatch,
  ] = useAppContext();

  useEffect(() => {
    dispatch({
      type: coursesActions.POPULATE_COURSES,
      payload: courses,
    });
  }, []);

  // for ssr
  const currentCourses =
    Object.values(coursesState).length > 0
      ? Object.values(coursesState)
      : courses;

  return (
    <>
      {currentCourses
        .sort((a, b) => {
          return a.cid - b.cid;
        })
        .map(course => (
          <div key={course.cid}>
            <CourseLink {...course} />
          </div>
        ))}
    </>
  );
};

export default CourseMenu;
