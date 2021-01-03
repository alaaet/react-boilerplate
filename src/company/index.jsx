import React from "react";
import { Route, Switch } from "react-router-dom";
import WorkWithUs from "./workWithUs/index";
import AboutUs from "./aboutUs";
import ContactUs from "./contactUs";
import DetailedJobView from "./workWithUs/detailedJobView";
import Policy from "./policy";

const Company = ({ history, match }) => {
  const { path } = match;
  return (
    <div className="container">
      <Switch>
        <Route
          path={`${path}/work-with-us`}
          history={history}
          component={WorkWithUs}
        />
        <Route path={`${path}/about-us`} component={AboutUs} />
        <Route path={`${path}/contact-us`} component={ContactUs} />
        <Route path={`${path}/detailed/:jobId`} component={DetailedJobView} />
        <Route path={`${path}/privacy-policy`} component={ Policy}/>
      </Switch>
    </div>
  );
};

export default Company;
