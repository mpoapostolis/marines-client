import React from "react";
import { Switch, Route } from "react-router";
import List from "./List";
import New from "./New";

function Marines() {
  return (
    <Switch>
      <Route path="/marines" exact component={List} />
      <Route path="/marines/:id" exact component={New} />
    </Switch>
  );
}

export default Marines;
