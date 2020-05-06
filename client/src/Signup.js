import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React, { useReducer } from "react";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { URI } from "./config";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: ""
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value
  };
}

function checkInputs(state) {
  if (
    state.name !== "" &&
    state.email !== "" &&
    state.password !== "" &&
    state.confirmPassword !== ""
  ) {
    return true;
  }
  return false;
}

const Signup = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  
  const _signupHandler = _ => {
    if (checkInputs(state)) {
      let { name, email, password, confirmPassword } = state;
      return axios
        .post(URI + "/api/signup", { name, email, password, confirmPassword })
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

  const _signup = async e => {
    e.preventDefault();
    let respError = await _signupHandler();
    if (respError) {
      dispatch({ field: "error", value: respError });
    } else {
      props.history.push("/login");
    }
  };

  const _handleKeyDown = e => {
    if (e.key === "Enter") {
      _signup(e);
    }
  };

  return (
    <Container fluid>
      <Row
        id="App-Container"
        className="align-items-center justify-content-center"
      >
        <Col lg="8">
          <Card>
            <Card.Body className="p-4">
              <Form className="mb-2">
                <h1 className="display-4">Sign up</h1>
                <p className="error">{state.error}</p>
                <Form.Group controlId="formBasicEmail">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    aria-label="Name"
                    onChange={onChange}
                    onKeyDown={_handleKeyDown}
                    name="name"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group controlId="formConfirmEmail">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    aria-label="Email"
                    onChange={onChange}
                    onKeyDown={_handleKeyDown}
                    name="email"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    onChange={onChange}
                    onKeyDown={_handleKeyDown}
                    name="password"
                  />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    aria-label="Password confirmPassword"
                    onChange={onChange}
                    onKeyDown={_handleKeyDown}
                    name="confirmPassword"
                  />
                </Form.Group>
                <Button
                  id="signUpBtn"
                  variant="main"
                  size="lg"
                  block
                  onClick={_signup}
                >
                  Sign up
                </Button>
              </Form>
              <Button id="stripeBtn">
                <a href="https://connect.stripe.com/oauth/authorize?client_id=ca_H8sVQtZQ9URkeJKBgInu8Dck8gVKXcj7&state={STATE_VALUE}&scope=read_write&response_type=code&stripe_user[email]=user@example.com&stripe_user[url]=example.com">
                <img src="https://i.imgur.com/fHwJ011.png"></img>
                </a>
              </Button>
              <div className="d-flex justify-content-center">
                <p>Have an account? &nbsp;</p>
                <Link to="/login">
                  <b>Log in!</b>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
