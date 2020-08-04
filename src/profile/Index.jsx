import React from "react";
import { Route, Switch } from "react-router-dom";
import { PublicProfile } from "./PublicProfile";
import { Update } from "./Update";
import NewOrUpdateAlert from "../tags/newOrUpdateAlert";

function Profile({ match }) {
  const { path } = match;

  return (
    <div className="container pb-3">
      <Switch>
        <Route exact path={path} component={PublicProfile} />
        <Route path={`${path}/update`} component={Update} />
        <Route
          path={`${path}/update-alert/:tagId`}
          component={NewOrUpdateAlert}
        />
      </Switch>
    </div>
  );
}

export { Profile };
