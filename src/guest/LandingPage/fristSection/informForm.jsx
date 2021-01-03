import React from "react";
import { useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { accountService, notificationService } from "@/_services";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

function InformForm({ history,isMobile }) {
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
      const { from } = { from: { pathname: `/${tagCode}` } };
      console.log(from);
      history.push(from);
    }
  }

  return (
    <div className={"card text-white bg-light card-two col-xl-8 col-md-10 shadow p-0 "+(isMobile?"mb-1":"mb-3")}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="card-header text-dark">
              <i className="fa fa-qrcode" aria-hidden="true"></i>{" "}
              You've found a tag, please enter the tag ID below to lookup the owner
            </div>
            <div className={"card-body "+(isMobile?"p-1":"p-3")}>
              <div className="form-group ">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">{t("examine.tag-code")}</span>
                  </div>
                  <Field
                    name="tagCode"
                    type="text"
                    className={
                      "form-control" +
                      (errors.tagCode && touched.tagCode ? " is-invalid" : "")
                    }
                    />
                </div>
                <ErrorMessage
                  name="tagCode"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group ">
                <GoogleReCaptchaProvider reCaptchaKey="6LcVEsgZAAAAAAXQVN87WW6YikSmBVDylDapa0ul">
                  <GoogleReCaptcha onVerify={(token) => console.log(token)} />
                </GoogleReCaptchaProvider>
              </div>              
              <div className="form-group mb-0">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn bg-violet-medium text-white"
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  {t("examine.submit")}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default InformForm;
