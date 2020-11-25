import React, { useEffect } from "react";
import { Switch, Redirect } from "react-router-dom";
import { Route, useHistory } from "react-router";
import NotFound from "./NotFound";
import Spots from "./Spots";

import { useAccount } from "../provider";
import { queryCache } from "react-query";

export function Render() {
  const history = useHistory();
  return <h1>{history.location.pathname}</h1>;
}

const Routes = () => {
  const account = useAccount();

  useEffect(() => {
    if (account.store_id) {
      const source = new EventSource(
        `https://www.slourp.tk/api/listen-orders/${account.store_id}?token=${account.token}`
      );
      source.onmessage = () => {
        queryCache.invalidateQueries("pending-notifications");
        queryCache.invalidateQueries("notifications");
      };
    }
  }, []);

  return (
    <>
      <Switch>
        <Route component={NotFound} exact path="/not-found" />
        <Route path="/spots" component={Spots} />
        <Route path="/" component={Render} />
        <Redirect to="/not-found" />
      </Switch>
    </>
  );
};

export default Routes;
