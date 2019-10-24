import { ReactNode, useEffect, useState } from 'react';
import { useAsyncEffect } from '../lib/async-use-effect';
import MaxContainer from './MaxContainer';
import { getCourse } from '../lib/api-public.service';
import { NextComponentType, NextPageContext } from 'next';
import Course from '../pages/course/[cid]';
import * as React from 'react';

// export type CourseProps = {
//   courseData: {
//     cid: number;
//     name: string;
//     instructor: string;
//     description?: string;
//   };
// };

export interface CourseProps {
  cid: number;
  name: string;
  instructor: string;
  description?: string;
}

export const makeCourseCall = (cid: string) =>
  getCourse(cid).catch(err => err);

const withCourseData = <
  T extends CourseProps = CourseProps
>(
  Component: NextComponentType<
    NextPageContext,
    CourseProps,
    CourseProps
  >
) => {
  const WrapperComponent = ({ ...props }) => {
    const { courseData } = props;

    const [
      currentCourseData,
      setCurrentCourseData,
    ] = useState(courseData);

    useAsyncEffect(async () => {
      const res = await makeCourseCall(`${courseData.cid}`);
      const data = await res.data;

      setCurrentCourseData(data);
    }, []);

    return (
      <MaxContainer>
        <Component {...courseData} />
      </MaxContainer>
    );
  };

  WrapperComponent.getInitialProps = async (
    ctx: NextPageContext
  ) => {
    const res = await makeCourseCall(ctx.query
      .cid as string);
    const data = await res.data;

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
