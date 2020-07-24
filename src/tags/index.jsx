import React from "react";
import { Route, Switch } from "react-router-dom";
import MyTags from "./my-tags";
import Overview from "./Overview";
import Activate from "./Activate";

function Tags({ match }) {
  const { path } = match;
  return (
    <div className="p-4">
      <div className="container">
        <Switch>
          <Route exact path={path} component={Overview} />
          <Route path={`${path}/my-tags`} component={MyTags} />
          <Route path={`${path}/activate`} component={Activate} />
        </Switch>
      </div>
    </div>
  );
}

export { Tags };
