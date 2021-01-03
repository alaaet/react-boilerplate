import React, { useEffect,useState,useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, Switch } from "formik";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import * as Yup from "yup";
import { tagService,alertService,notificationService } from "@/_services";
import { useTranslation } from "react-i18next";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

function NewOrUpdateAlert({ history,match }) {
  const [id, setId] = useState(match.params.alertId); 
  const formRef = useRef();
  let location = useLocation();
  const [selectedTags,setSelectedTags] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([]);
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState({
    title: "",
    body: "",
    compensation: 0,
    isGeneric: "1",
  });
  const setFormValues = (args) => {
    setInitialValues({
      ...formRef.current.values,
      ...args,
    });
  };
  const isUpdate = location.state.alert;

  const animatedComponents = makeAnimated();

  useEffect(() => {
    //TODO: if is edit get Alert
    //setIsLoading(false);
    tagService.getAllByUser().then((x) => {
      console.info(x)
      setTagsOptions(x.map(tag => { return {value:tag.id,label:tag.value}}));
    });
  }, []);
  
  useEffect(() => {
    if (isUpdate) {
      console.log("THIS IS AN UPDATE", location.state.alert)
      let formInitialData = location.state.alert;
      formInitialData.isGeneric = formInitialData.tags.length > 0 ? "0" : "1";
      setFormValues(formInitialData);
      if (formInitialData.tags.length > 0)
      {
        setSelectedTags(formInitialData.tags.map(t => ({value: t.id, label: t.value})));
       }
    }
  },[tagsOptions]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t("alerts.new-form.validation.title")),
    body: Yup.string().required(
      t("alerts.new-form.validation.body")
    ),
    compensation: Yup.number(),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    //setStatus();
    let tagsIds = fields.isGeneric == "0" ? selectedTags.map(tag => (tag.value)) : [];
    if (!isUpdate)
    { 
      alertService.create({ ...fields, tagsIds, isGeneric: fields.isGeneric == "1" }).then(() => {
        notificationService.success("Alert added successfully", {
          keepAfterRouteChange: true,
        });
        history.push(".");
      })
        .catch((error) => {
          setSubmitting(false);
          notificationService.error(error);
        });
    } else
    {
      alertService.update(id,{ ...fields, tagsIds, isGeneric: fields.isGeneric == "1" }).then(() => {
        notificationService.success("Alert updated successfully", {
          keepAfterRouteChange: true,
        });
        history.push("..");
      })
        .catch((error) => {
          setSubmitting(false);
          notificationService.error(error);
        });
     }
  }

  return (
    <div className="row">
      <div className="col-sm-8 offset-sm-2 mt-5">
        <div className="card m-3">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
            innerRef={formRef}
          >
            {({ values,errors, touched, isSubmitting }) => (
              <Form>
                <h3 className="card-header">
                  {isUpdate
                    ? t("alerts.new-form.title.update")
                    : t("alerts.new-form.title.create")}
                  {t("alerts.new-form.title.text")}
                </h3>
                <div className="card-body">
                  <div className="form-row">
                    <div className="form-group col">
                      <label className="mr-3">
                        {t("alerts.new-form.alert-title")}{" "}
                      </label>
                      <Field
                        name="title"
                        type="text"
                        className={
                          "form-control" +
                          (errors.title && touched.title ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label className="mr-3">
                        {t("alerts.new-form.description")}{" "}
                      </label>
                      <Field
                        name="body"
                        component="textarea"
                        className={
                          "form-control" +
                          (errors.body && touched.body
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="body"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>                  
                  <div className="form-row">
                    <div className="form-group col">
                      <label>Linkage</label>
                      <div role="group">
                        <label  style={{alignItems:"center"}} className="w-100">
                          <Field type="radio" name="isGeneric" value="1"  className="mr-1"></Field>
                          This is a generic Alert
                        </label>
                        <label style={{alignItems:"center"}} className="w-100">
                          <Field type="radio" name="isGeneric" value="0" className="mr-1"/>
                          I would like to link this Alert to tag/s
                        </label>
                        {values.isGeneric=="0"&&<Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          defaultValue={selectedTags}
                          onChange={setSelectedTags}
                          isMulti
                          options={tagsOptions}
                          menuPortalTarget={document.body}
                          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}/>}
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col">
                      <label>{t("alerts.new-form.comp")} </label>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">EUR</span>
                        </div>
                        <Field
                          name="compensation"
                          type="number"
                          min="0.00"
                          className={
                            "form-control" +
                            (errors.compensation && touched.compensation
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">.00</span>
                        </div>
                        <ErrorMessage
                          name="compensation"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
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
                        {t("alerts.new-form.submit")}
                      </button>
                      <Link
                        to={isUpdate ? ".." : "."}
                        className="btn btn-outline-danger ml-2"
                        style={{ width: "100px" }}
                      >
                        {t("alerts.new-form.cancel")}
                      </Link>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default NewOrUpdateAlert;
