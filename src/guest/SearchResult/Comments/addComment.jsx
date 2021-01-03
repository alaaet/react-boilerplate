import React, { useEffect} from "react";
import { useTranslation } from "react-i18next";
//import { useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {commentService, notificationService} from "@/_services";

const AddComment = (props) => {
  const { t } = useTranslation();
  //const location = useLocation();
  const { user, tagCode, hash } = props;
  console.log("PROPS:",props)
  const initialValues = {
    title: "",
    sender: user?.firstName,
    senderEmail:user?.email,
    body: "",
    tagCode: tagCode,
    image: user?.profileImage,
    sessionHash:hash,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string(),
    sender: (hash||user)?null:Yup.string().required("Your name is required"),
    senderEmail: (hash||user)?null:Yup.string().email().required("Your Email is required to notify you about the owner comments"),
    body: Yup.string().required("Body is required"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    //setStatus();
    commentService.send(fields).
      then(() => {
        notificationService.success("The comment was successfully sent!", {
          keepAfterRouteChange: true,
        });
        window.location.reload(false);
      })
      .catch((error) => {
        setSubmitting(false);
        notificationService.error(error);
      });
  }
  console.log("validationSchema: ",validationSchema)
  console.log("hash|user: ",hash||user)
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) =>
        (<Form className="border p-2 bg-dark text-white">
          <h3>Add a comment</h3>
          {!hash&&!user && (
            <React.Fragment>
            <div className="form-row">
                <label>Your name</label>
                <Field
                  name="sender"
              type="text"
              disabled={ user!==null&&user.firstName!==null}
                  className={
                    "form-control" +
                    (errors.sender && touched.sender ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="sender"
                  component="div"
                  className="invalid-feedback"
                />
            </div>
            <div className="form-row">
              <div className="form-group col">
                    <label>Your email</label>
                    <Field
                      name="senderEmail"
                  type="text"
                  disabled={ user!==null&&user.firstName!==null}
                      className={
                        "form-control" +
                        (errors.senderEmail && touched.senderEmail ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="senderEmail"
                      component="div"
                      className="invalid-feedback"
                    />
              </div>
              </div>
              </React.Fragment>)}
            <div className="form-row">
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
                    
                <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                &nbsp;{t("examine-result.contact-form.submit")}
                  </button>
                </div>
            </Form>
          )}
    </Formik>
  );
}

export default AddComment;
