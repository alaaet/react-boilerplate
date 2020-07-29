import React from "react";
import { Link } from "react-router-dom";

const AlertItem = (props) => {
  const { alert, index, isGuest } = props;
  return (
    <div className="card text-center mb-3">
      <div className="card-header">
        <span className="date" style={{ float: "left" }}>
          {alert.date}
        </span>
        {!isGuest ? (
          <div style={{ float: "right" }}>
            <Link to={`/update`} className="btn btn-outline-dark">
              <i className="fa fa-cog" aria-hidden="true"></i>
            </Link>
            <Link to={`/update`} className="btn btn-outline-danger ml-2">
              <i className="fa fa-trash" aria-hidden="true"></i>
            </Link>
          </div>
        ) : null}
      </div>
      <div className="card-body">
        <h5 className="card-title">{alert.title}</h5>
        <p className="card-text">{alert.description}</p>
      </div>
    </div>
  );
};

export default AlertItem;
