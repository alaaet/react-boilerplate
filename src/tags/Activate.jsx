import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Activate = () => {
  const initialValues = {
    tagCode: "",
    actCode: "",
  };

  const validationSchema = Yup.object().shape({
    tagCode: Yup.string().required("Tag code is required"),
    actCode: Yup.string().required("Activation code is required"),
  });

  function onSubmit({ tagCode, actCode }, { setSubmitting }) {
    //Activate the tag
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
                  width="150px"
                  src={require("../img/qr.png")}
                  alt="Profile image"
                />
                <p className="lead">Insert your tag information</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Tag code</label>
                <Field
                  name="tagCode"
                  type="text"
                  placeholder="Enter tag code"
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
                <label>Activation code</label>
                <Field
                  name="actCode"
                  type="text"
                  placeholder="Enter activation code"
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
              <div className="form-group col p-2">
                <div className="col blocktext">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Activate
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
