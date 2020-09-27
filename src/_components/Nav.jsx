import React, { useState, useEffect } from "react";
import { NavLink, Route } from "react-router-dom";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Role } from "@/_helpers";
import { accountService } from "@/_services";
import Header from "./Header";
import NavDropdown from "react-bootstrap/NavDropdown";

function Nav(props) {
  const { lng, changeLanguage, history } = props;
  const { t } = useTranslation();
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);
  const handleSelect = (eventKey) => {
    history.push(eventKey);
  };
  // only show nav when logged in
  if (!user) return null;

  return (
    <div>
      <nav
        className="navbar navbar-expand navbar-dark  "
        style={{ backgroundColor: "#28a745" }}
      >
        <div className="navbar-nav w-100">
          <Header exact to="/" />
          <NavLink exact to="/" className="nav-item nav-link">
            {t("nav.home")}
          </NavLink>
          <NavLink to="/profile" className="nav-item nav-link">
            {t("nav.profile")}
          </NavLink>
          {user.role === Role.User && (
            <NavLink to="/tags" className="nav-item nav-link">
              {t("nav.tags")}
            </NavLink>
          )}
          {user.role === Role.Admin && (
            <NavLink to="/admin" className="nav-item nav-link">
              Admin
            </NavLink>
          )}

          <div
            className="ml-auto"
            style={{
              display: "flex",
            }}
          >
            <NavDropdown title={lng} id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => {
                  changeLanguage("en");
                }}
              >
                <span className="flag-icon flag-icon-us"> </span> English
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  changeLanguage("es");
                }}
              >
                <span className="flag-icon flag-icon-es"> </span> Español
              </NavDropdown.Item>
            </NavDropdown>

            {user.role === Role.User && (
              <NavLink to="/inbox" className="nav-item nav-link pr-3 ">
                <i className="fa fa-inbox" aria-hidden="true"></i>
              </NavLink>
            )}
            {user.role === Role.User && (
              <NavDropdown
                title={<i className="fa fa-gear" aria-hidden="true"></i>}
                id="settings-dropdown"
                onSelect={handleSelect}
              >
                <NavDropdown.Item eventKey="/user">
                  Account Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="/">Help Center</NavDropdown.Item>
              </NavDropdown>
            )}

            <a onClick={accountService.logout} className="nav-item nav-link ">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </nav>
      <Route path="/admin" component={AdminNav} />
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
        <NavLink to={`${path}/tags`} className="nav-item nav-link">
          Tags
        </NavLink>
      </div>
    </nav>
  );
}

export { Nav };
