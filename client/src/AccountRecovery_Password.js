import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { URI } from "./config";

function checkInputs(password, confirmation) {
  if (password !== "" && confirmation !== "" && password === confirmation) {
    return true
  }
  return false
}

function handleClick(event, password, confirmation) {
  const id = event.target.id;
  console.log("Pressed " + id);

  if (checkInputs(password, confirmation)) {
    (async () => {
      const rawResponse = await fetch(URI + '/api/forgot', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({password: password})
      });
      const content = await rawResponse.json();
    
      console.log(content);
    })();
  }
}

function AccountRecovery_Password() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  console.log(password);

  return (
    <Container fluid>
      <Row
        id="App-Container"
        className="align-items-center justify-content-center"
      >
        <Col lg="6">
          <Card>
            <Card.Body>
              <Form className="mb-2">
                <h1 className="display-4">Reset password</h1>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    className="mb-2"
                    type="password"
                    placeholder="New password"
                    onChange={(e) => {setPassword(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPasswordConfirmation">
                  <Form.Control
                    className="mb-2"
                    type="password"
                    placeholder="Confirm password"
                    onChange={(e) => {setConfirmation(e.target.value)}}
                  />
                </Form.Group>
                <Link to="/login">
                  <Button variant="main" size="lg" block>
                    Log in
                  </Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AccountRecovery_Password;
