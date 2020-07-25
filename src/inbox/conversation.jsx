import React from "react";
import Message from "./message";

const Conversation = () => {
  enableHover();
  return (
    <div id="conversation" className="row">
      <div className="container p-2" style={{ position: "relative" }}>
        {messages.map((message, index) => {
          return (
            <Message
              isSent={message.isSent}
              key={index}
              text={message.text}
              timestamp={message.timestamp}
            />
          );
        })}
        <div
          className="the-end-shadow"
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};

const enableHover = () => {
  $(".interactive-hover").hover(
    function () {
      $(this).addClass("shadow").css("cursor", "pointer");
    },
    function () {
      $(this).removeClass("shadow");
    }
  );
};

const messages = [
  { isSent: false, text: "Something 1", timestamp: Date.now() },
  { isSent: true, text: "Something 2", timestamp: Date.now() },
  { isSent: false, text: "Something 3", timestamp: Date.now() },
  { isSent: true, text: "Something 4", timestamp: Date.now() },
  { isSent: false, text: "Something 5", timestamp: Date.now() },
  { isSent: true, text: "Something 6", timestamp: Date.now() },
  { isSent: false, text: "Something 7", timestamp: Date.now() },
  { isSent: true, text: "Something 8", timestamp: Date.now() },
  { isSent: false, text: "Something 9", timestamp: Date.now() },
  { isSent: true, text: "Something 10", timestamp: Date.now() },
  { isSent: false, text: "Something 11", timestamp: Date.now() },
  { isSent: true, text: "Something 12", timestamp: Date.now() },
];

export default Conversation;
