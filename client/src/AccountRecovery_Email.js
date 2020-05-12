import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import { URI } from "./config";
import axios from "axios";

function AccountRecovery_Email(props) {
  const [email, setEmail] = useState("");

  const _forgotHandler = async e => {
    e.preventDefault();
    if (email !== "") {
      return axios
        .post(URI + "/api/forgot", { email })
        .then(response => {
          return null;
        })
        .catch(error => {
          if (error.response) {
            return error.response.data.message;
          } else return error.message;
        });
    }
  };

  const _handleKeyDown = e => {
    if (e.key === "Enter") {
      _forgotHandler(e);
    }
  };

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
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                    onKeyDown={_handleKeyDown}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Button
                  id="continueBtn"
                  variant="main"
                  size="lg"
                  block
                  onClick={_forgotHandler}
                >
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
