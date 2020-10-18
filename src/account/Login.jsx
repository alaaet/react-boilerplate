import React from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../img/logo.png";
import { useTranslation } from "react-i18next";
import NavDropdown from "react-bootstrap/NavDropdown";
import { accountService, notificationService } from "@/_services";

function Login({ history, location }) {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  };
  const responseGoogle = (res) => {
    console.log(res.tokenObj);
    notificationService.clear();
    let token = parseJwt(res.tokenObj.id_token);
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
  };
  const responseFacebook = (res) => {
    console.log(res);
    notificationService.clear();
    let name = res.name.split(" ");
    let token = {
      sub: res.userID,
      email: res.email,
      name: res.name,
      picture: res.picture.data.url,
      given_name: name.slice(0, name.length - 1).join(" "),
      family_name: name[name.length - 1],
    };
    accountService
      .socialLogin(token, "Facebook")
      .then(() => {
        const { from } = location.state || { from: { pathname: "/" } };
        history.push(from);
      })
      .catch((error) => {
        console.log("social login faild!");
        notificationService.error(error);
      });
  };
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t("login.validation.username")),
    password: Yup.string().required(t("login.validation.password")),
  });

  function onSubmit({ username, password }, { setSubmitting }) {
    notificationService.clear();
    accountService
      .login(username, password)
      .then(() => {
        //console.log("Success");
        const { from } = location.state || { from: { pathname: "/" } };
        //console.log(from);
        history.push(from);
      })
      .catch((error) => {
        //console.log(error);
        setSubmitting(false);
        notificationService.error(error);
      });
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="card-header">
              <div className="row">
                <img className="login-img" src={logo} alt="" />
                <h3>{t("login.title")}</h3>
                <div
                  className="ml-auto"
                  style={{
                    display: "flex",
                  }}
                >
                  <NavDropdown
                    title={i18n.languages[0]}
                    id="basic-nav-dropdown"
                  >
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
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>{t("login.username")}</label>
                <Field
                  name="username"
                  type="text"
                  className={
                    "form-control" +
                    (errors.username && touched.username ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label>{t("login.password")}</label>
                <Field
                  name="password"
                  type="password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    {t("login.login-btn")}
                  </button>
                  <Link to="register" className="btn btn-link">
                    {t("login.register-btn")}
                  </Link>
                </div>
                <div className="form-group col text-right">
                  <Link to="forgot-password" className="btn btn-link pr-0">
                    {t("login.forgot-password")}
                  </Link>
                </div>
              </div>
              <div className="form-row justify-content-center">
                <div className="form-group col-10">
                  <GoogleLogin
                    clientId="372978450413-75qr5g7hd8e3s00n7i1tv2hb0t72cpri.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="btn btn-google m-1 text-uppercase"
                      >
                        <i className="fa fa-google mr-2"></i>{" "}
                        <span className="d-none d-md-inline">
                          {" "}
                          {t("login.gl-btn")}
                        </span>
                      </button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                  <FacebookLogin
                    appId="347664759607454"
                    callback={responseFacebook}
                    fields="name,email,picture.type(large)"
                    scope="public_profile"
                    render={(renderProps) => (
                      <button
                        className="btn  btn-facebook m-1 text-uppercase"
                        onClick={renderProps.onClick}
                      >
                        <i className="fa fa-facebook-f mr-2"></i>{" "}
                        <span className="d-none d-md-inline">
                          {" "}
                          {t("login.fb-btn")}
                        </span>
                      </button>
                    )}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
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

export { Login };
