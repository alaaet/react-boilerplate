import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import { Role, history } from "@/_helpers";
import { accountService } from "@/_services";
import { Nav, PrivateRoute, Alert, Footer, NotFoundPage } from "@/_components";
import { Home } from "@/home";
import { Profile } from "@/profile";
import { Admin } from "@/admin";
import { Account } from "@/account";
import { Tags } from "@/tags";
import Inbox from "../inbox";
import Company from "../company";
import Guest from "../guest";

function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  return (
    <div className={"app-container pb-4 " + user}>
      <Nav />
      <Alert />
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
        <PrivateRoute path="/tags" component={Tags} />
        <PrivateRoute path="/inbox" component={Inbox} />
        <Route path="/account" component={Account} />
        <Route path="/company" component={Company} />
        <Route path="/guest" component={Guest} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export { App };
