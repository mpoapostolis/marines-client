import React from "react";
import { Switch, Route } from "react-router";
import List from "./List";
import New from "./New";

function Spots() {
  return (
    <Switch>
      <Route path="/vessels" exact component={List} />
      <Route path="/vessels/:id" exact component={New} />
    </Switch>
  );
}

export default Spots;
