import React from "react";
import { Link } from "react-router-dom";

const InboxHeader = (props) => {
  const { handleClick } = props;
  return (
    <div className="row ">
      <div className="card" style={{ width: "100%" }}>
        <div className="card-header pt-1 pb-0">
          <p className="blocktext">INBOX</p>
        </div>
      </div>
    </div>
  );
};

export default InboxHeader;
