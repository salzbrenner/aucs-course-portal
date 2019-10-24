import {
  MsalAuthProvider,
  LoginType,
} from 'react-aad-msal';

// The auth provider should be a singleton. Best practice is to only have it ever instantiated once.
// Avoid creating an instance inside the component it will be recreated on each render.
// If two providers are created on the same page it will cause authentication errors.
export const authProvider = new MsalAuthProvider(
  {
    auth: {
      clientId: process.env.MSAL_CLIENT_ID as string,
      authority: process.env.MSAL_AUTHORITY,
      validateAuthority: true,
      redirectUri: 'http://localhost:3000',
      postLogoutRedirectUri: 'http://localhost:3000',
      navigateToLoginRequestUrl: false,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
    system: {
      navigateFrameWait: 0,
    },
  },
  {
    scopes: ['openid', 'email', 'profile'],
  },
  LoginType.Popup
);

export default authProvider;
