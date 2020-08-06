import React, { Suspense } from "react";
import { Router } from "react-router-dom";
import { render } from "react-dom";
import { history } from "./_helpers";
import { accountService } from "./_services";
import { i18n } from "@/_helpers";
import { App } from "./app";

import "./styles.less";

// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

function startApp() {
  render(
    <React.StrictMode>
      <Router history={history}>
        <Suspense
          fallback={
            <span className="spinner-border spinner-border-lg align-center"></span>
          }
        >
          <App />
        </Suspense>
      </Router>
    </React.StrictMode>,
    document.getElementById("app")
  );
}
