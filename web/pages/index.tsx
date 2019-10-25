import React, { Component } from 'react';
import { getCourses } from '../lib/api-public.service';
import Link from 'next/link';
import { CourseProps } from '../hoc/withCourseData';
import { NextPageContext } from 'next';

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
      <div>
        <Link href="/admin">
          <a>Admin</a>
        </Link>
        <h1>
          Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. At commodi culpa explicabo fugit
          itaque officia officiis tempora! Aperiam
          asperiores atque, cupiditate dolore, dolorum
          eligendi necessitatibus quos ratione velit
          voluptatibus voluptatum.
        </h1>
      </div>
    );
  }
}
