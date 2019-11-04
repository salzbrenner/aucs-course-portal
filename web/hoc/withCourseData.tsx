import React, { useEffect, useState } from 'react';
import { useAsyncEffect } from '../lib/async-use-effect';
import MaxContainer from '../components/MaxContainer';
import { getCourse } from '../lib/api-public.service';
import { NextComponentType } from 'next';
import { AppPageCtx, AppPageProps } from '../pages/_app';
import {
  redirectServerToHome,
  redirectToHome,
} from '../lib/redirect-service';
import { useAppContext } from '../state';

export interface CourseMetricInterface {
  total: number;
  occurrences: { [k: number]: number };
  percentages: { [k: number]: number };
}

export interface CourseProps {
  cid: number;
  name: string;
  instructor: string;
  description?: string;
  prereq: { [k: number]: string };
  qualities?: CourseMetricInterface;
  difficulties?: CourseMetricInterface;
  times?: CourseMetricInterface;
}

export interface CourseContainerProps
  extends AppPageProps,
    CourseProps {}

const withCourseData = <
  T extends CourseContainerProps = CourseContainerProps
>(
  Component: NextComponentType<
    AppPageCtx,
    CourseContainerProps,
    CourseContainerProps
  >
) => {
  const WrapperComponent = ({ ...props }) => {
    const { courseData, apiPublic, apiAuth } = props;
    const [coursesState, setCoursesState] = useState(
      courseData
    );
    const [{ courses }] = useAppContext();
    // const [
    //   currentCourseData,
    //   setCurrentCourseData,
    // ] = useState(courseData);

    useEffect(() => {
      // const res = await apiPublic
      //   .getCourse(`${courseData.cid}`)
      // .catch((err: any) => err);
      // const data = await res.data;
      // setCurrentCourseData(data)
      if (courses[courseData.cid]) {
        setCoursesState(courses[courseData.cid]);
      }
    }, [courses]);

    return (
      <MaxContainer>
        <Component {...coursesState} apiAuth={apiAuth} />
      </MaxContainer>
    );
  };

  WrapperComponent.getInitialProps = async (
    ctx: AppPageCtx
  ) => {
    const res = await getCourse(ctx.query.cid as string);
    const data = await res.data;

    if (!data) {
      redirectServerToHome(ctx.res);
    }

    if (Component.getInitialProps) {
      const wrappedProps = await Component.getInitialProps(
        ctx
      );
      return { ...wrappedProps, courseData: data };
    }

    return {
      courseData: data,
    };
  };

  return WrapperComponent;
};

export default withCourseData;
