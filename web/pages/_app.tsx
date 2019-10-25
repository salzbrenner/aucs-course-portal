import React from 'react';
import App from 'next/app';
import { AppContext, AppProvider } from '../state';
import { getCourses } from '../lib/api-public.service';
import MainPageLayout from '../layouts/main';
import { authProvider } from '../lib/auth-provider';
import * as apiPublic from '../lib/api-public.service';
import { NextPageContext } from 'next';

export interface AppPageCtx extends NextPageContext {
  apiPublic: any;
}

export interface AppPageProps {
  courses: any;
  apiPublic: any;
}

export default class MyApp extends App {
  state = {
    authProvider: null,
    apiAuth: null,
    apiPublic: apiPublic,
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

    this.setState({ authProvider, apiAuth });
  }

  render() {
    const { Component, pageProps, courses } = this
      .props as any;
    return (
      <>
        <AppProvider>
          <MainPageLayout
            courses={courses}
            authProvider={this.state.authProvider!}
          >
            <Component {...pageProps} {...this.state} />
          </MainPageLayout>
        </AppProvider>
      </>
    );
  }
}
