import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React from "react";
import Row from "react-bootstrap/Row";

function Login() {
  return (
    <div className="App">
      <Container>
        <Row
          id="App-Container"
          className="align-items-center justify-content-center"
        >
          <Col lg="7">
            <Card>
              <Card.Body>
                <Form className="mb-2">
                  <Form.Group controlId="formBasicEmail">
                    <h1 className="display-4">Log in</h1>
                    <Form.Control type="email" placeholder="Email" />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      className="mb-2"
                      type="password"
                      placeholder="Password"
                    />
                    <a className="text-primary" href="#">
                      Forgot your password?
                    </a>
                  </Form.Group>
                  <Button variant="primary" type="submit" size="lg" block>
                    Log in
                  </Button>
                </Form>
                <div className="d-flex justify-content-center">
                  <p>No account? &nbsp;</p>
                  <a href="#">
                    <strong>Sign Up!</strong>
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
