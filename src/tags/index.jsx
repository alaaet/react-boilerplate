import React from "react";
import Activate from "./activate";
import TagsList from "./tagsList";
import { Route, Switch } from "react-router-dom";

function Tags({ match }) {
  const { path } = match;
  return (
    <div className="container">
      <Activate />
      <Switch>
        <Route path={path} component={TagsList} />
      </Switch>
    </div>
  );
}

export { Tags };
