import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import { URI } from "./config";
import axios from "axios";

/*
mandar get /api/verify
mandar email y token


post /api/password
mandar email, token, password

*/

function checkInputs(password, confirmation) {
  if (password !== "" && confirmation !== "" && password === confirmation) {
    return true;
  }
  return false;
}

const AccountRecovery_Password = ({ history, match, location }) => {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [certificate, setCertificate] = useState(false);
  const [error, setError] = useState("");

  const queryString = require("query-string");
  let parsed = queryString.parse(location.search);
  let { email, token } = parsed;

  const _handleClick = e => {
    e.preventDefault();

    if (checkInputs(password, confirmation)) {
      return axios
        .post(URI + "/api/password", { email, token, password })
        .then(response => {
          history.push("/login");
        })
        .catch(error => {
          if (error.response) {
            return error.response.data.message;
          } else return error.message;
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${URI}/api/verify?token=${token}&email=${email}`)
        .then(response => {
          return setCertificate(true);
        })
        .catch(error => {
          if (error.response) {
            return setError(error.response.data.message);
          } else return setError(error.message);
        });
    };

    fetchData();
  }, [email, token]);

  const _handleKeyDown = e => {
    if (e.key === "Enter") {
      _handleClick(e);
    }
  };

  const recoveryForm = (
    <Form className="mb-2">
      <h1 className="display-4">Reset password</h1>
      <Form.Group controlId="formBasicPassword">
        <Form.Control
          className="mb-2"
          type="password"
          placeholder="New password"
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPasswordConfirmation">
        <Form.Control
          className="mb-2"
          type="password"
          placeholder="Confirm password"
          onChange={e => {
            setConfirmation(e.target.value);
          }}
          onKeyDown={_handleKeyDown}
        />
      </Form.Group>
      <Button variant="main" size="lg" block onClick={_handleClick}>
        Log in
      </Button>
    </Form>
  );

  const errorMessage = (
    <div>
      <h1 className="display-4">Error</h1>
      <p> {error} </p>
    </div>
  );

  return (
    <Container fluid>
      <Row
        id="App-Container"
        className="align-items-center justify-content-center"
      >
        <Col lg="6">
          <Card>
            <Card.Body>{!certificate ? errorMessage : recoveryForm}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountRecovery_Password;
