import React from "react";
import JobsList from "./jobsList";
import ContactAdmin from "./contactAdmin";
import { useTranslation } from "react-i18next";

const WorkWithUs = (props) => {
  const { history } = props;
  const { t } = useTranslation();

  return (
    <section
      id="sectionJobList"
      className="section section-job-list gradient-light--lean-left pb-3"
    >
      <div className="container">
        <div className="row row-grid justify-content-center">
          <div className="col-md-8 col-lg-7 col-xl-6 text-center">
            <h3 className="text-success pt-3">{t("work-with-us.title-l1")}</h3>
            <p>{t("work-with-us.title-l2")}</p>
          </div>
          <JobsList history={history} />
        </div>
        <div className="row row-grid justify-content-center">
          <div className="col-md-10 text-center">
            <h3 className="text-success pt-3">
              {t("work-with-us.contact.title")}
            </h3>
            <ContactAdmin />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithUs;
