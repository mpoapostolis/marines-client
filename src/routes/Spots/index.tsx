import React from "react";
import { Switch, Route } from "react-router";
import List from "./List";
import New from "./New";

function Spots() {
  return (
    <Switch>
      <Route path="/spots" exact component={List} />
      <Route path="/spots/:id" exact component={New} />
    </Switch>
  );
}

export default Spots;
