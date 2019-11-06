import React from 'react';
import {
  AzureAD,
  AuthenticationState,
  IAzureADFunctionProps,
  MsalAuthProvider,
} from 'react-aad-msal';
import UserLogin from './UserLogin';

/**
 * This component has to be rendered dynamically if auth provider
 * is removed from props
 *
 * @param authProvider
 * @constructor
 */
const MSALLogin = ({
  authProvider,
  apiAuth,
}: {
  authProvider: MsalAuthProvider;
  apiAuth: any;
}) => (
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
            <UserLogin
              accountInfo={accountInfo}
              apiAuth={apiAuth}
              logoutHandler={logout}
            />
            <button
              onClick={logout}
              className="link link--border"
            >
              Logout
            </button>
          </>
        );
      } else if (
        authenticationState ===
        AuthenticationState.Unauthenticated
      ) {
        return (
          <button
            className="link link--border"
            onClick={login}
          >
            Login
          </button>
        );
      }
    }}
  </AzureAD>
);

export default MSALLogin;
