import React, { Component } from 'react';
import { getCourses } from '../lib/api-public.service';
import MSALDynamic from '../components/MSALProvider';
import Link from 'next/link';

/* First we import the consumer */
type Props = {
  courses?: any;
};

export default class index extends Component<Props> {
  xxx: any;
  // Async operation with getInitialProps
  static async getInitialProps(ctx: any) {
    // res is assigned the response once the axios
    // async get is completed
    const res = await getCourses();
    return { courses: res.data };
  }

  async componentDidMount() {
    const { protect } = await import(
      '../lib/api-auth.service'
    );
    // this.xxx = protect;
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
        <h1>{this.props.courses[0].name}</h1>
      </div>
    );
  }
}
