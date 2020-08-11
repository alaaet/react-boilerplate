import React from "react";
import { useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { accountService, notificationService } from "@/_services";

function InformForm({ history }) {
  const { t } = useTranslation();
  const location = useLocation();
  const initialValues = {
    tagCode: "",
  };

  const validationSchema = Yup.object().shape({
    tagCode: Yup.string().required(t("examine.validation.tag-code")),
  });

  function onSubmit({ tagCode }, { setSubmitting }) {
    notificationService.clear();
    if (tagCode === "0000") {
      setSubmitting(false);
      notificationService.error(t("examine.notification"));
    } else {
      // go to destination page
      //console.log(tagCode);
      const { from } = { from: { pathname: "/guest/inform" } };
      console.log(from);
      history.push(from);
    }
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
              <i className="fa fa-qrcode" aria-hidden="true"></i>{" "}
              {t("examine.title")}
            </h3>
            <div className="card-body">
              <div className="form-group">
                <label>{t("examine.tag-code")}</label>
                <Field
                  name="tagCode"
                  type="text"
                  className={
                    "form-control" +
                    (errors.tagCode && touched.tagCode ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="tagCode"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-success"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    {t("examine.submit")}
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

export default InformForm;
