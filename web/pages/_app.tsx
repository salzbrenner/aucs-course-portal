import React from 'react';
import App from 'next/app';
import { UserContext, UserProvider } from '../state';
import MSALDynamic from '../components/MSALProvider';
import GlobalStyles from '../components/GlobalStyles';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import { getCourses } from '../lib/api-public.service';
import CourseMenu from '../components/CourseMenu';
import MainPageLayout from '../layouts/main';

export default class MyApp extends App {
  static contextType = UserContext;

  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};
    const res = await getCourses();
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, courses: res.data };
  }

  render() {
    const { Component, pageProps, courses } = this
      .props as any;
    return (
      <>
        <UserProvider>
          <MainPageLayout courses={courses}>
            <Component {...pageProps} />
          </MainPageLayout>
        </UserProvider>
      </>
    );
  }
}
