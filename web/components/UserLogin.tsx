import React, { useContext, useEffect } from 'react';
import { IAccountInfo } from 'react-aad-msal';
import { useAppContext } from '../state';
import { useAsyncEffect } from '../lib/async-use-effect';
import { userActions } from '../state/reducers/userReducer';
import { ApiAuthInterface } from '../lib/api-auth.service';

interface LoginProps {
  accountInfo: IAccountInfo | null;
  apiAuth: ApiAuthInterface;
}

const UserLogin = ({
  accountInfo,
  apiAuth,
}: LoginProps) => {
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
    const { createUser } = apiAuth;
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
      apiAuth.userRole = id;

      setUserState(name, email, id, role);
      // TODO: maybe grab courses as well, and then update state again
      // await getUser(id).catch(err => console.log("No user with that ID", err.response))
    }
  }, []);

  return null;
};

export default UserLogin;
