import React from 'react';
import App from 'next/app';
import { AppContext, AppProvider } from '../state';
import { getCourses } from '../lib/api-public.service';
import MainPageLayout from '../layouts/main';
import { authProvider } from '../lib/auth-provider';

export default class MyApp extends App {
  static contextType = AppContext;

  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};
    const res = await getCourses();
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, courses: res.data };
  }

  async componentDidMount() {
    const { authProvider } = await import(
      '../lib/auth-provider'
    );
    console.log(authProvider);
  }

  render() {
    const { Component, pageProps, courses } = this
      .props as any;
    return (
      <>
        <AppProvider>
          <MainPageLayout courses={courses}>
            <Component {...pageProps} />
          </MainPageLayout>
        </AppProvider>
      </>
    );
  }
}
