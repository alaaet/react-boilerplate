import React, { useState } from "react";
import Conversation from "./conversation";
import ConversationsList from "./conversationsList";
import ConversationHeader from "./conversationHeader";
import InboxHeader from "./inboxHeader";
import MessageForm from "./messageForm";

const Inbox = (props) => {
  const [conversationId, setConversationId] = useState(0);
  if (conversationId == 0) {
    return (
      <div className="container border bg-white" id="inbox">
        <InboxHeader />
        <ConversationsList handleClick={setConversationId} />
      </div>
    );
  } else {
    return (
      <div className="container border bg-white" id="inbox">
        <ConversationHeader handleClick={setConversationId} />
        <Conversation />
        <MessageForm />
      </div>
    );
  }
};

export default Inbox;
