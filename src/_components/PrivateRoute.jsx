import React from "react";
import { Route, Redirect } from "react-router-dom";

import { accountService } from "@/_services";

function PrivateRoute({ component: Component, roles, path, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        let user = accountService.userValue;
        let ss_user = JSON.parse(sessionStorage.getItem("user"));

        if (path.startsWith("/guest")) {
          return <Component {...props} />; //Guest section does not need authorization
        }
        if (!user) {
          //console.log(ss_user);
          if (ss_user == null) {
            //console.log("User is not logged in");
            // not logged in so redirect to login page with the return url
            return (
              <Redirect
                to={{
                  pathname: "/guest",
                  state: { from: props.location },
                }}
              />
            );
          } else {
            //console.log("User was set from session storage");
            accountService.setUser(ss_user);
          }
        }

        // check if route is restricted by role
        if (user && roles && roles.indexOf(user.role) === -1) {
          // role not authorized so redirect to home page
          return <Redirect to={{ pathname: "/" }} />;
        }

        // authorized so return component
        return <Component {...props} />;
      }}
    />
  );
}

export { PrivateRoute };
