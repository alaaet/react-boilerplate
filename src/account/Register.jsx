import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { accountService, notificationService } from "@/_services";

function Register({ history }) {
  const { t } = useTranslation();

  const initialValues = {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t("register.validation.title")),
    firstName: Yup.string().required(t("register.validation.fname")),
    lastName: Yup.string().required(t("register.validation.lname")),
    email: Yup.string()
      .email(t("register.validation.email-validity"))
      .required(t("register.validation.email")),
    password: Yup.string()
      .min(6, t("register.validation.password-min-length"))
      .required(t("register.validation.password")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        t("register.validation.password-matching")
      )
      .required(t("register.validation.confirm-password")),
    acceptTerms: Yup.bool().oneOf([true], t("register.validation.terms")),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    accountService
      .register(fields)
      .then(() => {
        notificationService.success(
          "Registration successful, please check your email for verification instructions",
          { keepAfterRouteChange: true }
        );
        history.push("login");
      })
      .catch((error) => {
        setSubmitting(false);
        notificationService.error(error);
      });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h3 className="card-header">{t("register.title")}</h3>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group col">
                <label>{t("register.p-title")}</label>
                <Field
                  name="title"
                  as="select"
                  className={
                    "form-control" +
                    (errors.title && touched.title ? " is-invalid" : "")
                  }
                >
                  <option value=""></option>
                  <option value="Mr">{t("honorifics.mr")}</option>
                  <option value="Mrs">{t("honorifics.mrs")}</option>
                  <option value="Miss">{t("honorifics.miss")}</option>
                  <option value="Ms">{t("honorifics.ms")}</option>
                </Field>
                <ErrorMessage
                  name="title"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col-5">
                <label>{t("register.fname")}</label>
                <Field
                  name="firstName"
                  type="text"
                  className={
                    "form-control" +
                    (errors.firstName && touched.firstName ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col-5">
                <label>{t("register.lname")}</label>
                <Field
                  name="lastName"
                  type="text"
                  className={
                    "form-control" +
                    (errors.lastName && touched.lastName ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="form-group">
              <label>{t("register.email")}</label>
              <Field
                name="email"
                type="text"
                className={
                  "form-control" +
                  (errors.email && touched.email ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label>{t("register.password")}</label>
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
              <div className="form-group col">
                <label>{t("register.confirm-password")}</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={
                    "form-control" +
                    (errors.confirmPassword && touched.confirmPassword
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="form-group form-check">
              <Field
                type="checkbox"
                name="acceptTerms"
                id="acceptTerms"
                className={
                  "form-check-input " +
                  (errors.acceptTerms && touched.acceptTerms
                    ? " is-invalid"
                    : "")
                }
              />
              <label htmlFor="acceptTerms" className="form-check-label">
                {t("register.terms")}
              </label>
              <ErrorMessage
                name="acceptTerms"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                {t("register.submit")}
              </button>
              <Link to="login" className="btn btn-link">
                {t("register.cancel")}
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { Register };
