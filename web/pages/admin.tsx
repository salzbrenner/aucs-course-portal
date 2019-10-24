import React, { Component } from 'react';
import adminGuard from '../components/adminGuard';
import { NextComponentType } from 'next';
import MaxContainer from '../components/MaxContainer';
import DynamicFormCourseOverview from '../components/DynamicFormCourseOverview';
import { createCourse } from '../lib/api-auth.service';

type Props = {};

class Admin extends Component<Props> {
  state = {
    handler: null,
  };

  async componentDidMount() {
    const { createCourse } = await import(
      '../lib/api-auth.service'
    );
    this.setState({
      handler: createCourse,
    });
    console.log(this.props);
  }

  render() {
    return (
      <MaxContainer>
        <DynamicFormCourseOverview
          cid={0}
          instructor={''}
          name={''}
          submitHandler={this.state.handler!}
        />
      </MaxContainer>
    );
  }
}

export default adminGuard(Admin as NextComponentType);
// export default Admin as NextComponentType;
