import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { tagService, notificationService } from "@/_services";

const Activate = (props) => {
  const { handleActivate } = props;
  const { t } = useTranslation();
  const initialValues = {
    tagCode: "",
    actCode: "",
  };
  const validationSchema = Yup.object().shape({
    tagCode: Yup.string().required(t("tags.validation.tagCode")),
    actCode: Yup.string().required(t("tags.validation.actCode")),
  });

  function onSubmit({ tagCode, actCode }, { setSubmitting, resetForm }) {
    tagService
      .activate(tagCode, actCode)
      .then((tag) => {
        handleActivate(tag);
        notificationService.success(
          'Tag: "' + tagCode + '" was activated successfully!'
        );
        resetForm({});
      })
      .catch((error) => {
        console.log(error);
        notificationService.error(error);
      });
    setSubmitting(false);
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
            <div className="row">
              <div className="col blocktext pt-2">
                <img
                  className="img-fluid img-thumbnail  "
                  width="100px"
                  src={require("../img/qr.png")}
                  alt="Profile image"
                />
                <p className="lead">{t("tags.add-title")}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>{t("tags.tag-code")}</label>
                <Field
                  name="tagCode"
                  type="text"
                  placeholder={t("tags.tag-code-ph")}
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
              <div className="col">
                <label>{t("tags.act-code")}</label>
                <Field
                  name="actCode"
                  type="text"
                  placeholder={t("tags.act-code-ph")}
                  className={
                    "form-control" +
                    (errors.actCode && touched.actCode ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="actCode"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col p-2 pb-0 mb-0">
                <div className="col blocktext">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    <i
                      className="fa fa-check-square-o mr-1"
                      aria-hidden="true"
                    ></i>
                    {t("tags.submit")}
                  </button>
                  <hr />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Activate;
