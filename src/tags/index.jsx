import React from "react";

import TagsList from "./tagsList";
import { Route, Switch } from "react-router-dom";
import Edit from "./edit";

function Tags({ match }) {
  const { path } = match;
  //console.log("tags path: ", path);
  return (
    <div className="container pb-5">
      <Switch>
        <Route path={`${path}/edit/:tagId`} component={Edit} />        
        <Route exact path={`${path}/:tagId?`} component={TagsList} />
      </Switch>
    </div>
  );
}

export { Tags };
