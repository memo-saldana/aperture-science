import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";

function checkInput(email) {
  if (email !== "") {
    return true
  }
  return false
}

function handleClick(event, email) {
  const id = event.target.id;
  console.log("Pressed " + id);

  if (checkInput(email)) {
    (async () => {
      const rawResponse = await fetch('http://localhost:3000/api/forgot', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email})
      });
      const content = await rawResponse.json();
    
      console.log(content);
    })();
  }
}

function AccountRecovery_Email() {
  const [email, setEmail] = useState("");

  console.log(email);
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
                <Form.Group controlId="formBasicEmail">
                  <h1 className="display-4">Forgot password?</h1>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {setEmail(e.target.value)}}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Button id="continueBtn" variant="main" size="lg" block onClick={e => handleClick(e, email)}>
                  Continue
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AccountRecovery_Email;
