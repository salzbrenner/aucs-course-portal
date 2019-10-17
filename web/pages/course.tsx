import React, { Component } from 'react';
import dynamic from 'next/dist/next-server/lib/dynamic';

const FormCourseOverviewDynamic = dynamic(
  () => import('../components/FormCourseOverview'),
  {
    ssr: false,
  }
);

type Props = {};

class Course extends Component<Props> {
  render() {
    return (
      <>
        <FormCourseOverviewDynamic />
      </>
    );
  }
}

export default Course;
