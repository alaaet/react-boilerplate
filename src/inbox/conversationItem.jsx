import React, { useState, useEffect } from "react";
import axios from "axios";

const ConversationItem = (props) => {
  const { conv, index, hc } = props;
  const { isSender,senderName,recipientName,image, unseen } = conv;
  useEffect(() => {
  }, []);

  return (
    <div
      className={`card mb-2 clickable ${unseen ? "" : " bg-active "} `}
      onClick={() => {
        hc(conv);
      }}
    >
      <div className="row no-gutters">
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title">{isSender?recipientName:senderName}</h5>
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div className="col-4 p-2" style={{ textAlign: "right" }}>
          {image !== "" ?
            <img
              className="img-fluid contact-img img-thumbnail rounded-circle "
              //src={require("../img/no_profile_img.png")}
              src={image}
              alt="Profile image"
            /> :
            <img
              className="img-fluid contact-img img-thumbnail rounded-circle "
              src={require("../img/no_profile_img.png")}
              alt="Profile image"
          />}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
