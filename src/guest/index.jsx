import React from "react";
import { Route, Switch } from "react-router-dom";
import Inform from "./inform";

const Guest = ({ history, match }) => {
  const { path } = match;
  return (
    <div className="container pb-3">
      <Switch>
        <Route path={`${path}/inform`} component={Inform} />
      </Switch>
      <br />
    </div>
  );
};

export default Guest;
