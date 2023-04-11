import React, { useRef } from "react";
import {v4 as uuidV4} from 'uuid';
import { Button, Container, Form } from "react-bootstrap";

export default function Login({onIdSubmit}) {
  const idRef = useRef();

  function handleSubmit(e){
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  }

  function createNewId(){
    onIdSubmit(uuidV4());
  }
  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Label>Enter you Id</Form.Label>
        <Form.Control type="text" ref={idRef} required />
        <Button type="submit" className="m-2">
          Login
        </Button>
        <Button variant="secondary" onClick={createNewId}>New Account</Button>
      </Form>
    </Container>
  );
}
