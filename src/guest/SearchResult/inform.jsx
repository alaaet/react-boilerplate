import React from "react";
import { Route, Switch } from "react-router-dom";
import PublicAlert from "./publicAlert";

function Inform({ match }) {
  const { path } = match;
  return (
    <div className="container pb-3">
    <div className="container ">
      <Switch>
        <Route path={"/:id/:hash?"} component={PublicAlert} />
      </Switch>
      </div>
      <br/>
      </div>
  );
}

export default Inform;
