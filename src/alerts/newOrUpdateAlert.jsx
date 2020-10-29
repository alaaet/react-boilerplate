import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, Switch } from "formik";
import * as Yup from "yup";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { notificationService } from "@/_services";
import { useTranslation } from "react-i18next";

function NewOrUpdateAlert(props) {
  let location = useLocation();
  const { match } = props;
  const { t } = useTranslation();
  const initialValues = {
    title: "",
    description: "",
    isActive: true,
    compensation: "",
  };
  const isUpdate = location.state.alert;
  console.log(location.state);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (isUpdate) {
      initialValues.title = location.state.alert.title
        ? location.state.alert.title
        : "";
      initialValues.description = location.state.alert.description
        ? location.state.alert.description
        : "";
      initialValues.compensation = location.state.alert.compensation
        ? location.state.alert.compensation
        : 0;
    }
  });
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t("alerts.new-form.validation.title")),
    description: Yup.string().required(
      t("alerts.new-form.validation.description")
    ),
    compensation: Yup.number(),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    //setStatus();
    console.log(fields.title);
  }

  return (
    <div className="row">
      <div className="col-sm-8 offset-sm-2 mt-5">
        <div className="card m-3">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <h3 className="card-header">
                  {isUpdate
                    ? t("alerts.new-form.title.update")
                    : t("alerts.new-form.title.create")}
                  {t("alerts.new-form.title.text")}
                </h3>
                <div className="card-body">
                  <div className="form-row">
                    <div className="form-group col">
                      <label className="mr-3">
                        {t("alerts.new-form.alert-title")}{" "}
                      </label>
                      <Field
                        name="title"
                        type="text"
                        className={
                          "form-control" +
                          (errors.title && touched.title ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label className="mr-3">
                        {t("alerts.new-form.description")}{" "}
                      </label>
                      <Field
                        name="description"
                        component="textarea"
                        className={
                          "form-control" +
                          (errors.description && touched.description
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label className="mr-3">
                        {t("alerts.new-form.status")}{" "}
                      </label>
                      <Field name="isActive">
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
                                props.form.setFieldValue("isActive", checked);
                              }}
                            />
                          );
                        }}
                      </Field>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col">
                      <label>{t("alerts.new-form.comp")} </label>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">EUR</span>
                        </div>
                        <Field
                          name="compensation"
                          type="number"
                          min="0.00"
                          className={
                            "form-control" +
                            (errors.compensation && touched.compensation
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">.00</span>
                        </div>
                        <ErrorMessage
                          name="compensation"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary mr-2"
                      >
                        {isSubmitting && (
                          <span className="spinner-border spinner-border-sm mr-1"></span>
                        )}
                        {t("alerts.new-form.submit")}
                      </button>
                      <Link
                        to={isUpdate ? ".." : "."}
                        className="btn btn-outline-danger ml-2"
                        style={{ width: "100px" }}
                      >
                        {t("alerts.new-form.cancel")}
                      </Link>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default NewOrUpdateAlert;
