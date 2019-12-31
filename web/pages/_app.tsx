import React from 'react';
import App from 'next/app';
import { AppContext, AppProvider } from '../state';
import MainPageLayout from '../layouts/main';
import { authProvider } from '../lib/auth-provider';
import * as apiPublic from '../lib/api-public.service';
import { NextPageContext } from 'next';
import { ApiAuthInterface } from '../lib/api-auth.service';
import Modal from 'react-modal';
import withGA from 'next-ga';
import Router from 'next/router';

export interface AppPageCtx extends NextPageContext {
  apiPublic: any;
  apiAuth: ApiAuthInterface;
}

export interface AppPageProps {
  apiPublic: any;
  apiAuth: ApiAuthInterface;
  authProvider: any;
}

class MyApp extends App<AppPageProps> {
  state = {
    authProvider: null,
    apiAuth: null,
    apiPublic: apiPublic,
  };

  static contextType = AppContext;
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    ctx.apiPublic = apiPublic;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
      apiPublic,
    };
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
    const { Component, pageProps } = this.props;
    return (
      <>
        <AppProvider>
          <MainPageLayout
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

export default withGA('UA-89535667-5', Router)(MyApp);
