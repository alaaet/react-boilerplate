import React from "react";
import { Link } from "react-router-dom";

const DetailedJobView = (props) => {
  const { match } = props;
  const handleSubmit = () => {
    console.log("submitted");
  };
  return (
    <div className="container col-12  p-3">
      <div className="card mb-2">
        <div className="card-body">
          <h3 className="card-title text-info ">Job title</h3>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <h4>Job announcement Id: {match.params.jobId}</h4>
        </div>
      </div>
      <div className="card mb-2">
        <div className="card-body">
          <h4 className="card-title text-success ">
            <i className="fa fa-info-circle" aria-hidden="true"></i> Details:
          </h4>
          <h5 className="text-info">Requisites</h5>
          <p>something</p>
          <h5 className="text-info">Description</h5>
          <p>something</p>
        </div>
      </div>
      <button className="btn btn-primary mr-2" onClick={handleSubmit}>
        Apply for this position
      </button>
      <Link to="/company/work-with-us" className="btn btn-danger">
        Cancel
      </Link>
    </div>
  );
};

export default DetailedJobView;
