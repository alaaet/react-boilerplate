import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { accountService, notificationService } from "@/_services";

function EditAccount({ history }) {
  const user = accountService.userValue;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [profileImagePathIsSet, setProfileImagePath] = useState(false);

  const initialValues = {
    title: user.title,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "",
    confirmPassword: "",
    profileImgFile: null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .when("password", (password, schema) => {
        if (password) return schema.required("Confirm Password is required");
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    if (fields.profileImgFile === null) {
      setStatus();
      accountService
        .update(user.id, fields)
        .then(() => {
          notificationService.success("Update successful", {
            keepAfterRouteChange: true,
          });
          history.push(".");
          setSubmitting(false);
        })
        .catch((error) => {
          setSubmitting(false);
          notificationService.error(error);
        });
    } else {
      // only update the profile picture
      console.log(fields.profileImgFile.name);
      accountService
        .uploadProfilePicture(fields.profileImgFile)
        .then((res) => {
          notificationService.success(
            "Profile picture was updated successfully",
            {
              keepAfterRouteChange: true,
            }
          );
          //history.push(".");
          accountService.updateProfileImage(res.message);
          setSubmitting(false);
        })
        .catch((error) => {
          setSubmitting(false);
          notificationService.error(error);
        });
    }
  }

  function onDelete() {
    if (confirm("Are you sure?")) {
      setIsDeleting(true);
      accountService
        .delete(user.id)
        .then(() =>
          notificationService.success("Account deleted successfully")
        );
    }
  }

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => {
          // check if any value really changed
          Object.keys(touched).forEach((key) => {
            if (initialValues[key] !== values[key])
              setTimeout(() => setIsEdited(true), 0);
          });
          return (
            <Form>
              <h3>Update Account</h3>
              <div>
                <div className="form-row">
                  <div className="form-group col">
                    <label>Title</label>
                    <Field
                      name="title"
                      as="select"
                      className={
                        "form-control" +
                        (errors.title && touched.title ? " is-invalid" : "")
                      }
                    >
                      <option value=""></option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                      <option value="Ms">Ms</option>
                    </Field>
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group col-5">
                    <label>First Name</label>
                    <Field
                      name="firstName"
                      type="text"
                      className={
                        "form-control" +
                        (errors.firstName && touched.firstName
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group col-5">
                    <label>Last Name</label>
                    <Field
                      name="lastName"
                      type="text"
                      className={
                        "form-control" +
                        (errors.lastName && touched.lastName
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <Field
                    name="email"
                    type="text"
                    className={
                      "form-control" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-row">
                  <div className="col-4 my-auto">
                    <label>Profile Picture</label>
                  </div>
                  <div className="col-4 my-auto">
                    <h1 className="display-4">
                      {user.profileImage !== "" &&
                      user.profileImage !== null ? (
                        <img
                          className="img-fluid img-thumbnail rounded-circle"
                          width="150px"
                          src={user.profileImage}
                          alt="Profile image"
                        />
                      ) : (
                        <img
                          className="img-fluid img-thumbnail rounded-circle"
                          width="150px"
                          src={require("../img/no_profile_img.png")}
                          alt="Profile image"
                        />
                      )}
                    </h1>
                  </div>
                  <div className="col-4 my-auto">
                    <input
                      id="profileImgFile"
                      name="profileImgFile"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        var file = event.currentTarget.files[0];
                        if (file) {
                          var idxDot = file.name.lastIndexOf(".") + 1;
                          var extFile = file.name
                            .substr(idxDot, file.name.length)
                            .toLowerCase();
                          if (
                            extFile == "jpg" ||
                            extFile == "jpeg" ||
                            extFile == "png"
                          ) {
                            setFieldValue("profileImgFile", file);
                            setProfileImagePath(true);
                          } else {
                            alert("Only jpg/jpeg and png files are allowed!");
                            setProfileImagePath(false);
                          }
                        } else {
                          alert("Please select an image!");
                          setProfileImagePath(false);
                        }
                      }}
                      className="form-control"
                    />
                    <button
                      type="submit"
                      className="btn btn-success w-100"
                      disabled={!profileImagePathIsSet}
                    >
                      Update Profile Image
                    </button>
                  </div>
                </div>
                <h5 className="pt-3">Change Password</h5>
                <p>Leave blank to keep the same password</p>
                <div className="form-row">
                  <div className="form-group col">
                    <label>Password</label>
                    <Field
                      name="password"
                      type="password"
                      className={
                        "form-control" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group col">
                    <label>Confirm Password</label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className={
                        "form-control" +
                        (errors.confirmPassword && touched.confirmPassword
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    disabled={isSubmitting | !isEdited}
                    className="btn btn-primary"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Save Changes
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export { EditAccount };
