import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="App">
      <Container>
        <Row
          id="App-Container"
          className="align-items-center justify-content-center"
        >
          <Col lg="8">
            <Card>
              <Card.Body className="p-4">
                <Form className="mb-2">
                  <h1 className="display-4">Sign up</h1>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Your Name" />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email" />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      className="mb-2"
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      className="mb-2"
                      type="password"
                      placeholder="Confirm password"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" size="lg" block>
                    Sign up
                  </Button>
                </Form>
                <div className="d-flex justify-content-center">
                  <p>Have an account? &nbsp;</p>
                  <Link to="/login">
                    <strong>Log in!</strong>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
