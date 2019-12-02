import React from 'react';
import { MsalAuthProvider } from 'react-aad-msal';
import MSALLogin from './MSALLogin';
import { ApiAuthInterface } from '../lib/api-auth.service';
import { useAppContext } from '../state';
import Link from 'next/link';
import { colors } from './GlobalStyles';

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

      {user && user.role > 0 && (
        <Link href="/admin">
          <a className={'link'}>Admin</a>
        </Link>
      )}
      {authProvider && (
        <div className={'spacer'}>
          <MSALLogin
            authProvider={authProvider}
            apiAuth={apiAuth}
          />
        </div>
      )}
      {user && user.name && (
        <>
          <div className={'spacer'}>|</div>
          <span className={'link'}>
            Howdy, {user.name.split(' ')[0]}!
          </span>
        </>
      )}

      <style jsx>{`
        .header {
          display: flex;
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
      `}</style>
    </div>
  );
};

export default Header;
