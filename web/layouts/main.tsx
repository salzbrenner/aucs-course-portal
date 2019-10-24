import React, { FunctionComponent, useState } from 'react';
import Head from 'next/dist/next-server/lib/head';
import GlobalStyles, {
  breakpoints,
  colors,
} from '../components/GlobalStyles';
import Sidebar from '../components/Sidebar';
import CourseMenu from '../components/CourseMenu';
import { UserProvider } from '../state';
import { NextComponentType, NextPageContext } from 'next';
import { CourseProps } from '../components/CourseContainer';
import MSALDynamic from '../components/MSALProvider';

const MainPageLayout: NextComponentType<
  {},
  {},
  { courses: CourseProps[] }
> = ({ children, courses }) => {
  const [sidebarOpen, toggleSidebar] = useState(false);

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta charSet="utf-8" />
        <link
          href="https://fonts.googleapis.com/css?family=Ubuntu:400,700&display=swap"
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
        <div
          className={`sidebar-wrap ${
            sidebarOpen ? 'sidebar-open' : ''
          }`}
        >
          <Sidebar>
            <p className={'color-body-bg'}>Courses</p>
            <CourseMenu courses={courses!} />
          </Sidebar>
        </div>
        <div className="content">
          <MSALDynamic />

          {children}
        </div>
      </div>

      <style jsx>
        {`
          .layout {
            // display: flex;
            // height: 100vh;
          }

          .sidebar-toggle {
            position: fixed;
            top: 20px;
            left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 20px;
            z-index: 1;
          }

          .sidebar-toggle span {
            width: 25px;
            height: 2px;
            background: ${colors.secondary};
          }

          .sidebar-wrap {
            position: fixed;
            top: 0;
            bottom: 0;
            left: ${sidebarOpen ? '0' : '-100%'};
            height: 100%;
            width: 300px;
            background: ${colors.primaryGradient};
            transition: left 0.2s ease;
          }

          @media screen and (min-width: ${breakpoints.md}) {
            .sidebar-wrap {
              left: 0;
            }

            .sidebar-toggle {
              display: none;
            }

            .content {
              margin-left: 300px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MainPageLayout;
