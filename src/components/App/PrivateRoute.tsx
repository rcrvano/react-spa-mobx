import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useStores } from 'stores';

interface PrivateRouteProps extends RouteProps {
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
  const { authStore } = useStores();
  const {
    ...rest
  } = props;

  return useObserver(() => {
    if (!authStore.isAuthenticated()) {
      return (
        <Route
          render={(): JSX.Element => (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  referer: props.location,
                  loginRequired: true,
                }
              }}
            />
          )}
        />
      );
    }

    return (
      <Route
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    );
  });
};

export default PrivateRoute;
