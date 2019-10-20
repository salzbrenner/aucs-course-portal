import dynamic from 'next/dist/next-server/lib/dynamic';
import React from 'react';
import { CourseProps } from './CourseContainer';

const FormCourseOverviewDynamic = dynamic(
  () => import('../components/FormCourseOverview'),
  {
    ssr: false,
  }
);

export default (props: CourseProps) => (
  <FormCourseOverviewDynamic
    courseData={props.courseData}
  />
);
