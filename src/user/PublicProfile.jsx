import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { accountService, notificationService } from "@/_services";

function PublicProfile({ history }) {
  const user = accountService.userValue;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const initialValues = {
    fullNameEnabled: true,
    emailEnabled: true,
    profilePictureEnable: true,
  };

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    accountService
      .update(user.id, fields)
      .then(() => {
        notificationService.success("Update successful", {
          keepAfterRouteChange: true,
        });
        history.push(".");
      })
      .catch((error) => {
        setSubmitting(false);
        notificationService.error(error);
      });
  }

  return (
    <div className="container">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <h3>Update Public Profile</h3>
            <h6>
              Check the following details from your account to make them public
            </h6>
            <div>
              <div className="form-row">
                <div className="form-group form-check">
                  <Field
                    type="checkbox"
                    name="fullNameEnabled"
                    id="fullName"
                    className={
                      "form-check-input " +
                      (errors.fullNameEnabled && touched.fullNameEnabled
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <label htmlFor="fullName" className="form-check-label">
                    Nickname ({user.username})
                  </label>
                  <ErrorMessage
                    name="fullNameEnabled"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group form-check">
                  <Field
                    name="emailEnabled"
                    id="email"
                    type="checkbox"
                    className={
                      "form-check-input " +
                      (errors.emailEnabled && touched.emailEnabled
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <label htmlFor="email" className="form-check-label">
                    Main email ({user.email})
                  </label>
                  <ErrorMessage
                    name="emailEnabled"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group form-check">
                  <Field
                    name="profilePictureEnable"
                    id="profilePictue"
                    type="checkbox"
                    className={
                      "form-check-input " +
                      (errors.profilePictureEnable &&
                      touched.profilePictureEnable
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <label htmlFor="profilePictue" className="form-check-label">
                    Profile image
                  </label>
                  <div class="user"></div>

                  <ErrorMessage
                    name="profilePictureEnable"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <hr />
              <h3>Additional Data:</h3>
              <div className="form-group">
                <button
                  type="submit"
                  disabled={isSubmitting | !isEdited}
                  className="btn btn-primary mr-2"
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Save Changes
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { PublicProfile };
