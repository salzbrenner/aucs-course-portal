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
import unfetch from 'isomorphic-unfetch';

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
  position: number;
  qualities?: CourseMetricInterface;
  difficulties?: CourseMetricInterface;
  time?: CourseMetricInterface;
}

export interface CourseContainerProps extends AppPageProps {
  courseData: CourseProps;
}

const withCourseData = <
  T extends CourseContainerProps = CourseContainerProps
>(
  Component: NextComponentType<
    AppPageCtx,
    CourseContainerProps,
    CourseContainerProps
  >
) => {
  const WrapperComponent = (
    props: CourseContainerProps
  ) => {
    // initial static server data
    const { courseData, ...rest } = props;
    // dynamic updated data (i.e. votes)
    const [{ courses }] = useAppContext();

    const [dynamicCourse, setDynamicCourse] = useState(
      courseData
    );

    useEffect(() => {
      const courseContext: CourseProps =
        courses[courseData.cid];
      setDynamicCourse(courseContext);
    }, [courses]);

    return (
      <MaxContainer>
        {dynamicCourse && (
          <Component courseData={dynamicCourse} {...rest} />
        )}
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
