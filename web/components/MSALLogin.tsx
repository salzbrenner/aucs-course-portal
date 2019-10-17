import React from 'react';
import { authProvider } from '../lib/auth-provider';
import {
  AzureAD,
  AuthenticationState,
  IAzureADFunctionProps,
} from 'react-aad-msal';
import UserContextLogin from './UserContextLogin';

const MSALLogin = () => (
  <AzureAD provider={authProvider}>
    {({
      login,
      logout,
      authenticationState,
      accountInfo,
    }: IAzureADFunctionProps) => {
      if (
        authenticationState ===
        AuthenticationState.Authenticated
      ) {
        //TODO: after some time, the email disappears
        // perhaps on token refresh?
        // console.log(accountInfo);
        return (
          <>
            <UserContextLogin accountInfo={accountInfo} />
            <button onClick={logout} className="Button">
              Logout
            </button>
          </>
        );
      } else if (
        authenticationState ===
        AuthenticationState.Unauthenticated
      ) {
        return (
          <button className="Button" onClick={login}>
            Login
          </button>
        );
      }
    }}
  </AzureAD>
);

export default MSALLogin;
