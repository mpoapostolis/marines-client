import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { Route, useHistory } from "react-router";
import NotFound from "./NotFound";
import Spots from "./Spots";
import Marines from "./Marines";
import AuthWrapper from "../components/AuthWrapper";

export function Render() {
  const history = useHistory();
  return <h1>{history.location.pathname}</h1>;
}

const Routes = () => (
  <>
    <Switch>
      <Route component={NotFound} exact path="/not-found" />
      <Route path="/spots">
        <AuthWrapper redirect reqPerm={["view:spots", "edit:spots"]}>
          <Spots />
        </AuthWrapper>
      </Route>
      <Route path="/marines">
        <AuthWrapper redirect reqPerm={["view:marines", "edit:marines"]}>
          <Marines />
        </AuthWrapper>
      </Route>
      <Route path="/" component={Render} />
      <Redirect to="/not-found" />
    </Switch>
  </>
);

export default Routes;
