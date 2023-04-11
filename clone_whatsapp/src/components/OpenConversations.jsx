import React, { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useConversation } from "../context/ConverationProvider";

export default function OpenConversations() {
  const [text, setText] = useState("");
  const { sendMessage, selectedConversation } = useConversation();
  const lastMsg = useRef();
  function handleSubmit(e) {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  }

  useEffect(() => {
    if (lastMsg.current) {
      lastMsg.current.scrollIntoView({ smooth: true });
    }
  });
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.message.map((mess, index) => {
            const lstMsg = selectedConversation.message.length - 1 === index;
            return (
              <div
                key={index}
                ref = {lstMsg?lastMsg:null}
                className={`my-1 d-flex flex-column ${
                  mess.fromMe ? "align-self-end" : ""
                }`}
              >
                <div
                  className={`rounded px-2 ${
                    mess.fromMe ? " bg-primary text-white" : "border"
                  }`}
                >
                  {mess.text}
                </div>
                <div
                  className={`text-muted-small ${
                    mess.fromMe ? "text-right" : ""
                  }`}
                >
                  {mess.fromMe ? "You" : mess.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            {/* <InputGroup.Append> */}
            <Button type="submit">Send</Button>
            {/* </InputGroup.Append> */}
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
