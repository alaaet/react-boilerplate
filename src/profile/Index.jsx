import React from "react";
import { Route, Switch } from "react-router-dom";
import { PublicProfile } from "./PublicProfile";
import { Update } from "./Update";

function Profile({ match }) {
  const { path } = match;

  return (
    <div className="container ">
      <Switch>
        <Route exact path={path} component={PublicProfile} />
        <Route path={`${path}/update`} component={Update} />
      </Switch>
    </div>
  );
}

export { Profile };
