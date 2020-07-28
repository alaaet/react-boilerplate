import React from "react";
import JobsList from "./jobsList";
import ContactAdmin from "./contactAdmin";

const WorkWithUs = () => {
  return (
    <section
      id="sectionJobList"
      className="section section-job-list gradient-light--lean-left pb-3"
    >
      <div className="container">
        <div className="row row-grid justify-content-center">
          <div className="col-md-8 col-lg-7 col-xl-6 text-center">
            <h3 className="text-success pt-3">Jobs Openings at RefTag</h3>
            <p>
              We’re always searching for amazing people to join our team. Take a
              look at our current openings.
            </p>
          </div>
          <JobsList />
        </div>
        <div className="row row-grid justify-content-center">
          <div className="col-md-10 text-center">
            <h3 className="text-success pt-3">
              Would you like to partner up with us?
            </h3>
            <ContactAdmin />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithUs;
