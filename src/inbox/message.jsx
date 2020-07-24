import React from "react";

const Message = (props) => {
  const { isSent, text, timestamp } = props;
  const isSentClass = isSent ? " message-sent" : "";
  const float = isSent ? "right" : "left";
  return (
    <div
      className={
        "card text-center w-75 mb-3 shadow-sm interactive-hover" + isSentClass
      }
      style={{ float: float, borderRadius: "20px" }}
    >
      <div className="card-body">
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

export default Message;
