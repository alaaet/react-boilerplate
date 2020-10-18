import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { accountService, notificationService } from "@/_services";
import { DatePickerField } from "../_components";
import PhoneInput from "react-phone-number-input";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

function Register({ history }) {
  const { t } = useTranslation();
  const [isMinor, setIsMinor] = useState(false);
  const [dobIsNull, setDobIsNull] = useState(false);
  const initialValues = {
    title: "",
    firstName: "",
    lastName: "",
    primaryPhone: "",
    email: "",
    dob: "",
    username: "",
    password: "",
    confirmPassword: "", //the following are public data
    dataIsCopied: false,
    publicName: "",
    publicMobile: "",
    publicPhone: "",
    publicEmail: "",
    publicIsActive: true,
    acceptTerms: false,
  };
  const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t("register.validation.title")),
    firstName: Yup.string().required(t("register.validation.fname")),
    lastName: Yup.string().required(t("register.validation.lname")),
    primary_phone: Yup.string()
      .required(t("register.validation.primary_phone"))
      .matches(phoneRegExp, t("register.validation.primary_phone-validity")),
    email: Yup.string()
      .email(t("register.validation.email-validity"))
      .required(t("register.validation.email")),
    username: Yup.string().required(t("register.validation.username")),
    password: Yup.string()
      .min(6, t("register.validation.password-min-length"))
      .required(t("register.validation.password")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        t("register.validation.password-matching")
      )
      .required(t("register.validation.confirm-password")),
    publicName: Yup.string().required(t("register.validation.publicName")),
    publicMobile: Yup.string()
      .required(t("register.validation.publicMobile"))
      .matches(phoneRegExp, t("register.validation.publicMobile-validity")),
    publicPhone: Yup.string()
      .required(t("register.validation.publicPhone"))
      .matches(phoneRegExp, t("register.validation.publicPhone-validity")),
    publicEmail: Yup.string()
      .email(t("register.validation.publicEmail"))
      .required(t("register.validation.publicEmail-validity")),
    acceptTerms: Yup.bool().oneOf([true], t("register.validation.terms")),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    accountService
      .register(fields)
      .then(() => {
        notificationService.success(t("register.notification"), {
          keepAfterRouteChange: true,
        });
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
      {({
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <Form>
          <h3 className="card-header">{t("register.title")}</h3>
          <div className="card-body">
            <div className="form-row">
              <h4 className="w-100 text-center">
                {t("register.account-title-1")} &nbsp;
                <small className="text-muted">
                  ({t("register.account-title-2")})
                </small>
              </h4>
            </div>
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
                  onBlur={() => {
                    // if (values.publicName === "")
                    //   setFieldValue("publicName", values.firstName);
                  }}
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
              <label>{t("register.primaryPhone")}</label>
              <Field name="primaryPhone">
                {(props) => {
                  return (
                    <PhoneInput
                      value={props.field.value}
                      className={
                        "form-control" +
                        (errors.primaryPhone && touched.primaryPhone
                          ? " is-invalid"
                          : "")
                      }
                      onChange={(value) => {
                        props.form.setFieldValue("primaryPhone", value);
                      }}
                      onBlur={() => {
                        props.form.setFieldTouched("primaryPhone");
                      }}
                    />
                  );
                }}
              </Field>
              <ErrorMessage
                name="primaryPhone"
                component="div"
                className="invalid-feedback"
              />
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
                onBlur={() => {
                  // if (values.publicEmail === "")
                  //   setFieldValue("publicEmail", values.email);
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label className="mr-3">{t("register.dob")}</label>
              <DatePickerField
                name="dob"
                minAge={18}
                handleMinor={setIsMinor}
                handleNull={setDobIsNull}
                className={
                  "form-control" + (isMinor || dobIsNull ? " is-invalid" : "")
                }
              />
              <div
                className="invalid-feedback"
                style={{ display: isMinor ? "block" : "none" }}
              >
                {t("register.validation.dob-minor")}
              </div>
              <div
                className="invalid-feedback"
                style={{ display: dobIsNull ? "block" : "none" }}
              >
                {t("register.validation.dob")}
              </div>
            </div>
            <br />
            <div className="form-row">
              <div className="form-group col">
                <label>{t("register.username")}</label>
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
            <hr />
            <div className="form-row">
              <h4 className="w-100 text-center">
                {t("register.profile-title-1")} &nbsp;
                <small className="text-muted">
                  ({t("register.profile-title-2")})
                </small>
              </h4>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <small className="text-muted">{t("register.copy")}&nbsp;</small>
                <Field
                  name="dataIsCopied"
                  type="checkbox"
                  style={{ verticalAlign: "middle" }}
                  onChange={(e) => {
                    setFieldValue("dataIsCopied", e.target.checked);
                    if (e.target.checked == true) {
                      setFieldValue("publicName", values.firstName);
                      setFieldValue("publicEmail", values.email);
                      setFieldValue("publicPhone", values.primaryPhone);
                    } else {
                      setFieldValue("publicName", "");
                      setFieldValue("publicEmail", "");
                      setFieldValue("publicPhone", "");
                    }
                  }}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label>{t("register.publicName")}</label>
                <Field
                  name="publicName"
                  type="text"
                  className={
                    "form-control" +
                    (errors.publicName && touched.publicName
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="publicName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="form-group">
              <label>{t("register.publicMobile")}</label>
              <Field name="publicMobile">
                {(props) => {
                  return (
                    <PhoneInput
                      value={props.field.value}
                      className={
                        "form-control" +
                        (errors.publicMobile && touched.publicMobile
                          ? " is-invalid"
                          : "")
                      }
                      onChange={(value) => {
                        props.form.setFieldValue("publicMobile", value);
                        //props.form.setFieldTouched("primary_phone");
                      }}
                      onBlur={() => {
                        props.form.setFieldTouched("publicMobile");
                      }}
                    />
                  );
                }}
              </Field>
              <ErrorMessage
                name="publicMobile"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label>{t("register.publicPhone")}</label>
              <Field name="publicPhone">
                {(props) => {
                  return (
                    <PhoneInput
                      value={props.field.value}
                      className={
                        "form-control" +
                        (errors.publicPhone && touched.publicPhone
                          ? " is-invalid"
                          : "")
                      }
                      onChange={(value) => {
                        props.form.setFieldValue("publicPhone", value);
                        //props.form.setFieldTouched("primary_phone");
                      }}
                      onBlur={() => {
                        props.form.setFieldTouched("publicPhone");
                      }}
                    />
                  );
                }}
              </Field>
              <ErrorMessage
                name="publicPhone"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label>{t("register.publicEmail")}</label>
              <Field
                name="publicEmail"
                type="text"
                className={
                  "form-control" +
                  (errors.publicEmail && touched.publicEmail
                    ? " is-invalid"
                    : "")
                }
              />
              <ErrorMessage
                name="publicEmail"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label className="mr-3">{t("register.publicIsActive")}</label>
              <Field name="publicIsActive">
                {(props) => {
                  return (
                    <BootstrapSwitchButton
                      checked={props.field.value}
                      onlabel=" "
                      offlabel=" "
                      onstyle="success"
                      offstyle="outline-danger"
                      size="xs"
                      onChange={(checked) => {
                        props.form.setFieldValue("publicIsActive", checked);
                      }}
                    />
                  );
                }}
              </Field>
              <div class="bs-callout bs-callout-info">
                <i class="fa fa-lightbulb-o fa-2x pl-1" aria-hidden="true"></i>
                &nbsp;
                {t("register.instructions")}
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
