import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import { Role, history } from "@/_helpers";
import { accountService } from "@/_services";
import { Nav, PrivateRoute, Alert, Footer, NotFoundPage } from "@/_components";
import { Home } from "@/home";
import { Profile } from "@/profile";
import { Admin } from "@/admin";
import { User } from "@/user";
import { Account } from "@/account";
import { Tags } from "@/tags";
import Inbox from "../inbox";
import { Alerts } from "@/alerts";
import Company from "../company";
import Guest from "../guest";
import { useTranslation } from "react-i18next";

function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  };
  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang !== null) changeLanguage(lang);
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  return (
    <div className={"app-container pb-4 " + user}>
      <Nav
        lng={i18n.languages[0]}
        changeLanguage={changeLanguage}
        history={history}
      />
      <Alert />
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
        <PrivateRoute path="/tags" component={Tags} />
        <PrivateRoute path="/inbox" component={Inbox} />
        <PrivateRoute path="/alerts" component={Alerts} />
        <PrivateRoute path="/user/:tab?" component={User} />
        <Route path="/account" component={Account} />
        <Route path="/company" component={Company} />
        <Route path="/guest" component={Guest} />
        <Route path={/^\/.{0,6}$/} component={Guest} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export { App };
