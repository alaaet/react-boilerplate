import React, { useState } from "react";
import { ImageUploaderModal } from "@/_components";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { accountService, notificationService } from "@/_services";

function EditAccount({ history }) {
  const user = accountService.userValue;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [profileImagePathIsSet, setProfileImagePath] = useState(false);
  const { t } = useTranslation();

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
    firstName: Yup.string().required(t("user.edit-account.validation.fname")),
    lastName: Yup.string().required(t("user.edit-account.validation.lname")),
    email: Yup.string().email(t("user.edit-account.validation.email-validity")).required(t("user.edit-account.validation.email")),
    password: Yup.string().min(6, t("user.edit-account.validation.password-min-length")),
    // confirmPassword: Yup.string()
    //   .when("password", (password, schema) => {
    //     if (password!=="") return schema.required(t("user.edit-account.validation.confirm-password"));
    //     else return schema.nullable();
    //   })
    //   .oneOf([Yup.ref("password")], t("user.edit-account.validation.password-matching")),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    console.log("fields: ",fields)
    if (fields.profileImgFile === null) {
      console.log("Updating the whole account")
      setStatus();
      accountService
        .update(user.id, fields)
        .then(() => {
          notificationService.success(t("user.edit-account.validation.notification-update-success"), {
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
      //console.log("Updating the image: ",fields.profileImgFile.name);
      accountService
        .uploadProfilePicture(fields.profileImgFile)
        .then((res) => {
          notificationService.success(
            "Profile image was updated successfully!",
            {
              keepAfterRouteChange: true,
            }
          );
          //history.push(".");
          accountService.updateProfileImage(fields.profileImgFile);
          window.location.reload(false);
          setSubmitting(false);
        })
        .catch((error) => {
          setSubmitting(false);
          notificationService.error(error);
        });
    }
  }

  function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }
  
  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, isSubmitting, setFieldValue,submitForm  }) => {
          // check if any value really changed
          Object.keys(touched).forEach((key) => {
            if (initialValues[key] !== values[key])
              setTimeout(() => setIsEdited(true), 0);
          });
          return (
            <Form>
              <h3>{t("user.edit-account.update-account")}</h3>
              <div>
                <div className="form-row">
                  <div className="form-group col-6">
                    <label>{t("user.edit-account.first-name")}</label>
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
                  <div className="form-group col-6">
                    <label>{t("user.edit-account.last-name")}</label>
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
                  <label>{t("user.edit-account.email")}</label>
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
                    <label>{t("user.edit-account.profile-picture")}</label>
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
                            console.log("profileImgFile", file)
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
                    <ImageUploaderModal
                      image={values["profileImgFile"]}
                      handleAction={(blob) => {
                        //var file = new File([blob], "profile-image.jpg", {lastModified: 1534584790000});
                        //var file = blobToFile(blob,"profile-image.jpg")
                        //console.log(file)
                        setFieldValue("profileImgFile", blob);
                        console.log("profileImgFile", values["profileImgFile"])
                        submitForm();
                      }}
                      disabled={!profileImagePathIsSet}
                      />
                  </div>
                </div>
                <h5 className="pt-3">
                  {t("user.edit-account.change-password")}
                </h5>
                <p>{t("user.edit-account.leave-psw-blank")}</p>
                <div className="form-row">
                  <div className="form-group col">
                    <label>{t("user.edit-account.password")}</label>
                    <Field
                      name="password"
                      autocomplete="false"
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
                    <label>{t("user.edit-account.confirm-password")}</label>
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
                    {t("user.edit-account.save-changes")}
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
