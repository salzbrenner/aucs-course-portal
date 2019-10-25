import React, { Component } from 'react';
import adminGuard from '../hoc/adminGuard';
import { NextComponentType } from 'next';
import MaxContainer from '../components/MaxContainer';
import DynamicFormCourseOverview from '../dynamic-components/DynamicFormCourseOverview';
import { createCourse } from '../lib/api-auth.service';
import { AppContext } from '../state';
import { coursesActions } from '../state/reducers/coursesReducesr';

type Props = {};

class Admin extends Component<Props> {
  static contextType = AppContext;

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
  }

  render() {
    return (
      <MaxContainer>
        <DynamicFormCourseOverview
          cid={999999999}
          instructor={''}
          name={''}
          submitHandler={this.state.handler!}
          submitActionType={coursesActions.ADD_COURSE}
        />
      </MaxContainer>
    );
  }
}

export default adminGuard(Admin as NextComponentType);
// export default Admin as NextComponentType;
