import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../img/logo.png";
import { useTranslation } from "react-i18next";

import { accountService, notificationService } from "@/_services";

function Login({ history, location }) {
  const { t } = useTranslation();

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
            <h3 className="card-header">
              <img className="login-img" src={logo} alt="" />
              {t("login.title")}
            </h3>
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
                  <button
                    className="btn btn-google m-1 text-uppercase"
                    type="submit"
                  >
                    <i className="fa fa-google mr-2"></i>{" "}
                    <span className="d-none d-md-inline">
                      {" "}
                      {t("login.gl-btn")}
                    </span>
                  </button>
                  <button
                    className="btn  btn-facebook m-1 text-uppercase"
                    type="submit"
                  >
                    <i className="fa fa-facebook-f mr-2"></i>{" "}
                    <span className="d-none d-md-inline">
                      {" "}
                      {t("login.fb-btn")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { Login };
