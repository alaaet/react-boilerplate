import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./notFound";
import Inform from "./inform";

const Guest = ({ history, match }) => {
  const { path } = match;
  return (
    <div className="container pb-3">
      <Switch>
        <Route path={`${path}/not-found`} component={NotFound} />
        <Route path={"/:id"} component={Inform} />
      </Switch>
      <br />
    </div>
  );
};

export default Guest;
