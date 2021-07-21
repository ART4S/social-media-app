import React from "react";
import { Route, Redirect } from "react-router-dom";

import useAppSelector from "hooks/useAppSelector";
import { getUser } from "redux/commonSlice";

type ProtectedRouteProps = React.ComponentProps<typeof Route>;

export default function ProtectedRoute({
  children,
  ...routeProps
}: ProtectedRouteProps): JSX.Element {
  const isLoggedIn = useAppSelector((state) => !!getUser(state));

  return (
    <Route
      {...routeProps}
      render={({ location }) =>
        (isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location.pathname,
              },
            }}
          />
        ))}
    />
  );
}
