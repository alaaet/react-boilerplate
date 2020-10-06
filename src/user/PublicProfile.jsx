import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { accountService, notificationService } from "@/_services";

function PublicProfile({ history }) {
  const [user, setUser] = useState(accountService.userValue);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [possibleNames, setPossibleNames] = useState([]);
  const [possibleEmails, setPossibleEmails] = useState([]);
  const initialValues = {
    publicName: "",
    otherName: "",
    publicEmail: "",
    otherEmail: "",
    profilePictureEnable: true,
  };

  useEffect(() => {
    //SETTING THE POSSIBLE NAMES
    let names = [];
    if (user && user.username) {
      names.push(user.username);
    }
    if (user && user.firstName) {
      names.push(user.firstName);
    }
    if (user && user.lastName) {
      names.push(user.lastName);
    }
    if (user && user.firstName && user.lastName) {
      names.push(user.firstName + " " + user.lastName);
    }
    setPossibleNames(names);
    //SETTING THE POSSIBLE EMAILS
    let emails = [];
    if (user && user.email) {
      emails.push(user.email);
    }
    setPossibleEmails(emails);
  }, []);

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
        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
          <Form>
            <h3>Update Public Profile</h3>
            <h6>
              Check the following details from your account to make them public
            </h6>
            {/* PUBLIC NAME */}
            <label>Name:</label>
            <div className="form-row">
              <div className="form-group col-5">
                <Field
                  name="publicName"
                  as="select"
                  className={
                    "form-control" +
                    (errors.publicName && touched.publicName
                      ? " is-invalid"
                      : "")
                  }
                >
                  <option value="">None</option>
                  {possibleNames.map((value) => (
                    <option value={value}>{value}</option>
                  ))}
                  <option value="other">Other</option>
                </Field>
              </div>
              {values.publicName == "other" && (
                <div className="form-group col">
                  <Field
                    name="otherName"
                    type="text"
                    className={
                      "form-control" +
                      (errors.otherName && touched.otherName
                        ? " is-invalid"
                        : "")
                    }
                  />
                </div>
              )}
            </div>
            {/* PUBLIC EMAIL */}
            <label>Email:</label>
            <div className="form-row">
              <div className="form-group col-5">
                <Field
                  name="publicEmail"
                  as="select"
                  className={
                    "form-control" +
                    (errors.publicEmail && touched.publicEmail
                      ? " is-invalid"
                      : "")
                  }
                >
                  <option value="">None</option>
                  {possibleEmails.map((value) => (
                    <option value={value}>{value}</option>
                  ))}
                  <option value="other">Other</option>
                </Field>
              </div>
              {values.publicEmail == "other" && (
                <div className="form-group col">
                  <Field
                    name="otherName"
                    type="text"
                    className={
                      "form-control" +
                      (errors.otherName && touched.otherName
                        ? " is-invalid"
                        : "")
                    }
                  />
                </div>
              )}
            </div>
            {/* PROFILE PICTURE */}
            {user.profileImage !== "" && user.profileImage !== null ? (
              <div className="form-row">
                <div className="form-group form-check">
                  <Field
                    name="profilePictureEnable"
                    id="profilePictue"
                    type="checkbox"
                    className={
                      errors.profilePictureEnable &&
                      touched.profilePictureEnable
                        ? " is-invalid"
                        : ""
                    }
                  />
                  <label
                    htmlFor="profilePictue"
                    className="form-check-label m-2"
                  >
                    Show my profile image
                  </label>
                  <div className="user">
                    <img
                      className="img-fluid img-thumbnail rounded-circle ml-3"
                      width="150px"
                      src={user.profileImage}
                      alt="Profile image"
                    />
                  </div>
                </div>
              </div>
            ) : null}

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
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { PublicProfile };
