import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { emailService,accountService, notificationService } from "@/_services";

function SendAnEmail({ history }) {
  const [userEmails, setUserEmails] = useState([]);
  const initialValues = {
    subject: "",
    recipient: "",
    body: ""
  };

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required("Subject is required"),
    recipient: Yup.string().required("Recipient Email is required"),
    body: Yup.string().required("Body is required"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    //setStatus();
    emailService.send(fields).
      then(() => {
        notificationService.success("The email was successfully sent!", {
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => {
        useEffect(() => {
          accountService
            .getAll()
            .then((users) => setUserEmails(users));                   
        }, []);

        return (
          <Form>
            <h1>Send an email</h1>
            <div className="form-row">
              <div className="form-group col-6">
                <label>Subject</label>
                <Field
                  name="subject"
                  type="text"
                  className={
                    "form-control" +
                    (errors.subject && touched.subject ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col-6">
                <label>Recipient</label>
                <Field
                  name="recipient"
                  as="select"
                  className={
                    "form-control" +
                    (errors.recipient && touched.recipient
                      ? " is-invalid"
                      : "")
                  }
                >
                  <option value=""></option>
                  {userEmails.map((user) => (
                    <option key={user.id} value={user.email}>
                      {user.email}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="recipient"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col">
                <label>Body</label>
                <Field
                  name="body"
                  as="textarea"
                  className={
                    "form-control" +
                    (errors.body && touched.body
                      ? " is-invalid"
                      : "")
                  }
                >
                </Field>
                <ErrorMessage
                  name="body"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
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
                Send
              </button>
              <Link to={"."} className="btn btn-link">
                Cancel
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export { SendAnEmail };
