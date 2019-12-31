import * as React from 'react';
import { CourseProps } from '../hoc/withCourseData';
import CourseLink from './CourseLink';
import { useAppContext } from '../state';

export interface CourseMenuProps {
  courses: CourseProps[];
}

const CourseMenu = () => {
  const [{ courses }] = useAppContext();

  // for ssr
  // const currentCourses =
  //   Object.values(coursesState).length > 0
  //     ? Object.values(coursesState)
  //     : courses;

  return (
    <>
      {courses &&
        Object.values(courses)
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
