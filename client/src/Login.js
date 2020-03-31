import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { URI } from "./config";

function checkInputs(email, password) {
  if (email !== "" && password !== "") {
    return true
  }
  return false
}

function handleClick(event, email, password) {
  const id = event.target.id;
  console.log("Pressed " + id);

  if (checkInputs(email, password)) {
    (async () => {
      const rawResponse = await fetch(URI + '/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
      });
      const content = await rawResponse.json();
    
      console.log(content);
    })();
  }
}


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("email: ", email);
  console.log("password: ", password);
  return (
    <Container fluid>
      <Row
        id="App-Container"
        className="align-items-center justify-content-center"
      >
        <Col lg="7">
          <Card>
            <Card.Body>
              <Form className="mb-2">
                <h1 className="display-4">Log in</h1>
                <Form.Group controlId="formBasicEmail">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    aria-label="Email"
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    onChange={e => {
                      setPassword(e.target.value);
                    }}
                  />
                  <Link to="/recovery-email"> Forgot your password?</Link>
                </Form.Group>
                <Button id="loginBtn" variant="main" size="lg" block onClick={e => handleClick(e, email, password)}>
                  Log in
                </Button>
              </Form>
              <div className="d-flex justify-content-center">
                <p>No account? &nbsp;</p>
                <Link to="/signup">
                  <b>Sign Up!</b>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
