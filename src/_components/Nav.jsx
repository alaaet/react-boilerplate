import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
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
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);
  const handleSelect = (eventKey) => {
    if (eventKey === "/LOGOUT") {
      accountService.logout();
    } else {
      history.push(eventKey);
    }
  };
  // only show nav when logged in
  if (!user) return null;

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-violet-dark "
      >
        <Header exact to="/" />
        <span className="nav-phone-title mr-auto" style={{ color: "#fff" }}>
          Id Sheet
        </span>
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`navbar-nav w-100 ${
            isNavCollapsed ? "collapse" : ""
          } navbar-collapse`}
          id="navbarsExample09"
        >
          <NavLink exact to="/" className={`nav-item nav-link ${isMobile ? "mr-auto" : ""
            } `} onClick={() => { setIsNavCollapsed(true)}}>
            {t("nav.home")}
          </NavLink>
          <NavLink to="/profile" className={`nav-item nav-link ${
            isMobile ? "mr-auto" : ""
          } `} onClick={() => { setIsNavCollapsed(true)}}>
            {t("nav.profile")}
          </NavLink>
          {user.role === Role.User && (
            <>
            <NavLink to="/tags" className={`nav-item nav-link ${
              isMobile ? "mr-auto" : ""
            } `} onClick={() => { setIsNavCollapsed(true)}}>
              {t("nav.tags")}
            </NavLink>
            <NavLink to="/alerts" className={`nav-item nav-link ${
              isMobile ? "mr-auto" : ""
            } `} onClick={() => { setIsNavCollapsed(true)}}>
              {t("nav.alerts")}
            </NavLink>
            <NavLink to="/inbox" className={`nav-item nav-link ${
              isMobile ? "mr-auto" : ""
            } pr-3`} onClick={() => { setIsNavCollapsed(true)}}>
              Inbox
            </NavLink>
            { isMobile && (<>
              <NavLink to="/user" className={`nav-item nav-link ${
              isMobile ? "mr-auto" : ""
            } pr-3`} onClick={() => { setIsNavCollapsed(true)}}>
              Account Settings
            </NavLink>
            <NavLink to="/test" className={`nav-item nav-link ${
              isMobile ? "mr-auto" : ""
            } pr-3`} onClick={() => { setIsNavCollapsed(true)}}>
              Help Center
            </NavLink>
            </>)}
            </>
          )}
          {user.role === Role.Admin && (
            <NavLink to="/admin" className={`nav-item nav-link ${
              isMobile ? "mr-auto" : ""
            } `}>
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
                  setIsNavCollapsed(true)
                }}
              >
                <span className="flag-icon flag-icon-us"> </span> English
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  changeLanguage("es");
                  setIsNavCollapsed(true)
                }}
              >
                <span className="flag-icon flag-icon-es"> </span> Español
              </NavDropdown.Item>
            </NavDropdown>
            {user.role && !isMobile &&(
              <NavDropdown
                title={<i className="fa fa-gear" aria-hidden="true"></i>}
                id="settings-dropdown"
                onSelect={handleSelect}
              >
                <NavDropdown.Item eventKey="/user">
                  Account Settings
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="/guest/help-center">Help Center</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="/LOGOUT">Logout</NavDropdown.Item>
              </NavDropdown>
            )}

{user.role && isMobile&&( <a onClick={accountService.logout} className="nav-item nav-link pl-2 ">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </a> )}
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
        <NavLink to={`${path}/email`} className="nav-item nav-link">
          Emails
        </NavLink>
      </div>
    </nav>
  );
}

export { Nav };
