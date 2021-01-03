import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./SearchResult/notFound";
import Inform from "./SearchResult/inform";
import LandingPage from "./LandingPage";
import HelpCenter from "./HelpCenter/index";

const Guest = ({ history, match }) => {
  const { path } = match;
  //console.log("Guest path:",path)
  return (
    <Switch>
      <Route exact path={"/guest"} component={LandingPage} />
      <Route path={`${path}/not-found`} component={NotFound} />
      <Route path={`${path}/help-center`} component={HelpCenter} />
      <Route path={"/:id/:hash?"} component={Inform} />            
    </Switch>
  );
};

export default Guest;
