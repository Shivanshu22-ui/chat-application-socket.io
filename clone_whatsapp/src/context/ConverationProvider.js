import React, { useCallback, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContact } from "./ContextProvider";
import { useSocket } from "./SocketProvider";

const ConversationContext = React.createContext();

export function useConversation() {
  return useContext(ConversationContext);
}

export function ConversationProvider({ id, children }) {
  const [conversations, setConversation] = useLocalStorage("conversation", []);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contact } = useContact();
  const socket = useSocket();

  function createConversation(recipients) {
    setConversation((prev) => {
      return [...prev, { recipients, message: [] }];
    });
  }

  const addMessageToConversation = useCallback( ({ recipients, text, sender })=> {
    setConversation((prevConversations) => {
      let madeChange = false;
      const newMessage = { sender, text };
      const newConversations = prevConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          return {
            ...conversation,
            message: [...conversation.message, newMessage],
          };
        }
        return conversation;
      });
      if (madeChange) {
        return newConversations;
      } else {
        return [...prevConversations, { recipients, message: [newMessage] }];
      }
    });
  },[setConversation])

  useEffect(()=>{
    if(socket == null) return 

    socket.on('recieve-message',addMessageToConversation);
    return ()=> socket.off('receive-message')
  },[socket,addMessageToConversation])
  function sendMessage(recipients, text) {
    socket.emit('send-message', {recipients,text})
    addMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversations = conversations.map((conversation, index) => {
    
    const recipients = conversation.recipients.map((recipient) => {
      const contacts = contact.find((contac) => {
        return contac.id === recipient;
      });
      const name = (contacts && contacts.name) || recipient;
      return { id: recipient, name };
    });

    const message = conversation.message.map((m) => {
      const contacts = contact.find((contac) => {
        return contac.id === m.sender;
      });
      const name = (contacts && contacts.name) || m.sender;
      const fromMe = id === m.sender;
      return { ...m, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, message, recipients, selected };
  });

  const values = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
    sendMessage,
    createConversation,
  };

  return (
    <ConversationContext.Provider value={values}>
      {children}
    </ConversationContext.Provider>
  );
}

function arrayEquality(a, b) {
  if (a.length !== b.length)  return false;
    a.sort();
    b.sort();
    return a.every((ele, ind) => {
      return (ele = b[ind]);
    });
  }
