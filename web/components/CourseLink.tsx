import Link from 'next/link';
import * as React from 'react';
import { CourseProps } from '../hoc/withCourseData';
import { withRouter } from 'next/router';
import { NextComponentType } from 'next';
import { WithRouterProps } from 'next/dist/client/with-router';
import { colors } from './GlobalStyles';

interface Interface extends CourseProps, WithRouterProps {}

const CourseLink = (
  props: CourseProps & WithRouterProps
) => (
  <div
    className={`course-menu__item ${
      props.router.query.cid === `${props.cid}`
        ? 'active'
        : ''
    }`}
  >
    <div className="course-menu__dot" />
    <Link
      href={`/course/[cid]`}
      as={`/course/${props.cid}`}
    >
      <a className={`link link--sidebar `}>
        {props.cid} - {props.name}
      </a>
    </Link>
    <style jsx>
      {`
        .course-menu__item {
          display: flex;
          align-items: center;
        }
        .course-menu__dot {
          border-radius: 50%;
          width: 10px;
          height: 10px;
          border: solid 1px ${colors.secondary};
          transition: background 0.2s ease;
        }

        .course-menu__item.active .course-menu__dot,
        .course-menu__item:hover .course-menu__dot {
          background: ${colors.secondary};
        }

        .link--sidebar {
          color: white;
          opacity: 0.8;
          padding: 10px;
          letter-spacing: 2px;
          text-transform: capitalize;
        }
      `}
    </style>
  </div>
);

export default withRouter(CourseLink as any);
