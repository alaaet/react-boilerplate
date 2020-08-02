import React from "react";

import TagsList from "./tagsList";
import { Route, Switch } from "react-router-dom";
import Edit from "./edit";

function Tags({ match }) {
  const { path } = match;
  return (
    <div className="container pb-5">
      <Switch>
        <Route path={`${path}/edit/:tagId`} component={Edit} />
        <Route path={path} component={TagsList} />
      </Switch>
    </div>
  );
}

export { Tags };
