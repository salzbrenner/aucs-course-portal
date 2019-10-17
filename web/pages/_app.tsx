import React from 'react';
import App from 'next/app';
import Test from '../prototypes/MsalProto';
import { UserContext, UserProvider } from '../state';
import MSALDynamic from '../components/MSALProvider';

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

    //@ts-ignore
    ctx.xxx = this.contextType.displayName;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <UserProvider>
        <MSALDynamic />

        <Component
          {...pageProps}
          context={this.state.context}
        />
      </UserProvider>
    );
  }
}
