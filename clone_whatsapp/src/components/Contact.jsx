import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { useContact } from '../context/ContextProvider';

export default function Contact() {
  const {contact} = useContact();
  return (
    <ListGroup variant='flush'>
      {contact.map(contact =>(
        <ListGroup.Item key={contact.id}>
          {contact.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
