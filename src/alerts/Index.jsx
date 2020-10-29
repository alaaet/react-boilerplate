import React from "react";
import { Route, Switch } from "react-router-dom";
import { AlertsList } from "./AlertsList";
import NewOrUpdateAlert from "./newOrUpdateAlert";

function Alerts({ match }) {
  const { path } = match;
  //console.log("Alerts path: ", path);
  return (
    <div className="container pb-3">
      <Switch>
        <Route exact path={path} match={path} component={AlertsList} />
        <Route path={`${path}/create/:alertId?`} component={NewOrUpdateAlert} />
        <Route path={`${path}/edit/:alertId?`} component={NewOrUpdateAlert} />
      </Switch>
    </div>
  );
}

export { Alerts };
