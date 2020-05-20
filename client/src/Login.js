import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import { URI } from "./config";

function checkInputs(email, password) {
  if (email !== "" && password !== "") {
    return true;
  }
  return false;
}

const Login = ({ loginHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const _login = async e => {
    e.preventDefault();
    setError("");
    let respError = await _loginHandler();
    if (respError) {
      setError(respError);
    } else {
      history.push("/");
    }
  };

  const _loginHandler = _ => {
    if (checkInputs(email, password)) {
      return axios
        .post(URI + "/api/login", {
          email,
          password
        })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.user._id);
          loginHandler(true);
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
      _login(e);
    }
  };

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
                <p className="error">{error}</p>
                <Form.Group controlId="formBasicEmail">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    aria-label="Email"
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                    onKeyDown={_handleKeyDown}
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
                    onKeyDown={_handleKeyDown}
                  />
                </Form.Group>
                <Link to="/recovery-email"> Forgot your password?</Link>
                <Button
                  id="loginBtn"
                  variant="main"
                  size="lg"
                  block
                  onClick={_login}
                  className="mt-3"
                >
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
};

export default Login;
