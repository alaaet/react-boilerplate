import React from "react";
import { Link } from "react-router-dom";

const ConversationHeader = (props) => {
  const { handleClick } = props;
  return (
    <div className="row ">
      <div className="card" style={{ width: "100%" }}>
        <div className="card-header pt-1 pb-0">
          <button
            to="."
            style={{ float: "left" }}
            className="btn btn-outline-secondary pb-1"
            onClick={() => {
              handleClick(0);
            }}
          >
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
          <Link
            to="."
            style={{ float: "right" }}
            className="btn btn-outline-danger pb-1"
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </Link>
          <p className="blocktext">
            Conversation with Admin{"  "}
            <a className="btn btn-outline-primary pb-1" href="tel:632-804271">
              <i className="fa fa-phone" aria-hidden="true">
                {" "}
                <span className="d-none d-md-inline"> 632-804-271</span>
              </i>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;
