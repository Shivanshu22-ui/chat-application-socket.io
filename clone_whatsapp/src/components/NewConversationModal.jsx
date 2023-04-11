import React, {  useState } from "react";
import { Modal, Form , Button  } from "react-bootstrap";
import { useContact } from "../context/ContextProvider";
import {useConversation} from "../context/ConverationProvider";

export default function NewConversationModal({closeModal}) {
  const { contact } = useContact();
  const {createConversation} = useConversation();
  const [selectedContactId, setSelectedContactId] = useState([]);

  // const {createConversation}= useConversation();

  function handleSubmit(e){
    e.preventDefault();
    createConversation(selectedContactId);
    closeModal();
  }
  function handleCheckbox(contactId){
    setSelectedContactId(prev =>{
      if(prev.includes(contactId)){
        return prev.filter(prevId =>{
          return contactId !== prevId
        })
      }else{
        return [...prev,contactId];
      }
    })
  }

  return (
    <div>
      <Modal.Header closeButton>Create Converation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contact.map((con) => (
            <Form.Group controlId={con.id} key={con.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactId.includes(con.id)}
                label={con.name}
                onChange={()=>handleCheckbox(con.id)}
              ></Form.Check>
            </Form.Group>
          ))}
          <Button type="submit" className="my-2 border-top">Create</Button>
        </Form>
      </Modal.Body>
    </div>
  );
}
