import React, { useState, useEffect } from "react";
import { NavLink, Route } from "react-router-dom";

import { Role } from "@/_helpers";
import { accountService } from "@/_services";
import Header from "./Header";

function Nav() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  // only show nav when logged in
  if (!user) return null;

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav w-100">
          <Header exact to="/" />
          <NavLink exact to="/" className="nav-item nav-link">
            Home
          </NavLink>
          <NavLink to="/profile" className="nav-item nav-link">
            Profile
          </NavLink>
          {user.role === Role.User && (
            <NavLink to="/tags" className="nav-item nav-link">
              Tags
            </NavLink>
          )}
          {user.role === Role.Admin && (
            <NavLink to="/admin" className="nav-item nav-link">
              Admin
            </NavLink>
          )}
          <a
            onClick={accountService.logout}
            className="nav-item nav-link ml-auto"
          >
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </a>
        </div>
      </nav>
      <Route path="/admin" component={AdminNav} />
      <Route path="/tags" component={TagsNav} />
    </div>
  );
}

function AdminNav({ match }) {
  const { path } = match;

  return (
    <nav className="admin-nav navbar navbar-expand navbar-light">
      <div className="navbar-nav">
        <NavLink to={`${path}/users`} className="nav-item nav-link">
          Users
        </NavLink>
      </div>
    </nav>
  );
}

function TagsNav({ match }) {
  const { path } = match;

  return (
    <nav className="admin-nav navbar navbar-expand navbar-light">
      <div className="navbar-nav">
        <NavLink to={`${path}/my-tags`} className="nav-item nav-link">
          My tags
        </NavLink>
        <NavLink to={`${path}/activate`} className="nav-item nav-link">
          Activate a tag
        </NavLink>
        <NavLink to={`${path}/buy-tags`} className="nav-item nav-link">
          Buy tags
        </NavLink>
      </div>
    </nav>
  );
}

export { Nav };
