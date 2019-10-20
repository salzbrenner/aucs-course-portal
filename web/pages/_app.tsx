import React from 'react';
import App, { Container } from 'next/app';
import Test from '../prototypes/MsalProto';
import { UserContext, UserProvider } from '../state';
import MSALDynamic from '../components/MSALProvider';
import GlobalStyles from '../components/GlobalStyles';
import Head from 'next/head';

export default class MyApp extends App {
  static contextType = UserContext;
  state = {
    context: this.context,
  };
  static async getInitialProps({
    Component,
    router,
    ctx,
  }: any) {
    let pageProps = {};

    ctx.xxx = this.contextType.displayName;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700&display=swap"
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
        <UserProvider>
          <GlobalStyles />
          <MSALDynamic />
          <Component
            {...pageProps}
            context={this.state.context}
          />
        </UserProvider>
      </>
    );
  }
}
