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
}: {
  authProvider: MsalAuthProvider;
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
            <UserLogin accountInfo={accountInfo} />
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
