import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Error from "./Error";
import React, { useState, useEffect } from "react";
import RecoveryForm from "./RecoveryForm";
import Row from "react-bootstrap/Row";
import { useLocation, useHistory } from "react-router-dom";
import { URI } from "./config";

function checkInputs(password, confirmation) {
  if (password !== "" && confirmation !== "" && password === confirmation) {
    return true;
  }
  return false;
}

const AccountRecovery_Password = () => {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [certificate, setCertificate] = useState(false);
  const [error, setError] = useState("");
  const [passMatch, setPassMatch] = useState("");
  let history = useHistory();

  let location = useLocation();
  const queryString = require("query-string");
  let parsed = queryString.parse(location.search);
  let { email, token } = parsed;

  const _handleClick = (e) => {
    e.preventDefault();

    if (checkInputs(password, confirmation)) {
      return axios
        .post(URI + "/api/password", { email, token, password })
        .then((response) => {
          history.push("/login");
        })
        .catch((error) => {
          if (error.response) {
            setCertificate(false);
            return setError(error.response.data.message);
          } else return setError(error.message);
        });
    } else {
      setPassMatch("Passwords are either empty or not match");
    }
  };

  useEffect(() => {
    setPassMatch("");
    const fetchData = async () => {
      axios
        .get(`${URI}/api/verify?token=${token}&email=${email}`)
        .then((response) => {
          return setCertificate(true);
        })
        .catch((error) => {
          if (error.response) {
            return setError(error.response.data.message);
          } else return setError(error.message);
        });
    };

    fetchData();
  }, [email, token]);

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      _handleClick(e);
    }
  };

  const recoveryForm = (
    <RecoveryForm
      _handleClick={_handleClick}
      _handleKeyDown={_handleKeyDown}
      setPassword={setPassword}
      setConfirmation={setConfirmation}
    />
  );

  const errorMessage = <Error error={error} />;

  return (
    <Container fluid>
      <Row
        id="App-Container"
        className="align-items-center justify-content-center"
      >
        <Col lg="6">
          <Card>
            <Card.Body>{!certificate ? errorMessage : recoveryForm}</Card.Body>
            <p className="error">{passMatch}</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountRecovery_Password;
