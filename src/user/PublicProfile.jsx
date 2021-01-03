import React, { useState, useEffect, useRef } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { history } from "@/_helpers";
import PhoneInput from "react-phone-number-input";
import { accountService, notificationService } from "@/_services";

function PublicProfile() {
  const formRef = useRef();
  const [user, setUser] = useState(accountService.userValue);
  const [publicData, setPublicData] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [possibleNames, setPossibleNames] = useState([]);
  const [possibleEmails, setPossibleEmails] = useState([]);
  const [initialValues, setInitialValues] = useState({
    publicName: "",
    otherName: "",
    publicEmail: "",
    otherEmail: "",
    enableProfilePicture: true,
    additionalData: [{ type: "", value: "" }],
  });
  const setFormValues = (args) => {
    setInitialValues({
      ...formRef.current.values,
      ...args,
    });
  };
  const transferDataToForm = (data) => {
    if (data) {
      //console.info("transferDataToForm was called");
      let dataToChange = initialValues;
      // ********Check publicName********
      if (possibleNames && data.name) {
        //console.info("possible names:", possibleNames);
        if (possibleNames.includes(data.name)) {
          //console.log("name: ", data.name);
          dataToChange.publicName = data.name;
        } else {
          //console.log("other name: ", data.name);
          dataToChange.publicName = "other";
          dataToChange.otherName = data.name;
        }
      }
      // ********Check email********
      if (possibleEmails && data.email) {
        //console.info("possible emails:", possibleEmails);
        if (possibleEmails.includes(data.email)) {
          dataToChange.publicEmail = data.email;
        } else {
          dataToChange.publicEmail = "other";
          dataToChange.otherEmail = data.email;
        }
      }
      // ******** Image flag ********
      dataToChange.enableProfilePicture = data.enableProfilePicture;
      // ******** additional data ********
      if (data.contactDetails) {
        dataToChange.additionalData = data.contactDetails;
      }
      // APPLY CHANGES
      setFormValues(dataToChange);
    }
  };
  // On first load
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

  useEffect(() => {
    if (
      publicData === null &&
      (possibleNames.length > 0 || possibleEmails.length > 0)
    ) {
      accountService
        .getPublicProfile()
        .then((data) => {
          //console.log("possible names count:", possibleNames.length);
          //console.log("possible emails count:", possibleEmails.length);
          setPublicData(data);
          transferDataToForm(data);
        })
        .catch((error) => {
          notificationService.error(error);
        });
    } else {
      //console.warn("you are using an already existing publicData");
      transferDataToForm(publicData);
    }
  }, [possibleNames, possibleEmails]);

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    const data = {
      ...publicData,
      name:
        fields.publicName === "other" ? fields.otherName : fields.publicName,
      email:
        fields.publicEmail === "other" ? fields.otherEmail : fields.publicEmail,
      contactDetails: fields.additionalData,
      enableProfilePicture: fields.enableProfilePicture,
    };
    accountService
      .updatePublicProfile(data)
      .then(() => {
        notificationService.success("Update successful", {
          keepAfterRouteChange: true,
        });
        setSubmitting(false);
        history.push("/user");
      })
      .catch((error) => {
        setSubmitting(false);
        notificationService.error(error);
      });
  }

  return (
    <div className="container">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={formRef}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => {
          // check if any value really changed
          //console.log("Current values are: ", values);
          //console.log("Current Initialvalues are: ", initialValues);
          Object.keys(touched).forEach((key) => {
            if (initialValues[key] !== values[key])
              setTimeout(() => setIsEdited(true), 0);
          });
          return (
            <Form>
              <h3>Update Public Profile</h3>
              <p className="text-muted">
                Choose whether to show the following details from your account
                or to hide them
              </p>
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
                    <option disabled>Select Name</option>
                    <option value="">None</option>
                    {possibleNames.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
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
                    {possibleEmails.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
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
                      name="enableProfilePicture"
                      id="profilePictue"
                      type="checkbox"
                      className={
                        errors.enableProfilePicture &&
                        touched.enableProfilePicture
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
              <h6>Additional Data:</h6>
              <div className="form-group">
                <FieldArray name="additionalData">
                  {({
                    push,
                    remove,
                    form: {
                      values: { additionalData },
                    },
                  }) => {
                    //console.log(additionalData);
                    return (
                      <div>
                        {additionalData.map((additionalField, index) => (
                          <div key={index} className="form-row">
                            <Field
                              name={`additionalData[${index}].type`}
                              as="select"
                              className="form-control col-5"
                            >
                              <option value="">None</option>
                              <option value="phone">Phone</option>
                              <option value="email">Email</option>
                              <option value="mobile">Mobile</option>
                              <option value="other">Other</option>
                            </Field>
                            {additionalField.type !== "" &&
                              generateAdditionalField(
                                additionalField.type,
                                `additionalData[${index}].value`,
                                additionalField.value,
                                errors,
                                touched
                              )}
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="form-control col-1"
                              >
                                <i
                                  className="fa fa-minus"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => push({ type: "", value: "" })}
                              className="form-control col-1"
                              disabled={additionalField.value === ""}
                            >
                              <i className="fa fa-plus" aria-hidden="true"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
              </div>
              <div
                className="bs-callout bg-light"
                style={{
                  borderLeftColor: "#5cb85c",
                  borderRadius: 10,
                }}
              >
                <i
                  className="fa fa-lightbulb-o fa-2x pl-1"
                  aria-hidden="true"
                ></i>
                &nbsp; Please make sure that you don't share any information
                that could harm you in any way as this information will be
                public!
              </div>
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
          );
        }}
      </Formik>
    </div>
  );
}

// SUPORT FUNCTIONS
const generateAdditionalField = (
  contactType,
  fieldName,
  fieldValue,
  errors,
  touched
) => {
  switch (contactType) {
    case "phone":
    case "mobile":
      return (
        <Field name={fieldName}>
          {(props) => {
            return (
              <PhoneInput
                value={props.field.value}
                className={
                  "form-control col-5" +
                  (errors.fieldName && touched.fieldName ? " is-invalid" : "")
                }
                onChange={(value) => {
                  props.form.setFieldValue(fieldName, value);
                }}
                onBlur={() => {
                  props.form.setFieldTouched("additionalData");
                }}
              />
            );
          }}
        </Field>
      );
    default:
      return (
        <Field
          name={fieldName}
          value={fieldValue}
          disabled={contactType === ""}
          className="form-control col-5"
        />
      );
  }
};

export { PublicProfile };
