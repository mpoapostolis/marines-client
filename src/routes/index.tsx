import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { Route, useHistory } from "react-router";
import NotFound from "./NotFound";
import Vessels from "./Vessels";
import Home from "./Home";
import AuthWrapper from "../components/AuthWrapper";

export function Render() {
  const history = useHistory();
  return <span>{history.location.pathname}</span>;
}

const Routes = () => (
  <>
    <Switch>
      <Route component={NotFound} exact path="/not-found" />
      <Route path="/vessels">
        <Vessels />
      </Route>
      <Route exact path="/">
        <AuthWrapper redirect reqPerm={["view:spots"]}>
          <Home />
        </AuthWrapper>
      </Route>
      <Redirect to="/not-found" />
    </Switch>
  </>
);

export default Routes;
