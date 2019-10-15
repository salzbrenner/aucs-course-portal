import React, { useContext, useEffect } from 'react';
import { IAccountInfo } from 'react-aad-msal';
import { useUserState } from '../state';
import { useAsyncEffect } from '../lib/async-use-effect';
import { getUser } from '../lib/api-auth.service';

const UserContextLogin = ({
  accountInfo,
}: {
  accountInfo: IAccountInfo | null;
}) => {
  const [{ uid, email }, dispatch] = useUserState();

  function setUserState(
    name: string,
    email: string,
    sub: string
  ) {
    dispatch({
      type: 'SIGN_IN',
      payload: {
        name,
        email,
        uid: sub,
        // token: accountInfo!.jwtIdToken,
      },
    });
  }

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

    const createdRes = await createUser(sub, email)
      .then(res => {
        uid = res.data.id;
        setUserState(name, email, uid);
      })
      .catch(async err => {
        uid = err.response.data.id;
        setUserState(name, email, uid);
        if (err.response.status === 422) {
          const user = await getUser(uid);
          console.log(user.data);
        }
        return err;
      });
  }, []);

  return null;
};

export default UserContextLogin;
