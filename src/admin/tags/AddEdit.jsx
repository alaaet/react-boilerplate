import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { tagService, accountService, notificationService } from "@/_services";

function AddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;
  const [materialTypes, setMaterialTypes] = useState([]);
  const [dimensionTypes, setDimensionTypes] = useState([]);

  const initialValues = {
    value: "",
    material_id: 0,
    dimension_id: 0,
    isLost: false,
    isAssigned: false,
  };

  const validationSchema = Yup.object().shape({
    value: Yup.string().required("Tag Value is required"),
    material_id: Yup.string().required("Material Type is required"),
    dimension_id: Yup.string().required("Dimension Type is required"),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    if (isAddMode) {
      createTag(fields, setSubmitting);
    } else {
      updateTag(id, fields, setSubmitting);
    }
  }

  function createTag(fields, setSubmitting) {
    tagService
      .create(fields)
      .then(() => {
        notificationService.success("Tag added successfully", {
          keepAfterRouteChange: true,
        });
        history.push(".");
      })
      .catch((error) => {
        setSubmitting(false);
        notificationService.error(error);
      });
  }

  function updateTag(id, fields, setSubmitting) {
    tagService
      .update(id, fields)
      .then(() => {
        notificationService.success("Update successful", {
          keepAfterRouteChange: true,
        });
        history.push("..");
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
          tagService
            .getMaterialTypes()
            .then((types) => setMaterialTypes(types));
          tagService
            .getDimensionTypes()
            .then((types) => setDimensionTypes(types));

          if (!isAddMode) {
            // get tag and set form fields
            tagService.getById(id).then((tag) => {
              const fields = [
                "value",
                "material_id",
                "dimension_id",
                "isLost",
                "isAssigned",
              ];
              fields.forEach((field) => {
                switch (field) {
                  case "material_id":
                    setFieldValue(field, tag.materialType.id, false);
                    break;
                  case "dimension_id":
                    setFieldValue(field, tag.dimensionType.id, false);
                    break;
                  default:
                    setFieldValue(field, tag[field], false);
                }
              });
            });
          }
        }, []);

        return (
          <Form>
            <h1>{isAddMode ? "Add Tag" : "Edit Tag"}</h1>
            <div className="form-row">
              <div className="form-group col-5">
                <label>Tag Value</label>
                <Field
                  name="value"
                  type="text"
                  className={
                    "form-control" +
                    (errors.value && touched.value ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="value"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label>Material Type</label>
                <Field
                  name="material_id"
                  as="select"
                  className={
                    "form-control" +
                    (errors.material_id && touched.material_id
                      ? " is-invalid"
                      : "")
                  }
                >
                  <option value={0}></option>
                  {materialTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.material}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="material_id"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col">
                <label>Dimension Type</label>
                <Field
                  name="dimension_id"
                  as="select"
                  className={
                    "form-control" +
                    (errors.dimension_id && touched.dimension_id
                      ? " is-invalid"
                      : "")
                  }
                >
                  <option value={0}></option>
                  {dimensionTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="dimension_id"
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
                Save
              </button>
              <Link to={isAddMode ? "." : ".."} className="btn btn-link">
                Cancel
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export { AddEdit };
