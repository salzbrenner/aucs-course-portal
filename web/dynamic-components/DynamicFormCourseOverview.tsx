import dynamic from 'next/dist/next-server/lib/dynamic';
import React from 'react';
import { FormCourseOverviewProps } from '../components/FormCourseOverview';

const FormCourseOverviewDynamic = dynamic(
  () => import('../components/FormCourseOverview'),
  {
    ssr: false,
  }
);

export default (props: FormCourseOverviewProps) => (
  <FormCourseOverviewDynamic {...props} />
);
