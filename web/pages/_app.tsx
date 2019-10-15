import React from 'react';
import App from 'next/app';
import Test from '../prototypes/MsalProto';
import { UserProvider } from '../state';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    );
  }
}
