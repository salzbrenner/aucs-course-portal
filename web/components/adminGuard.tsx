import { useAppContext } from '../state';
import React, { useEffect } from 'react';
import {
  redirectServerToHome,
  redirectToHome,
} from '../lib/redirect-service';
import { NextComponentType, NextPageContext } from 'next';

// TODO: implement saving role to localStorage so the component won't
// redirect on reload
const adminGuard = (
  Component: NextComponentType
): React.FC => {
  const WrapperComponent = ({ ...props }) => {
    const [{ user }, dispatch] = useAppContext();

    const isAdmin = () => {
      return user.role > 0;
    };

    useEffect(() => {
      if (!isAdmin()) {
        // redirectToHome();
      }
    }, []);

    return !isAdmin() ? null : <Component {...props} />;
  };

  WrapperComponent.getInitialProps = async (
    ctx: NextPageContext
  ) => {
    if (ctx.res) {
      // redirectServerToHome(ctx.res);
    }

    if (Component.getInitialProps) {
      const wrappedProps = await Component.getInitialProps(
        ctx
      );
      return { ...wrappedProps };
    }
  };

  return WrapperComponent;
};

export default adminGuard;
