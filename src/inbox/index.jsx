import React, { useState,useEffect } from "react";
import Conversation from "./conversation";
import ConversationsList from "./conversationsList";
import ConversationHeader from "./conversationHeader";
import InboxHeader from "./inboxHeader";
import MessageForm from "./messageForm";
import { accountService , sockService } from "@/_services";

const Inbox = (props) => {
  const user = accountService.userValue;
  const [conversation, setConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const processMessage = (msg) => {
    if (conversation !== null) {
      //console.log(JSON.parse(msg.body).content);
      let newConv = conversation;
      newConv.messages.push(JSON.parse(msg.body));
      setConversation(newConv)
    } else { console.log("No conversation was selected!")}
  }
  useEffect(() => {
    const isInitialized = sockService.init();
    if (isInitialized) {
      sockService.connect(user.id, setNewMessage)
    } else { console.log("Unable to connect to websocket")}
  }, [])

  useEffect(() => {
    if (newMessage && newMessage !== "") { 
      processMessage(newMessage)
      setNewMessage("");
    }
  }, [newMessage])
  
  const sendMessage = (recipientId,content) => {
    sockService.sendMessage(conversation.id,user.id, recipientId, content);
    setNewMessage({ body: JSON.stringify({ conversationId: conversation.id,senderId: user.id, receiverId: recipientId, content: content,isSent:true }) })
    //console.log("SENDING: ", { conversationId: conversation.id,senderId: user.id, receiverId: recipientId, content: content,isSent:true });
   }
  
  if (conversation == null) {
    return (
      <div className="container border bg-white pb-3" id="inbox">
        <InboxHeader />
        <ConversationsList handleClick={setConversation}/>
      </div>
    );
  } else {
    return (
      <div className="container border bg-white pb-3" id="inbox">
        <ConversationHeader handleClick={setConversation} conversation={conversation} />
        <Conversation messages={ conversation.messages} />
        <MessageForm sendMessage={sendMessage} conversation={conversation}/>
      </div>
    );
  }
};

export default Inbox;
