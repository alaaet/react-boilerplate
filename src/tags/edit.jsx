import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, Switch } from "formik";
import * as Yup from "yup";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { alertService } from "@/_services";

function Edit({ history }) {
  const initialValues = {
    tagStatus: true,
  };

  const validationSchema = Yup.object().shape({});

  function onSubmit(fields, { setStatus, setSubmitting }) {
    //setStatus();
    console.log(fields.tagStatus);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h1>Edit Tag</h1>

          <div className="form-row">
            <div className="form-group col">
              <label className="mr-3">Active </label>
              <Field name="tagStatus">
                {(props) => {
                  return (
                    <BootstrapSwitchButton
                      checked={initialValues.tagStatus}
                      onlabel="Yes"
                      offlabel="No"
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
                className="btn btn-primary mr-2"
              >
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Save
              </button>
              <Link
                to="."
                className="btn btn-outline-danger ml-2"
                style={{ width: "75px" }}
              >
                Cancel
              </Link>
            </div>
          </div>
          <br />
        </Form>
      )}
    </Formik>
  );
}

export default Edit;
