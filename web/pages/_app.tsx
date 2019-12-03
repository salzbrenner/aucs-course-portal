import React from 'react';
import App from 'next/app';
import { AppContext, AppProvider } from '../state';
import { getCourses } from '../lib/api-public.service';
import MainPageLayout from '../layouts/main';
import { authProvider } from '../lib/auth-provider';
import * as apiPublic from '../lib/api-public.service';
import { NextPageContext } from 'next';
import { ApiAuthInterface } from '../lib/api-auth.service';
import Modal from 'react-modal';
import { CourseProps } from '../hoc/withCourseData';

export interface AppPageCtx extends NextPageContext {
  apiPublic: any;
  apiAuth: ApiAuthInterface;
}

export interface AppPageProps {
  apiPublic: any;
  apiAuth: ApiAuthInterface;
  authProvider: any;
  courses: CourseProps;
}

export default class MyApp extends App<AppPageProps> {
  state = {
    authProvider: null,
    apiAuth: null,
    apiPublic: apiPublic,
    courses: this.props.courses,
  };

  static contextType = AppContext;
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};
    const res = await getCourses();
    ctx.apiPublic = apiPublic;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, courses: res.data, apiPublic };
  }

  async componentDidMount() {
    const { authProvider } = await import(
      '../lib/auth-provider'
    );

    const apiAuth = await import('../lib/api-auth.service');
    this.setState({
      authProvider,
      apiAuth: new apiAuth.default(),
    });
  }

  render() {
    const { Component, pageProps, courses } = this
      .props as any;
    return (
      <>
        <AppProvider>
          <MainPageLayout
            courses={courses}
            apiAuth={this.state.apiAuth!}
            authProvider={this.state.authProvider!}
          >
            <Component {...pageProps} {...this.state} />
          </MainPageLayout>
        </AppProvider>
      </>
    );
  }
}

Modal.setAppElement('#__next');
