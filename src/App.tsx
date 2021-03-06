import React from "react";
import { CssBaseline } from "@material-ui/core";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import routes from "routes";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";

export default function App(): JSX.Element {
  return (
    <Router>
      <CssBaseline />

      <Switch>
        {routes.map((route, i) =>
          (route.protected ? (
            <ProtectedRoute key={i} path={route.path} exact={route.exact}>
              <route.component />
            </ProtectedRoute>
          ) : (
            <Route key={i} path={route.path} exact={route.exact}>
              <route.component />
            </Route>
          )),
        )}
      </Switch>
    </Router>
  );
}
