import React from "react";
import Message from "./message";

const Conversation = (props) => {
  const { messages } = props;
  const  updateScroll= ()=>{
    var element = document.getElementById("yourDivID");
    element.scrollTop = element.scrollHeight;
}
  return (
    <div id="conversation" className="row">
      <div className="container p-2" style={{ position: "relative" }}>
        {messages.map((message, index) => {
          return (
            <Message
              isSent={message.isSent}
              key={index}
              text={message.content}
              timestamp={message.timestamp}
            />
          );
        })}
        {messages.length > 5 && <div
          className="the-end-shadow"
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            width: "100%",
          }}
        />}
      </div>
    </div>
  );
};

export default Conversation;
