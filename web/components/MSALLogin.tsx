import React, { useState } from 'react';
import {
  AzureAD,
  AuthenticationState,
  IAzureADFunctionProps,
  MsalAuthProvider,
} from 'react-aad-msal';
import UserLogin from './UserLogin';
import Modal from 'react-modal';
import { useAppContext } from '../state';
import { breakpoints, colors } from './GlobalStyles';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 11,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    maxWidth: '400px',
  },
};

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
}) => {
  const [modalIsOpen, setModalState] = useState(false);
  const [{ user }] = useAppContext();

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <AzureAD provider={authProvider}>
      {({
        login,
        logout,
        authenticationState,
        accountInfo,
      }: IAzureADFunctionProps) => {
        const deleteAccount = async () => {
          const res = await apiAuth.deleteAccount(
            user.id as string
          );

          if (res.data) {
            logout();
          }
        };

        if (
          authenticationState ===
          AuthenticationState.Authenticated
        ) {
          //TODO: after some time, the email disappears
          // perhaps on token refresh?
          // console.log(accountInfo);
          return (
            <div className={'msal-wrap'}>
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

              <button
                onClick={openModal}
                className="link link--border delete"
              >
                Delete Account
              </button>

              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
              >
                <p>
                  Deleting your account will remove all
                  records of your feedback.
                </p>

                <p>
                  You will have to rate the courses again if
                  you login in the future.
                </p>

                <button
                  className={
                    'link link--smaller-font link--border'
                  }
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  className={
                    'link link--smaller-font danger'
                  }
                  onClick={deleteAccount}
                >
                  Delete Account
                </button>
              </Modal>

              <style jsx>{`
                .delete {
                  margin-left: 10px;
                }

                .danger {
                  margin-left: 30px;
                  color: ${colors.b};
                }

                @media screen and (max-width: ${breakpoints.md}) {
                  .link {
                    font-size: 10px;
                  }
                }
              `}</style>
            </div>
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
};

export default MSALLogin;
