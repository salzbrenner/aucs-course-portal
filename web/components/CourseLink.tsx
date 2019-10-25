import Link from 'next/link';
import * as React from 'react';
import { CourseProps } from '../hoc/withCourseData';

const CourseLink = (props: CourseProps) => (
  <Link href={`/course/[cid]`} as={`/course/${props.cid}`}>
    <a className={'link link--sidebar'}>
      {props.cid} - {props.name}
    </a>
  </Link>
);

export default CourseLink;
