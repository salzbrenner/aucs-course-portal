import React, { useEffect, useState } from 'react';
import Head from 'next/dist/next-server/lib/head';
import GlobalStyles, {
  breakpoints,
  colors,
} from '../components/GlobalStyles';
import Sidebar from '../components/Sidebar';
import CourseMenu from '../components/CourseMenu';
import { NextComponentType } from 'next';
import { CourseProps } from '../hoc/withCourseData';
import { MsalAuthProvider } from 'react-aad-msal';
import { ApiAuthInterface } from '../lib/api-auth.service';
import Header from '../components/Header';
import { useAppContext } from '../state';
import { coursesActions } from '../state/reducers/coursesReducer';
import {
  default as apiPublic,
  getCourses,
} from '../lib/api-public.service';
import { useAsyncEffect } from '../lib/async-use-effect';

const MainPageLayout: NextComponentType<
  {},
  {},
  {
    courses: CourseProps[];
    apiAuth: ApiAuthInterface;
    authProvider: MsalAuthProvider;
  }
> = ({ children, authProvider, apiAuth, courses }) => {
  const [{}, dispatch] = useAppContext();
  const [sidebarOpen, toggleSidebar] = useState(false);

  useAsyncEffect(async () => {
    // initial static population
    dispatch({
      type: coursesActions.POPULATE_COURSES,
      payload: courses,
    });

    // updated dynamic population
    const res = await getCourses();
    dispatch({
      type: coursesActions.POPULATE_COURSES,
      payload: res.data,
    });
  }, []);

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta charSet="utf-8" />

        <link
          href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.min.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css"
          type="text/css"
        />
      </Head>
      <GlobalStyles />
      <div className="layout">
        <button
          className={'button sidebar-toggle'}
          onClick={() => toggleSidebar(!sidebarOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="header-wrap">
          <Header
            authProvider={authProvider}
            apiAuth={apiAuth}
          />
        </div>
        <div className="content">
          <div className="header-spacer" />
          <main className={'main'}>{children}</main>
        </div>

        <div
          className={`sidebar-wrap ${
            sidebarOpen ? 'sidebar-open' : ''
          }`}
        >
          <Sidebar>
            <p className={'color-body-bg'}>Courses</p>
            <CourseMenu courses={courses} />
          </Sidebar>
        </div>
      </div>

      <style jsx>
        {`
          .layout {
            display: flex;
          }

          .header-spacer {
            height: 47px;
          }
          .header-wrap {
            position: fixed;
            left: 0;
            right: 0;
            width: 100%;
            z-index: 1;
          }

          .sidebar-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 20px;
            z-index: 11;
          }

          .sidebar-toggle span {
            width: 25px;
            height: 2px;
            background: ${colors.secondary};
          }

          .sidebar-wrap {
            position: fixed;
            z-index: 10;
            top: 0;
            bottom: 0;
            right: ${sidebarOpen ? '0' : '-100%'};
            min-height: 100vh;
            width: 300px;
            min-width: 300px;
            background: ${colors.primary};
            overflow: auto;
            transition: right 0.2s ease;
          }

          .main {
            padding-top: 50px;
          }

          @media screen and (min-width: ${breakpoints.md}) {
            .sidebar-wrap {
              position: relative;
              right: 0;
            }

            .sidebar-toggle {
              display: none;
            }

            .content {
              min-width: calc(100% - 300px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MainPageLayout;
