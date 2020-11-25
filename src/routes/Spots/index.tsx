import React from "react";
import { Switch, Route } from "react-router";
import List from "./List";

function Products() {
  return (
    <Switch>
      <Route path="/spots" exact component={List} />
    </Switch>
  );
}

export default Products;
