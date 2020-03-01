import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React from "react";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

function Login() {
  return (
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
                  <Link to="/accountrec_email"> Forgot your password?</Link>
                </Form.Group>
                <Button variant="primary" size="lg" block>
                  Log in
                </Button>
              </Form>
              <div className="d-flex justify-content-center">
                <p>No account? &nbsp;</p>
                <Link to="/signup">
                  <strong>Sign Up!</strong>
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
