import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { Route, useHistory } from "react-router";
import NotFound from "./NotFound";
import Spots from "./Spots";
import Marines from "./Marines";

export function Render() {
  const history = useHistory();
  return <h1>{history.location.pathname}</h1>;
}

const Routes = () => (
  <>
    <Switch>
      <Route component={NotFound} exact path="/not-found" />
      <Route path="/spots" component={Spots} />
      <Route path="/marines" component={Marines} />
      <Route path="/" component={Render} />
      <Redirect to="/not-found" />
    </Switch>
  </>
);

export default Routes;
