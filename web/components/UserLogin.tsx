import React, { useContext, useEffect } from 'react';
import { IAccountInfo } from 'react-aad-msal';
import { userActions, useAppContext } from '../state';
import { useAsyncEffect } from '../lib/async-use-effect';

const UserLogin = ({
  accountInfo,
}: {
  accountInfo: IAccountInfo | null;
}) => {
  const [{}, dispatch] = useAppContext();

  const setUserState = (
    name: string,
    email: string,
    uid: string,
    role: number
  ) => {
    dispatch({
      type: userActions.SIGN_IN,
      payload: {
        name,
        email,
        uid,
        role,
        // token: accountInfo!.jwtIdToken,
      },
    });
  };

  useAsyncEffect(async () => {
    const { createUser } = await import(
      '../lib/api-auth.service'
    );

    const {
      name,
      email,
      sub,
      // tid,
    } = accountInfo!.account.idTokenClaims;

    let uid: string;

    // API returns same response.data whether user was
    // created or not <id, role>
    const createdRes = await createUser(sub, email).catch(
      err => {
        return err.response;
      }
    );

    if (createdRes.data) {
      const { id, role } = createdRes.data;
      setUserState(name, email, id, role);
      // TODO: maybe grab courses as well, and then update state again
      // await getUser(id).catch(err => console.log("No user with that ID", err.response))
    }
  }, []);

  return null;
};

export default UserLogin;
