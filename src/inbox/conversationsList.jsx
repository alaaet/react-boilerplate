import React from "react";
import ConversationItem from "./conversationItem";

const ConversationsList = (props) => {
  const { handleClick } = props;
  return (
    <div id="conversations-list" className="container border pt-2 pr-0 pl-0 ">
      {conversations.map((conversation, index) => {
        return (
          <ConversationItem conv={conversation} key={index} hc={handleClick} />
        );
      })}
      <div className="the-end-shadow" />
    </div>
  );
};

const conversations = [
  {
    title: "Some message",
    unseen: false,
    image: "",
  },
  {
    title: "Some unseen message ",
    unseen: true,
    image: "",
  },
  {
    title: "Some message",
    unseen: false,
    image: "",
  },
  {
    title: "Some message",
    unseen: false,
    image: "",
  },
  {
    title: "Some message",
    unseen: false,
    image: "",
  },
  {
    title: "Some message",
    unseen: false,
    image: "",
  },
  {
    title: "Some message",
    unseen: false,
    image: "",
  },
  {
    title: "Some message",
    unseen: false,
    image: "",
  },
];
export default ConversationsList;
