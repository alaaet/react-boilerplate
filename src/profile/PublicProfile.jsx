import React from "react";
import { Link } from "react-router-dom";

import { accountService } from "@/_services";
import Alerts from "./Alerts";

function PublicProfile({ match }) {
  const { path } = match;
  const user = accountService.userValue;

  return (
    <div>
      <h5 className="blocktext mt-2 mb-2">
        Your public profile&nbsp;
        <Link to={`${path}/update`} className="btn btn-outline-dark blocktext">
          <i className="fa fa-cog" aria-hidden="true"></i>
        </Link>
      </h5>
      <div className="row h-100 justify-content-center align-items-center mb-3">
        <div className="col-md-4 col-xl-4" data-aos="fade-up">
          <div className="card-one shadow p-5">
            <h1 className="display-4">
              <img
                className="img-fluid img-thumbnail rounded-circle"
                width="150px"
                src={require("../img/no_profile_img.png")}
                alt="Profile image"
              />
            </h1>
            <p className="lead">
              {user.title} {user.firstName} {user.lastName}
            </p>
            <span className="badge"> {user.email}</span>
            <hr className="my-4" />
            <p>this is a description about me...</p>
            <div className="d-flex justify-content-around">
              <a href="#" className="btn btn-outline-dark">
                <i className="fa fa-phone" aria-hidden="true"></i> Call me
              </a>
              <a href="#" className="btn btn-outline-dark">
                <i className="fa fa-envelope" aria-hidden="true"></i> Contact me
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <Alerts path={path} />
    </div>
  );
}

export { PublicProfile };
