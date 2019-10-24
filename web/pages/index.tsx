import React, { Component } from 'react';
import { getCourses } from '../lib/api-public.service';
import MSALDynamic from '../components/MSALProvider';
import Link from 'next/link';
import { CourseProps } from '../components/CourseContainer';
import CourseMenu from '../components/CourseMenu';
import { NextPageContext } from 'next';

/* First we import the consumer */
type Props = {
  courses?: CourseProps[];
};

export default class index extends Component<Props> {
  xxx: any;
  // Async operation with getInitialProps
  static async getInitialProps(ctx: NextPageContext) {
    // res is assigned the response once the axios
    // async get is completed
    const res = await getCourses();
    return { courses: res.data };
  }

  async componentDidMount() {
    const { protect } = await import(
      '../lib/api-auth.service'
    );
  }

  async x() {
    const res = await this.xxx();
    console.log(res);
  }

  render() {
    return (
      <div>
        <Link href="/admin">
          <a>Admin</a>
        </Link>
        <button onClick={() => this.x()}>ddd</button>
      </div>
    );
  }
}
