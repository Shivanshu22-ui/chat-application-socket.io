import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversation } from "../context/ConverationProvider";

export default function Conversation() {
  const {conversations ,selectConversationIndex}= useConversation(); 
  // 
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation,index) => (
        <ListGroup.Item key={index}
        action
        active={conversation.selected}
        onClick={()=> selectConversationIndex(index)}
        >{conversation.recipients.map(r=> r.name).join(', ')}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
