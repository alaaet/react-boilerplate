import React, { Suspense} from "react";
import { Router } from "react-router-dom";
import { render } from "react-dom";
import { history } from "./_helpers";
import { accountService, notificationService } from "./_services";
//import { i18n } from "@/_helpers";
import { App } from "./app";
import "./styles.less";
import { LoadingSpinner } from "./_components";

// attempt silent token refresh before startup
//accountService.refreshToken().finally(startApp);
startApp();
function handleCredentialResponse(res) {
  notificationService.clear();
  let token = parseJwt(res.credential);
  accountService
    .socialLogin(token, "Google")
    .then(() => {
      const { from } = location.state || { from: { pathname: "/" } };
      history.push(from);
    })
    .catch((error) => {
      console.log("social login faild!");
      notificationService.error(error);
    });
}

function startApp() {
  const user =sessionStorage.getItem("user")!==null? JSON.parse(sessionStorage.getItem("user")):null;
  let jwtToken, expires, timediff;
  if (user) {
    jwtToken = JSON.parse(atob(user.jwtToken.split(".")[1]));
    expires = new Date(jwtToken.exp * 1000);
    timediff = expires.getTime() - Date.now();
  }
  //console.info(history)
  window.onload = function () {
    google.accounts.id.initialize({
      client_id:
        "372978450413-75qr5g7hd8e3s00n7i1tv2hb0t72cpri.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      cancel_on_tap_outside:true,
    });
    if (!user || !jwtToken || timediff<0 )
    {
    google.accounts.id.prompt();
    }
  };
  render(
    <React.StrictMode>
      <Router history={history} >
        <Suspense
          fallback={
            <LoadingSpinner/>
          }
        >
          <App />
        </Suspense>
      </Router>
    </React.StrictMode>,
    document.getElementById("app")
  );
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
