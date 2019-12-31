import React, { useState } from 'react';
import { MsalAuthProvider } from 'react-aad-msal';
import MSALLogin from './MSALLogin';

import { ApiAuthInterface } from '../lib/api-auth.service';
import { useAppContext } from '../state';
import Link from 'next/link';
import { breakpoints, colors } from './GlobalStyles';

export interface HeaderInterface {
  authProvider: MsalAuthProvider;
  apiAuth: ApiAuthInterface;
}

const Header = ({
  authProvider,
  apiAuth,
}: HeaderInterface) => {
  const [{ user }] = useAppContext();

  return (
    <div className={`header`}>
      <div className={'logo'}>
        <img
          className={'img-responsive'}
          src="/logo.png"
          alt="my image"
        />
      </div>

      <Link href="/">
        <a className={'link'}>Home</a>
      </Link>

      <Link href="/about">
        <a className={'link'}>About</a>
      </Link>

      {user && user.role > 0 && (
        <Link href="/admin">
          <a className={'link'}>Admin</a>
        </Link>
      )}

      {user && user.name && (
        <div className={'name'}>
          <div className={'spacer'}>|</div>
          <span className={'link'}>
            Howdy, {user.name.split(' ')[0]}!
          </span>
        </div>
      )}

      {authProvider && (
        <div className={'msal-wrap'}>
          <MSALLogin
            authProvider={authProvider}
            apiAuth={apiAuth}
          />
        </div>
      )}

      <style jsx>{`
        .header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 10px 20px;
          background: white;
          border-bottom: solid 1px ${colors.gray1};
        }

        .logo {
          width: 30px;
          height: 26px;
          margin-right: 20px;
        }

        .spacer,
        .link {
          display: inline-block;
          margin-right: 20px;
        }

        .msal-wrap {
        }

        @media screen and (max-width: ${breakpoints.md}) {
          .link {
            font-size: 10px;
          }

          .name {
            display: none;
          }
        }

        @media screen and (min-width: ${breakpoints.md}) {
          .msal-wrap {
            margin-left: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
