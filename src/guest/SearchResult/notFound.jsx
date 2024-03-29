import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container pb-3">
      <div className="page-wrap d-flex flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block">404</span>
              <div className="mb-4 lead">
                The Tag you are looking for was not found.
              </div>
              <Link to="/" className="btn btn-link">
                Go to Home{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br/>  
    </div>
  );
};

export default NotFound;
