import React, { Component } from 'react';
import { getCourses } from '../lib/api-public.service';
import Link from 'next/link';
import { CourseProps } from '../hoc/withCourseData';
import { NextPageContext } from 'next';
import Graph from '../components/Graph';

type Props = {
  courses?: CourseProps[];
};

export default class index extends Component<Props> {
  static async getInitialProps(ctx: NextPageContext) {
    const res = await getCourses();
    return { courses: res.data };
  }

  render() {
    return (
      <div className={`graph-container`}>
        <Link href="/admin">
          <a>Admin</a>
        </Link>
        <div className={`graph-container`}>
          <Graph />

          <style jsx>{`
            .graph-container {
              position: fixed;
              right: 0;
              top: 0;
              bottom: 0;
              left: 0;
              padding: 0 20px;
            }
          `}</style>
        </div>
      </div>
    );
  }
}
