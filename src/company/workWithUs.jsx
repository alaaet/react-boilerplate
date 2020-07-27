import React from "react";

const WorkWithUs = () => {
  return (
    <section
      id="sectionJobList"
      className="section section-job-list gradient-light--lean-left"
    >
      <div className="container">
        <div className="row row-grid justify-content-center">
          <div className="col-md-8 col-lg-7 col-xl-6 text-center">
            <h3 class="text-success pt-3">Jobs Openings at RefTag</h3>
            <p>
              We’re always searching for amazing people to join our team. Take a
              look at our current openings.
            </p>
          </div>

          <div className="col-md-10">
            <form className="filter-form mt-5 mb-4">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label for="jobPosition">Position :</label>
                    <select id="jobPosition" className="custom-select">
                      <option value="position1">Business</option>
                      <option value="position2">Design</option>
                      <option value="position3">Development</option>
                      <option value="position4">Engineering</option>
                      <option value="position5">Finance</option>
                      <option value="position6">Marketing</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label for="jobType">Type :</label>
                    <select id="jobType" className="custom-select">
                      <option value="type1">Full-time</option>
                      <option value="type3">Part-time</option>
                      <option value="type4">Remote</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-group">
                    <label for="jobLocation">Location : </label>
                    <select id="jobLocation" className="custom-select">
                      <option value="location1">Chicago, US</option>
                      <option value="location3">Michigan, US</option>
                      <option value="location2">New York, US</option>
                      <option value="location4">Los Angles, US</option>
                      <option value="location5">Moscow, Russia</option>
                      <option value="location6">Sydney, Australia</option>
                      <option value="location7">Birmingham, UK</option>
                      <option value="location8">Manchester, UK</option>
                      <option value="location9">Beijing, China</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>

            <div className="job-list__wrapper mb-6">
              <h3 className="mb-4">Design</h3>

              <a
                href="career-single.html"
                className="card p-0 mb-3 border-0 shadow-sm shadow--on-hover"
              >
                <div className="card-body">
                  <span className="row justify-content-between align-items-center">
                    <span className="col-md-5 color--heading">
                      <span className="badge badge-circle background--danger text-white mr-3">
                        GD
                      </span>{" "}
                      Senior Graphic Designer
                    </span>

                    <span className="col-5 col-md-3 my-3 my-sm-0 color--text">
                      <i className="fa fa-clock mr-1"></i> Full time
                    </span>

                    <span className="col-7 col-md-3 my-3 my-sm-0 color--text">
                      <i className="fa fa-map-marker-alt mr-1"></i> San
                      Fransisco, US
                    </span>

                    <span className="d-none d-md-block col-1 text-center color--text">
                      <small>
                        <i className="fa fa-chevron-right"></i>
                      </small>
                    </span>
                  </span>
                </div>
              </a>

              <a
                href="career-single.html"
                className="card p-0 mb-3 border-0 shadow-sm shadow--on-hover"
              >
                <div className="card-body">
                  <span className="row justify-content-between align-items-center">
                    <span className="col-md-5 color--heading">
                      <span className="badge badge-circle background--tertiary text-white mr-3">
                        UX
                      </span>{" "}
                      UI/UX Designer
                    </span>

                    <span className="col-5 col-md-3 my-3 my-sm-0 color--text">
                      <i className="fa fa-clock mr-1"></i> Remote
                    </span>

                    <span className="col-7 col-md-3 my-3 my-sm-0 color--text">
                      <i className="fa fa-map-marker-alt mr-1"></i> Anywhere
                    </span>

                    <span className="d-none d-md-block col-1 text-center color--text">
                      <small>
                        <i className="fa fa-chevron-right"></i>
                      </small>
                    </span>
                  </span>
                </div>
              </a>

              <a
                href="career-single.html"
                className="card p-0 mb-3 border-0 shadow-sm shadow--on-hover"
              >
                <div className="card-body">
                  <span className="row justify-content-between align-items-center">
                    <span className="col-md-5 color--heading">
                      <span className="badge badge-circle background--warning text-white mr-3">
                        AN
                      </span>{" "}
                      Multimedia Artist &amp; Animator
                    </span>

                    <span className="col-5 col-md-3 my-3 my-sm-0 color--text">
                      <i className="fa fa-clock mr-1"></i> Full time
                    </span>

                    <span className="col-7 col-md-3 my-3 my-sm-0 color--text">
                      <i className="fa fa-map-marker-alt mr-1"></i> Birmingham,
                      UK
                    </span>

                    <span className="d-none d-md-block col-1 text-center color--text">
                      <small>
                        <i className="fa fa-chevron-right"></i>
                      </small>
                    </span>
                  </span>
                </div>
              </a>
            </div>

            <div className="job-list__wrapper mb-6">
              <h3 className="mb-4">Development</h3>

              <a
                href="career-single.html"
                className="card p-0 mb-3 border-0 shadow-sm shadow--on-hover"
              >
                <div className="card-body">
                  <span className="row justify-content-between align-items-center">
                    <span className="col-md-5 color--heading">
                      <span className="badge badge-circle background--success text-white mr-3">
                        FE
                      </span>{" "}
                      Front End Developer
                    </span>

                    <span className="col-5 col-md-3 my-3 my-sm-0 color--text">
                      <i className="fa fa-clock mr-1"></i> Part time
                    </span>

                    <span className="col-7 col-md-3 my-3 my-sm-0 color--text">
                      <i className="fa fa-map-marker-alt mr-1"></i> Sydney, AU
                    </span>

                    <span className="d-none d-md-block col-1 text-center color--text">
                      <small>
                        <i className="fa fa-chevron-right"></i>
                      </small>
                    </span>
                  </span>
                </div>
              </a>

              <a
                href="career-single.html"
                className="card p-0 mb-3 border-0 shadow-sm shadow--on-hover"
              >
                <div className="card-body">
                  <span className="row justify-content-between align-items-center">
                    <span className="col-md-5 color--heading">
                      <span className="badge badge-circle background--warning2 text-white mr-3">
                        MD
                      </span>{" "}
                      Mobile Developer
                    </span>

                    <span className="col-5 col-md-3 my-3 my-sm-0 color--text">
                      <i className="fa fa-clock mr-1"></i> Full-time
                    </span>

                    <span className="col-7 col-md-3 my-3 my-sm-0 color--text">
                      <i className="fa fa-map-marker-alt mr-1"></i> San
                      Fransisco, US
                    </span>

                    <span className="d-none d-md-block col-1 text-center color--text">
                      <small>
                        <i className="fa fa-chevron-right"></i>
                      </small>
                    </span>
                  </span>
                </div>
              </a>

              <a
                href="career-single.html"
                className="card p-0 mb-3 border-0 shadow-sm shadow--on-hover"
              >
                <div className="card-body">
                  <span className="row justify-content-between align-items-center">
                    <span className="col-md-5 color--heading">
                      <span className="badge badge-circle background--info text-white mr-3">
                        NT
                      </span>{" "}
                      .NET Developer
                    </span>

                    <span className="col-5 col-md-3 my-3 my-sm-0 color--text">
                      <i className="fa fa-clock mr-1"></i> Full time
                    </span>

                    <span className="col-7 col-md-3 my-3 my-sm-0 color--text">
                      <i className="fa fa-map-marker-alt mr-1"></i> Manchester,
                      UK
                    </span>

                    <span className="d-none d-md-block col-1 text-center color--text">
                      <small>
                        <i className="fa fa-chevron-right"></i>
                      </small>
                    </span>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithUs;
