import React, { useContext, useEffect } from 'react';
import {
  IAccountInfo,
  IAzureADFunctionProps,
} from 'react-aad-msal';
import { useAppContext } from '../state';
import { useAsyncEffect } from '../lib/async-use-effect';
import { userActions } from '../state/reducers/userReducer';
import { ApiAuthInterface } from '../lib/api-auth.service';
import { VotingCategoriesInterface } from './FormVote';

interface LoginProps {
  accountInfo: IAccountInfo | null;
  apiAuth: ApiAuthInterface;
  logoutHandler: IAzureADFunctionProps['logout'];
}

const UserLogin = ({
  accountInfo,
  apiAuth,
  logoutHandler,
}: LoginProps) => {
  const [{}, dispatch] = useAppContext();

  const setUserState = (
    name: string,
    email: string,
    id: string,
    role: number,
    votes: {
      [courseId: number]: VotingCategoriesInterface;
    }
  ) => {
    dispatch({
      type: userActions.SIGN_IN,
      payload: {
        name,
        email,
        id,
        role,
        votes,
      },
    });
  };

  useAsyncEffect(async () => {
    const { createUser, getUser } = apiAuth;
    const {
      name,
      email,
      sub,
    } = accountInfo!.account.idTokenClaims;

    const user = await getUser(sub).catch(
      err => err.response
    );
    // failed JWT auth - they don't belong to Auburn
    if (
      user.statusText.toLowerCase() === 'unauthorized' &&
      user.data.toLowerCase() === 'invalid jwt'
    ) {
      alert(
        'Logging in with Microsoft is limited to Auburn University members'
      );
      logoutHandler();
    }
    // doesn't exist, need to create
    else if (user.status === 404) {
      const newUser = await createUser(sub, email).catch(
        err => err.response
      );
      if (newUser.status === 201) {
        const user = await getUser(sub);
        const { id, role, votes } = user.data;
        apiAuth.userRole = role;
        setUserState(name, email, id, role, votes);
      }
    }
    // passed auth and already created
    else {
      const { id, role, votes } = user.data;
      apiAuth.userRole = role;
      setUserState(name, email, id, role, votes);
    }
  }, []);

  return null;
};

export default UserLogin;
