import React from "react";
import { Route, Switch } from "react-router-dom";
import PublicAlert from "./publicAlert";

function Inform({ match }) {
  const { path } = match;
  return (
    <div className="container ">
      <Switch>
        <Route exact path={path} component={PublicAlert} />
      </Switch>
    </div>
  );
}

export default Inform;
