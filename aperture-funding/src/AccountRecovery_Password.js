import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React from "react";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

function AccountRecovery_Password() {
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
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPasswordConfirmation">
                  <Form.Control
                    className="mb-2"
                    type="password"
                    placeholder="Confirm password"
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
