import Link from 'next/link';
import * as React from 'react';

type CourseLinkProps = {
  name: string;
  cid: number;
};
const CourseLink = (props: CourseLinkProps) => (
  <li>
    <Link
      href={`/course/[cid]`}
      as={`/course/${props.cid}`}
    >
      <a>{props.name}</a>
    </Link>
  </li>
);

export default CourseLink;
