import React, { useState,useEffect} from "react";
import ConversationItem from "./conversationItem";
import { inboxService } from "@/_services";

const ConversationsList = (props) => {
  const { handleClick } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [conversations,setConversations] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    inboxService.getAllByUser().then((x) => {
      setConversations(x);
    });
    setIsLoading(false);
  }, []);

  return (
    <div id="conversations-list" className="container border pt-2 pr-0 pl-0 ">
      {conversations.length > 0?conversations.map((conversation, index) => {
        return (
          <ConversationItem conv={conversation} key={index} hc={handleClick} />
        );
      })
      : !isLoading ? (
        <p className={"text-muted blocktext pb-3"}>No Conversations yet!</p>
      ) : (
        <p className="text-center">
          <span className="spinner-border spinner-border-lg align-center"></span>
        </p>
      )}
      {conversations.length > 5 && <div className="the-end-shadow" />}
    </div>
  );
};


export default ConversationsList;
