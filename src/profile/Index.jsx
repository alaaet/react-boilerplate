import React from "react";
import { Route, Switch } from "react-router-dom";
import { PublicProfile } from "./PublicProfile";

function Profile({ match }) {
  const { path } = match;

  return (
    <div className="container pb-3">
      <div className="row">
      <Switch>
        <Route exact path={path} component={PublicProfile} />
      </Switch>
        </div>
    </div>
  );
}

export { Profile };
