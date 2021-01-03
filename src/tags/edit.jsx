import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
//import { alertService } from "@/_services";
import { useTranslation } from "react-i18next";

function Edit({ history,match }) {
  const initialValues = {
    tagStatus: true,
  };
  const { t } = useTranslation();
//console.log(match.params)
  const validationSchema = Yup.object().shape({});

  function onSubmit(fields, { setStatus, setSubmitting }) {
    //setStatus();
    console.log(fields.tagStatus);
  }

  return (
    <div className="row">
      <div className="col-sm-8 offset-sm-2 mt-5">
        <div className="card m-3">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <h3 className="card-header">{t("tags.edit-form.title")}</h3>
                <div className="card-body">
                  <div className="form-row">
                    <div className="form-group col">
                      <label className="mr-3">
                        {t("tags.edit-form.status")}{" "}
                      </label>
                      <Field name="tagStatus">
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
                                props.form.setFieldValue("tagStatus", checked);
                              }}
                            />
                          );
                        }}
                      </Field>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary bg-violet-medium mr-2"
                      >
                        {isSubmitting && (
                          <span className="spinner-border spinner-border-sm mr-1"></span>
                        )}
                        {t("tags.edit-form.submit")}
                      </button>
                      <Link
                        to=".."
                        className="btn btn-outline-danger ml-2"
                        style={{ width: "100px" }}
                      >
                        {t("tags.edit-form.cancel")}
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

export default Edit;
