import React, { Component } from 'react';
import { UserContext } from '../state';
import adminGuard from '../components/adminGuard';
import { NextComponentType } from 'next';
import { getCourses } from '../lib/api-public.service';

/* First we import the consumer */
type Props = {};

class Admin extends Component<Props> {
  static async getInitialProps(ctx: any) {
    const res = await getCourses();
    return { courses: res.data };
  }

  componentDidMount(): void {
    console.log(this.props);
  }

  render() {
    return <h1>admin</h1>;
  }
}

export default adminGuard(Admin as NextComponentType);
