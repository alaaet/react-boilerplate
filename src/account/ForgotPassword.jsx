import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { accountService, notificationService } from "@/_services";

function ForgotPassword() {
  const { t } = useTranslation();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("forgot-password.validation.email-validity"))
      .required(t("forgot-password.validation.email")),
  });

  function onSubmit({ email }, { setSubmitting }) {
    notificationService.clear();
    accountService
      .forgotPassword(email)
      .then(() =>
        notificationService.success(t("forgot-password.instructions"))
      )
      .catch((error) => notificationService.error(error))
      .finally(() => setSubmitting(false));
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h3 className="card-header">{t("forgot-password.title")}</h3>
          <div className="card-body">
            <div className="form-group">
              <label>{t("forgot-password.email")}</label>
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  {t("forgot-password.submit")}
                </button>
                <Link to="login" className="btn btn-link">
                  {t("forgot-password.cancel")}
                </Link>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { ForgotPassword };
