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
            <div className="course-menu__item">
              <div className="course-menu__dot" />
              <CourseLink {...course} />
            </div>

            <style jsx>{`
               {
                .course-menu__item {
                  display: flex;
                  align-items: center;
                }
                .course-menu__dot {
                  border-radius: 50%;
                  width: 10px;
                  height: 10px;
                  border: solid 1px ${colors.secondary};
                  transition: background 0.2s ease;
                }

                .course-menu__item:hover .course-menu__dot {
                  background: ${colors.secondary};
                }
              }
            `}</style>
          </div>
        ))}
    </>
  );
};

export default CourseMenu;
