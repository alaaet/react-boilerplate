import React from "react";
import { Route, Switch } from "react-router-dom";
import WorkWithUs from "./workWithUs/index";
import AboutUs from "./aboutUs";
import ContactUs from "./contactUs";

const Company = ({ history, match }) => {
  const { path } = match;
  return (
    <div className="container">
      <Switch>
        <Route path={`${path}/work-with-us`} component={WorkWithUs} />
        <Route path={`${path}/about-us`} component={AboutUs} />
        <Route path={`${path}/contact-us`} component={ContactUs} />
      </Switch>
    </div>
  );
};

export default Company;
