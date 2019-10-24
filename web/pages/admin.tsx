import React, { Component } from 'react';
import { UserContext } from '../state';
import adminGuard from '../components/adminGuard';
import { NextComponentType } from 'next';
import { getCourses } from '../lib/api-public.service';
import dynamic from 'next/dist/next-server/lib/dynamic';
import MaxContainer from '../components/MaxContainer';
import DynamicFormCourseOverview from '../components/DynamicFormCourseOverview';
import { createCourse } from '../lib/api-auth.service';

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
    return (
      <MaxContainer>
        <DynamicFormCourseOverview
          cid={0}
          instructor={''}
          name={''}
          submitHandler={createCourse}
        />
      </MaxContainer>
    );
  }
}

export default adminGuard(Admin as NextComponentType);
// export default Admin as NextComponentType;
