import React, { Component } from 'react';
import adminGuard from '../hoc/adminGuard';
import { NextComponentType } from 'next';
import MaxContainer from '../components/MaxContainer';
import DynamicFormCourseOverview from '../dynamic-components/DynamicFormCourseOverview';
import { AppContext } from '../state';
import { coursesActions } from '../state/reducers/coursesReducer';
import { AppPageProps } from './_app';

class Admin extends Component<AppPageProps> {
  static contextType = AppContext;

  state = {
    handler: null,
  };

  async componentDidMount() {
    const { createCourse } = this.props.apiAuth;
    this.setState({
      handler: createCourse,
    });
  }

  render() {
    return (
      <MaxContainer>
        <DynamicFormCourseOverview
          cid={999999999}
          position={0}
          prereq={{ 0: '' }}
          instructor={''}
          name={''}
          submitHandler={this.state.handler!}
          submitActionType={coursesActions.ADD_COURSE}
        />
      </MaxContainer>
    );
  }
}

export default adminGuard(Admin as any);
