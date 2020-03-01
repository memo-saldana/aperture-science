import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React from "react";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

function AccountRecovery_Email() {
  return (
    <Container>
      <Row
        id="App-Container"
        className="align-items-center justify-content-center"
      >
        <Col lg="6">
          <Card>
            <Card.Body>
              <Form className="mb-2">
                <Form.Group controlId="formBasicEmail">
                  <h1 className="display-4">Find account</h1>
                  <Form.Control type="email" placeholder="Email" />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Link to="/accountrec_password">
                  <Button variant="primary" size="lg" block>
                    Continue
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

export default AccountRecovery_Email;
